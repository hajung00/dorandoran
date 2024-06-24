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
import moment from 'moment';
import useMicDiscription from '@/hooks/useMicDiscription';

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
    cursor: pointer;
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
    cursor: pointer;
  }
`;

interface Props {
  token: string;
}

const Chat = ({ token }: Props) => {
  const router = useRouter();
  const counselId: any = router.query.id!;
  const { enableMicDiscription } = useMicDiscription();

  const { data: chatData, mutate: mutateChat } = useSWR(
    `/api/counsel/proceed/${counselId}`,
    (url) => fetcher(url, token)
  );

  const messagesEndRef = useRef<any>(null);
  const chatSections = makeSection(
    chatData?.messages ? chatData.messages.flat() : []
  );
  const [chatBoxHeight, setChatBoxHeight] = useState(0);

  useEffect(() => {
    enableMicDiscription();
  }, []);

  const [chat, setChat] = useState('');

  const onChangeChat = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  }, []);

  const [isVoice, setIsVoice] = useState(false);
  const onClickVoice = useCallback(() => {
    setIsVoice((prev) => !prev);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const onSubmitForm = useCallback(
    async (chat: string) => {
      setIsLoading((prev) => !prev);

      if (chat.trim() && chatData?.messages) {
        const savedChat = chat;
        mutateChat((prevChatData: any) => {
          prevChatData.messages.push({
            role: '내담자',
            message: savedChat,
            date: moment().format('YYYY-MM-DD'),
          });
          return prevChatData;
        }).then(() => {
          setChat('');
          scrollToBottom();
        });

        const result = await chatCounselAPI(token, counselId, chat);

        if (result) {
          if (isVoice) {
            const utterance = new SpeechSynthesisUtterance(result);
            speechSynthesis.speak(utterance);
          }
          mutateChat((prevChatData: any) => {
            prevChatData.messages.push({
              role: '상담원',
              message: result,
              date: moment().format('YYYY-MM-DD'),
            });
            return prevChatData;
          }).then(() => {
            setChat('');
            scrollToBottom();
            setIsLoading((prev) => !prev);
          });
        }
      }
    },
    [chat, chatData, isVoice]
  );

  const [finishCounselModal, setFinishCounselModal] = useState(false);
  const handleFinishCounselModal = useCallback(() => {
    setFinishCounselModal((prev) => !prev);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData, isVoice, chatBoxHeight]);

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
        isLoading={isLoading}
        isVoice={isVoice}
        chatBoxHeight={chatBoxHeight}
        ref={messagesEndRef}
      />
      {!isVoice ? (
        <ChatBox
          chat={chat}
          onChangeChat={onChangeChat}
          onClickVoice={onClickVoice}
          onSubmitForm={onSubmitForm}
          isLoading={isLoading}
          setChatBoxHeight={setChatBoxHeight}
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
          finishCounselModal={finishCounselModal}
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
