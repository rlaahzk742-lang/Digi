import React from 'react';
import { ArrowRight, Network, Sparkles, BookOpen, Users } from 'lucide-react';
import { proposalMetadata, teamMembers } from '../data/reportData';

interface HeroProps {
  onExploreGraph: () => void;
  onViewQuestions: () => void;
  onViewDocument: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGraph, onViewQuestions, onViewDocument }) => {
  return (
    <section className="relative overflow-hidden border-b border-[#E7E2D8] bg-[#FAF8F5] pt-10 pb-12">
      {/* Background architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1C1917 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Document Header Metadata Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C] mb-4 tracking-wide font-mono">
          <span className="font-semibold text-[#8B2616]">{proposalMetadata.courseName} ({proposalMetadata.courseCode})</span>
          <span aria-hidden="true">·</span>
          <span>{proposalMetadata.semester}</span>
          <span aria-hidden="true">·</span>
          <span>문서번호 {proposalMetadata.docNumber}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#1C1917] font-medium">{proposalMetadata.teamName} ({proposalMetadata.teamCode})</span>
          <span aria-hidden="true">·</span>
          <span>발표일자 {proposalMetadata.presentationDate}</span>
        </div>

        {/* Main Headline & Context */}
        <div className="max-w-4xl">
          <h1 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.2] text-balance mb-4">
            사회학 이론은 앞선 학자의 어떤 문제의식을 계승하고 비판하며 발전했는가?
          </h1>
          <p className="font-editorial-serif italic text-lg sm:text-xl text-[#78716C] mb-6">
            칼 마르크스 중심의 20세기 사회이론 계보 지식그래프(Knowledge Graph) 구축 기획서
          </p>

          <p className="text-base text-[#57534E] leading-relaxed max-w-3xl mb-8">
            개별 이론의 파편화된 암기에서 벗어나, 헤겔의 관념론과 포이어바흐의 유물론에서 시작해
            <strong className="text-[#1C1917] font-semibold"> 칼 마르크스</strong>를 중심 허브로 삼고,
            20세기 서구 마르크스주의(루카치·그람시), 프랑크푸르트 비판이론(아도르노·벤야민·하버마스),
            구조주의(알튀세르), 그리고 문화사회학(부르디외)으로 이어지는 역동적 계승·비판·변용의 계보망을
            Neo4j 기반 지식그래프로 모델링합니다.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              onClick={onExploreGraph}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#8B2616] hover:bg-[#701E11] rounded-md transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap cursor-pointer"
            >
              <Network className="w-4 h-4" />
              지식그래프 대화형 탐색
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onViewQuestions}
              className="px-4 py-2.5 text-sm font-medium text-[#1C1917] bg-[#EFECE6] hover:bg-[#E5E0D6] rounded-md transition-colors flex items-center gap-2 border border-[#DCD5C9] whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#8B2616]" />
              3대 핵심 질문 분석
            </button>

            <button
              onClick={onViewDocument}
              className="px-4 py-2.5 text-sm font-medium text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE8] rounded-md transition-colors flex items-center gap-2 border border-transparent whitespace-nowrap cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              기획서 원문 보기
            </button>
          </div>

          {/* Academic Synergy Callout */}
          <div className="p-4 rounded-lg bg-[#F4F1EA] border border-[#E2DDD3] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#8B2616]/10 border border-[#8B2616]/20 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#8B2616]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#8B2616] tracking-wide block">학제간 융합 연구팀</span>
                <p className="text-xs text-[#57534E]">
                  독어독문학과의 원전·개념 고증 (German Philological Analysis) × 사회학과의 이론 맥락화 & 네트워크 분석
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-[#1C1917]">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B2616]" />
                  <span>{member.name}</span>
                  <span className="text-[#78716C]">({member.department})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Quantitative KPI Strips with Tabular Numerals */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#E7E2D8]">
          <div className="p-4 rounded-lg bg-white/70 border border-[#E7E2D8]">
            <span className="text-xs uppercase tracking-wider text-[#78716C] font-mono block mb-1">인물 노드 (Thinkers)</span>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial-serif text-3xl font-bold text-[#1C1917] tabular-nums">11</span>
              <span className="text-xs text-[#78716C]">명 (헤겔 ~ 부르디외)</span>
            </div>
            <p className="text-xs text-[#78716C] mt-1">독일 관념론 · 정통 마르크스 · 비판이론가</p>
          </div>

          <div className="p-4 rounded-lg bg-white/70 border border-[#E7E2D8]">
            <span className="text-xs uppercase tracking-wider text-[#78716C] font-mono block mb-1">대표 저작 (Key Works)</span>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial-serif text-3xl font-bold text-[#1C1917] tabular-nums">20</span>
              <span className="text-xs text-[#78716C]">권 (1807 ~ 1981)</span>
            </div>
            <p className="text-xs text-[#78716C] mt-1">《자본론》, 《정신현상학》, 《의사소통행위론》 등</p>
          </div>

          <div className="p-4 rounded-lg bg-white/70 border border-[#E7E2D8]">
            <span className="text-xs uppercase tracking-wider text-[#78716C] font-mono block mb-1">핵심 개념 (Concepts)</span>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial-serif text-3xl font-bold text-[#1C1917] tabular-nums">35</span>
              <span className="text-xs text-[#78716C]">개 이론 범주</span>
            </div>
            <p className="text-xs text-[#78716C] mt-1">소외, 물화, 도구적 이성, 문화자본, 아비투스</p>
          </div>

          <div className="p-4 rounded-lg bg-white/70 border border-[#E7E2D8]">
            <span className="text-xs uppercase tracking-wider text-[#78716C] font-mono block mb-1">의미 관계 (Ontology Types)</span>
            <div className="flex items-baseline gap-2">
              <span className="font-editorial-serif text-3xl font-bold text-[#1C1917] tabular-nums">10</span>
              <span className="text-xs text-[#78716C]">개 관계 유형</span>
            </div>
            <p className="text-xs text-[#78716C] mt-1">비판적 승계, 옹호적 승계, 개념 변용/확장 등</p>
          </div>
        </div>
      </div>
    </section>
  );
};
