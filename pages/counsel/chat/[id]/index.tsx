import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../../public/icons/arrow.svg';
import ChatSection from '@/components/ChatSection';
import ChatBox from '@/components/ChatBox';
import makeSection from '@/utils/makeSection';
import Layout from '@/components/Layout';
import ChatVoice from '@/components/ChatVoice';
import FinishCounselModal from '@/modal/FinishCounselModal';
import { getCookieValue } from '@/utils/getCookieValue';
import { useRouter } from 'next/router';
import fetcher from '@/utils/fetchers';
import useSWR from 'swr';
import { chatCounselAPI } from '@/pages/api/counsel';

const Header = styled.header`
  padding: 60px 20px 10px 20px;
  color: #222;
  background: var(--gray01, #f7f7f7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;

  .icon-wrapper {
    padding: 9.5px 8px;
  }

  .title {
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
    text-transform: uppercase;
    margin-left: 61px;
  }

  & > button {
    display: flex;
    padding: 6px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: var(--doranblue02, #e1e2ff);
    border: none;
    color: var(--doranblue, #565bff);
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 18px);
    font-weight: 500;
    letter-spacing: -0.36px;
    text-transform: uppercase;
  }
`;

interface Props {
  token: string;
}

const Chat = ({ token }: Props) => {
  const router = useRouter();
  const counselId: any = router.query.id!;
  // const {
  //   data: chatData,
  //   mutate: mutateChat,
  //   revalidate,
  // } = useSWR(`/api/counsel/proceed/${counselId}`, fetcher);

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
  ];

  const setSize = 1;

  const isEmpty = chatData?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData?.length < 20) || false;
  // const scrollbarRef = useRef<Scrollbars>(null);

  const chatSections = makeSection(chatData ? chatData.flat() : []);

  const [chat, setChat] = useState('');

  const onChangeChat = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const onSubmitForm = useCallback(async (chat: string) => {
    console.log('채팅 전송', chat);
    setIsLoading((prev) => !prev);
    // if (chat.trim() && chatData) {
    //   const savedChat = chat;
    //   mutateChat((prevChatData: any) => {
    //     prevChatData.push({
    //       counselId: counselId,
    //       message: savedChat,
    //       date: new Date(),
    //     });
    //     return prevChatData;
    //   }).then(() => {
    //     setIsLoading((prev) => !prev);
    //     setChat('');
    //     scrollbarRef.current?.scrollToBottom();
    //   });

    //   const result = await chatCounselAPI(token, counselId, savedChat);
    //   if (result === 200) {
    //     setIsLoading((prev) => !prev);
    //     revalidate();
    //   }
    // }

    // 채팅 전송 api
    const timer = setTimeout(() => {
      setIsLoading((prev) => !prev);
      setChat('');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const [isVoice, setIsVoice] = useState(false);
  const onClickVoice = useCallback(() => {
    setIsVoice((prev) => !prev);
  }, []);

  const [finishCounselModal, setFinishCounselModal] = useState(false);
  const handleFinishCounselModal = useCallback(() => {
    setFinishCounselModal((prev) => !prev);
  }, []);

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
        <div className='title'>상담 진행중</div>
        <button onClick={handleFinishCounselModal}>상담 종료하기</button>
      </Header>
      <ChatSection
        chatSections={chatSections}
        // ref={scrollbarRef}
        setSize={setSize}
        isReachingEnd={isReachingEnd}
        isLoading={isLoading}
      />
      {!isVoice ? (
        <ChatBox
          chat={chat}
          onChangeChat={onChangeChat}
          onClickVoice={onClickVoice}
          onSubmitForm={onSubmitForm}
          isLoading={isLoading}
        />
      ) : (
        <ChatVoice
          moveChatBox={onClickVoice}
          onSubmitForm={onSubmitForm}
          isLoading={isLoading}
        />
      )}
      {finishCounselModal && (
        <FinishCounselModal
          token={token}
          counselId={counselId}
          onClosed={handleFinishCounselModal}
        />
      )}
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

export default Chat;
