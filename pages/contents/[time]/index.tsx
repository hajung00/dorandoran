import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Props {
  time: string;
}

const MeditationContent = ({ time }: Props) => {
  const [contentLink, setContentLink] = useState('');
  useEffect(() => {
    switch (time) {
      case '3분':
        setContentLink('link 3분');
        break;
      case '5분':
        setContentLink('link 5분');
        break;
      case '10분':
        setContentLink('link 10분');
        break;
      case '30분':
        setContentLink('link 30분');
        break;
      case '1시간':
        setContentLink('link 1시간');
        break;
    }
  }, [time]);

  return (
    <div>
      {time} 명상<div>{contentLink}</div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const time = context.query.time;
  return {
    props: {
      time,
    },
  };
};

export default MeditationContent;
