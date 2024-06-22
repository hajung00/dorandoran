'use client';

import Layout from '@/components/Layout';
import Lottie from 'lottie-react';
import Cookies from 'js-cookie';
import SplashAnimation from '../public/animation/splash.json';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SplashStyle = styled.div<{ opacity: number }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 18px;
  opacity: ${(props) => `${props.opacity}%`};

  & > p {
    color: var(--gray09, #222);
    text-align: center;
    font-family: 'Pretendard';
    font-size: clamp(24px, 6vw, 28px);
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 39.2px */
    letter-spacing: -0.56px;
  }
`;

const Splash = () => {
  const router = useRouter();
  const [opacity, setOpacity] = useState(105);

  useEffect(() => {
    const onboardingVisited = Cookies.get('onboarding_visited');

    if (opacity > 90) {
      const timer1 = setTimeout(() => {
        setOpacity(opacity - 1);
        clearTimeout(timer1);
      }, 140);
    } else if (opacity > 5) {
      const timer2 = setTimeout(() => {
        setOpacity(opacity - 8);
        clearTimeout(timer2);
      }, 70);
    }

    if (opacity == 10) {
      if (onboardingVisited) {
        router.push('/counsel');
      } else {
        router.push('/onboarding');
      }
    }
  }, [opacity]);

  return (
    <Layout>
      <SplashStyle opacity={opacity}>
        <p>
          들어줄게요.
          <br />
          당신이 괜찮아 질 때까지
        </p>
        <Lottie
          style={{ width: '175px', height: '86px' }}
          animationData={SplashAnimation}
        />
      </SplashStyle>
    </Layout>
  );
};

export default Splash;
