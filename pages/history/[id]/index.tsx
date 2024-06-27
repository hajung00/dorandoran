import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';

// import svg
import RightArrowSVG from '../../../public/icons/arrow-right.svg';

// import components
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import ChatSection from '@/components/ChatSection';

// import hooks
import makeSection from '@/utils/makeSection';
import fetcher from '@/utils/fetchers';
import { getCookieValue } from '@/utils/getCookieValue';

const Content = styled.div`
  padding: 0 20px;
`;

const CounselTitle = styled.section`
  color: var(--gray09, #222);
  font: var(--Pretendard--26-600);
  line-height: 140%; /* 36.4px */
`;

const CounselSummary = styled.section`
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
    width: 100%;
    margin-top: 12px;
    border: 10px solid #f7f7f7;
    padding: 16px;
    max-height: 248px;
    min-height: 136px;
    height: fit-content;
    overflow: hidden;
    color: var(--gray08, #444);
    text-overflow: ellipsis;
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 28px */
    letter-spacing: -0.4px;
  }
`;

const CounselChatHistory = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  overflow: auto;

  & > p {
    padding-top: 38px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(20px, 5vw, 24px);
    font-weight: 600;
    line-height: 140%; /* 33.6px */
    margin-bottom: 6px;
    position: sticky;
    top: 0;
    left: 0;
    background: #fff;
  }
`;

interface Props {
  token: string;
  chatData: any;
}

const HistoryId = ({ token, chatData }: Props) => {
  const router = useRouter();

  const messagesEndRef = useRef(null);
  const chatSections = makeSection(chatData ? chatData.messages.flat() : []); // 기존 데이터 변경하는 것이 아닌 복제된 데이터를 변경하여 사용

  return (
    <Layout>
      <Header type='prev' />
      <Content>
        <CounselTitle>
          <p>상담 결과</p>
          <p>{chatData?.result}</p>
          <button
            className='right-arrow-button'
            onClick={() => {
              router.push('/counsel/chat-intro');
            }}
          >
            새로운 상담 시작하기
            <RightArrowSVG width={20} height={20} alt={'arrow'} />
          </button>
        </CounselTitle>
        <CounselSummary>
          <p>상담 내용 요약</p>
          <div>{chatData?.summary}</div>
        </CounselSummary>
        <CounselChatHistory>
          <p>대화 내역</p>
          <ChatSection chatSections={chatSections} ref={messagesEndRef} />
        </CounselChatHistory>
      </Content>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;
  const counselId: any = context.query.id!;
  const chatData = token
    ? await fetcher(`/api/counsel/end/${counselId}`, token)
    : null;

  return {
    props: {
      token,
      chatData,
    },
  };
};

export default HistoryId;
