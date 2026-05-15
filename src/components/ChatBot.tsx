import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, Coffee, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SYSTEM_INSTRUCTION = `You are Brewy, the official AI assistant for BrewPoint. 
BrewPoint is a customer loyalty platform specifically designed for coffee shops.
Your tone should be professional, friendly, and helpful. You sound like a helpful coffee shop manager.
You can answer questions about:
1. BrewPoint Features: Customer CRM, point engine, smart rewards, deep analytics, and POS integration.
2. Pricing: Basic (Rp850k/mo), Pro (Rp1.5M/mo), Premium (Rp2.2M/mo). Mention 20% discount for annual plans.
3. How it works: Register -> Setup -> Add Fans -> Points -> Rewards.
4. Support: Integrated POS (Moka, Square, Shopify), Offline support, and Customer QR check-ins.

If a user asks about something unrelated to BrewPoint or coffee shop management, politely steer them back or mention you're here to help with their coffee business.
Limit your responses to be concise and easy to read. Use bullet points when helpful.`;

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Brewy. How can I help you grow your coffee business today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || "I'm sorry, I couldn't process that. Can you try again?",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! My coffee filter is clogged. I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-coffee-100"
          >
            {/* Header */}
            <div className="bg-coffee-900 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-coffee-800 flex items-center justify-center">
                  <Coffee size={20} className="text-coffee-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Brewy</h3>
                  <p className="text-[10px] text-coffee-400 uppercase font-black tracking-widest">AI Porter</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-coffee-50/30"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex w-full",
                    m.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm shadow-sm",
                    m.sender === 'user' 
                      ? "bg-coffee-800 text-white rounded-tr-none" 
                      : "bg-white text-coffee-950 border border-coffee-100 rounded-tl-none"
                  )}>
                    <div className="markdown-body">
                      <Markdown>{m.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-coffee-100 shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-coffee-500" />
                    <span className="text-xs text-coffee-400 font-bold uppercase tracking-widest">Brewing answer...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-coffee-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Brewy anything..."
                  className="flex-1 bg-coffee-50/50 border border-coffee-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500/20 transition-all font-medium"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-coffee-900 text-white p-2 rounded-xl hover:bg-coffee-950 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
          isOpen ? "bg-white text-coffee-900" : "bg-coffee-900 text-white"
        )}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-coffee-500 rounded-full flex items-center justify-center text-[10px] font-black animate-pulse">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};
