'use client';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

// import components
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import CounselHistoryList from '@/components/CounselHistoryList';
import IntendSection from '@/components/IntendSection';

// import hooks
import fetcher from '@/utils/fetchers';
import { getCookieValue } from '@/utils/getCookieValue';

const Header = styled.header`
  padding: 10.6% 20px 0 20px;
  color: #222;
  font: var(--Pretendard--34-700);
`;

const Content = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SubNav = styled.ul`
  margin-top: 9.2%;
  list-style: none;
  display: flex;
  gap: 30px;

  & > li {
    padding: 9px 0;
    font-family: 'Pretendard';
    color: var(--gray05, #b2b2b2);
    font-size: clamp(20px, 5vw, 22px);
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
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
  gap: 14px;
  margin-top: 30px;
  margin-bottom: 120px;
`;

interface Props {
  token: string;
}

const History = ({ token }: Props) => {
  const [listSection, setListSection] = useState('counsel');

  const { data: testCheck } = useSWR('/api/assessment/has-result', (url) =>
    fetcher(url, token)
  );
  const { data: listData } = useSWR(
    `/api/counsel/history/${listSection}`,
    (url) => fetcher(url, token)
  );

  const handleListSection = useCallback((type: string) => {
    setListSection(type);
  }, []);

  return (
    <Layout>
      <Header>상담내역</Header>
      <Content>
        <SubNav>
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
        </SubNav>
        <Container>
          {!testCheck ? (
            <IntendSection
              text='심리검사 후 상담을 완료하면<br />상담 내역이 나타나요.'
              src='/image/nontest.png'
              type='psychologicaltest'
              svgWidth={60}
              svgHeight={60}
            />
          ) : listData?.counselHistories.length !== 0 ? (
            listData?.counselHistories.map(
              (item: { [key: string]: any }, i: number) => (
                <CounselHistoryList type={listSection} list={item} key={i} />
              )
            )
          ) : (
            <IntendSection
              text='아직 상담을 해보지 않으셨군요,<br />지금바로 상담을 시작해볼까요?'
              src='/image/counselor.png'
              type='counsel'
              svgWidth={60}
              svgHeight={60}
            />
          )}
        </Container>
      </Content>
      <Footer />
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

export default History;
