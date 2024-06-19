import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import Layout from '@/components/Layout';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
  }
`;

const ContentWrapper = styled.div`
  .content-text {
    padding: 0 20px;
    margin-top: 14.8%;
    .title {
      margin-bottom: 8px;
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: clamp(22px, 6vw, 26px);
      font-style: normal;
      font-weight: 600;
      line-height: 140%; /* 36.4px */
    }

    .description {
      margin-bottom: 42px;
      color: var(--gray07, #666);
      font-family: 'Pretendard';
      font-size: clamp(16px, 5vw, 20px);
      font-style: normal;
      font-weight: 400;
      line-height: 140%; /* 28px */
    }
  }

  .content {
    height: 290px;
    background: var(--gray01, #f7f7f7);
  }

  .content-title {
    margin-top: 18px;
    padding: 0 20px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(16px, 5vw, 20px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

interface Props {
  time: string;
}

const MeditationContent = ({ time }: Props) => {
  const router = useRouter();

  const [contentLink, setContentLink] = useState('');
  useEffect(() => {
    switch (time) {
      case '3분':
        setContentLink('https://www.youtube.com/embed/L_xmM9_iRJQ');
        break;
      case '5분':
        setContentLink('https://www.youtube.com/embed/I0ypGCXTGww');
        break;
      case '10분':
        setContentLink('https://www.youtube.com/embed/6fKph4n74Rg');
        break;
      case '30분':
        setContentLink('https://www.youtube.com/embed/0hNDg7s4K-0');
        break;
      case '1시간':
        setContentLink('https://www.youtube.com/embed/cu8irdThyJE');
        break;
    }
  }, [time]);

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.push('/contents');
          }}
        >
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
      </Header>
      <ContentWrapper>
        <div className='content-text'>
          <p className='title'>{time} 명상</p>
          <p className='description'>
            눈을 감고 편안하게 명상을 진행해보세요.
            <br />
            화면은 잠시 꺼두어도 좋아요.
          </p>
        </div>
        <div className='content'>
          <iframe
            width={'100%'}
            height='290'
            src={contentLink}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
        <p className='content-title'>영상 유튜브 제목</p>
      </ContentWrapper>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const time = context.query.time;
  return {
    props: {
      time,
    },
  };
};

export default MeditationContent;
