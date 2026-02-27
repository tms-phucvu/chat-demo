"use client";

import { useEffect, useRef, useState } from "react";

export function useVoiceRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const startRecording = async () => {
    if (isRecording) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });

    streamRef.current = stream;

    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 128000,
    });

    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.start();

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    setIsRecording(true);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    if (!mediaRecorderRef.current || isPaused) return;
    mediaRecorderRef.current.pause();
    clearInterval(intervalRef.current!);
    setIsPaused(true);
  };

  const resumeRecording = () => {
    if (!mediaRecorderRef.current || !isPaused) return;
    mediaRecorderRef.current.resume();

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    setIsPaused(false);
  };

  const stopRecording = async (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder) return resolve(null);

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        streamRef.current?.getTracks().forEach((track) => track.stop());
        clearInterval(intervalRef.current!);

        setIsRecording(false);
        setIsPaused(false);
        setSeconds(0);

        resolve(blob);
      };

      recorder.stop();
    });
  };

  // cleanup
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    isRecording,
    isPaused,
    seconds,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
  };
}
