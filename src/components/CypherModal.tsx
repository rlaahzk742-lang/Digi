import React, { useState } from 'react';
import { X, Play, Copy, Check, Terminal, Database, Code, Sparkles } from 'lucide-react';
import { keyQuestions } from '../data/reportData';

interface CypherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CypherModal: React.FC<CypherModalProps> = ({ isOpen, onClose }) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [customQuery, setCustomQuery] = useState<string>(keyQuestions[0].cypherQuery);
  const [queryOutput, setQueryOutput] = useState<any | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplateIndex(idx);
    setCustomQuery(keyQuestions[idx].cypherQuery);
    setQueryOutput(null);
  };

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      if (selectedTemplateIndex === 0) {
        setQueryOutput({
          matchedNodes: 8,
          relationshipsEvaluated: 14,
          executionTimeMs: 12,
          records: [
            { path: '칼 마르크스 <-[협력]- 프리드리히 엥겔스', hop: 1, type: '정통 마르크스주의' },
            { path: '칼 마르크스 <-[옹호적 승계]- 게오르기 루카치', hop: 1, type: '초기 서구 마르크스주의' },
            { path: '칼 마르크스 <-[비판적 승계]- 안토니오 그람시', hop: 1, type: '초기 서구 마르크스주의' },
            { path: '칼 마르크스 <-[비판적 승계]- 테오도어 아도르노', hop: 2, type: '프랑크푸르트학파' },
            { path: '칼 마르크스 <-[비판적 승계]- 루이 알튀세르', hop: 2, type: '구조주의 마르크스주의' },
            { path: '칼 마르크스 <-[비판적 승계]- 위르겐 하버마스', hop: 3, type: '프랑크푸르트 2세대' },
            { path: '칼 마르크스 <-[비판적 승계]- 피에르 부르디외', hop: 3, type: '비판적 문화사회학' },
          ],
        });
      } else if (selectedTemplateIndex === 1) {
        setQueryOutput({
          matchedNodes: 12,
          relationshipsEvaluated: 26,
          executionTimeMs: 9,
          records: [
            { concept: '소외 (Entfremdung)', successors: 7, names: '루카치, 아도르노, 하버마스, 부르디외 외' },
            { concept: '이데올로기 (Ideologie)', successors: 6, names: '그람시, 알튀세르, 아도르노 외' },
            { concept: '잉여가치 (Mehrwert)', successors: 5, names: '부르디외, 루카치 외' },
            { concept: '역사적 유물론', successors: 6, names: '알튀세르, 하버마스, 아도르노 외' },
          ],
        });
      } else {
        setQueryOutput({
          matchedNodes: 6,
          relationshipsEvaluated: 11,
          executionTimeMs: 15,
          records: [
            { thinker: '칼 마르크스', school: '정통 마르크스주의', work: '자본론', concept: '역사적 유물론' },
            { thinker: '테오도어 아도르노', school: '프랑크푸르트학파', work: '부정변증법', concept: '도구적 이성' },
            { thinker: '위르겐 하버마스', school: '프랑크푸르트학파 2세대', work: '의사소통행위론', concept: '의사소통행위' },
          ],
        });
      }
    }, 350);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customQuery);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FAF8F5] border border-[#DDD6C8] rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E2D8] bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8B2616] text-white flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-[#1C1917]">
                Neo4j Cypher 쿼리 시뮬레이터 (Cypher Engine)
              </h3>
              <p className="text-xs text-[#78716C]">
                기획서의 핵심 3대 질문을 검증하는 그래프 쿼리 샌드박스
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4F1EA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-semibold text-[#1C1917] mb-2 block font-mono">
              사전 정의된 검증 쿼리 선택 (Select Question Query):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {keyQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleSelectTemplate(idx)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    selectedTemplateIndex === idx
                      ? 'bg-white border-[#8B2616] text-[#8B2616] font-semibold shadow-xs'
                      : 'bg-white/60 border-[#E7E2D8] text-[#57534E] hover:bg-white'
                  }`}
                >
                  <span className="font-mono block text-[10px] text-[#78716C]">질문 0{q.id}</span>
                  <span className="line-clamp-1">{q.question}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Editor Container */}
          <div className="rounded-lg overflow-hidden border border-[#1C1917]">
            <div className="flex items-center justify-between bg-[#1C1917] px-4 py-2 text-xs text-white">
              <div className="flex items-center gap-2 font-mono">
                <Code className="w-3.5 h-3.5 text-[#8B2616]" />
                <span>Cypher Editor</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="text-xs text-[#A8A29E] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? '복사됨' : '복사'}</span>
                </button>
                <button
                  onClick={handleRunQuery}
                  disabled={isRunning}
                  className="px-3 py-1 bg-[#8B2616] hover:bg-[#A32D1B] text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isRunning ? '질의 실행 중...' : 'Run Query'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              rows={6}
              className="w-full bg-[#1C1917] text-[#E7E5E4] font-mono text-xs p-4 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Query Result Section */}
          {queryOutput && (
            <div className="p-4 rounded-lg bg-white border border-[#E7E2D8] text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E2D8] mb-3">
                <span className="font-mono font-semibold text-[#8B2616] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  Execution Result (Graph Records)
                </span>
                <span className="text-[11px] font-mono text-[#78716C]">
                  {queryOutput.matchedNodes}개 노드 매칭 · {queryOutput.executionTimeMs}ms 소요
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <tbody className="divide-y divide-[#E7E2D8]">
                    {queryOutput.records.map((rec: any, idx: number) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]">
                        <td className="p-2 font-semibold text-[#1C1917]">#{idx + 1}</td>
                        {Object.entries(rec).map(([key, val]) => (
                          <td key={key} className="p-2 text-[#57534E]">
                            <span className="text-[10px] text-[#A8A29E] block uppercase">{key}</span>
                            <span>{String(val)}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E7E2D8] bg-white flex justify-between items-center text-xs text-[#78716C]">
          <span>* 본 쿼리는 Neo4j Aura Graph Database 온톨로지 명세를 준수합니다.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-[#1C1917] bg-[#FAF8F5] hover:bg-[#F3EFE8] rounded border border-[#DCD5C9] transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
