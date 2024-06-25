import React from 'react';
import styled from 'styled-components';

const DescriptionStyle = styled.section`
  .description {
    color: #222;
    font: var(--Pretendard--26-600);
  }
  .sub-description {
    color: #666;
    font: var(--Pretendard--20-400);
    margin-top: 12px;
    margin-bottom: 93px;
  }
`;

interface Props {
  desc: string;
  subDesc: string;
}

const Description = ({ desc, subDesc }: Props) => {
  return (
    <DescriptionStyle>
      <p className='description' dangerouslySetInnerHTML={{ __html: desc }}></p>
      <p
        className='sub-description'
        dangerouslySetInnerHTML={{ __html: subDesc }}
      ></p>
    </DescriptionStyle>
  );
};

export default Description;
