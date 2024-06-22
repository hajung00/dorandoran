'use client';
import Image from 'next/image';
import Layout from '../../components/Layout';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import OnBoarding1 from '../../public/image/onboarding/onboarding_1.png';
import OnBoarding2 from '../../public/image/onboarding/onboarding_2.png';
import OnBoarding3 from '../../public/image/onboarding/onboarding_3.png';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from 'styled-components';

const OnBoardingStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
`;
const SwiperCustom = styled(Swiper)`
  width: 100%;
  height: calc(100vh - 134px);
  .swiper-scrollbar,
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding-top: 39.7%;
  }

  .swiper-pagination-horizontal {
    top: 17.05%;
    height: 14px;
    display: flex;
    gap: 20px;
    justify-content: center;
  }
  .swiper-pagination-bullet {
    width: 14px;
    height: 14px;
  }
  .swiper-pagination-bullet-active {
    background: #565bff;
  }

  color: var(--gray09, #222);
  text-align: center;
  font-family: 'Pretendard';
  font-size: clamp(22px, 5vw, 24px);
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 33.6px */
  letter-spacing: -0.48px;

  .img-wrapper {
    width: 80%;
    height: 86%;
    margin-top: 6%;

    & > img {
      height: auto;
      width: 83%;
    }
  }
`;

const ButtonSection = styled.div`
  height: 261px;
  padding: 0 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(252, 252, 252, 0.8) 32.08%,
    #fcfcfc 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
`;

const StartButton = styled.button`
  width: calc(100% - 40px);
  border-radius: 18px;
  background: #565bff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4.11% 0;
  border: none;
  color: #fff;
  font-family: 'Pretendard';
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.4px;
  cursor: pointer;
  position: absolute;
  bottom: 26.2%;
  left: 20px;
`;

const OnBoarding = () => {
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const onboardingVisited = Cookies.get('onboarding_visited');
    if (!onboardingVisited) {
      Cookies.set('onboarding_visited', 'true', { expires: 30 }); // 만료 날짜를 30일로 설정
    }
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const onClickHandler = () => {
    if (activeIndex == 2) {
      router.push('/counsel');
    } else if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <Layout>
      <OnBoardingStyle>
        <SwiperCustom
          ref={swiperRef}
          modules={[Pagination]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={handleSlideChange}
        >
          <SwiperSlide>
            나만의 특별한 사연으로
            <br />
            이야기를 나눠요.
            <div className='img-wrapper'>
              <Image src={OnBoarding1} alt='onboarding-img' />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            상담 후 변동된 나의 심리변화들을
            <br />
            확인할 수 있어요.
            <div className='img-wrapper'>
              <Image src={OnBoarding2} alt='onboarding-img' />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            더 나은 나를 위해 다양한
            <br />
            맞춤 컨텐츠들로 마음을 다스려요.
            <div className='img-wrapper'>
              <Image src={OnBoarding3} alt='onboarding-img' />
            </div>
          </SwiperSlide>
        </SwiperCustom>
        <ButtonSection>
          <StartButton onClick={onClickHandler}>
            {activeIndex !== 2 ? '다음' : '시작하기'}
          </StartButton>
        </ButtonSection>
      </OnBoardingStyle>
    </Layout>
  );
};

export default OnBoarding;
