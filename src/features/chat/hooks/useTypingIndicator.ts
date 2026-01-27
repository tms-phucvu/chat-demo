"use client";

import { useEffect, useState } from "react";
import {
  CHAT_TYPING_MAX_MS,
  CHAT_TYPING_MIN_MS,
} from "../constants/chat.constants";

type UseTypingIndicatorResult = {
  isTyping: boolean;
};

export function useTypingIndicator(roomId: string | null): UseTypingIndicatorResult {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!roomId) {
      setIsTyping(false);
      return;
    }

    const startDelay = window.setTimeout(() => {
      setIsTyping(true);
      const duration =
        Math.random() * (CHAT_TYPING_MAX_MS - CHAT_TYPING_MIN_MS) +
        CHAT_TYPING_MIN_MS;

      const stopTimeout = window.setTimeout(() => {
        setIsTyping(false);
      }, duration);

      return () => window.clearTimeout(stopTimeout);
    }, CHAT_TYPING_MIN_MS);

    return () => {
      window.clearTimeout(startDelay);
      setIsTyping(false);
    };
  }, [roomId]);

  return { isTyping };
}


