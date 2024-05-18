import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

// import svg
import HashIcon from '../../public/icons/hash.svg';
import DescriptionIcon from '../../public/icons/description.svg';
import FolderIcon from '../../public/icons/folder.svg';
import UserIcon from '../../public/icons/user.svg';

const FooterStyle = styled.footer`
  height: 80px;
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
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 600;
  font-family: 'Pretendard';
  letter-spacing: -0.32px;
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    gap: 6px;
    text-decoration: none;
    color: ${(props) => props.color};
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
            <HashIcon
              width={26}
              height={26}
              alt={'hash'}
              color={`${pathname.includes('/counsel') ? '#5D61EA' : '#898989'}`}
            />
            상담
          </Link>
        </ListStyle>
        <ListStyle
          color={`${pathname.includes('/contents') ? '#5D61EA' : '#898989'}`}
        >
          <Link href='/contents'>
            <DescriptionIcon
              width={26}
              height={26}
              alt={'contents'}
              color={`${
                pathname.includes('/contents') ? '#5D61EA' : '#898989'
              }`}
            />
            콘텐츠
          </Link>
        </ListStyle>
        <ListStyle
          color={`${pathname.includes('/history') ? '#5D61EA' : '#898989'}`}
        >
          <Link href='/history'>
            <FolderIcon
              width={26}
              height={26}
              alt={'user'}
              color={`${pathname.includes('/history') ? '#5D61EA' : '#898989'}`}
            />
            상담내역
          </Link>
        </ListStyle>
        <ListStyle
          color={`${pathname.includes('/mypage') ? '#5D61EA' : '#898989'}`}
        >
          <Link href='/mypage'>
            <UserIcon
              width={26}
              height={26}
              alt={'user'}
              color={`${pathname.includes('/mypage') ? '#5D61EA' : '#898989'}`}
            />
            마이페이지
          </Link>
        </ListStyle>
      </ul>
    </FooterStyle>
  );
};

export default Footer;
