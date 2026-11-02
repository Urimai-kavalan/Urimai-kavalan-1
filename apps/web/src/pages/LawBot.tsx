import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/useLanguage';
import { fetchApi } from '../utils/api';
import { MessageSquare, Send, Info, ShieldCheck } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isSafe?: boolean;
  citation?: string;
}

export const LawBot: React.FC = () => {
  const { t, lang } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: t('lawbot.greeting') ||
        'Hello, I am the AI Legal Assistant. How can I help you understand your rights today?'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update the welcome message whenever the language changes
  useEffect(() => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === 'welcome'
          ? {
              ...msg,
              content: t('lawbot.greeting') ||
                'Hello, I am the AI Legal Assistant. How can I help you understand your rights today?'
            }
          : msg
      )
    );
  }, [lang, t]);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Send message to AI backend
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await fetchApi('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: userMessage.content,
          language: lang
        })
      });

      const aiResponse = data.response;

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse.text,
          isSafe: aiResponse.isSafe,
          citation: aiResponse.citation
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            err.message ||
            'Sorry, I encountered an error while processing your request. Please try again.',
          isSafe: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] sm:h-[calc(100vh-64px)] max-w-4xl mx-auto w-full bg-bg-base relative">

      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-primary" size={24} />

          <div>
            <h1 className="text-xl font-bold text-text-primary leading-tight">
              {t('lawbot.title')}
            </h1>

            <p className="text-xs text-text-secondary">
              {t('lawbot.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* Disclaimer */}
        <div className="bg-warning-bg text-warning-text p-3 rounded-lg text-sm font-medium flex items-start gap-2">
          <Info size={16} className="mt-0.5 shrink-0" />

          <p>
            {t('lawbot.disclaimer') ||
              'AI assists with legal literacy. Always consult a lawyer for specific case advice.'}
          </p>
        </div>

        {/* Messages */}
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-white border border-gray-200 text-text-primary rounded-bl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {msg.content}
              </p>

              {/* Citation */}
              {msg.role === 'assistant' && msg.citation && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs text-primary font-medium">
                  <ShieldCheck size={14} />

                  <span>
                    Verified Reference: {msg.citation}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-text-primary rounded-2xl rounded-bl-none p-4 shadow-sm text-sm flex items-center gap-1">
              <span className="animate-bounce inline-block w-1.5 h-1.5 bg-gray-400 rounded-full"></span>

              <span className="animate-bounce delay-75 inline-block w-1.5 h-1.5 bg-gray-400 rounded-full"></span>

              <span className="animate-bounce delay-150 inline-block w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200 shrink-0 sticky bottom-0">
        <div className="flex gap-2">

          <input
            type="text"
            className="input-field flex-1"
            placeholder={t('lawbot.placeholder') || 'Ask a question...'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />

          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="btn-primary w-12 !px-0 flex justify-center shrink-0 disabled:opacity-50"
          >
            <Send size={18} />
          </button>

        </div>
      </div>
    </div>
  );
};