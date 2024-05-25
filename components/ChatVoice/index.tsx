import 'regenerator-runtime/runtime';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

// import svg
import MicSVG from '../../public/icons/mic.svg';
import XSVG from '../../public/icons/x.svg';
import SendSVG from '../../public/icons/send.svg';

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
`;

const ChatVoiceStart = styled.div<{ display: string }>`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  position: relative;
  padding-bottom: 9.8%;
  padding-top: 22px;

  .text {
    visibility: ${(props: any) =>
      props.display === 'true' ? 'hidden' : 'visible'};
    position: absolute;
    padding: 12px 18px;
    top: -45px;
    left: 50%;
    transform: translate(-50%, 0%);
    border-radius: 100px;
    border: 1px solid var(--doranblue02, #e1e2ff);
    background: var(--white, #fff);
    olor: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.4px;
    text-transform: uppercase;
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
  }
  .cancel {
    visibility: ${(props: any) =>
      props.display === 'true' ? 'hidden' : 'visible'};
    width: 19.5%;
    aspect-ratio: 1 / 1;
    background: #ffdcdc;
  }
  .mic {
    width: 29.2%;
    aspect-ratio: 1 / 1;
    background: var(
      --gradient,
      linear-gradient(315deg, #565bff 0%, #bcbeff 100%)
    );
  }
  .send {
    visibility: ${(props: any) =>
      props.display === 'true' ? 'hidden' : 'visible'};
    width: 19.5%;
    aspect-ratio: 1 / 1;
    background: var(--doranblue02, #e1e2ff);
  }
  .move-chat-box {
    visibility: ${(props: any) =>
      props.display === 'true' ? 'visible' : 'hidden'};
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
  }
`;

interface Props {
  moveChatBox: () => void;
  onSubmitForm: (e: any) => void;
}
const ChatVoice = ({ moveChatBox, onSubmitForm }: Props) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleListen = useCallback(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('음성 인식이 지원되지 않는 브라우저입니다.');
      return;
    }
    SpeechRecognition.startListening();
  }, []);

  const handleFormSend = useCallback(() => {
    onSubmitForm(transcript);
    resetTranscript();
  }, []);

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  console.log(transcript, listening);
  return (
    <ChatVoiceStyle>
      <ChatVoiceStart display={`${!listening}`}>
        <div className='text'>{transcript ? transcript : '듣고 있어요'}</div>
        <div className='icon-wrapper'>
          <div
            className='cancel wrapper'
            onClick={() => {
              handleStop();
            }}
          >
            <XSVG width={21} height={21} alt={'cancel'} color={'#FF2020'} />
          </div>
          <div className='mic wrapper' onClick={handleListen}>
            <MicSVG width={32} height={47} alt={'mic'} color={'#FFFFFF'} />
          </div>
          <div className='send wrapper' onClick={handleFormSend}>
            <SendSVG width={20} height={30} alt={'send'} color={'#565BFF'} />
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
