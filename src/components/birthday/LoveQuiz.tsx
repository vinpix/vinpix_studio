"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Check, X } from "lucide-react";
import confetti from "canvas-confetti";

interface LoveQuizProps {
  onUnlock: () => void;
}

const questions = [
  {
    question: "Where did we first meet?",
    options: ["At a coffee shop", "At a library", "At a park", "Online"],
    correct: 0, // 0-based index
  },
  {
    question: "What is my favorite food?",
    options: ["Pizza", "Sushi", "Burgers", "Tacos"],
    correct: 1,
  },
  {
    question: "What is our anniversary date?",
    options: ["January 1st", "February 14th", "July 4th", "December 25th"],
    correct: 1,
  },
];

export const LoveQuiz = ({ onUnlock }: LoveQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [shake, setShake] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    const isCorrect = index === questions[currentQuestion].correct;

    if (isCorrect) {
      setFeedback("correct");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"],
      });

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedOption(null);
          setFeedback(null);
        } else {
          handleComplete();
        }
      }, 1000);
    } else {
      setFeedback("wrong");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => {
        setSelectedOption(null);
        setFeedback(null);
      }, 1000);
    }
  };

  const handleComplete = () => {
    setIsLocked(false);
    onUnlock();
  };

  if (!isLocked) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-green-600 bg-green-50 rounded-2xl border border-green-200">
        <Unlock size={48} className="mb-4" />
        <h3 className="text-2xl font-serif">Access Granted!</h3>
        <p>You know me so well ❤️</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full">
      <motion.div
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white text-center">
          <div className="flex justify-center mb-2">
            <Lock size={32} />
          </div>
          <h3 className="text-xl font-medium">Love Quiz</h3>
          <p className="text-white/80 text-sm">
            Answer correctly to unlock your gift!
          </p>
          <div className="flex gap-1 justify-center mt-4">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i <= currentQuestion ? "w-8 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Area */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-2xl font-serif text-gray-800 mb-6 text-center">
                {questions[currentQuestion].question}
              </h4>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={feedback !== null}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center justify-between group ${
                      selectedOption === index
                        ? feedback === "correct"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:scale-[1.02]"
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                    {selectedOption === index && (
                      <span>
                        {feedback === "correct" ? (
                          <Check size={20} />
                        ) : (
                          <X size={20} />
                        )}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
