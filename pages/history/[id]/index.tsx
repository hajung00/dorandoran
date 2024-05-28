import { useRouter } from 'next/router';
import React from 'react';

const HistoryId = () => {
  const params = useRouter();
  console.log(params.query.id);

  return <div>HistoryId</div>;
};

export default HistoryId;
