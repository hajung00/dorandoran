import React, { useState } from 'react';
import styled from 'styled-components';

// import svg
import MicSVG from '../../public/icons/mic.svg';
import SendSVG from '../../public/icons/send.svg';

const ChatBoxStyle = styled.div`
  width: 100%;
  padding: 16px 20px 30px 20px;
  display: flex;
  gap: 12px;
  position: relative;

  .icon-wrapper {
    display: flex;
    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 109.091px;
    background: var(--gray02, #eaeaea);
  }

  .chat-send-wrapper {
    width: calc(100% - 60px);
    position: relative;
    display: flex;
    align-items: center;
    gap: 13px;

    & > input {
      width: 100%;
      height: 100%;
      padding: 10px 14px;
      border-radius: 16px;
      background: var(--gray01, #f7f7f7);
      outline: none;
      border: none;
      color: var(--gray06, #898989);
      font-family: 'Pretendard';
      font-size: 20px;
      font-weight: 400;
      letter-spacing: -0.4px;
      text-transform: uppercase;
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
    }
  }
`;

interface Props {
  chat: string;
  onChangeChat: (e: any) => void;
  onClickVoice: (e: any) => void;
  onSubmitForm: (e: any) => void;
  isLoading: boolean;
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
      font-size: 18px;
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
}: Props) => {
  const [description, setDescription] = useState(true);

  return (
    <ChatBoxStyle>
      {description && <Description />}
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
        <input
          type='text'
          value={isLoading ? 'AI의 답변을 기다리는 중이에요.' : chat}
          onChange={onChangeChat}
          placeholder='메세지를 입력해주세요.'
          onFocus={() => {
            setDescription(false);
          }}
        />
        <button
          onClick={() => {
            onSubmitForm(chat);
          }}
        >
          <SendSVG width={11} height={16} alt={'send'} color={'#fff'} />
        </button>
      </div>
    </ChatBoxStyle>
  );
};

export default ChatBox;
