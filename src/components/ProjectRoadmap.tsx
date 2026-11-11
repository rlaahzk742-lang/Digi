import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  Users,
  Target,
  ArrowUpRight,
} from 'lucide-react';
import { projectMilestones, riskItems, teamMembers, aiUsageLogs } from '../data/reportData';

export const ProjectRoadmap: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  return (
    <section id="roadmap" className="py-14 bg-[#FAF8F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8B2616] font-semibold">
            추진 계획 및 위험 관리 (Roadmap & Risk Governance)
          </span>
          <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
            10주 프로젝트 로드맵과 품질 보증
          </h2>
          <p className="text-sm text-[#57534E] mt-2 max-w-3xl">
            주차별 책임자(당번) 제도를 통해 기획부터 데이터 입력, Cypher 질의 검증, 인터랙티브 시각화,
            그리고 최종 발표까지 단계적 품질 검증을 수행합니다.
          </p>
        </div>

        {/* 10-Week Milestone Interactive Timeline */}
        <div className="bg-white rounded-xl border border-[#E7E2D8] p-6 sm:p-8 mb-10 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D8] mb-6">
            <div>
              <h3 className="font-editorial-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#8B2616]" />
                10주간 주차별 마일스톤 (Week 6 ~ Week 16)
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                당번 책임자 운영 및 전원 데이터 교차 검증 체계
              </p>
            </div>
            <span className="text-xs font-mono bg-[#FAF8F5] px-3 py-1.5 rounded border border-[#E7E2D8] text-[#8B2616] font-semibold">
              총 8개 주요 산출물
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
            {projectMilestones.map((m, idx) => {
              const isSelected = selectedMilestone === idx;
              return (
                <button
                  key={m.week}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#8B2616] text-white border-[#701E11] shadow-xs'
                      : 'bg-[#FAF8F5] border-[#E7E2D8] hover:bg-white text-[#1C1917]'
                  }`}
                >
                  <div className={`text-[11px] font-mono font-bold mb-1 ${isSelected ? 'text-white/80' : 'text-[#8B2616]'}`}>
                    {m.week}
                  </div>
                  <div className="text-xs font-semibold line-clamp-1 leading-snug">
                    {m.task.split(' ')[0]}
                  </div>
                  <div className={`text-[10px] mt-1 font-mono truncate ${isSelected ? 'text-white/70' : 'text-[#78716C]'}`}>
                    {m.leader}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          {projectMilestones[selectedMilestone] && (
            <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E7E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8B2616] block mb-1">
                  {projectMilestones[selectedMilestone].week} 중점 추진 사항
                </span>
                <h4 className="font-editorial-serif text-base font-bold text-[#1C1917]">
                  {projectMilestones[selectedMilestone].task}
                </h4>
                <p className="text-xs text-[#57534E] mt-1">
                  최종 산출물: <strong className="text-[#1C1917]">{projectMilestones[selectedMilestone].output}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[11px] text-[#78716C] block font-mono">주차 책임자</span>
                  <strong className="text-xs text-[#1C1917] font-semibold">
                    {projectMilestones[selectedMilestone].leader}
                  </strong>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#8B2616]/10 text-[#8B2616] flex items-center justify-center font-bold text-xs">
                  {selectedMilestone + 1}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Team Collaboration & Department Synergy */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-editorial-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#8B2616]" />
              팀 구성 및 학제간 융합 시너지 (Interdisciplinary Synergy)
            </h3>
            <span className="text-xs text-[#78716C] font-mono">고려대 독어독문과 × 사회학과</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl border border-[#E7E2D8] p-5 shadow-xs hover:border-[#D0C7B7] transition-all"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D8] mb-3">
                  <div>
                    <h4 className="font-editorial-serif text-lg font-bold text-[#1C1917]">
                      {member.name}
                    </h4>
                    <span className="text-xs text-[#8B2616] font-mono font-medium">
                      {member.department}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E7E2D8] text-[#57534E]">
                    {member.role.split('·')[0].trim()}
                  </span>
                </div>

                <p className="text-xs text-[#1C1917] font-semibold mb-2">{member.role}</p>
                <p className="text-xs text-[#57534E] leading-relaxed mb-4">{member.bio}</p>

                <div className="text-[11px] text-[#78716C] font-mono flex items-center justify-between pt-2 border-t border-[#E7E2D8]">
                  <span>소통 채널: {member.contact}</span>
                  <span className="text-[#8B2616]">전체 데이터 공동 입력</span>
                </div>
              </div>
            ))}
          </div>

          {/* Decision-making Rules Banner */}
          <div className="p-4 rounded-xl bg-white border border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#57534E]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8B2616]" />
              <span>
                <strong className="text-[#1C1917]">의사결정 원칙:</strong> 온톨로지(노드·관계·속성) 수정 시 즉각 안건 공유 및 3인 전원 합의(만장일치) 원칙 준수
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[#78716C] whitespace-nowrap">
              <span>정기 회의: 수시 온라인 토의</span>
            </div>
          </div>
        </div>

        {/* Expected Impact 3-Pillars */}
        <div className="mb-10">
          <h3 className="font-editorial-serif text-xl font-bold text-[#1C1917] mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#8B2616]" />
            프로젝트 기대효과 (Expected Impact)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-[#E7E2D8] p-5 shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-[#8B2616] font-bold block mb-1">
                학술적 효과 (Academic)
              </span>
              <h4 className="font-editorial-serif text-base font-bold text-[#1C1917] mb-2">
                파편화된 사상사의 구조적 계보화
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                단순한 시대순 나열을 벗어나, "계승·비판·재구성"이라는 3차원 관계망으로 사상사를 구조화하여
                사회학 이론의 역사적 맥락과 내재적 모순 극복 과정을 객관적 데이터로 분석할 수 있는 토대를 마련합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E7E2D8] p-5 shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-[#8B2616] font-bold block mb-1">
                활용 가능성 (Application)
              </span>
              <h4 className="font-editorial-serif text-base font-bold text-[#1C1917] mb-2">
                인터랙티브 학술 교육 도구
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                사회학 입문자 및 학술 연구자가 복잡한 20세기 서구 이론(루카치, 아도르노, 하버마스, 부르디외)의
                개념 전이 경로(소외→물화→도구적이성→소통행위)를 시각적으로 직접 클릭하며 학습하는 교육 플랫폼으로 확장 가능합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#E7E2D8] p-5 shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-[#8B2616] font-bold block mb-1">
                팀 역량 강화 (Competence)
              </span>
              <h4 className="font-editorial-serif text-base font-bold text-[#1C1917] mb-2">
                디지털인문학 데이터 모델링 실무
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                독일어 철학 원전에서 개체와 관계를 추출하고, 이를 Neo4j 그래프 데이터베이스와 Cypher 질의문으로
                추상화·적재하는 인문·사회과학 데이터 엔지니어링 전 과정을 체화합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
