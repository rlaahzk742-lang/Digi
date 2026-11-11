import React from 'react';
import { proposalMetadata, teamMembers } from '../data/reportData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E7E2D8] py-12 text-[#78716C]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#E7E2D8]">
          <div className="md:col-span-2">
            <h3 className="font-editorial-serif text-lg font-bold text-[#1C1917] mb-2">
              인낫망 (C팀) · 사회학 이론 계보 지식그래프
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed max-w-md mb-3">
              고려대학교 디지털인문학 응용 (COLA173-19) 2026학년도 2학기 지식그래프 구축 프로젝트 기획서.
              칼 마르크스를 지적 허브로 하여 20세기 서구 비판이론과 문화사회학의 계보적 전이를 온톨로지로 규명합니다.
            </p>
            <div className="text-xs font-mono text-[#8B2616]">
              문서번호: {proposalMetadata.docNumber} · 발표일: {proposalMetadata.presentationDate}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono font-bold text-[#1C1917] tracking-wider mb-3">
              팀원 및 전공 구성
            </h4>
            <ul className="text-xs space-y-1.5 text-[#57534E]">
              {teamMembers.map((m) => (
                <li key={m.name} className="flex items-center justify-between">
                  <span>{m.name} ({m.department})</span>
                  <span className="text-[#78716C] font-mono text-[11px]">{m.role.split('·')[0]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono font-bold text-[#1C1917] tracking-wider mb-3">
              교과목 정보
            </h4>
            <div className="text-xs space-y-1 text-[#57534E]">
              <div>{proposalMetadata.courseName}</div>
              <div className="font-mono text-[11px] text-[#78716C]">{proposalMetadata.courseCode} · 2026-2학기</div>
              <div className="text-[#78716C]">제출처: {proposalMetadata.recipient}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8A29E] gap-2">
          <div>
            © 2026 팀 인낫망 (강수이, 김민식, 윤지원). All rights reserved.
          </div>
          <div className="font-mono text-[11px]">
            Neo4j Knowledge Graph & Digital Humanities Project Proposal
          </div>
        </div>
      </div>
    </footer>
  );
};
