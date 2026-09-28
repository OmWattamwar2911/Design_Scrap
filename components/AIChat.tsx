/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Terminal, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm Om's AI Portfolio Assistant. Ask me about Om's distributed systems projects in Go, his Kafka search engine, AlgoUniversity Fellowship, or background!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'How did Om build the fault-tolerant task scheduler?',
    'Tell me about his selection for AlgoUniversity Fellowship',
    'What is Om’s experience with Go and concurrency?',
    'What are his key full-stack metrics at Kanishka Properties?',
  ];

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (messageToSend?: string) => {
    const textToSend = messageToSend || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 50);

    const responseText = await sendMessageToGemini(textToSend);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[92vw] sm:w-[420px] bg-[#0c0d22]/95 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl shadow-[#4fb7b3]/20 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#191b42] via-[#23255a] to-[#121330] p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#4fb7b3]/20 text-[#a8fbd3] border border-[#4fb7b3]/30">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider">
                    Om's AI Portfolio Guide
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#a8fbd3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a8fbd3] animate-pulse" />
                    Interactive Gemini Assistant
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                data-hover="true"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 h-72 md:h-80 overflow-y-auto p-4 space-y-3 font-sans text-xs scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-[#4fb7b3] to-[#637ab9] text-white rounded-tr-none font-medium'
                        : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-xl rounded-tl-none border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#a8fbd3] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#4fb7b3] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#637ab9] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Question Chips */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/30">
              <span className="text-[10px] font-mono text-gray-400 block mb-1.5 uppercase tracking-wider">
                Quick Prompts:
              </span>
              <div className="flex flex-col gap-1">
                {suggestedQuestions.slice(0, 2).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-left text-[11px] font-mono text-gray-300 hover:text-[#a8fbd3] hover:bg-white/5 p-1.5 rounded transition-all flex items-center justify-between cursor-pointer"
                    data-hover="true"
                  >
                    <span className="truncate">{q}</span>
                    <ChevronRight className="w-3 h-3 shrink-0 text-white/30" />
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 bg-black/60">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about Om's code, systems, or experience..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#4fb7b3] font-mono"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#4fb7b3] to-[#637ab9] hover:opacity-90 transition-all text-white disabled:opacity-40 cursor-pointer"
                  data-hover="true"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button matching Lumina's aesthetic */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 md:p-4 rounded-full bg-gradient-to-r from-[#4fb7b3] via-[#637ab9] to-[#a8fbd3] text-black shadow-xl shadow-[#4fb7b3]/30 border border-white/30 flex items-center justify-center cursor-pointer"
        data-hover="true"
        aria-label="Open AI Assistant"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#a8fbd3] rounded-full border-2 border-[#121330] animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#a8fbd3] rounded-full border-2 border-[#121330]" />
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-black" />
            <span className="hidden sm:inline font-mono font-bold text-xs uppercase tracking-wider text-black pr-1">
              Ask AI Guide
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
