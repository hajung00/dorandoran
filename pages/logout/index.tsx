import React, { useCallback } from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../public/icons/arrow.svg';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { getCookieValue } from '@/utils/getCookieValue';
import { logoutAPI } from '../api/user';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
  }
`;

const Content = styled.div`
  height: calc(100vh - 105px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-30%);

    .icon {
      width: 80px;
      height: 80px;
      background: var(--gray02, #eaeaea);
      margin-bottom: 33px;
    }
    .main-description {
      color: var(--gray09, #222);
      text-align: center;
      font-family: 'Pretendard';
      font-size: 22px;
      font-weight: 600;
      line-height: 150%; /* 33px */
      margin-bottom: 14px;
    }
    .sub-description {
      color: var(--gray06, #898989);
      text-align: center;
      font-family: Pretendard;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 27px */
    }
  }

  & > button {
    width: 100%;
    border-radius: 18px;
    background: #565bff;
    border: none;
    color: #fff;
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.4px;
    position: absolute;
    bottom: 0;
    margin-bottom: 26px;
    padding: 4.5% 0;
  }
`;

interface Props {
  token: string;
}

const Logout = ({ token }: Props) => {
  const router = useRouter();

  const logoutHandler = useCallback(async () => {
    if (token) {
      const result = await logoutAPI(token);
      console.log(result);
      if (result === 200) {
        router.push('/counsel');
      }
    }
  }, [token]);

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.push('/mypage');
          }}
        >
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
        <Content>
          <div className='description'>
            <div className='icon'></div>
            <p className='main-description'>로그아웃 하시겠어요?</p>
            <p className='sub-description'>
              아래 버튼을 누르시면 로그아웃이 완료되고
              <br />
              도란도란 메인화면으로 이동하게돼요.
              <br />
              원치 않으신다면 뒤로가기 버튼을 눌러주세요.
            </p>
          </div>
          <button onClick={logoutHandler}>로그아웃 할게요</button>
        </Content>
      </Header>
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

export default Logout;
