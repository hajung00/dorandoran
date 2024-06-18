'use client';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import React, { useCallback, useState } from 'react';
import CounselHistoryList from '@/components/CounselHistoryList';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';
import { getCookieValue } from '@/utils/getCookieValue';

const Header = styled.header`
  padding: 54px 20px 0 20px;
  color: #222;
  font-family: 'Pretendard';
  font-size: clamp(30px, 7vw, 34px);
  font-weight: 700;
`;

const SubNav = styled.div`
  padding: 0 20px;
  margin-top: 47px;

  & > ul {
    list-style: none;
    display: flex;
    gap: 30px;
  }

  & > ul > li {
    padding: 9px 0;
    font-family: 'Pretendard';
    color: var(--gray05, #b2b2b2);
    font-size: clamp(20px, 5vw, 22px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .focus {
    color: var(--gray09, #222);
    border-bottom: 3px solid var(--doranblue, #565bff);
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px;
  gap: 14px;
  margin-top: 30px;
  margin-bottom: 120px;
`;

const NonListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  .icon {
    width: 80px;
    height: 80px;
    background: var(--gray02, #eaeaea);
  }
  & > p {
    margin-top: 38px;
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: clamp(18px, 5vw, 22px);
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 33px */
  }
  & > button {
    border-radius: 18px;
    background: var(--doranblue, #565bff);
    border: none;
    color: var(--white, #fff);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
    padding: 4.5% 0;
    width: 260px;
    margin-top: 26px;
  }
`;
interface Props {
  token: string;
}

const History = ({ token }: Props) => {
  const counselItem = [
    { counselId: 1, title: '상담명1', date: '2024-05-20' },
    { counselId: 2, title: '상담명2', date: '2024-05-21' },
    { counselId: 3, title: '상담명3', date: '2024-05-22' },
    { counselId: 4, title: '상담명4', date: '2024-05-23' },
  ];

  const completeItem = [{ counselId: 1, title: '상담명1', date: '2024-05-20' }];

  const [listSection, setListSection] = useState('counsel');
  const [counselList, setCounselList] = useState<
    { [key: string]: string | number }[]
  >([...counselItem]);

  const { data: testCheck } = useSWR('/api/assessment/has-result', fetcher);
  const { data: listData } = useSWR(
    `/api/counsel/history/${listSection}`,
    fetcher
  );

  const handleListSection = useCallback((type: string) => {
    setListSection(type);
    if (type === 'counsel') {
      setCounselList([...counselItem]);
    } else {
      setCounselList([...completeItem]);
    }
  }, []);

  return (
    <Layout>
      <Header>상담내역</Header>
      <SubNav>
        <ul>
          <li
            className={`${listSection === 'counsel' && 'focus'}`}
            onClick={() => {
              handleListSection('counsel');
            }}
          >
            진행중인 상담
          </li>
          <li
            className={`${listSection === 'complete' && 'focus'}`}
            onClick={() => {
              handleListSection('complete');
            }}
          >
            종료된 상담
          </li>
        </ul>
      </SubNav>
      <Container>
        {testCheck ? (
          <NonListStyle>
            <div className='icon'></div>
            <p>
              심리검사 후 상담을 완료하면 <br />
              상담 내역이 나타나요.
            </p>
            <button>심리검사 하러가기</button>
          </NonListStyle>
        ) : counselList ? (
          // listData.counselHistories로 변경하기
          counselList.map((item, i) => (
            <CounselHistoryList type={listSection} list={item} key={i} />
          ))
        ) : (
          <NonListStyle>
            <div className='icon'></div>
            <p>
              아직 상담을 해보지 않으셨군요,
              <br />
              지금바로 상담을 시작해볼까요?
            </p>
            <button>상담 시작하기</button>
          </NonListStyle>
        )}
      </Container>
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie
    ? getCookieValue(cookie, 'token')
    : 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMyIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MTgyNjUwNDIsImV4cCI6MTcxOTQ3NDY0Mn0.fwmTq0K5AOQoS7ceDbCI-2hoqKPbHDTxe1jDI3kx9PqJP0DYLPdaqyKhGS4wrfiXkXey2PTFdDPUx6-DZXv50w';

  return {
    props: {
      token,
    },
  };
};

export default History;
