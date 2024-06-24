import 'regenerator-runtime/runtime';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import Lottie from 'lottie-react';

// import svg
import MicSVG from '../../public/icons/mic.svg';
import XSVG from '../../public/icons/x.svg';
import SendSVG from '../../public/icons/send.svg';

// import animation
import RecordingAnimation from '../../public/animation/recording.json';

const ChatVoiceStyle = styled.div`
  background: var(
    --gradient2,
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(239, 239, 255, 0.54) 50%,
      #d4d5ff 100%
    )
  );
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 512px;
`;

const ChatVoiceStart = styled.div<{ display: string; opacity: string }>`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  position: relative;
  padding-bottom: 9.8%;
  padding-top: 22px;

  .loading-text {
    display: ${(props: any) => (props.opacity === 'true' ? 'block' : 'none')};
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
  }

  .text {
    display: ${(props: any) => (props.display === 'true' ? 'none' : 'block')};
    padding: 12px 18px;
    border-radius: 16px;
    border: 1px solid var(--doranblue02, #e1e2ff);
    background: var(--white, #fff);
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.4px;
    text-transform: uppercase;
    min-width: min-content;
    max-width: 448px;
    min-height: 48px;
    max-height: 360px;
  }

  .icon-wrapper {
    width: 100%;
    display: flex;
    padding: 0 81px;
    justify-content: space-between;
    align-items: center;
  }
  .wrapper {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .cancel {
    visibility: ${(props: any) =>
      props.display === 'true' ? 'hidden' : 'visible'};
    width: 19.5%;
    aspect-ratio: 1 / 1;
    background: #ffdcdc;
    & > svg {
      width: 32%;
      height: auto;
    }
  }
  .mic {
    width: 29.2%;
    aspect-ratio: 1 / 1;
    background: var(
      --gradient,
      linear-gradient(315deg, #565bff 0%, #bcbeff 100%)
    );
    opacity: ${(props: any) => (props.opacity === 'true' ? '0.3' : '1')};
    & > svg {
      width: 32%;
      height: auto;
    }
  }
  .send {
    visibility: ${(props: any) =>
      props.display === 'true' ? 'hidden' : 'visible'};
    width: 19.5%;
    aspect-ratio: 1 / 1;
    background: var(--doranblue02, #e1e2ff);
    & > svg {
      width: 32%;
      height: auto;
    }
  }
  .move-chat-box {
    visibility: ${(props: any) =>
      props.display === 'true' ? 'visible' : 'hidden'};
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
    cursor: pointer;
  }
`;

interface Props {
  moveChatBox: () => void;
  onSubmitForm: (e: any) => void;
  isLoading: boolean;
}
const ChatVoice = ({ moveChatBox, onSubmitForm, isLoading }: Props) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleListen = useCallback(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('음성 인식이 지원되지 않는 브라우저입니다.');
      return;
    }
    SpeechRecognition.startListening();
    if (listening) {
      handleStop();
    }
  }, [listening]);

  const handleFormSend = useCallback(() => {
    onSubmitForm(transcript);
    handleStop();
    resetTranscript();
  }, [transcript]);

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <ChatVoiceStyle>
      <ChatVoiceStart
        display={`${!(listening || transcript)}`}
        opacity={`${isLoading}`}
      >
        <div className='loading-text'>상담원의 답변을 기다리는 중이에요.</div>
        <div className='text'>{transcript ? transcript : '듣고 있어요'}</div>
        <div className='icon-wrapper'>
          <div
            className='cancel wrapper'
            onClick={() => {
              handleStop();
              resetTranscript();
            }}
          >
            <XSVG alt={'cancel'} color={'#FF2020'} />
          </div>
          <div className='mic wrapper' onClick={handleListen}>
            {listening ? (
              <Lottie
                style={{ width: 200 }}
                animationData={RecordingAnimation}
              />
            ) : (
              <MicSVG alt={'mic'} color={'#FFFFFF'} />
            )}
          </div>
          <div className='send wrapper' onClick={handleFormSend}>
            <SendSVG alt={'send'} color={'#565BFF'} />
          </div>
        </div>
        <div className='move-chat-box' onClick={moveChatBox}>
          메세지 입력창으로 돌아가기
        </div>
      </ChatVoiceStart>
    </ChatVoiceStyle>
  );
};

export default ChatVoice;
