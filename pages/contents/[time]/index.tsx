import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// import components
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Description from '@/components/Description';

const Content = styled.div`
  padding: 0 20px;

  .description {
    margin-top: 15.1%;!important;
  }

  .content {
    width: 100vw;
    transform: translateX(-20px);
    max-width: 512px;
    margin-top: 42px;
  }

  .content-title {
    margin-top: 18px;
    margin-bottom: 50px;
    color: var(--gray09, #222);
    font: var(--Pretendard--20-600);
  }
`;

interface Props {
  time: string;
}

const MeditationContent = ({ time }: Props) => {
  const [contentLink, setContentLink] = useState('');
  const [contentTitle, setContentTitle] = useState('');

  useEffect(() => {
    switch (time) {
      case '3':
        setContentLink('https://www.youtube.com/embed/ClrNeM9528A');
        setContentTitle(
          '[아침 3분 명상] ‘~해야만 하는 것’은 없어요. | 동기부여 · 마음챙김 · 짧은명상'
        );
        break;
      case '5':
        setContentLink('https://www.youtube.com/embed/zGifCNokUy8');
        setContentTitle('아침에 하는 5분 긍정확언 (아침 확언 명상)');
        break;
      case '10':
        setContentLink('https://www.youtube.com/embed/7lKI_XVHh_Q');
        setContentTitle(
          '10분만에 마음을 다스리는 법 | 마음챙김 명상, 알아차림, 생각 비우기'
        );
        break;
      case '30':
        setContentLink('https://www.youtube.com/embed/vvHy990p844');
        setContentTitle('윤홍식의 몰라명상_30분');
        break;
      case '60':
        setContentLink('https://www.youtube.com/embed/_wPs5MLzqwY');
        setContentTitle(
          '☯ [미라클모닝] 매일아침 하루 운이 좋아지는 아침명상▶오늘하루가 180도 바뀌는 감사명상 [리뉴얼] 하루를 시작하는 아침루틴 "매일매일 아침마다 모든 것이 좋아진다" [60분]'
        );
        break;
    }
  }, [time]);

  return (
    <Layout>
      <Header type={'prev'} />
      <Content>
        <Description
          desc={`${time}분 명상`}
          subDesc='눈을 감고 편안하게 명상을 진행해보세요.
            <br />
            화면은 잠시 꺼두어도 좋아요.'
        />
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
        <p className='content-title'>{contentTitle}</p>
      </Content>
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
