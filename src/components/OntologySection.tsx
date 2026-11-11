import React, { useState } from 'react';
import { Layers, ArrowRight, Share2, Tag, BookOpen, CheckCircle2 } from 'lucide-react';
import { entityClasses, relationshipDefs } from '../data/reportData';

export const OntologySection: React.FC = () => {
  const [selectedClassIndex, setSelectedClassIndex] = useState<number>(0);
  const [relationshipFilter, setRelationshipFilter] = useState<string>('all');

  const filteredRelationships = relationshipDefs.filter((rel) => {
    if (relationshipFilter === 'thinker') {
      return rel.fromNode.includes('인물') && rel.toNode.includes('인물');
    }
    if (relationshipFilter === 'concept') {
      return rel.fromNode.includes('개념') || rel.toNode.includes('개념');
    }
    if (relationshipFilter === 'work') {
      return rel.fromNode.includes('저서') || rel.toNode.includes('저서');
    }
    return true;
  });

  return (
    <section id="data-model" className="py-14 bg-[#FAF8F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8B2616] font-semibold">
            데이터 모델 및 온톨로지 설계 (Data Model & Ontology Architecture)
          </span>
          <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
            4대 클래스와 10대 관계 온톨로지 스키마
          </h2>
          <p className="text-sm text-[#57534E] mt-2 max-w-3xl">
            독일 철학 원전과 사회학 이론 텍스트에 나타난 인문학적 관계를 그래프 데이터베이스(Neo4j) 구조로
            추상화하여, 모호한 "관련있다"식의 관계를 철저히 배제하고 엄격한 계승·비판·변용의 의미론적 모델을 확립했습니다.
          </p>
        </div>

        {/* Theoretical Grounding Reference Box */}
        <div className="p-5 rounded-xl bg-white border border-[#E7E2D8] mb-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E7E2D8] text-xs">
            <span className="font-mono font-semibold text-[#8B2616] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              설계 근거 자료 (Grounding Source Text)
            </span>
            <span className="text-[#78716C]">앤서니 기든스 · 필립 서튼, 《현대사회학》 개정판, 을유문화사, 2018, pp. 98–101</span>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#57534E] leading-relaxed">
            <div className="p-3 bg-[#FAF8F5] rounded border border-[#E7E2D8]">
              <strong className="text-[#1C1917] block mb-1">고전 연구: 마르크스와 자본주의 혁명</strong>
              계급 갈등과 역사적 유물론의 정초, 소외와 잉여가치, 부르주아지와 프롤레타리아트의 적대 분석.
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded border border-[#E7E2D8]">
              <strong className="text-[#1C1917] block mb-1">네오마르크스주의: 프랑크푸르트학파</strong>
              서구 마르크스주의의 등장, 아도르노와 호르크하이머의 비판이론, 파시즘과 권위주의적 성격 분석.
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded border border-[#E7E2D8]">
              <strong className="text-[#1C1917] block mb-1">현대 비판이론: 하버마스의 소통이론</strong>
              도구적 이성 비판을 계승하되 의사소통적 행위론과 공론장, 체계와 생활세계의 상호작용으로 확장.
            </div>
          </div>
        </div>

        {/* 4 Entity Classes Display */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-editorial-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#8B2616]" />
              01. 노드 클래스(Class) 정의 (4종)
            </h3>
            <span className="text-xs text-[#78716C] font-mono">총 노드 70~80건 내외 집약 설계</span>
          </div>

          {/* Class Navigation tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {entityClasses.map((cls, idx) => {
              const isSelected = selectedClassIndex === idx;
              return (
                <button
                  key={cls.name}
                  onClick={() => setSelectedClassIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#8B2616] shadow-xs ring-1 ring-[#8B2616]/20'
                      : 'bg-white/60 border-[#E7E2D8] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-[#78716C] font-mono mb-1">
                    <span>Class 0{idx + 1}</span>
                    <span className="tabular-nums font-semibold text-[#8B2616]">{cls.estimatedCount}건</span>
                  </div>
                  <h4 className="font-editorial-serif text-base font-bold text-[#1C1917] mb-1">
                    {cls.name}
                  </h4>
                  <p className="text-[11px] text-[#78716C] line-clamp-1">{cls.categorizationCriteria}</p>
                </button>
              );
            })}
          </div>

          {/* Active Class Property Table */}
          {entityClasses[selectedClassIndex] && (
            <div className="bg-white rounded-xl border border-[#E7E2D8] p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E7E2D8] gap-2 mb-4">
                <div>
                  <h4 className="font-editorial-serif text-lg font-bold text-[#1C1917]">
                    {entityClasses[selectedClassIndex].name} 속성(Property) 명세
                  </h4>
                  <p className="text-xs text-[#78716C] mt-0.5">
                    포함 개체: {entityClasses[selectedClassIndex].includedEntities}
                  </p>
                </div>
                <div className="text-xs font-mono bg-[#FAF8F5] px-3 py-1.5 rounded border border-[#E7E2D8] text-[#57534E]">
                  기준: {entityClasses[selectedClassIndex].categorizationCriteria}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#FAF8F5] text-[#57534E] font-medium border-b border-[#E7E2D8]">
                    <tr>
                      <th className="p-2.5 font-mono text-[11px]">속성명 (Property)</th>
                      <th className="p-2.5 font-mono text-[11px]">필수 여부</th>
                      <th className="p-2.5 font-mono text-[11px]">데이터 예시 (Example)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E2D8]">
                    {entityClasses[selectedClassIndex].properties.map((prop) => (
                      <tr key={prop.name} className="hover:bg-[#FAF8F5]/50">
                        <td className="p-2.5 font-mono font-semibold text-[#8B2616]">{prop.name}</td>
                        <td className="p-2.5">
                          {prop.required ? (
                            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-medium">
                              필수 (Required)
                            </span>
                          ) : (
                            <span className="text-[11px] text-[#78716C] font-mono">선택 (Optional)</span>
                          )}
                        </td>
                        <td className="p-2.5 text-[#57534E] font-mono text-xs">{prop.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* 10 Relationships Display */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-editorial-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#8B2616]" />
                02. 관계(Relationship) 정의 (10종)
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                원문 자료의 서술어(동사)를 바탕으로 엄격히 구조화된 인문학적 관계망
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-[#EFECE6] p-1 rounded-lg border border-[#E2DDD3]">
              <button
                onClick={() => setRelationshipFilter('all')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  relationshipFilter === 'all' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                전체 (10)
              </button>
              <button
                onClick={() => setRelationshipFilter('thinker')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  relationshipFilter === 'thinker' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                학자 간 계승
              </button>
              <button
                onClick={() => setRelationshipFilter('concept')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  relationshipFilter === 'concept' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                개념 제기/변용
              </button>
              <button
                onClick={() => setRelationshipFilter('work')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  relationshipFilter === 'work' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                저술/텍스트
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRelationships.map((rel) => (
              <div
                key={rel.code}
                className="bg-white rounded-xl border border-[#E7E2D8] p-5 shadow-xs hover:border-[#D0C7B7] transition-all"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E7E2D8]">
                  <div className="flex items-center gap-2">
                    <span className="font-editorial-serif font-bold text-base text-[#1C1917]">
                      {rel.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#8B2616] bg-[#8B2616]/10 px-1.5 py-0.5 rounded">
                      :{rel.code}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#78716C] mb-3">
                  <span className="font-semibold text-[#1C1917]">{rel.fromNode}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B2616]" />
                  <span className="font-semibold text-[#1C1917]">{rel.toNode}</span>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed mb-3">{rel.description}</p>

                <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E2D8] text-[11px] text-[#78716C]">
                  <strong className="text-[#1C1917] block mb-0.5">실제 예시:</strong>
                  {rel.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
