import React, { useState, useRef, useEffect } from 'react';
import { ComponentDoc } from '../types';
import { highlightCode } from '../lib/utils';
import { Bot, Send, Sparkles, Copy, Check } from 'lucide-react';
import { askAiAssistant } from '../services/geminiService';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface DocViewerProps {
  doc: ComponentDoc;
  preview: React.ReactNode;
}

export const DocViewer: React.FC<DocViewerProps> = ({ doc, preview }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  
  // AI Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(doc.usage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsAiLoading(true);

    const answer = await askAiAssistant(
      userMsg, 
      `组件: ${doc.title}\n描述: ${doc.description}\nAPI 属性: ${JSON.stringify(doc.api)}\n示例用法:\n${doc.usage}`,
      history.map(h => `${h.role}: ${h.text}`)
    );

    setHistory(prev => [...prev, { role: 'model', text: answer }]);
    setIsAiLoading(false);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, chatOpen]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{doc.title}</h1>
        <p className="text-xl text-slate-500">{doc.description}</p>
      </div>

      {/* Main Preview/Code Area */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 bg-slate-50/50">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'preview' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              预览 (Preview)
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'code' 
                  ? 'border-primary-500 text-primary-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              代码 (Code)
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
             <button
                onClick={() => setChatOpen(!chatOpen)}
                className={`text-xs flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors ${
                    chatOpen ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
             >
                <Sparkles className="w-3.5 h-3.5" />
                {chatOpen ? '收起 AI 助手' : 'AI 助手'}
             </button>
          </div>
        </div>

        <div className="relative min-h-[300px]">
          {activeTab === 'preview' ? (
            <div className="p-8 flex items-center justify-center bg-slate-50/50 min-h-[300px]">
              {preview}
            </div>
          ) : (
            <div className="relative bg-slate-950 p-4 overflow-auto max-h-[400px]">
                <button 
                    onClick={handleCopy}
                    className="absolute right-4 top-4 p-2 rounded-md bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              <pre className="text-sm font-mono text-slate-300">
                <code dangerouslySetInnerHTML={{ __html: highlightCode(doc.usage) }} />
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant Panel */}
      {chatOpen && (
        <div className="border border-primary-100 bg-primary-50/30 rounded-xl p-4 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-2 mb-4 text-primary-800 font-semibold">
                <Bot className="w-5 h-5" />
                <span>Nebula AI 助手</span>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-lg p-4 h-64 overflow-y-auto mb-4 space-y-4 shadow-inner">
                {history.length === 0 && (
                    <div className="text-center text-slate-400 text-sm mt-8">
                        <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>询问我关于如何自定义 {doc.title} 的问题！</p>
                        <p className="text-xs mt-1">例如: "如何把它改成红色的？"</p>
                    </div>
                )}
                {history.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                            msg.role === 'user' 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}>
                            <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>
                    </div>
                ))}
                {isAiLoading && (
                     <div className="flex justify-start">
                        <div className="bg-slate-100 rounded-lg px-3 py-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150" />
                        </div>
                     </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleAskAi} className="flex gap-2">
                <Input 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`关于 ${doc.title} 的问题...`}
                    className="bg-white"
                />
                <Button type="submit" size="md" disabled={isAiLoading || !query.trim()}>
                    <Send className="w-4 h-4" />
                </Button>
            </form>
        </div>
      )}

      {/* Props Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">API 参考 (API Reference)</h2>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-900 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">属性 (Prop)</th>
                <th className="px-6 py-4">类型 (Type)</th>
                <th className="px-6 py-4">默认值 (Default)</th>
                <th className="px-6 py-4">说明 (Description)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {doc.api.map((prop) => (
                <tr key={prop.prop} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono text-primary-600">{prop.prop}</td>
                  <td className="px-6 py-4 font-mono text-purple-600">{prop.type}</td>
                  <td className="px-6 py-4 font-mono text-slate-500">{prop.default}</td>
                  <td className="px-6 py-4 text-slate-600">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};