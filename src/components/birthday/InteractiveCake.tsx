"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Wind } from "lucide-react";

interface InteractiveCakeProps {
  onComplete: () => void;
}

export const InteractiveCake = ({ onComplete }: InteractiveCakeProps) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [volume, setVolume] = useState(0);
  const [blowCount, setBlowCount] = useState(0);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const requestRef = useRef<number | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const BLOW_THRESHOLD = 30; // Threshold for microphone volume to count as blowing
  const REQUIRED_BLOW_DURATION = 50; // frames of blowing needed

  // Initialize Audio Context
  const initAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass =
        window.AudioContext ||
        (
          window as unknown as Window & {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const analyserNode = audioCtx.createAnalyser();
      const microphone = audioCtx.createMediaStreamSource(stream);

      microphone.connect(analyserNode);
      analyserNode.fftSize = 256;

      setAudioContext(audioCtx);
      setAnalyser(analyserNode);
      setMicPermission(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      setMicPermission(false);
    }
  };

  // Check volume level loop
  const checkVolume = useCallback(() => {
    if (analyser && candlesLit) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      // Calculate average volume
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setVolume(average);

      if (average > BLOW_THRESHOLD) {
        setBlowCount((prev) => {
          const newCount = prev + 1;
          if (newCount > REQUIRED_BLOW_DURATION) {
            handleBlowOut();
          }
          return newCount;
        });
      } else {
        // Decay blow count so you have to sustain it
        setBlowCount((prev) => Math.max(0, prev - 1));
      }

      requestRef.current = requestAnimationFrame(checkVolume);
    }
  }, [analyser, candlesLit]);

  useEffect(() => {
    if (micPermission && candlesLit) {
      requestRef.current = requestAnimationFrame(checkVolume);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [micPermission, candlesLit, checkVolume]);

  const handleBlowOut = () => {
    setCandlesLit(false);
    if (audioContext) audioContext.close();
    setTimeout(() => {
      onComplete();
    }, 2000); // Wait for smoke/fade out before completing
  };

  // Fallback Long Press Logic
  const startLongPress = () => {
    setIsLongPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      handleBlowOut();
    }, 2000); // 2 seconds hold to blow out
  };

  const endLongPress = () => {
    setIsLongPressing(false);
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] relative z-20">
      <AnimatePresence>
        {candlesLit ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            className="relative"
          >
            {/* Cake Illustration (CSS Art) */}
            <div className="relative">
              {/* Flames */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scaleY: [1, 1.2, 1],
                      opacity: Math.max(
                        0.4,
                        1 - volume / 100 - (isLongPressing ? 0.5 : 0)
                      ), // Dim when blowing
                    }}
                    transition={{
                      duration: 0.2 + Math.random() * 0.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="w-4 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-[2px] shadow-[0_0_20px_rgba(255,200,0,0.6)]"
                  />
                ))}
              </div>

              {/* Candles */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-16 bg-gradient-to-b from-pink-200 to-pink-300 rounded-sm border-b border-pink-400"
                  />
                ))}
              </div>

              {/* Cake Body */}
              <div className="w-64 h-32 bg-gradient-to-b from-rose-100 to-rose-200 rounded-t-2xl relative shadow-xl mt-10">
                <div className="absolute top-0 w-full h-8 bg-white/50 rounded-full blur-sm" />
                <div className="absolute top-1/2 w-full border-t-4 border-dotted border-rose-300/50" />
              </div>
              <div className="w-80 h-10 bg-gray-200/20 rounded-full blur-xl absolute -bottom-4 -left-8 -z-10" />
            </div>

            {/* Instructions */}
            <div className="mt-16 text-center space-y-4">
              <p className="text-white/80 font-light tracking-wide text-lg">
                Make a wish...
              </p>

              {!micPermission && micPermission !== false && (
                <button
                  onClick={initAudio}
                  className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all mx-auto backdrop-blur-sm border border-white/20"
                >
                  <Mic size={16} />
                  Enable Microphone to Blow
                </button>
              )}

              {(micPermission === false || micPermission === null) && (
                <button
                  onMouseDown={startLongPress}
                  onMouseUp={endLongPress}
                  onMouseLeave={endLongPress}
                  onTouchStart={startLongPress}
                  onTouchEnd={endLongPress}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 active:bg-white/30 text-white rounded-full transition-all mx-auto backdrop-blur-sm border border-white/20 select-none cursor-pointer"
                >
                  <Wind size={18} />
                  {isLongPressing ? "Blowing..." : "Hold to Blow Out Candles"}
                </button>
              )}

              {micPermission && (
                <p className="text-sm text-white/50 italic animate-pulse">
                  Blow into your microphone!
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl font-serif text-white mb-2">
              Wishes Sent!
            </h2>
            <div className="text-6xl">✨</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
