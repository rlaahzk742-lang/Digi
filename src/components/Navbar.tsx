import React from 'react';
import { Network, FileText, HelpCircle, Layers, Calendar, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCypherModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenCypherModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand text element wordmark */}
        <button
          onClick={() => {
            setActiveTab('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group cursor-pointer"
        >
          <span className="font-editorial-serif text-lg md:text-xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#8B2616] transition-colors whitespace-nowrap shrink-0">
            인낫망 <span className="font-light text-[#78716C]">·</span> 사회학 지식그래프
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57534E]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#1C1917] flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'text-[#8B2616] font-semibold border-b-2 border-[#8B2616] py-1' : ''
            }`}
          >
            <FileText className="w-4 h-4" />
            기획서 개요
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#1C1917] flex items-center gap-1.5 ${
              activeTab === 'graph' ? 'text-[#8B2616] font-semibold border-b-2 border-[#8B2616] py-1' : ''
            }`}
          >
            <Network className="w-4 h-4" />
            지식그래프 탐색
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#1C1917] flex items-center gap-1.5 ${
              activeTab === 'questions' ? 'text-[#8B2616] font-semibold border-b-2 border-[#8B2616] py-1' : ''
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            3대 핵심 질문
          </button>

          <button
            onClick={() => setActiveTab('ontology')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#1C1917] flex items-center gap-1.5 ${
              activeTab === 'ontology' ? 'text-[#8B2616] font-semibold border-b-2 border-[#8B2616] py-1' : ''
            }`}
          >
            <Layers className="w-4 h-4" />
            데이터 모델
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#1C1917] flex items-center gap-1.5 ${
              activeTab === 'roadmap' ? 'text-[#8B2616] font-semibold border-b-2 border-[#8B2616] py-1' : ''
            }`}
          >
            <Calendar className="w-4 h-4" />
            추진 계획 & 위험관리
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCypherModal}
            className="px-3.5 py-1.5 text-xs font-medium text-[#FAF8F5] bg-[#1C1917] rounded-md hover:bg-[#8B2616] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            Cypher 질의 시뮬레이터
          </button>
        </div>
      </div>
    </header>
  );
};
