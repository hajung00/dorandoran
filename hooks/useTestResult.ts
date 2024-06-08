import { useCallback } from 'react';
import { mutate } from 'swr';

export const TEST_RESULT_KEY = '/test-result';

const useTestResult = () => {
  //test result 전역으로 지정
  const initializeTestResult = useCallback((result: any) => {
    mutate(TEST_RESULT_KEY, result);
  }, []);

  return {
    initializeTestResult,
  };
};

export default useTestResult;
