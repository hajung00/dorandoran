import React from 'react';
import styled from 'styled-components';

const AgreementContentStyle = styled.div`
  padding: 20px 30px;
  background: var(--gray01, #f7f7f7);

  .content-wrapper {
    & > div {
      font-family: 'Pretendard';
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%;
    }

    .title {
      color: var(--gray08, #444);
    }

    .description {
      color: var(--gray06, #898989);
      margin: 0;
      .item-wrapper {
        padding-left: 7px;
        display: flex;
        gap: 7px;
      }
    }

    &::after {
      content: '';
      display: block;
      height: 16px; /* 원하는 간격을 설정 */
    }
  }
`;

const AgreementContent = () => {
  return (
    <AgreementContentStyle>
      {/* 항목 1 */}
      <div className='content-wrapper'>
        <div className='title'>제 1조 (목적)</div>
        <div className='description'>
          이 약관은 사용자(이하 “회원”)가 도란도란 챗봇 서비스(이하 “서비스”)를
          이용함에 있어 회사(이하 “회사”)와 회원 간의 권리, 의무 및 책임사항을
          규정하는 것을 목적으로 합니다.{' '}
        </div>
      </div>

      {/* 항목 2 */}
      <div className='content-wrapper'>
        <div className='title'>제 2 조 (개인정보 보호)</div>
        <div className='description'>
          <div className='item-wrapper'>
            <span> 1.</span>
            <p>
              회사는 회원의 개인정보를 중요시하며, 관련 법령에 따라 개인정보를
              보호하기 위해 최선을 다합니다.
            </p>
          </div>
          <div className='item-wrapper'>
            <span> 2.</span>
            <p>
              회사는 회원의 명시적인 동의 없이 개인정보를 제3자에게 제공하지
              않습니다.
            </p>
          </div>
          <div className='item-wrapper'>
            <span> 3.</span>
            <p>
              개인정보의 수집, 이용, 보관 및 파기에 관한 사항은 개인정보
              처리방침에 따릅니다.
            </p>
          </div>
        </div>
      </div>

      {/* 항목 3 */}
      <div className='content-wrapper'>
        <div className='title'>제 3 조 (대화 내역의 비공개)</div>
        <div className='description'>
          <div className='item-wrapper'>
            <span> 1.</span>
            <p>
              회원의 대화 내역은 비공개를 원칙으로 하며, 회원의 사전 동의 없이는
              공개되지 않습니다.
            </p>
          </div>
          <div className='item-wrapper'>
            <span> 2.</span>
            <p>
              회사는 대화 내역을 회원의 서비스 이용 편의성을 높이기 위한
              목적으로만 사용하며, 외부에 유출되지 않도록 보호합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 항목 4 */}
      <div className='content-wrapper'>
        <div className='title'>제 4 조 (서비스 이용)</div>
        <div className='description'>
          <div className='item-wrapper'>
            <span> 1.</span>
            <p>
              회원은 본 약관에 동의함으로써 서비스 이용 자격을 부여받습니다.
            </p>
          </div>
          <div className='item-wrapper'>
            <span> 2.</span>
            <p>
              회원은 서비스를 이용함에 있어 다음 행위를 금지합니다.
              <br />- 타인의 개인정보를 도용하는 행위, 회사의 승인을 받지 않고
              상업적인 목적으로 서비스를 이용하는 행위, 법령 및 공공질서에
              반하는 행위
            </p>
          </div>
        </div>
      </div>

      {/* 항목 5 */}
      <div className='content-wrapper'>
        <div className='title'>제 5 조 (책임 제한)</div>
        <div className='description'>
          <div className='item-wrapper'>
            <span> 1.</span>
            <p>
              회사는 천재지변, 비상사태, 기술적 문제 등 불가항력적인 사유로
              인하여 서비스를 제공할 수 없는 경우, 이에 대한 책임을 지지
              않습니다.
            </p>
          </div>
          <div className='item-wrapper'>
            <span> 2.</span>
            <p>
              회사는 회원의 귀책 사유로 인한 서비스 이용의 장애에 대해 책임을
              지지 않습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 항목 6 */}
      <div className='content-wrapper'>
        <div className='title'>제 6 조 (약관의 개정)</div>
        <div className='description'>
          <div className='item-wrapper'>
            <span> 1.</span>
            <p>
              회사는 관련 법령을 준수하기 위해 필요 시 약관을 개정할 수
              있습니다.
            </p>
          </div>
          <div className='item-wrapper'>
            <span> 2.</span>
            <p>
              개정된 약관은 회사의 홈페이지에 공지함으로써 효력이 발생합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 항목 7 */}
      <div className='content-wrapper'>
        <div className='title'>제 7 조 (기타 사항)</div>
        <div className='description'>
          <div className='item-wrapper'>
            <span> 1.</span>
            <p>
              본 약관에서 정하지 않은 사항은 관련 법령 및 상관례에 따릅니다.
            </p>
          </div>
          <div className='item-wrapper'>
            <span> 2.</span>
            <p>
              본 약관에 대한 해석과 적용은 대한민국 법률에 따르며, 분쟁 발생 시
              관할 법원은 회사의 본사 소재지 관할 법원으로 합니다.
            </p>
          </div>
        </div>
      </div>
    </AgreementContentStyle>
  );
};

export default AgreementContent;
