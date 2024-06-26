import { useCallback } from 'react';
import { mutate } from 'swr';

export const CHAT_KEY = '/chat';

const useChatTest = () => {
  const initializeChat = useCallback((chat: any) => {
    mutate(CHAT_KEY, chat);
  }, []);

  return {
    initializeChat,
  };
};

export default useChatTest;
