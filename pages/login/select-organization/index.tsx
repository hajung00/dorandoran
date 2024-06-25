'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styled from 'styled-components';

// import svg
import ArrowUp from '../../../public/icons/chevron-up.svg';
import ArrowDown from '../../../public/icons/chevron-down.svg';

// import components
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Description from '@/components/Description';
import Button from '@/components/Button';

// import hooks
import { getCookieValue } from '@/utils/getCookieValue';
import useUserAccount, { USER_ACCOUNT_KEY } from '@/hooks/useUserAccount';

const Content = styled.div`
  padding: 0 20px;
  margin-top: 22px;
  margin-bottom: 12.5%;
`;

const SelectSection = styled.div`
  margin-top: 44px;
  margin-bottom: 121%;
  cursor: pointer;
  & > p {
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.36px;
    margin-bottom: 14px;
  }
  .select ul {
    display: none;
  }

  .select.active ul {
    display: initial;
  }

  .select {
    display: inline-block;
    width: 100%;
    border-radius: 18px;
    border: 1px solid var(--gray04, #d9d9d9);
  }

  .select .selected {
    display: flex;
    justify-content: space-between;
    padding: 4.5% 4.3%;
  }

  .select .selected .selected-value {
    color: var(--gray08, #444);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.4px;
  }

  .select ul {
    width: calc(100% - 40px);
    max-height: 36.7%;
    overflow: auto;
    border: 1px solid var(--gray04, #d9d9d9);
    position: absolute;
    margin: 1px 0 0 -1px;
    cursor: pointer;
    margin-top: 18px;
    border-radius: 18px;
  }

  .select ul li {
    padding: 4.5% 4.3%;
    color: var(--gray08, #444);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.4px;
    border-bottom: 1px solid var(--gray04, #d9d9d9);
  }
  .select ul li,
  .select .selected .selected-value {
    white-space: nowrap; /* 줄바꿈 안함 */
    overflow: hidden;
    text-overflow: ellipsis; /* 말줄임 적용 */
  }
  .true {
    border-radius: 18px;
    border: 1px solid var(--doranblue, #565bff);
  }
  .select ul li:hover,
  .seleted-list {
    background: rgba(168, 156, 235, 0.35);
  }
`;
interface Props {
  token: string;
  organizationList: { [key: string]: string }[];
}

const SelectOrganization = ({ token, organizationList }: Props) => {
  const router = useRouter();
  const { data: account } = useSWR(USER_ACCOUNT_KEY); // 사용자 이름, 핸드폰 번호
  const { initializeUserAccount } = useUserAccount();

  const [toggle, setToggle] = useState(false); // select box toggle
  const [selectedKo, setSelectedKo] = useState('소속기관을 선택해주세요.');
  const [selectedEn, setSelectedEn] = useState('');
  const [enableButton, setEnableButton] = useState(false); // 버튼 활성화 여부

  // 이미 로그인한 경우 상담페이지로 이동
  useEffect(() => {
    if (token) {
      router.push('/counsel');
    }
  }, [token]);

  // 리스트 선택 이벤트
  const selectListHandler = useCallback((list: { [key: string]: string }) => {
    setSelectedKo(list.ko);
    setSelectedEn(list.en);
  }, []);

  // 선택한 리스트 있는 경우 버튼 활성화
  useEffect(() => {
    if (selectedEn) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [selectedEn]);

  // 선택 완료 클릭 이벤트
  const onClickCompelete = useCallback(() => {
    // 개인정보에 소속기관 전역으로 추가
    if (enableButton) {
      const addedInfo = { ...account };
      addedInfo.userAgency = selectedEn;
      initializeUserAccount(addedInfo);
      router.push('/login/agreement');
    }
  }, [enableButton, account, selectedEn]);

  return (
    <Layout>
      <Header type={'prev'} />
      <Content>
        <Description
          desc={'소속 기관을 선택해주세요.'}
          subDesc={
            '현재 속해있는 기관이 있으시다면 선택해주세요.<br />없으시다면 무소속으로 선택해주세요.'
          }
        />
        <SelectSection
          className={`${toggle ? 'active' : ''}`}
          onClick={() => {
            setToggle((prev) => !prev);
          }}
        >
          <p>소속기관</p>
          <div className={`select ${toggle ? 'active' : ''}`}>
            <div className={`selected ${selectedEn ? 'true' : ''}`}>
              <div className='selected-value'>{selectedKo}</div>
              {toggle ? (
                <ArrowUp width={24} height={24} alt={'list-up'} />
              ) : (
                <ArrowDown width={24} height={24} alt={'list-down'} />
              )}
            </div>
            <ul>
              {organizationList.map((list, i) => (
                <li
                  key={i}
                  className={`option ${
                    selectedKo === list.ko ? 'seleted-list' : ''
                  }`}
                  value={list.en}
                  onClick={() => {
                    selectListHandler(list);
                  }}
                >
                  {list.ko}
                </li>
              ))}
            </ul>
          </div>
        </SelectSection>
        <Button
          text='선택완료'
          type={enableButton}
          onClick={onClickCompelete}
        />
      </Content>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;

  const organizationList = (
    await import('../../../public/organization_list/organization_list.json')
  ).default; // 소속기관 list

  return {
    props: {
      token,
      organizationList,
    },
  };
};

export default SelectOrganization;
