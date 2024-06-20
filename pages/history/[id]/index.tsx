import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import styled from 'styled-components';
// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import Layout from '@/components/Layout';
import ChatSection from '@/components/ChatSection';
// import Scrollbars from 'react-custom-scrollbars';
import makeSection from '@/utils/makeSection';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
  }
`;
const CounselResultSection = styled.div`
  .counsel-title {
    margin-top: 22px;
    padding: 0 20px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(20px, 5.5vw, 26px);
    font-weight: 600;
    line-height: 140%; /* 36.4px */
  }

  .counsel-summary {
    padding: 0 20px;
    margin-top: 24px;
    position: relative;

    & > p {
      color: var(--gray07, #666);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 18px);
      font-weight: 600;
      line-height: 150%; /* 27px */
      letter-spacing: -0.36px;
    }

    & > div {
      margin-top: 12px;
      border: 10px solid #f7f7f7;
      padding: 16px;
      max-height: 248px;
      min-height: 136px;
    }
  }
`;

const CounselChatHistory = styled.div`
  padding: 0 20px;
  margin-top: 38px;
  display: flex;
  flex-direction: column;

  .title {
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(20px, 5vw, 24px);
    font-weight: 600;
    line-height: 140%; /* 33.6px */
    margin-bottom: 6px;
  }
`;

const HistoryId = () => {
  const router = useRouter();
  const counselId: any = router.query.id!;
  const { data: result } = useSWR(`/api/counsel/end/${counselId}`, fetcher);

  // const chatData = result?.messages

  const chatData = [
    {
      role: '상담원',
      message:
        '안녕하세요 조성혁님! 어떤 내용이든 좋으니, 저에게 마음편히 이야기해주세요.',
      date: '2024-05-24T13:03:34.000Z',
    },
    {
      role: '내담자',
      message: '나는 하정이',
      date: '2024-05-24T13:03:34.000Z',
    },
    {
      role: '상담원',
      message: '나는 상담원',
      date: '2024-06-18T13:03:34.000Z',
    },
    {
      role: '내담자',
      message: '나는 하정이',
      date: '2024-06-18T13:03:34.000Z',
    },
    {
      role: '상담원',
      message: '나는 상담원',
      date: '2024-06-18T13:03:34.000Z',
    },
    {
      role: '내담자',
      message: '나는 하정이',
      date: '2024-06-18T13:03:34.000Z',
    },
  ];

  const isEmpty = chatData?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData?.length < 20) || false;
  // const scrollbarRef = useRef<Scrollbars>(null);

  const chatSections = makeSection(chatData ? chatData.flat() : []); // 기존 데이터 변경하는 것이 아닌 복제된 데이터를 변경하여 사용

  const setSize = 1;

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.back();
          }}
        >
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
      </Header>
      <CounselResultSection>
        <div className='counsel-title'>
          <p>심리검사 결과</p>
          <p>조성혁님의 심리상태가 더 좋아졌어요!</p>
        </div>
        <div className='counsel-summary'>
          <p>상담 내용 요약</p>
          <div>{result?.summary}</div>
        </div>
      </CounselResultSection>
      <CounselChatHistory>
        <div className='title'>대화 내역</div>
        <ChatSection
          chatSections={chatSections}
          // ref={scrollbarRef}
          setSize={setSize}
          isReachingEnd={isReachingEnd}
        />
      </CounselChatHistory>
    </Layout>
  );
};

export default HistoryId;
