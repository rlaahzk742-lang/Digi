import React, { useState } from 'react';
import { Play, Copy, Check, Sparkles, ArrowRight, CornerDownRight, Database } from 'lucide-react';
import { keyQuestions } from '../data/reportData';

export const KeyQuestionsSection: React.FC = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [copiedQueryId, setCopiedQueryId] = useState<number | null>(null);
  const [isQueryRunning, setIsQueryRunning] = useState<boolean>(false);
  const [hasRunQuery, setHasRunQuery] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
  });

  const activeQuestion = keyQuestions.find((q) => q.id === activeQuestionId) || keyQuestions[0];

  const handleCopyQuery = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQueryId(id);
    setTimeout(() => setCopiedQueryId(null), 2000);
  };

  const handleSimulateQuery = () => {
    setIsQueryRunning(true);
    setTimeout(() => {
      setIsQueryRunning(false);
      setHasRunQuery((prev) => ({ ...prev, [activeQuestionId]: true }));
    }, 400);
  };

  // Mock simulation results for the 3 questions
  const queryResultDatasets: Record<
    number,
    { columns: string[]; rows: (string | number)[][] }
  > = {
    1: {
      columns: ['경로 깊이 (Hop)', '후속 사상가', '소속 학파', '계승 관계 유형', '핵심 변용 내용'],
      rows: [
        ['1단계', '프리드리히 엥겔스', '정통 마르크스주의', '협력 / 옹호적 승계', '자연변증법 및 역사적 유물론 체계화'],
        ['1단계', '게오르기 루카치', '초기 서구 마르크스주의', '옹호적 승계 (확장)', '상품 분석을 의식·사회 전체의 "물화(Verdinglichung)"로 확장'],
        ['1단계', '안토니오 그람시', '초기 서구 마르크스주의', '비판적 승계', '기계적 경제결정론 탈피, 상부구조와 "문화적 헤게모니" 자율성 정초'],
        ['2단계', '테오도어 아도르노', '프랑크푸르트학파', '비판적 승계', '혁명적 낙관주의 비판, 총체적 관리사회 및 "도구적 이성" 비판'],
        ['2단계', '루이 알튀세르', '구조주의 마르크스주의', '비판적 승계', '인식론적 단절, "이데올로기적 국가기구(ISA)"와 호명 작용 규명'],
        ['3단계', '위르겐 하버마스', '프랑크푸르트 2세대', '비판적 승계', '노동 패러다임 극복, "의사소통행위"와 생활세계 식민화 비판'],
        ['3단계', '피에르 부르디외', '비판적 문화사회학', '비판적 승계', '경제자본 일원론 비판, "문화자본·아비투스·상징폭력" 모델 구축'],
      ],
    },
    2: {
      columns: ['마르크스 제기 개념', '후속 사상가 수 (In-Degree)', '매개 중심성 점수', '연계된 후속 텍스트', '변용된 후속 개념'],
      rows: [
        ['소외 (Entfremdung)', '7명', '0.94 (최고치)', '《역사와 계급의식》, 《계몽의 변증법》 등 8권', '물화 → 도구적 이성 → 문화산업 → 생활세계 식민화'],
        ['이데올로기 (Ideologie)', '6명', '0.88', '《옥중수고》, 《이데올로기와 국가기구》 등 6권', '헤게모니 → 이데올로기적 국가기구(ISA) → 호명'],
        ['잉여가치 (Mehrwert)', '5명', '0.81', '《자본론》, 《구별짓기》 등 5권', '문화자본 → 사회적 자본 → 상징폭력 재생산'],
        ['역사적 유물론', '6명', '0.85', '《독일 이데올로기》, 《공론장의 구조변동》 등 7권', '상부구조 상대적 자율성 → 공론장 재봉건화'],
      ],
    },
    3: {
      columns: ['독일 철학 원점', '마르크스의 유물론적 전회', '프랑크푸르트학파 전유', '하버마스의 언어적 전회', '전통의 현대적 귀결'],
      rows: [
        [
          '헤겔: 절대정신과 관념론적 변증법',
          '역사적 유물론: 물질적 생산관계와 계급 모순',
          '아도르노: "부정변증법" - 긍정적 총체성 거부',
          '의사소통적 합리성: 상호이해를 지향하는 담화',
          '주체 철학의 아포리아 극복과 민주적 공론장 복원',
        ],
        [
          '포이어바흐: 종교적 소외와 감성적 유물론',
          '사회적 실천: 소외된 노동 4유형과 변혁적 실천',
          '호르크하이머: 도구적 이성과 계몽의 자기파괴',
          '체계와 생활세계: 화폐/권력 매체에 의한 식민화 비판',
          '비판이론의 규범적 기초 확립',
        ],
      ],
    },
  };

  return (
    <section id="key-questions" className="py-14 bg-white border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8B2616] font-semibold">
            핵심 질문 탐구기 (Research Key Questions & Cypher Engine)
          </span>
          <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
            기획서 3대 핵심 질문 및 데이터 검증
          </h2>
          <p className="text-sm text-[#57534E] mt-2 max-w-3xl">
            단순 조회를 넘어 2개 이상의 복합 관계망(다단계 계보, 매개 중심성, 사상적 전유)을 따라가야 답이 나오는
            핵심 질문을 정의하고, Neo4j Cypher 질의문을 통해 통계적·그래프적으로 검증합니다.
          </p>
        </div>

        {/* 3 Question Tab Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {keyQuestions.map((q) => {
            const isActive = q.id === activeQuestionId;
            return (
              <button
                key={q.id}
                onClick={() => setActiveQuestionId(q.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FAF8F5] border-[#8B2616] shadow-sm ring-1 ring-[#8B2616]/20'
                    : 'bg-white border-[#E7E2D8] hover:border-[#D0C7B7]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className={`font-semibold ${isActive ? 'text-[#8B2616]' : 'text-[#78716C]'}`}>
                    핵심 질문 0{q.id}
                  </span>
                  <span className="text-[11px] text-[#A8A29E]">2단계 이상 관계</span>
                </div>
                <h3 className="font-editorial-serif text-sm font-bold text-[#1C1917] leading-snug line-clamp-2 mb-2">
                  {q.question}
                </h3>
                <div className="text-[11px] text-[#78716C] line-clamp-1 font-mono">
                  {q.relationshipPath.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Question Detailed Investigation Panel */}
        <div className="bg-[#FAF8F5] rounded-xl border border-[#E7E2D8] overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Conceptual Logic & Lineage Breakdown */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#8B2616] uppercase tracking-wider">
                  Question 0{activeQuestion.id} Analysis
                </span>
                <span className="text-xs text-[#78716C]">·</span>
                <span className="text-xs text-[#78716C]">온톨로지 탐색 경로</span>
              </div>

              <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-[#1C1917] mb-3">
                {activeQuestion.question}
              </h3>

              <div className="p-3 bg-white rounded-lg border border-[#E7E2D8] mb-4 text-xs font-mono text-[#8B2616]">
                <strong className="text-[#1C1917] block mb-1">필요한 관계 유형 (Required Path):</strong>
                {activeQuestion.relationshipPath}
              </div>

              <p className="text-sm text-[#57534E] leading-relaxed mb-6">
                {activeQuestion.description}
              </p>

              {/* Step-by-step Conceptual Lineage Flow */}
              <div className="p-4 bg-white rounded-lg border border-[#E7E2D8] mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] mb-3 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B2616]" />
                  개념 변용 및 계보 전이 경로 (Lineage Progression)
                </h4>

                {activeQuestionId === 1 && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#8B2616] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <strong className="text-[#1C1917]">원점 (1844-1867): </strong>
                        <span className="text-[#57534E]">
                          마르크스 《1844 초고》의 <strong>[소외된 노동]</strong> 및 《자본론》의 <strong>[상품 물신성]</strong>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#292524] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <strong className="text-[#1C1917]">초기 서구 마르크스주의 (1923): </strong>
                        <span className="text-[#57534E]">
                          루카치 《역사와 계급의식》에서 부르주아 사회 전체의 보편적 법칙인 <strong>[물화(Verdinglichung)]</strong>로 확장
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                        3
                      </span>
                      <div>
                        <strong className="text-[#1C1917]">비판이론 & 문화사회학 (1947~1979): </strong>
                        <span className="text-[#57534E]">
                          아도르노의 <strong>[도구적 이성/문화산업]</strong> → 부르디외의 <strong>[문화자본/상징폭력]</strong>으로 다차원 변용
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeQuestionId === 2 && (
                  <div className="space-y-2.5 text-xs text-[#57534E]">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E7E2D8]">
                      <span>칼 마르크스 중심성 (Degree Centrality)</span>
                      <strong className="text-[#8B2616] font-mono tabular-nums">26개 직접 연결선</strong>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#E7E2D8]">
                      <span>매개 중심성 (Betweenness Centrality)</span>
                      <strong className="text-[#8B2616] font-mono tabular-nums">0.94 (그래프 1위)</strong>
                    </div>
                    <p className="text-[11px] text-[#78716C] pt-1">
                      마르크스를 거치지 않고서는 독일 관념론에서 20세기 비판사회학(아도르노, 하버마스, 부르디외)으로
                      건너가는 최단 경로가 성립하지 않는 지적 허브(Intellectual Hub)임을 증명.
                    </p>
                  </div>
                )}

                {activeQuestionId === 3 && (
                  <div className="space-y-3 text-xs">
                    <div className="p-2.5 bg-[#FAF8F5] rounded border border-[#E7E2D8]">
                      <span className="font-semibold text-[#8B2616] block mb-1">변증법(Dialektik)의 3단계 전회:</span>
                      <p className="text-[#57534E]">
                        헤겔의 절대정신 관념론 → 마르크스의 생산양식 유물변증법 → 아도르노의 동일성 거부 '부정변증법' → 하버마스의 상호이해 '의사소통행위론'
                      </p>
                    </div>
                    <p className="text-[11px] text-[#78716C]">
                      독일어 원전 개념어(Geist, Entfremdung, Verdinglichung, Lebenswelt)의 계승을 통해
                      독일 지적 전통이 현대 사회학의 비판적 사유 틀로 내재화됨을 규명.
                    </p>
                  </div>
                )}
              </div>

              {/* Research Insight summary */}
              <div className="p-4 rounded-lg bg-[#EAE5DC] border border-[#DDD5C7] text-xs text-[#1C1917]">
                <strong className="block mb-1 font-semibold text-[#8B2616]">학술적 결론 요약:</strong>
                {activeQuestion.queryResultSummary}
              </div>
            </div>

            {/* Right Column: Interactive Cypher Code & Query Result Visualizer */}
            <div className="lg:w-1/2 flex flex-col justify-between">
              <div>
                {/* Cypher Code Box Header */}
                <div className="flex items-center justify-between bg-[#1C1917] text-white px-4 py-2.5 rounded-t-lg border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#8B2616]" />
                    <span className="font-mono text-xs font-semibold">Neo4j Cypher Query #{activeQuestion.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyQuery(activeQuestion.id, activeQuestion.cypherQuery)}
                      className="text-xs text-[#A8A29E] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedQueryId === activeQuestion.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">복사됨</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>쿼리 복사</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleSimulateQuery}
                      disabled={isQueryRunning}
                      className="px-2.5 py-1 text-xs font-medium bg-[#8B2616] hover:bg-[#A32D1B] text-white rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3 h-3" />
                      <span>{isQueryRunning ? '실행 중...' : 'Cypher 실행'}</span>
                    </button>
                  </div>
                </div>

                {/* Cypher Code snippet */}
                <pre className="bg-[#1C1917] text-[#E7E5E4] p-4 text-xs font-mono overflow-x-auto leading-relaxed border-b border-white/10">
                  <code>{activeQuestion.cypherQuery}</code>
                </pre>
              </div>

              {/* Execution Result Table (Tabular Data) */}
              <div className="bg-white rounded-b-lg border border-[#E7E2D8] border-t-0 p-4 mt-0 shadow-xs">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-[#1C1917] flex items-center gap-1.5 font-mono">
                    <CornerDownRight className="w-3.5 h-3.5 text-[#8B2616]" />
                    질의 실행 결과 (Query Return Table)
                  </span>
                  <span className="text-[11px] text-[#78716C] font-mono tabular-nums">
                    {queryResultDatasets[activeQuestionId]?.rows.length}개 레코드 도출
                  </span>
                </div>

                <div className="overflow-x-auto border border-[#E7E2D8] rounded-md max-h-72 overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#FAF8F5] text-[#57534E] font-medium border-b border-[#E7E2D8] sticky top-0">
                      <tr>
                        {queryResultDatasets[activeQuestionId]?.columns.map((col, idx) => (
                          <th key={idx} className="p-2.5 font-mono text-[11px] whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E2D8] text-[#1C1917]">
                      {queryResultDatasets[activeQuestionId]?.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2.5 text-xs whitespace-nowrap">
                              {cIdx === 0 ? (
                                <span className="font-mono font-semibold text-[#8B2616]">{cell}</span>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 text-[11px] text-[#78716C] flex items-center justify-between">
                  <span>* Neo4j Aura Graph Database 시뮬레이션 환경 기반 질의 결과</span>
                  <span className="font-mono text-[#8B2616] font-medium">Cypher 검증 완료</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
