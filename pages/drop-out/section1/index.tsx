import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styled from 'styled-components';

// import svg
import Layout from '@/components/Layout';

// import components
import Header from '@/components/Header';
import Button from '@/components/Button';

// import api
import { dropOutAPI } from '@/pages/api/user';

// import hooks
import fetcher from '@/utils/fetchers';
import { getCookieValue } from '@/utils/getCookieValue';

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 12.5%;

  .title {
    margin-top: 24px;
    color: var(--gray09, #222);
    font: var(--Pretendard--26-600);

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 22px;
      background: #f7f7f7;
      position: absolute;
      left: 0;
      margin-top: 24px;
      margin-bottom: 30px;
    }
  }

  .description {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: start;
    margin-top: 76px;
    font-family: 'Pretendard';

    .main-description {
      color: var(--gray09, #222);
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 12px;
      line-height: 150%;
    }
    .sub-description {
      color: var(--gray06, #898989);
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 14px;
      line-height: 150%;
    }
  }
`;

interface Props {
  token: string;
}

const DropOut1 = ({ token }: Props) => {
  const router = useRouter();
  const { data: userData } = useSWR('/api/mypage/main', (url) =>
    fetcher(url, token)
  );

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  // 회원 탈퇴 클릭 이벤트
  const DropOutHandler = useCallback(async () => {
    if (token) {
      const result = await dropOutAPI(token);
      if (result === 200) {
        router.push('/drop-out/section2');
      }
    }
  }, [token]);

  return (
    <Layout>
      <Header type={'prev'} />
      <Content>
        <div className='title'>
          {userData?.name}님,
          <br />
          헤어져야한다니 아쉬워요.
        </div>
        <div className='description'>
          <p className='main-description'>도란도란을 탈퇴하시게 되면,</p>
          <p className='sub-description'>
            도란도란에서 그동안 상담하셨던 내역들과
            <br />
            심리검사 결과 및 변화추이들이 모두 사라져요.
            <br />
          </p>
          <p className='sub-description'>정말 탈퇴하시겠어요?</p>
        </div>
        <Button text='탈퇴할게요' type={true} onClick={DropOutHandler} />
      </Content>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;

  return {
    props: {
      token,
    },
  };
};

export default DropOut1;
