import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';

// import svg
import MicSVG from '../../public/icons/mic.svg';
import SendSVG from '../../public/icons/send.svg';
import { getCookieValue } from '@/utils/getCookieValue';
import useMicDiscription, {
  SHOW_DESCRIPTION_KEY,
} from '@/hooks/useMicDiscription';
import useSWR from 'swr';

const ChatBoxStyle = styled.div`
  width: 100%;
  padding: 16px 20px 30px 20px;
  display: flex;
  gap: 12px;
  position: fixed;
  bottom: 0;
  max-width: 512px;
  background: #fff;
  z-index: 999;
  align-items: end;

  .icon-wrapper {
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 109.091px;
    background: var(--gray02, #eaeaea);
    cursor: pointer;
  }

  .chat-send-wrapper {
    width: calc(100% - 60px);
    position: relative;
    display: flex;
    align-items: end;
    gap: 13px;

    & > textarea {
      width: 100%;
      height: 56px;
      max-height: 200px;
      padding: 16px 14px;
      padding-right: 63px;
      border-radius: 16px;
      background: var(--gray01, #f7f7f7);
      outline: none;
      border: none;
      color: var(--gray06, #898989);
      font-family: 'Pretendard';
      font-size: clamp(18px, 4vw, 20px);
      font-weight: 400;
      letter-spacing: -0.4px;
      text-transform: uppercase;
      white-space: pre-wrap;
      resize: none;
    }

    & > button {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 150px;
      background: var(--doranblue, #565bff);
      position: absolute;
      right: 14px;
      border: none;
      cursor: pointer;
      margin-bottom: 10px;
    }
  }
`;

interface Props {
  chat: string;
  onChangeChat: (e: any) => void;
  onClickVoice: (e: any) => void;
  onSubmitForm: (e: any) => void;
  isLoading: boolean;
  setChatBoxHeight: Dispatch<SetStateAction<any>>;
}

const Description = () => {
  const DescriptionStyle = styled.div`
    position: absolute;
    top: -45px;
    left: 20px;

    .text {
      padding: 12px;
      border-radius: 4px;
      background: var(--doranblue, #565bff);
      color: var(--white, #fff);
      font-family: Pretendard;
      font-size: clamp(14px, 4vw, 18px);
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.36px;
      text-transform: uppercase;
    }

    & > svg {
      position: absolute;
      bottom: -10px;
      left: 16px;
    }
  `;
  return (
    <DescriptionStyle>
      <div className='text'>음성인식도 가능해요!</div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='11'
        viewBox='0 0 14 11'
        fill='none'
      >
        <path
          d='M7.86603 10.5C7.48112 11.1667 6.51888 11.1667 6.13397 10.5L0.937822 1.5C0.552922 0.833332 1.03405 -1.22094e-06 1.80385 -1.15364e-06L12.1962 -2.4512e-07C12.966 -1.77822e-07 13.4471 0.833333 13.0622 1.5L7.86603 10.5Z'
          fill='#565BFF'
        />
      </svg>
    </DescriptionStyle>
  );
};

const ChatBox = ({
  chat,
  onChangeChat,
  onClickVoice,
  onSubmitForm,
  isLoading,
  setChatBoxHeight,
}: Props) => {
  const { enableMicDiscription, disableMicDiscription } = useMicDiscription();
  const { data: showdiscription } = useSWR(SHOW_DESCRIPTION_KEY);

  const removeDescription = useCallback(() => {
    disableMicDiscription();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
        console.log(chat);
        event.preventDefault();
        onSubmitForm(chat);
        textarea.style.height = '56px';
        setChatBoxHeight(0);
      }
    },
    [chat]
  );

  const textareaRef = useRef<any>(null);
  const textarea = textareaRef.current;

  const adjustHeight = () => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setChatBoxHeight(textarea.scrollHeight - 56);
  };

  useEffect(() => {
    if (chat) adjustHeight();
  }, [chat]);

  return (
    <ChatBoxStyle>
      {showdiscription && <Description />}
      <div className='icon-wrapper' onClick={onClickVoice}>
        <MicSVG
          width={15}
          height={21}
          alt={'mic'}
          color={'#666666'}
          stroke={'#666666'}
        />
      </div>
      <div className='chat-send-wrapper'>
        <textarea
          ref={textareaRef}
          value={chat}
          onChange={onChangeChat}
          onKeyDown={handleKeyDown}
          placeholder={
            isLoading
              ? 'AI의 답변을 기다리는 중이에요.'
              : '메세지를 입력해주세요.'
          }
          onFocus={removeDescription}
          rows={1}
        />
        <button
          onClick={() => {
            onSubmitForm(chat);
            textarea.style.height = '56px';
            setChatBoxHeight(0);
          }}
        >
          <SendSVG width={11} height={16} alt={'send'} color={'#fff'} />
        </button>
      </div>
    </ChatBoxStyle>
  );
};

export default ChatBox;
