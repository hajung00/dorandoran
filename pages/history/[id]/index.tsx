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
import { getCookieValue } from '@/utils/getCookieValue';

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
  display: flex;
  flex-direction: column;
  height: calc(100vh - 436px);
  overflow: auto;

  .title {
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
}

const HistoryId = ({ token }: Props) => {
  const router = useRouter();
  const counselId: any = router.query.id!;
  const { data: chatData } = useSWR(`/api/counsel/end/${counselId}`, (url) =>
    fetcher(url, token)
  );

  const messagesEndRef = useRef(null);

  const chatSections = makeSection(chatData ? chatData.messages.flat() : []); // 기존 데이터 변경하는 것이 아닌 복제된 데이터를 변경하여 사용

  console.log('chatSections', chatSections);
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
          <p>{chatData?.result}</p>
        </div>
        <div className='counsel-summary'>
          <p>상담 내용 요약</p>
          <div>{chatData?.summary}</div>
        </div>
      </CounselResultSection>
      <CounselChatHistory>
        <div className='title'>대화 내역</div>
        <ChatSection chatSections={chatSections} ref={messagesEndRef} />
      </CounselChatHistory>
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

export default HistoryId;
