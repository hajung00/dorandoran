import { useCallback } from 'react';
import { mutate } from 'swr';

export const USER_ACCOUNT_KEY = '/user-account';

const useUserAccount = () => {
  // user account 전역으로 지정
  const initializeUserAccount = useCallback((account: any) => {
    mutate(USER_ACCOUNT_KEY, account);
  }, []);

  return {
    initializeUserAccount,
  };
};

export default useUserAccount;
