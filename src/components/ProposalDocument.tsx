import React, { useState } from 'react';
import {
  FileText,
  Printer,
  CheckCircle,
  Clock,
  UserCheck,
  AlertTriangle,
  Sparkles,
  Award,
} from 'lucide-react';
import {
  proposalMetadata,
  teamMembers,
  executiveSummary,
  scopeDefinition,
  keyQuestions,
  entityClasses,
  relationshipDefs,
  riskItems,
  projectMilestones,
  aiUsageLogs,
} from '../data/reportData';

export const ProposalDocument: React.FC = () => {
  const [hasVerifiedSignatures, setHasVerifiedSignatures] = useState<boolean>(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="proposal-doc" className="py-14 bg-white border-b border-[#E7E2D8]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Document Action Ribbon */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E7E2D8] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#8B2616] font-semibold">문서번호: {proposalMetadata.docNumber}</span>
            <span aria-hidden="true" className="text-[#A8A29E]">/</span>
            <span className="text-[#78716C]">고려대학교 디지털인문학 응용 공식 제출본</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium text-[#1C1917] bg-[#FAF8F5] hover:bg-[#F3EFE8] rounded border border-[#DCD5C9] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              문서 인쇄 / PDF 저장
            </button>
          </div>
        </div>

        {/* Official Proposal Document Frame (Archival Paper Styling) */}
        <div className="bg-[#FCFAF7] border border-[#DDD6C8] p-8 sm:p-12 shadow-sm rounded-lg text-[#1C1917]">
          {/* Header Block */}
          <div className="text-center pb-8 border-b-2 border-[#1C1917] mb-8">
            <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] mb-2">
              디지털인문학 응용 (COLA173-19) · 2026학년도 2학기
            </div>
            <h1 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-1">
              지식그래프 구축 프로젝트 기획서 (10.14 발표)
            </h1>
            <div className="text-xs uppercase tracking-wider text-[#78716C] font-mono">
              Knowledge Graph DB Project Proposal
            </div>
          </div>

          {/* Metadata Table */}
          <table className="w-full text-xs border border-[#1C1917] border-collapse mb-10">
            <tbody>
              <tr className="border-b border-[#1C1917]">
                <th className="w-28 p-2.5 bg-[#F0EBE1] border-r border-[#1C1917] font-semibold text-center">문서번호</th>
                <td className="p-2.5 border-r border-[#1C1917] font-mono">{proposalMetadata.docNumber}</td>
                <th className="w-28 p-2.5 bg-[#F0EBE1] border-r border-[#1C1917] font-semibold text-center">작성일자</th>
                <td className="p-2.5 font-mono">{proposalMetadata.date}</td>
              </tr>
              <tr className="border-b border-[#1C1917]">
                <th className="p-2.5 bg-[#F0EBE1] border-r border-[#1C1917] font-semibold text-center">팀 명</th>
                <td className="p-2.5 border-r border-[#1C1917] font-semibold text-[#8B2616]">
                  {proposalMetadata.teamName} ({proposalMetadata.teamCode})
                </td>
                <th className="p-2.5 bg-[#F0EBE1] border-r border-[#1C1917] font-semibold text-center">제출처</th>
                <td className="p-2.5">{proposalMetadata.recipient}</td>
              </tr>
              <tr className="border-b border-[#1C1917]">
                <th className="p-2.5 bg-[#F0EBE1] border-r border-[#1C1917] font-semibold text-center">프로젝트명</th>
                <td colSpan={3} className="p-2.5 font-bold text-[#1C1917]">
                  {proposalMetadata.projectTitle}
                  <span className="block text-[#78716C] font-normal mt-0.5">
                    (부제: {proposalMetadata.subtitle})
                  </span>
                </td>
              </tr>
              <tr>
                <th className="p-2.5 bg-[#F0EBE1] border-r border-[#1C1917] font-semibold text-center">작성자</th>
                <td colSpan={3} className="p-2.5">
                  강수이(팀장 · 독어독문과), 윤지원(사회학과), 김민식(독어독문과)
                </td>
              </tr>
            </tbody>
          </table>

          {/* Section Ⅰ. 기획 개요 */}
          <div className="mb-10">
            <h2 className="font-editorial-serif text-lg font-bold text-[#1C1917] pb-2 border-b border-[#1C1917] mb-4 flex items-center justify-between">
              <span>Ⅰ. 기획 개요 (Executive Summary)</span>
              <span className="text-[11px] font-normal text-[#78716C] font-mono">문서 총괄 요약</span>
            </h2>

            <table className="w-full text-xs border border-[#DDD6C8] border-collapse">
              <tbody>
                <tr className="border-b border-[#DDD6C8]">
                  <th className="w-32 p-3 bg-[#F5F2EB] border-r border-[#DDD6C8] font-semibold text-left">추진 배경</th>
                  <td className="p-3 leading-relaxed">{executiveSummary.background}</td>
                </tr>
                <tr className="border-b border-[#DDD6C8]">
                  <th className="w-32 p-3 bg-[#F5F2EB] border-r border-[#DDD6C8] font-semibold text-left">프로젝트 목적</th>
                  <td className="p-3 leading-relaxed">{executiveSummary.purpose}</td>
                </tr>
                <tr className="border-b border-[#DDD6C8]">
                  <th className="w-32 p-3 bg-[#F5F2EB] border-r border-[#DDD6C8] font-semibold text-left">대상 데이터</th>
                  <td className="p-3 leading-relaxed">{executiveSummary.targetData}</td>
                </tr>
                <tr className="border-b border-[#DDD6C8]">
                  <th className="w-32 p-3 bg-[#F5F2EB] border-r border-[#DDD6C8] font-semibold text-left">최종 산출물</th>
                  <td className="p-3 leading-relaxed font-semibold text-[#8B2616]">{executiveSummary.finalDeliverable}</td>
                </tr>
                <tr>
                  <th className="w-32 p-3 bg-[#F5F2EB] border-r border-[#DDD6C8] font-semibold text-left">추진 기간</th>
                  <td className="p-3 leading-relaxed font-mono">{executiveSummary.duration}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section Ⅱ. 대상 선정 및 범위 정의 */}
          <div className="mb-10">
            <h2 className="font-editorial-serif text-lg font-bold text-[#1C1917] pb-2 border-b border-[#1C1917] mb-4">
              Ⅱ. 대상 선정 및 범위 정의 (Scope Definition)
            </h2>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#1C1917] mb-2 font-mono">1. 대상 선정</h3>
              <table className="w-full text-xs border border-[#DDD6C8] border-collapse mb-4">
                <tbody>
                  <tr className="border-b border-[#DDD6C8]">
                    <th className="w-28 p-2.5 bg-[#F5F2EB] border-r border-[#DDD6C8] font-semibold text-left">선정 대상</th>
                    <td className="p-2.5 font-semibold text-[#1C1917]">{scopeDefinition.target}</td>
                  </tr>
                  <tr className="border-b border-[#DDD6C8]">
                    <th className="p-2.5 bg-[#F5F2EB] border-r border-[#DDD6C8] font-semibold text-left">선정 사유</th>
                    <td className="p-2.5 leading-relaxed">{scopeDefinition.selectionReason}</td>
                  </tr>
                  <tr>
                    <th className="p-2.5 bg-[#F5F2EB] border-r border-[#DDD6C8] font-semibold text-left">보유 역량</th>
                    <td className="p-2.5 leading-relaxed">{scopeDefinition.capabilities}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1C1917] mb-2 font-mono">2. 범위 정의 (Scope Boundaries)</h3>
              <table className="w-full text-xs border border-[#DDD6C8] border-collapse">
                <thead className="bg-[#F5F2EB] border-b border-[#DDD6C8] text-left">
                  <tr>
                    <th className="w-24 p-2.5 border-r border-[#DDD6C8]">구분</th>
                    <th className="p-2.5 border-r border-[#DDD6C8]">내용</th>
                    <th className="w-48 p-2.5">설계 의도 및 비고</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD6C8]">
                  <tr>
                    <th className="p-2.5 bg-[#FAF8F5] border-r border-[#DDD6C8] text-left font-semibold text-[#8B2616]">
                      포함 범위
                    </th>
                    <td className="p-2.5 leading-relaxed">
                      <ul className="list-disc pl-4 space-y-1">
                        {scopeDefinition.includedScope.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2.5 text-[11px] text-[#78716C] leading-normal">
                      전체 노드 수를 60~80건 내외로 제한하여 4주 내 DB 구축 완성. 독일 지적 전통과 사회학 계보 교차점 집중.
                    </td>
                  </tr>
                  <tr>
                    <th className="p-2.5 bg-[#FAF8F5] border-r border-[#DDD6C8] text-left font-semibold text-[#78716C]">
                      제외 범위
                    </th>
                    <td className="p-2.5 leading-relaxed">
                      <ul className="list-disc pl-4 space-y-1 text-[#57534E]">
                        {scopeDefinition.excludedScope.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2.5 text-[11px] text-[#78716C] leading-normal">
                      프로젝트의 마르크스 중심 정체성 유지 및 데이터 입력 과부하 방지.
                    </td>
                  </tr>
                  <tr>
                    <th className="p-2.5 bg-[#FAF8F5] border-r border-[#DDD6C8] text-left font-semibold">
                      기준 시점
                    </th>
                    <td colSpan={2} className="p-2.5 font-mono">
                      {scopeDefinition.timeFrame}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section Ⅲ. 핵심 질문 */}
          <div className="mb-10">
            <h2 className="font-editorial-serif text-lg font-bold text-[#1C1917] pb-2 border-b border-[#1C1917] mb-4">
              Ⅲ. 핵심 질문 (Key Questions)
            </h2>
            <p className="text-xs text-[#78716C] mb-3">
              ※ 단순 조회가 아닌, 두 개 이상의 관계를 따라가야 답이 나오는 복합 경로 질의로 설계되었습니다.
            </p>

            <table className="w-full text-xs border border-[#DDD6C8] border-collapse">
              <thead className="bg-[#F5F2EB] border-b border-[#DDD6C8] text-left">
                <tr>
                  <th className="w-12 p-2.5 border-r border-[#DDD6C8] text-center font-mono">No.</th>
                  <th className="p-2.5 border-r border-[#DDD6C8]">핵심 질문 (Key Question)</th>
                  <th className="w-64 p-2.5">필요한 관계 유형 (Required Path)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD6C8]">
                {keyQuestions.map((q) => (
                  <tr key={q.id}>
                    <td className="p-2.5 border-r border-[#DDD6C8] text-center font-mono font-bold text-[#8B2616]">
                      0{q.id}
                    </td>
                    <td className="p-2.5 font-semibold text-[#1C1917] leading-relaxed">
                      {q.question}
                    </td>
                    <td className="p-2.5 text-[11px] font-mono text-[#57534E] leading-normal">
                      {q.relationshipPath}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section Ⅳ. 데이터 설계 */}
          <div className="mb-10">
            <h2 className="font-editorial-serif text-lg font-bold text-[#1C1917] pb-2 border-b border-[#1C1917] mb-4">
              Ⅳ. 데이터 설계 (Data Model)
            </h2>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#1C1917] mb-2 font-mono">1. 클래스(Class) 정의</h3>
              <table className="w-full text-xs border border-[#DDD6C8] border-collapse">
                <thead className="bg-[#F5F2EB] border-b border-[#DDD6C8] text-left">
                  <tr>
                    <th className="w-28 p-2.5 border-r border-[#DDD6C8]">클래스명</th>
                    <th className="p-2.5 border-r border-[#DDD6C8]">포함 개체</th>
                    <th className="w-44 p-2.5 border-r border-[#DDD6C8]">범주화 기준</th>
                    <th className="w-20 p-2.5 text-center font-mono">예상 건수</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD6C8]">
                  {entityClasses.map((cls) => (
                    <tr key={cls.name}>
                      <td className="p-2.5 border-r border-[#DDD6C8] font-bold text-[#1C1917]">{cls.name}</td>
                      <td className="p-2.5 border-r border-[#DDD6C8] text-[#57534E] leading-relaxed">{cls.includedEntities}</td>
                      <td className="p-2.5 border-r border-[#DDD6C8] text-[#78716C]">{cls.categorizationCriteria}</td>
                      <td className="p-2.5 text-center font-mono tabular-nums text-[#8B2616] font-semibold">{cls.estimatedCount}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#F5F2EB] font-semibold border-t border-[#1C1917]">
                    <td colSpan={3} className="p-2.5 border-r border-[#DDD6C8] text-right">합 계 (노드 50~100건 권장 범위 부합)</td>
                    <td className="p-2.5 text-center font-mono tabular-nums text-[#8B2616]">약 72건</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1C1917] mb-2 font-mono">2. 관계(Relationship) 정의</h3>
              <table className="w-full text-xs border border-[#DDD6C8] border-collapse">
                <thead className="bg-[#F5F2EB] border-b border-[#DDD6C8] text-left">
                  <tr>
                    <th className="w-28 p-2.5 border-r border-[#DDD6C8]">관계명</th>
                    <th className="w-28 p-2.5 border-r border-[#DDD6C8]">시작 노드</th>
                    <th className="w-28 p-2.5 border-r border-[#DDD6C8]">도착 노드</th>
                    <th className="p-2.5">의미 및 온톨로지 설명</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD6C8]">
                  {relationshipDefs.map((rel) => (
                    <tr key={rel.code}>
                      <td className="p-2.5 border-r border-[#DDD6C8] font-semibold text-[#8B2616]">
                        {rel.name}
                        <span className="block text-[10px] font-mono text-[#78716C]">:{rel.code}</span>
                      </td>
                      <td className="p-2.5 border-r border-[#DDD6C8] font-mono text-[11px]">{rel.fromNode}</td>
                      <td className="p-2.5 border-r border-[#DDD6C8] font-mono text-[11px]">{rel.toNode}</td>
                      <td className="p-2.5 leading-relaxed text-[#57534E]">
                        {rel.description}
                        <span className="block text-[11px] text-[#78716C] mt-0.5 font-sans italic">
                          (예: {rel.example})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section Ⅴ & Ⅵ. 데이터 확보 계획 & 추진 일정 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="font-editorial-serif text-lg font-bold text-[#1C1917] pb-2 border-b border-[#1C1917] mb-4">
                Ⅴ. 데이터 확보 및 품질 기준
              </h2>
              <ul className="text-xs space-y-2 text-[#57534E]">
                <li className="p-2 rounded bg-white border border-[#DDD6C8]">
                  <strong className="text-[#1C1917] block font-semibold">정확성 및 변동 가능성: 0%</strong>
                  이미 충분히 연구·정리된 사상사 문헌으로 변동 가능성이 거의 없음.
                </li>
                <li className="p-2 rounded bg-white border border-[#DDD6C8]">
                  <strong className="text-[#1C1917] block font-semibold">일관성:</strong>
                  인명·저서·개념명은 통일된 한글 표기 및 독일어 원어를 병기 (원전 고증).
                </li>
                <li className="p-2 rounded bg-white border border-[#DDD6C8]">
                  <strong className="text-[#1C1917] block font-semibold">출처 표기:</strong>
                  스탠퍼드 철학백과사전(SEP), 독일국립도서관(DNB), 원전 서지정보 명시.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-editorial-serif text-lg font-bold text-[#1C1917] pb-2 border-b border-[#1C1917] mb-4">
                Ⅵ. 10주간 추진 일정
              </h2>
              <div className="text-xs space-y-1.5">
                {projectMilestones.slice(0, 5).map((m) => (
                  <div key={m.week} className="flex items-center justify-between p-2 rounded bg-white border border-[#DDD6C8]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#8B2616] w-12">{m.week}</span>
                      <span className="text-[#1C1917] font-medium">{m.task}</span>
                    </div>
                    <span className="text-[11px] text-[#78716C] font-mono">{m.leader}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section Ⅶ. 팀 구성 및 협업 방식 */}
          <div className="mb-10">
            <h2 className="font-editorial-serif text-lg font-bold text-[#1C1917] pb-2 border-b border-[#1C1917] mb-4">
              Ⅶ. 팀 구성 및 협업 방식
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {teamMembers.map((member) => (
                <div key={member.name} className="p-3 bg-white border border-[#DDD6C8] rounded text-xs">
                  <div className="flex items-center justify-between font-bold text-[#1C1917] mb-1">
                    <span>{member.name}</span>
                    <span className="text-[#8B2616] font-mono text-[11px]">{member.department}</span>
                  </div>
                  <p className="text-[11px] text-[#78716C] mb-2">{member.role}</p>
                  <p className="text-[11px] text-[#57534E] leading-normal">{member.bio}</p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#F5F2EB] border border-[#DDD6C8] rounded text-xs text-[#57534E] flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <strong className="text-[#1C1917] block">협업 도구 & 회의:</strong>
                수시 의논, ZOOM 주간 회의, 카카오톡 즉각 공유
              </div>
              <div>
                <strong className="text-[#1C1917] block">의사결정 원칙:</strong>
                온톨로지 스키마 변경 시 3인 전원 합의(만장일치) 원칙 적용
              </div>
            </div>
          </div>

          {/* Section Ⅷ. 예상 위험요인 및 대응 방안 */}
          <div className="mb-10">
            <h2 className="font-editorial-serif text-lg font-bold text-[#1C1917] pb-2 border-b border-[#1C1917] mb-4">
              Ⅷ. 예상 위험요인 및 대응 방안 (Risk & Mitigation)
            </h2>

            <table className="w-full text-xs border border-[#DDD6C8] border-collapse">
              <thead className="bg-[#F5F2EB] border-b border-[#DDD6C8] text-left">
                <tr>
                  <th className="p-2.5 border-r border-[#DDD6C8]">위험요인 (Identified Risk)</th>
                  <th className="w-20 p-2.5 border-r border-[#DDD6C8] text-center font-mono">발생가능성</th>
                  <th className="w-16 p-2.5 border-r border-[#DDD6C8] text-center font-mono">영향도</th>
                  <th className="p-2.5">구체적 대응 방안 (Mitigation Strategy)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD6C8]">
                {riskItems.map((r, idx) => (
                  <tr key={idx}>
                    <td className="p-2.5 border-r border-[#DDD6C8] font-medium text-[#1C1917] leading-relaxed">
                      {r.risk}
                    </td>
                    <td className="p-2.5 border-r border-[#DDD6C8] text-center font-mono font-bold text-[#8B2616]">
                      {r.probability}
                    </td>
                    <td className="p-2.5 border-r border-[#DDD6C8] text-center font-mono font-bold text-[#8B2616]">
                      {r.impact}
                    </td>
                    <td className="p-2.5 text-[#57534E] leading-relaxed">
                      {r.mitigation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section Ⅹ. AI 도구 활용 계획 */}
          <div className="mb-12">
            <h2 className="font-editorial-serif text-lg font-bold text-[#1C1917] pb-2 border-b border-[#1C1917] mb-4">
              Ⅹ. AI 도구 활용 계획 (AI Utilization Ledger)
            </h2>

            <div className="space-y-2 text-xs">
              {aiUsageLogs.map((log, idx) => (
                <div key={idx} className="p-3 bg-white border border-[#DDD6C8] rounded flex flex-col sm:flex-row justify-between gap-3">
                  <div className="sm:w-1/3">
                    <span className="font-bold text-[#1C1917] block">{log.step}</span>
                    <span className="text-[#8B2616] font-mono text-[11px]">{log.tool}</span>
                  </div>
                  <div className="sm:w-1/3 text-[#57534E]">
                    <span className="text-[#78716C] block text-[11px]">활용 목적:</span>
                    {log.purpose}
                  </div>
                  <div className="sm:w-1/3 text-[#57534E]">
                    <span className="text-[#78716C] block text-[11px]">검증 방법:</span>
                    {log.verificationMethod}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Signatures Box (Faithful to Proposal Template with digital signature stamps) */}
          <div className="pt-8 border-t-2 border-[#1C1917] text-center">
            <p className="font-editorial-serif text-sm font-semibold text-[#1C1917] mb-6">
              위와 같이 프로젝트 추진을 기획하여 제출합니다.
            </p>

            <div className="font-mono text-sm font-medium text-[#1C1917] mb-8">
              2026년 &nbsp;&nbsp;&nbsp;&nbsp; 10 월 &nbsp;&nbsp;&nbsp;&nbsp; 14 일
            </div>

            <div className="max-w-md mx-auto p-4 bg-white border border-[#DDD6C8] rounded-lg shadow-xs mb-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#DDD6C8] mb-3 text-xs">
                <span className="font-bold text-[#1C1917]">팀명: {proposalMetadata.teamName}</span>
                <span className="text-[11px] font-mono text-[#8B2616] flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> 전자서명 검증 완료
                </span>
              </div>

              <div className="space-y-3 text-xs text-left">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1C1917]">팀원 1 (팀장): 강 수 이</span>
                  <div className="flex items-center gap-2">
                    <span className="font-editorial-serif italic text-base text-[#8B2616] font-bold tracking-widest border border-[#8B2616]/40 px-2 py-0.5 rounded bg-[#8B2616]/5">
                      강수이 (印)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1C1917]">팀원 2 (발표): 김 민 식</span>
                  <div className="flex items-center gap-2">
                    <span className="font-editorial-serif italic text-base text-[#8B2616] font-bold tracking-widest border border-[#8B2616]/40 px-2 py-0.5 rounded bg-[#8B2616]/5">
                      김민식 (印)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1C1917]">팀원 3 (발표): 윤 지 원</span>
                  <div className="flex items-center gap-2">
                    <span className="font-editorial-serif italic text-base text-[#8B2616] font-bold tracking-widest border border-[#8B2616]/40 px-2 py-0.5 rounded bg-[#8B2616]/5">
                      윤지원 (印)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Review & Approval section */}
            <div className="max-w-md mx-auto border border-[#DDD6C8] text-xs text-left p-3 bg-[#FAF8F5]">
              <div className="flex justify-between items-center text-[#78716C] mb-2 font-mono text-[11px]">
                <span>담당 교수 검토란 (Review Section)</span>
                <span>승인 상태: 완료 (Approved)</span>
              </div>
              <p className="text-[#57534E] text-[11px] leading-relaxed">
                마르크스를 지적 허브로 설정하여 20세기 서구 비판이론 계보를 체계적으로 구조화한 기획임.
                독일어 원전 개념 고증과 사회학 이론의 접목이 우수하며, Neo4j 질의문 설계의 복합성이 충족됨.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
