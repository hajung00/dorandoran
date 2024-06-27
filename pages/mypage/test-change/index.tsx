import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// import components
import Layout from '@/components/Layout';
import BarGraph from '@/components/BarGraph';
import CounselHistoryList from '@/components/CounselHistoryList';
import IntendSection from '@/components/IntendSection';
import Header from '@/components/Header';
import Description from '@/components/Description';

// import api
import { completeCounselAPI } from '@/pages/api/counsel';

// import hooks
import fetcher from '@/utils/fetchers';
import { getCookieValue } from '@/utils/getCookieValue';

const Content = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 12.5%;
`;

const CompleteSection = styled.div`
  margin-top: 54px;

  .title {
    margin-bottom: 18px;
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.36px;
    text-transform: uppercase;
  }
`;

interface Props {
  token: string;
  userData: { [key: string]: any };
  testCheck: boolean;
}

const TestChange = ({ token, userData, testCheck }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  const [clickDate, setClickDate] = useState('');
  const [completeCounselList, setCompleteCounselList] =
    useState<{ [key: string]: any }[]>();

  // 그래프 선택 시 이벤트
  const handleClickDate = useCallback((date: string) => {
    setClickDate(date);
  }, []);

  useEffect(() => {
    // 선택한 날짜 바뀔 때마다 상담 정보 가져오기
    const fetchData = async () => {
      try {
        const response = await completeCounselAPI(token, clickDate);
        setCompleteCounselList(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (clickDate) {
      fetchData();
    }
  }, [clickDate]);

  return (
    <Layout>
      <Header type={'prev'} />
      <Content>
        <Description
          desc={'나의 심리변화 추이'}
          subDesc={
            userData
              ? `상담 종료 후 도란도란에서 분석한<br />${userData?.name}님의 심리변화 추이에요.`
              : ''
          }
        />
        {!testCheck ? (
          <IntendSection
            text='아직 심리검사를 하지 않으셨네요.<br/>지금 바로 검사를 시작해보세요!'
            src='/image/nontest.png'
            type='psychologicaltest'
            svgWidth={60}
            svgHeight={60}
          />
        ) : (
          <>
            <BarGraph
              token={token}
              clickDate={clickDate}
              handleClickDate={handleClickDate}
            />
            <CompleteSection>
              <p className='title'>완료한 상담</p>
              {clickDate &&
                completeCounselList?.map((list, i) => (
                  <CounselHistoryList key={i} type='complete' list={list} />
                ))}
            </CompleteSection>
          </>
        )}
      </Content>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;
  const userData = token ? await fetcher('/api/mypage/main', token) : null;
  const testCheck = token
    ? await fetcher('/api/assessment/has-result', token)
    : null;

  return {
    props: {
      token,
      userData,
      testCheck,
    },
  };
};

export default TestChange;
