'use client';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import React, { useCallback, useState } from 'react';
import CounselHistoryList from '@/components/CounselHistoryList';

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

const History = () => {
  const counselItem = [
    { id: 1, title: '상담명1', date: '2024년 05월 20일' },
    { id: 2, title: '상담명1', date: '2024년 05월 21일' },
    { id: 3, title: '상담명1', date: '2024년 05월 22일' },
    { id: 4, title: '상담명1', date: '2024년 05월 23일' },
  ];

  const completeItem = [{ id: 1, title: '상담명1', date: '2024년 05월 20일' }];

  const [listSection, setListSection] = useState('counseling');
  const [counselList, setCounselList] = useState<
    { [key: string]: string | number }[]
  >([...counselItem]);

  console.log(counselList);
  const handleListSection = useCallback((type: string) => {
    setListSection(type);
    if (type === 'counseling') {
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
            className={`${listSection === 'counseling' && 'focus'}`}
            onClick={() => {
              handleListSection('counseling');
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
        {counselList.map((item, i) => (
          <CounselHistoryList list={item} key={i} />
        ))}
      </Container>
      <Footer />
    </Layout>
  );
};

export default History;
