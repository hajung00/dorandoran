'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// import svg
import ArrowIcon from '../../../public/icons/arrow.svg';
import ArrowUp from '../../../public/icons/chevron-up.svg';
import ArrowDown from '../../../public/icons/chevron-down.svg';

// import components
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useUserAccount, { USER_ACCOUNT_KEY } from '@/hooks/useUserAccount';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    display: inline-block;
    padding: 12px 8px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 0 20px;
  margin-top: 22px;
  margin-bottom: 12.5%;

  .description {
    color: #222;
    font-family: 'Pretendard';
    font-size: clamp(20px, 6vw, 26px);
    font-weight: 600;
  }

  .sub-description {
    margin-top: 12px;
    margin-bottom: 48px;
    color: #666;
    font-family: 'Pretendard';
    font-size: clamp(16px, 5vw, 20px);
    font-weight: 400;
  }

  & > button {
    width: 100%;
    padding: 4.5%;
    border-radius: 18px;
    background: #e3e3e3;
    border: none;
    color: #b2b2b2;
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }

  .enable {
    background: var(--doranblue, #565bff);
    color: var(--white, #fff);
    cursor: pointer;
  }
`;

const SelectSection = styled.div`
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
  organizationList: { [key: string]: string }[];
}

const SelectOrganization = ({ organizationList }: Props) => {
  const router = useRouter();
  const { data: account } = useSWR(USER_ACCOUNT_KEY);
  const { initializeUserAccount } = useUserAccount();

  const [toggle, setToggle] = useState(false);
  const [selectedKo, setSelectedKo] = useState('소속기관을 선택해주세요.');
  const [selectedEn, setSelectedEn] = useState('');
  const [enableButton, setEnableButton] = useState(false);

  console.log('account', account);

  const selectListHandler = useCallback((list: { [key: string]: string }) => {
    setSelectedKo(list.ko);
    setSelectedEn(list.en);
  }, []);

  useEffect(() => {
    if (selectedEn) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  }, [selectedEn]);

  const onClickCompelete = useCallback(() => {
    if (enableButton) {
      const addedInfo = { ...account };
      addedInfo.userAgency = selectedEn;
      initializeUserAccount(addedInfo);
      router.push('/login/agreement');
    }
  }, [enableButton, account, selectedEn]);

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.back();
          }}
        >
          <ArrowIcon width={21} height={21} alt={'cancel'} stroke={'#666666'} />
        </div>
      </Header>
      <Content>
        <p className='description'>소속 기관을 선택해주세요.</p>
        <p className='sub-description'>
          현재 속해있는 기관이 있으시다면 선택해주세요.
          <br />
          없으시다면 무소속으로 선택해주세요.
        </p>
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
        <button
          className={`${enableButton ? 'enable' : 'disable'}`}
          onClick={onClickCompelete}
        >
          선택완료
        </button>
      </Content>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const organizationList = (
    await import('../../../public/organization_list/organization_list.json')
  ).default;

  return {
    props: {
      organizationList,
    },
  };
};

export default SelectOrganization;
