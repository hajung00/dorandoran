import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import BarGraph from '@/components/BarGraph';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';
import { getCookieValue } from '@/utils/getCookieValue';
import { completeCounselAPI } from '@/pages/api/counsel';
import IntendSection from '@/components/IntendSection';
import Header from '@/components/Header';
import Description from '@/components/Description';

const Content = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 12.5%;

  .content-header {
    .title {
      color: #222;
      font: var(--Pretendard--26-600);
    }
  }
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

  .consel-wrapper {
    padding: 20px;
    border-radius: 16px;
    background: var(--gray01, #f7f7f7);
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 20px;
    cursor: pointer;

    .consel-title {
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.36px;
      text-transform: uppercase;
    }

    .consel-date {
      color: var(--gray09, #222);
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.32px;
      text-transform: uppercase;
    }
  }
`;

interface Props {
  token: string;
}

const TestChange = ({ token }: Props) => {
  const router = useRouter();
  const { data: userData } = useSWR('/api/mypage/main', (url) =>
    fetcher(url, token)
  );

  const { data: testCheck } = useSWR('/api/assessment/has-result', (url) =>
    fetcher(url, token)
  );

  const [clickDate, setClickDate] = useState('');
  const [completeCounselList, setCompleteCounselList] =
    useState<{ [key: string]: any }[]>();
  const handleClickDate = useCallback((date: string) => {
    console.log(date);
    setClickDate(date);
  }, []);

  // useEffect(() => {
  //   // 선택한 날짜 바뀔 때마다 상담 정보 가져오기
  //   const fetchData = async () => {
  //     try {
  //       const response = await completeCounselAPI(token, clickDate);
  //       console.log('선택한 날짜', response);
  //       setCompleteCounselList(response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   if (clickDate) {
  //     fetchData();
  //   }
  // }, [clickDate]);

  // 더미!!
  const dummy = [
    {
      counselId: 40,
      title: '우울감 극복하기',
      counselDate: '2024년 06월 26일',
    },
    {
      counselId: 40,
      title: '일상 회복하기',
      counselDate: '2024년 06월 27일',
    },
    {
      counselId: 40,
      title: '무기력 타파법',
      counselDate: '2024년 06월 28일',
    },
    {
      counselId: 40,
      title: '긍정 변화의 시작',
      counselDate: '2024년 06월 29일',
    },
  ];

  useEffect(() => {
    if (clickDate === '0626') {
      setCompleteCounselList([dummy[0]]);
    }
    if (clickDate === '0627') {
      setCompleteCounselList([dummy[1]]);
    }
    if (clickDate === '0628') {
      setCompleteCounselList([dummy[2]]);
    }
    if (clickDate === '0629') {
      setCompleteCounselList([dummy[3]]);
    }
  }, [clickDate]);

  //

  return (
    <Layout>
      <Header type={'prev'} />
      <Content>
        <div className='content-header'>
          <p className='title'>나의 심리변화 추이</p>
        </div>
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
            <Description
              desc={''}
              subDesc={`상담 종료 후 도란도란에서 분석한<br />${userData?.name}님의 심리변화 추이에요.`}
            />
            <BarGraph
              token={token}
              clickDate={clickDate}
              handleClickDate={handleClickDate}
            />
            <CompleteSection>
              <p className='title'>완료한 상담</p>
              {clickDate &&
                completeCounselList?.map((list) => (
                  <div
                    key={list.counselId}
                    className='consel-wrapper'
                    onClick={() => {
                      router.push(`/history/${list.counselId}`);
                    }}
                  >
                    <p className='consel-title'>{list.title}</p>
                    <p className='consel-date'>{list.counselDate}</p>
                  </div>
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

  return {
    props: {
      token,
    },
  };
};

export default TestChange;
