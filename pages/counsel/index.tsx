'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// import components
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import IntendSection from '@/components/IntendSection';
import CounselHistoryList from '@/components/CounselHistoryList';
import CounselWarning from '@/components/CounselWarning';
import CallModal from '@/modal/CallModal';

// import hooks
import { getCookieValue } from '@/utils/getCookieValue';
import fetcher from '@/utils/fetchers';

const Header = styled.header`
  padding: 10.6% 20px 0 20px;
  color: #222;
  font: var(--Pretendard--34-700);
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 0 20px;
  padding-bottom: 74px;

  .test-intend-wrapper {
    display: flex;
    width: 100%;
    max-height: 329px;
    margin-top: 30px;
    padding: 40px 0px;
    border-radius: 26px;
    background: var(--gray01, #f7f7f7);
  }
`;

const CounselStyle = styled.div`
  width: 100%;

  .counsel-start-section {
    width: 100%;
    margin-top: 30px;
    padding: 40px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 26px;
    background: var(--gray01, #f7f7f7);
  }

  .counsel-list-section {
    margin-top: 32px;
    margin-bottom: 200px;

    .title {
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: clamp(20px, 5vw, 24px);
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .counsel-list-wrapper {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 20px;
    }
  }
`;

interface Props {
  token: string;
  testCheck: boolean;
  counselWarning: any;
  listData: any;
}

const Counsel = ({ token, testCheck, counselWarning, listData }: Props) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callType, setCallType] = useState('');
  const [callNumber, setCallNumber] = useState('');

  // 위급 전화 모달 toggle
  const callModalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  // 위급 전화 컴포넌트에서 선택한 전화 종류
  const onClickHandler = useCallback(
    (number: string, e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLLIElement;
      setCallType(target.innerText);
      setCallNumber(number);
      callModalHandler();
    },
    []
  );

  return (
    <Layout>
      <Header>상담</Header>
      <Content>
        {!token ? (
          <IntendSection
            text='상담을 하기 위해서는 로그인 상태여야 해요!<br />아래 버튼을 눌러 로그인을 진행해주세요.'
            src='/image/nonlogin.png'
            type='login'
            svgWidth={160}
            svgHeight={160}
          />
        ) : !testCheck ? (
          <div className='test-intend-wrapper'>
            <IntendSection
              text='심리검사로<br />현재 내 마음상태 알아보기'
              src='/image/nontest.png'
              type='psychologicaltest'
              svgWidth={80}
              svgHeight={80}
            />
          </div>
        ) : (
          <CounselStyle>
            {counselWarning?.suggestVisit && (
              <CounselWarning
                comment={counselWarning?.comment}
                onClickHandler={onClickHandler}
              />
            )}
            <div className='counsel-start-section'>
              <IntendSection
                text='새로운 상담 시작하기'
                src='/image/logo.png'
                type='counsel'
                svgWidth={100}
                svgHeight={48}
              />
            </div>
            <div className='counsel-list-section'>
              <p className='title'>현재 진행중인 상담</p>
              <div className='counsel-list-wrapper'>
                {listData?.counselHistories.map(
                  (item: { [key: string]: any }, i: number) => (
                    <CounselHistoryList type={'counsel'} list={item} key={i} />
                  )
                )}
              </div>
            </div>
          </CounselStyle>
        )}
      </Content>
      {isModalOpen && (
        <CallModal
          name={callType}
          callNumber={callNumber}
          isModalOpen={isModalOpen}
          onClosed={callModalHandler}
        />
      )}
      {token && <Footer />}
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;
  const testCheck = token
    ? await fetcher('/api/assessment/has-result', token)
    : null;
  const counselWarning = token
    ? await fetcher('/api/counsel/suggest', token)
    : null;
  const listData = token
    ? await fetcher('/api/counsel/history/counsel', token)
    : null;

  return {
    props: {
      token,
      testCheck,
      counselWarning,
      listData,
    },
  };
};

export default Counsel;
