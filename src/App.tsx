import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GraphExplorer } from './components/GraphExplorer';
import { KeyQuestionsSection } from './components/KeyQuestionsSection';
import { OntologySection } from './components/OntologySection';
import { ProposalDocument } from './components/ProposalDocument';
import { ProjectRoadmap } from './components/ProjectRoadmap';
import { CypherModal } from './components/CypherModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isCypherModalOpen, setIsCypherModalOpen] = useState<boolean>(false);
  const [graphQuestionFilter, setGraphQuestionFilter] = useState<number>(0);

  const handleNavigateToGraph = (questionId?: number) => {
    if (questionId) {
      setGraphQuestionFilter(questionId);
    }
    setActiveTab('graph');
    const el = document.getElementById('graph-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToQuestions = () => {
    setActiveTab('questions');
    const el = document.getElementById('key-questions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToDocument = () => {
    setActiveTab('overview');
    const el = document.getElementById('proposal-doc');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#E2D9CC] selection:text-[#1C1917]">
      {/* Top Bar Navigation (§2 Top Bar Contract) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          const map: Record<string, string> = {
            overview: 'proposal-doc',
            graph: 'graph-explorer',
            questions: 'key-questions',
            ontology: 'data-model',
            roadmap: 'roadmap',
          };
          const targetId = map[tab];
          if (targetId) {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        onOpenCypherModal={() => setIsCypherModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Editorial Hero Section */}
        <Hero
          onExploreGraph={() => handleNavigateToGraph()}
          onViewQuestions={handleNavigateToQuestions}
          onViewDocument={handleNavigateToDocument}
        />

        {/* Section 1: Interactive Knowledge Graph Explorer */}
        <GraphExplorer initialQuestionFilter={graphQuestionFilter} />

        {/* Section 2: 3 Key Research Questions & Cypher Engine */}
        <KeyQuestionsSection />

        {/* Section 3: Data Model & 10 Relationships Ontology */}
        <OntologySection />

        {/* Section 4: Formal University Proposal Document (문서번호 173-19-03) */}
        <ProposalDocument />

        {/* Section 5: Project Roadmap, Risk Governance & AI Logs */}
        <ProjectRoadmap />
      </main>

      {/* Academic Footer */}
      <Footer />

      {/* Interactive Cypher Query Simulator Modal */}
      <CypherModal
        isOpen={isCypherModalOpen}
        onClose={() => setIsCypherModalOpen(false)}
      />
    </div>
  );
}
