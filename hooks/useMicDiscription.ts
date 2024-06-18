import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

export const SHOW_DESCRIPTION_KEY = '/show-description';

const useMicDiscription = () => {
  const enableMicDiscription = useCallback(() => {
    mutate(SHOW_DESCRIPTION_KEY, true);
  }, []);

  const disableMicDiscription = useCallback(() => {
    mutate(SHOW_DESCRIPTION_KEY, false);
  }, []);

  return {
    enableMicDiscription,
    disableMicDiscription,
  };
};

export default useMicDiscription;
