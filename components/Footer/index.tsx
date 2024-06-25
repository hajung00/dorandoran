import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

// import svg
import CircleIcon from '../../public/icons/circle.svg';
import DescriptionIcon from '../../public/icons/description.svg';
import FolderIcon from '../../public/icons/folder.svg';
import UserIcon from '../../public/icons/user.svg';

const FooterStyle = styled.nav`
  height: 74px;
  background: yellow;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 512px;
  z-index: 1000;
  & > ul {
    height: 100%;
    list-style: none;
    display: flex;
    background: #fcfcfc;
    border-top: 0.5px solid #d3d3d3;
  }
`;

const ListStyle = styled.li<{ color: string }>`
  width: calc(100% / 4);
  color: ${(props: any) => props.color};
  font-size: 16px;
  font-weight: 600;
  font-family: 'Pretendard';
  letter-spacing: -0.32px;

  .icon-wrapper {
    padding: 0 8px;
    border-radius: 22px;
    background: ${(props: any) => (props.color === '#5D61EA' ? '#e1e2ff' : '')};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    gap: 6px;
    text-decoration: none;
    color: ${(props: any) => props.color};
  }
`;

const Footer = () => {
  const pathname = useRouter().pathname;
  return (
    <FooterStyle>
      <ul>
        <ListStyle
          color={`${pathname.includes('/counsel') ? '#5D61EA' : '#898989'}`}
        >
          <Link href='/counsel'>
            <div className='icon-wrapper'>
              <CircleIcon
                width={24}
                height={24}
                alt={'hash'}
                color={`${
                  pathname.includes('/counsel') ? '#5D61EA' : '#898989'
                }`}
              />
            </div>
            상담
          </Link>
        </ListStyle>
        <ListStyle
          color={`${pathname.includes('/contents') ? '#5D61EA' : '#898989'}`}
        >
          <Link href='/contents'>
            <div className='icon-wrapper'>
              <DescriptionIcon
                width={26}
                height={26}
                alt={'contents'}
                color={`${
                  pathname.includes('/contents') ? '#5D61EA' : '#898989'
                }`}
              />
            </div>
            콘텐츠
          </Link>
        </ListStyle>
        <ListStyle
          color={`${pathname.includes('/history') ? '#5D61EA' : '#898989'}`}
        >
          <Link href='/history'>
            <div className='icon-wrapper'>
              <FolderIcon
                width={26}
                height={26}
                alt={'user'}
                color={`${
                  pathname.includes('/history') ? '#5D61EA' : '#898989'
                }`}
              />
            </div>
            상담내역
          </Link>
        </ListStyle>
        <ListStyle
          color={`${pathname.includes('/mypage') ? '#5D61EA' : '#898989'}`}
        >
          <Link href='/mypage'>
            <div className='icon-wrapper'>
              <UserIcon
                width={26}
                height={26}
                alt={'user'}
                color={`${
                  pathname.includes('/mypage') ? '#5D61EA' : '#898989'
                }`}
              />
            </div>
            마이페이지
          </Link>
        </ListStyle>
      </ul>
    </FooterStyle>
  );
};

export default Footer;
