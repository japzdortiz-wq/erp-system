
import React, { useState, useRef, useEffect } from 'react';
import { generateProcurementAnalysis } from '../services/geminiService';
import { Spinner } from './ui/Spinner';
import type { PurchaseOrder, Supplier, Item } from '../types';

interface ProcurementAssistantProps {
  purchaseOrders: PurchaseOrder[];
  suppliers: Supplier[];
  items: Item[];
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AssistantMessage: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-2.5 my-2">
    <div className="flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
      <p className="text-sm font-normal text-gray-900">{text}</p>
    </div>
  </div>
);

const UserMessage: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start justify-end gap-2.5 my-2">
    <div className="flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 bg-primary-700 rounded-s-xl rounded-ee-xl">
      <p className="text-sm font-normal text-white">{text}</p>
    </div>
  </div>
);


export const ProcurementAssistant: React.FC<ProcurementAssistantProps> = ({ purchaseOrders, suppliers, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateProcurementAnalysis(input, purchaseOrders, suppliers, items);
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 z-40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-full max-w-md h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-40">
      <header className="bg-primary-800 text-white p-4 rounded-t-xl flex justify-between items-center">
        <h3 className="font-bold text-lg">AI Procurement Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="text-primary-200 hover:text-white">&times;</button>
      </header>
      <main className="flex-1 p-4 overflow-y-auto bg-slate-50">
        {messages.map((msg, index) =>
          msg.sender === 'user' ? <UserMessage key={index} text={msg.text} /> : <AssistantMessage key={index} text={msg.text} />
        )}
        {isLoading && <div className="flex justify-center p-4"><Spinner /></div>}
        <div ref={messagesEndRef} />
      </main>
      <footer className="p-4 border-t bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Ask about procurement data..."
            className="flex-1 border rounded-lg p-2 mr-2 focus:ring-primary-500 focus:border-primary-500"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="bg-primary-600 text-white p-2 rounded-lg disabled:bg-primary-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </footer>
    </div>
  );
};
