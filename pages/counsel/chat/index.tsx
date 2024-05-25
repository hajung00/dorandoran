import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import ChatSection from '@/components/ChatSection';
import ChatBox from '@/components/ChatBox';
import makeSection from '@/utils/makeSection';
import Layout from '@/components/Layout';
import ChatVoice from '@/components/ChatVoice';
import FinishCounselModal from '@/modal/FinishCounselModal';

const Header = styled.header`
  padding: 60px 20px 10px 20px;
  color: #222;
  background: var(--gray01, #f7f7f7);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon-wrapper {
    padding: 9.5px 8px;
  }

  .title {
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: 20px;
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
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.36px;
    text-transform: uppercase;
  }
`;

const Chat = () => {
  const chatData = [
    {
      content: '나는 gpt',
      createdAt: '2024-05-24T13:03:34.000Z',
      type: 'receiver',
    },
    {
      content: '나는 하정이',
      createdAt: '2024-05-24T13:03:34.000Z',
      type: 'sender',
    },
  ];
  const setSize = 1;

  //   const {
  //     data: chatData,
  //     mutate: mutateChat,
  //     revalidate,
  //     setSize,
  //   } = useSWRInfinite<IDM[]>(
  //     (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
  //     fetcher,
  //   );

  const isEmpty = chatData?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData?.length < 20) || false;
  const scrollbarRef = useRef<Scrollbars>(null);

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []); // 기존 데이터 변경하는 것이 아닌 복제된 데이터를 변경하여 사용

  const [chat, setChat] = useState('');

  const onChangeChat = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const onSubmitForm = useCallback((chat: string) => {
    console.log('채팅 전송', chat);
    setIsLoading((prev) => !prev);

    // 채팅 전송 api
    const timer = setTimeout(() => {
      setIsLoading((prev) => !prev);
      setChat('');
    }, 3000);

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
        <div className='icon-wrapper'>
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
        <div className='title'>상담 진행중</div>
        <button onClick={handleFinishCounselModal}>상담 종료하기</button>
      </Header>
      <ChatSection
        chatSections={chatSections}
        ref={scrollbarRef}
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
        <ChatVoice moveChatBox={onClickVoice} onSubmitForm={onSubmitForm} />
      )}
      {finishCounselModal && (
        <FinishCounselModal onClosed={handleFinishCounselModal} />
      )}
    </Layout>
  );
};

export default Chat;
