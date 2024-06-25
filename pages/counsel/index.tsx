'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from 'styled-components';

// import components
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import { getCookieValue } from '@/utils/getCookieValue';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';

// import image
import LogoPNG from '../../public/image/logo.png';
import CounselWarning from '@/components/CounselWarning';
import CallModal from '@/modal/CallModal';
import IntendSection from '@/components/IntendSection';

const Header = styled.header`
  padding: 54px 20px 0 20px;
  color: #222;
  font-family: 'Pretendard';
  font-size: clamp(30px, 7vw, 34px);
  font-weight: 700;
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

    & > button {
      margin-top: 29px;
      display: flex;
      width: 260px;
      padding: 4.5% 4px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border: none;
      border-radius: 18px;
      background: #565bff;
      color: var(--white, #fff);
      font-family: 'Pretendard';
      font-size: clamp(16px, 5vw, 20px);
      font-style: normal;
      font-weight: 600;
      letter-spacing: -0.4px;
      cursor: pointer;
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 16px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: clamp(18px, 5vw, 22px);
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    letter-spacing: -0.44px;
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
  }

  .counsel-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 20px;

    .counsel-list {
      padding: 20px;
      border-radius: 16px;
      background: var(--gray01, #f7f7f7);
      display: flex;
      flex-direction: column;
      gap: 14px;
      cursor: pointer;

      .counsel-title {
        color: #000;
        font-family: 'Pretendard';
        font-size: 18px;
        font-weight: 500;
        letter-spacing: -0.36px;
        text-transform: uppercase;
      }
      .counsel-date {
        color: #000;
        font-family: 'Pretendard';
        font-size: 16px;
        font-weight: 400;
        letter-spacing: -0.32px;
        text-transform: uppercase;
      }
    }
  }
`;

interface Props {
  token: string;
}

const Counsel = ({ token }: Props) => {
  const router = useRouter();
  const { data: testCheck } = useSWR('/api/assessment/has-result', (url) =>
    fetcher(url, token)
  );
  // const { data: counselWarning } = useSWR('/api/counsel/suggest', (url) =>
  //   fetcher(url, token)
  // );
  const { data: listData } = useSWR(`/api/counsel/history/counsel`, (url) =>
    fetcher(url, token)
  );

  const counselWarning = {
    suggestVisit: false,
    comment: '',
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callType, setCallType] = useState('');
  const [callNumber, setCallNumber] = useState('');

  const callModalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

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
                  (item: { [key: string]: any }) => (
                    <div
                      key={item.counselId}
                      className='counsel-list'
                      onClick={() =>
                        router.push(`/counsel/chat/${item.counselId}`)
                      }
                    >
                      <div className='counsel-title'>{item.title}</div>
                      <div className='counsel-date'>{item.date}</div>
                    </div>
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

  return {
    props: {
      token,
    },
  };
};

export default Counsel;
