'use client';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { SayButton } from 'react-say';
import Layout from '@/components/Layout';
import Lottie from 'lottie-react';
import animationData from '../../public/test.json'; // 애니메이션 파일의 경로

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

  const chat = '안녕하세요';

  return (
    <Layout>
      <Lottie animationData={animationData} />
      <div>
        <SayButton text={transcript}>{transcript}</SayButton>
        <p>{listening && '음성 인식 중'}</p>
        <button onClick={handleListen}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
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
