'use client';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { SayButton } from 'react-say';
import Layout from '@/components/Layout';
import Lottie from 'lottie-react';
import animationData from '../../public/test.json';
import { useCallback, useEffect, useState } from 'react';

const Chat = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleListen = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert('음성 인식이 지원되지 않는 브라우저입니다.');
      return;
    }
    SpeechRecognition.startListening();
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
  };

  const [timeLeft, setTimeLeft] = useState(5);
  const [clickRequest, setClickRequest] = useState(false);
  const onClickHandler = useCallback(() => {
    setClickRequest((prev) => !prev);
  }, []);

  useEffect(() => {
    if (clickRequest && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [clickRequest, timeLeft]);

  return (
    <Layout>
      <Lottie animationData={animationData} />
      <div>
        <SayButton text={'안녕하세요'}>안녕하세요</SayButton>
        <p>{listening && '음성 인식 중'}</p>
        <button onClick={handleListen}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        <button onClick={onClickHandler}>인증번호 요청 {timeLeft}</button>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  console.log('chat');

  // 유저가 좋아요 누른 카페 정보 api
  const user = true;

  return {
    props: {
      user,
    },
  };
};

export default Chat;
