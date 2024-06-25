import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import styled from 'styled-components';

// import svg
import XIcon from '../../public/icons/x.svg';
import ArrowIcon from '../../public/icons/arrow.svg';

const HeaderStyle = styled.section`
  padding: 60px 20px 0 20px;

  .icon-wrapper {
    display: inline-block;
    padding: 12px 8px;
    cursor: pointer;
  }
`;

interface Props {
  type: string;
  link?: string;
}
const Header = ({ type, link }: Props) => {
  const router = useRouter();

  const onClickHandler = useCallback(() => {
    if (type === 'close' && link) {
      router.push(link);
    } else if (type === 'prev') {
      router.back();
    }
  }, [type, link]);

  return (
    <HeaderStyle>
      <div className='icon-wrapper' onClick={onClickHandler}>
        {type === 'close' ? (
          <XIcon width={18} height={18} alt={'cancel'} stroke={'#666666'} />
        ) : (
          <ArrowIcon width={21} height={21} alt={'prev'} stroke={'#666666'} />
        )}
      </div>
    </HeaderStyle>
  );
};

export default Header;
