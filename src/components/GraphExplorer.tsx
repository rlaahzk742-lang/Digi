import React, { useState, useMemo } from 'react';
import {
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Info,
  BookOpen,
  X,
  Share2,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { graphNodes, graphEdges, GraphNode, NodeType } from '../data/graphData';

interface GraphExplorerProps {
  initialQuestionFilter?: number;
}

export const GraphExplorer: React.FC<GraphExplorerProps> = ({ initialQuestionFilter = 0 }) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(
    graphNodes.find((n) => n.id === 'thinker-marx') || null
  );
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [questionFilter, setQuestionFilter] = useState<number>(initialQuestionFilter);
  const [layoutMode, setLayoutMode] = useState<'timeline' | 'radial' | 'concept'>('timeline');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return graphNodes.filter((node) => {
      // Type filter
      if (typeFilter !== 'all' && node.type !== typeFilter) return false;

      // Question filter
      if (questionFilter > 0) {
        const edgeInQuestion = graphEdges.some(
          (e) =>
            e.highlightInQuestion === questionFilter &&
            (e.source === node.id || e.target === node.id)
        );
        if (!edgeInQuestion && node.id !== 'thinker-marx') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = node.name.toLowerCase().includes(query);
        const matchesOrig = node.originalName?.toLowerCase().includes(query) ?? false;
        const matchesDesc = node.description.toLowerCase().includes(query);
        if (!matchesName && !matchesOrig && !matchesDesc) return false;
      }

      return true;
    });
  }, [typeFilter, questionFilter, searchQuery]);

  const activeNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  // Filtered edges
  const filteredEdges = useMemo(() => {
    return graphEdges.filter((edge) => {
      return activeNodeIds.has(edge.source) && activeNodeIds.has(edge.target);
    });
  }, [activeNodeIds]);

  // Layout node coordinates calculation
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const width = 1100;
    const height = 750;

    if (layoutMode === 'timeline') {
      // Chronological bands from left to right
      const eraBands: Record<string, number> = {
        '1770-1830': 140, // Hegel
        '1800-1845': 300, // Feuerbach, Early Marx
        '1845-1885': 480, // Marx, Engels
        '1920-1940': 660, // Lukacs, Gramsci, Benjamin
        '1940-1970': 840, // Adorno, Althusser
        '1970-1990': 1000, // Habermas, Bourdieu
      };

      // Assign slots based on node id
      const customSlots: Record<string, { x: number; y: number }> = {
        // Schools
        'school-idealism': { x: 140, y: 80 },
        'school-orthodox': { x: 480, y: 80 },
        'school-western-early': { x: 660, y: 80 },
        'school-frankfurt': { x: 800, y: 80 },
        'school-structural': { x: 920, y: 80 },
        'school-cultural': { x: 1040, y: 80 },

        // Thinkers
        'thinker-hegel': { x: 140, y: 240 },
        'thinker-feuerbach': { x: 300, y: 240 },
        'thinker-marx': { x: 480, y: 240 },
        'thinker-engels': { x: 480, y: 390 },
        'thinker-lukacs': { x: 660, y: 220 },
        'thinker-gramsci': { x: 660, y: 360 },
        'thinker-benjamin': { x: 770, y: 350 },
        'thinker-adorno': { x: 840, y: 220 },
        'thinker-althusser': { x: 930, y: 360 },
        'thinker-habermas': { x: 990, y: 220 },
        'thinker-bourdieu': { x: 1060, y: 340 },

        // Works
        'work-phaenomenologie': { x: 140, y: 440 },
        'work-christentum': { x: 300, y: 440 },
        'work-okonomisch': { x: 410, y: 520 },
        'work-ideologie': { x: 480, y: 520 },
        'work-manifest': { x: 550, y: 520 },
        'work-kapital': { x: 480, y: 640 },
        'work-geschichte': { x: 660, y: 500 },
        'work-quaderni': { x: 660, y: 620 },
        'work-kunstwerk': { x: 770, y: 500 },
        'work-dialektik': { x: 840, y: 500 },
        'work-negative': { x: 840, y: 620 },
        'work-althusser-isa': { x: 930, y: 500 },
        'work-strukturwandel': { x: 980, y: 500 },
        'work-kommunikativ': { x: 1000, y: 620 },
        'work-distinction': { x: 1070, y: 500 },

        // Concepts
        'concept-dialectics': { x: 140, y: 340 },
        'concept-alienation': { x: 380, y: 350 },
        'concept-historical-materialism': { x: 480, y: 150 },
        'concept-surplus-value': { x: 570, y: 330 },
        'concept-ideology': { x: 570, y: 430 },
        'concept-reification': { x: 660, y: 150 },
        'concept-hegemony': { x: 660, y: 440 },
        'concept-aura': { x: 770, y: 250 },
        'concept-instrumental-reason': { x: 840, y: 140 },
        'concept-culture-industry': { x: 840, y: 420 },
        'concept-isa': { x: 930, y: 270 },
        'concept-interpellation': { x: 930, y: 440 },
        'concept-public-sphere': { x: 990, y: 140 },
        'concept-communicative-action': { x: 1000, y: 300 },
        'concept-colonization': { x: 1000, y: 430 },
        'concept-cultural-capital': { x: 1070, y: 230 },
        'concept-habitus': { x: 1070, y: 430 },
        'concept-symbolic-violence': { x: 1070, y: 600 },
      };

      graphNodes.forEach((node) => {
        if (customSlots[node.id]) {
          positions[node.id] = customSlots[node.id];
        } else {
          positions[node.id] = { x: 500 + Math.random() * 200, y: 300 + Math.random() * 200 };
        }
      });
    } else if (layoutMode === 'radial') {
      // Marx at center (550, 375)
      const centerX = 550;
      const centerY = 375;
      positions['thinker-marx'] = { x: centerX, y: centerY };

      // Inner ring: immediate predecessors & partners & primary concepts
      const innerRadius = 180;
      const innerNodes = [
        'thinker-hegel',
        'thinker-feuerbach',
        'thinker-engels',
        'concept-alienation',
        'concept-surplus-value',
        'concept-historical-materialism',
        'concept-ideology',
        'work-kapital',
        'work-manifest',
      ];
      innerNodes.forEach((id, idx) => {
        const angle = (idx / innerNodes.length) * Math.PI * 2;
        positions[id] = {
          x: centerX + Math.cos(angle) * innerRadius,
          y: centerY + Math.sin(angle) * innerRadius,
        };
      });

      // Outer ring: successors, works, derived concepts
      const outerRadius = 330;
      const otherNodes = graphNodes.filter((n) => n.id !== 'thinker-marx' && !innerNodes.includes(n.id));
      otherNodes.forEach((node, idx) => {
        const angle = (idx / otherNodes.length) * Math.PI * 2;
        positions[node.id] = {
          x: centerX + Math.cos(angle) * outerRadius,
          y: centerY + Math.sin(angle) * outerRadius,
        };
      });
    } else {
      // Concept Lineage Mode: Focus on Conceptual Chains
      // Top Chain: Alienation -> Reification -> Instrumental Reason -> Communicative Action
      // Middle Chain: Dialectics (Hegel) -> Materialist Dialectics (Marx) -> Negative Dialectics (Adorno)
      // Bottom Chain: Economic Capital -> Cultural Capital -> Symbolic Violence
      const conceptChains: Record<string, { x: number; y: number }> = {
        'concept-alienation': { x: 200, y: 180 },
        'thinker-marx': { x: 200, y: 350 },
        'concept-reification': { x: 450, y: 180 },
        'thinker-lukacs': { x: 450, y: 350 },
        'concept-instrumental-reason': { x: 700, y: 180 },
        'thinker-adorno': { x: 700, y: 350 },
        'concept-culture-industry': { x: 700, y: 80 },
        'concept-communicative-action': { x: 950, y: 180 },
        'thinker-habermas': { x: 950, y: 350 },

        'concept-dialectics': { x: 200, y: 520 },
        'thinker-hegel': { x: 200, y: 640 },
        'concept-historical-materialism': { x: 450, y: 520 },
        'concept-surplus-value': { x: 450, y: 640 },
        'concept-cultural-capital': { x: 800, y: 520 },
        'thinker-bourdieu': { x: 800, y: 640 },
        'concept-habitus': { x: 980, y: 520 },
        'concept-symbolic-violence': { x: 980, y: 640 },
      };

      graphNodes.forEach((node, i) => {
        if (conceptChains[node.id]) {
          positions[node.id] = conceptChains[node.id];
        } else {
          positions[node.id] = { x: 100 + (i % 6) * 160, y: 250 + (i % 3) * 140 };
        }
      });
    }

    return positions;
  }, [layoutMode]);

  // Color mappings
  const getNodeColor = (type: NodeType, isHub?: boolean) => {
    if (isHub) return { bg: '#8B2616', border: '#701E11', text: '#FFFFFF' };
    switch (type) {
      case 'thinker':
        return { bg: '#292524', border: '#1C1917', text: '#FFFFFF' };
      case 'work':
        return { bg: '#B45309', border: '#92400E', text: '#FFFFFF' };
      case 'concept':
        return { bg: '#1E3A8A', border: '#172554', text: '#FFFFFF' };
      case 'school':
        return { bg: '#14532D', border: '#052E16', text: '#FFFFFF' };
      default:
        return { bg: '#57534E', border: '#44403C', text: '#FFFFFF' };
    }
  };

  const getEdgeColor = (type: string, isHighlighted?: boolean) => {
    if (isHighlighted) return '#DC2626';
    switch (type) {
      case 'CRITICAL_INHERITANCE':
        return '#8B2616';
      case 'AFFIRMATIVE_INHERITANCE':
        return '#0284C7';
      case 'COLLABORATED_WITH':
        return '#16A34A';
      case 'TRANSFORMS':
        return '#D97706';
      case 'INTRODUCED':
        return '#4F46E5';
      case 'AUTHORED':
        return '#A8A29E';
      default:
        return '#CBD5E1';
    }
  };

  // Connected nodes of selectedNode
  const connectedEdges = useMemo(() => {
    if (!selectedNode) return [];
    return graphEdges.filter(
      (e) => e.source === selectedNode.id || e.target === selectedNode.id
    );
  }, [selectedNode]);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'circle' || (e.target as HTMLElement).tagName === 'text') {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="graph-explorer" className="py-12 bg-[#FAF8F5] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8B2616] font-mono mb-1 font-semibold">
              대화형 지식그래프 탐색기 (Neo4j Graph Simulator)
            </div>
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              사회학 이론 계보 네트워크 시각화
            </h2>
            <p className="text-sm text-[#57534E] mt-1 max-w-2xl">
              11명의 사상가, 20권의 저작, 35개 핵심 개념, 6개 사조 간의 10대 관계망을 대화형으로 탐색합니다.
              노드를 클릭하여 독일어 원전 개념과 인과적 연결 관계를 확인하세요.
            </p>
          </div>

          {/* Quick Scenario Buttons for the 3 Key Questions */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFECE6] rounded-lg border border-[#E2DDD3] shrink-0 overflow-x-auto max-w-full">
            <button
              onClick={() => setQuestionFilter(0)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                questionFilter === 0
                  ? 'bg-white text-[#1C1917] shadow-sm font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              전체 계보
            </button>
            <button
              onClick={() => setQuestionFilter(1)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                questionFilter === 1
                  ? 'bg-white text-[#8B2616] shadow-sm font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              질문 1: 계보 승계/변용
            </button>
            <button
              onClick={() => {
                setQuestionFilter(2);
                setLayoutMode('radial');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                questionFilter === 2
                  ? 'bg-white text-[#8B2616] shadow-sm font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              질문 2: 마르크스 지적 허브
            </button>
            <button
              onClick={() => setQuestionFilter(3)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                questionFilter === 3
                  ? 'bg-white text-[#8B2616] shadow-sm font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              질문 3: 독일 전통 전유
            </button>
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white rounded-t-xl border border-[#E7E2D8] border-b-0">
          {/* Class Filters (Segmented controls) */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-xs text-[#78716C] mr-2 flex items-center gap-1 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5" /> 노드 유형:
            </span>
            {[
              { id: 'all', label: '전체 (All)' },
              { id: 'thinker', label: '인물 (Thinker)' },
              { id: 'concept', label: '개념 (Concept)' },
              { id: 'work', label: '저서 (Work)' },
              { id: 'school', label: '사조 (School)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTypeFilter(tab.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  typeFilter === tab.id
                    ? 'bg-[#1C1917] text-white shadow-sm'
                    : 'text-[#57534E] hover:bg-[#F4F1EA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Layout Mode Toggles & Search */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
              <input
                type="text"
                placeholder="학자, 개념, 저작 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs rounded-md bg-[#FAF8F5] border border-[#DCD5C9] text-[#1C1917] focus:outline-none focus:border-[#8B2616] w-40 sm:w-52"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#1C1917]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Layout switch */}
            <div className="flex items-center bg-[#F4F1EA] p-0.5 rounded-md border border-[#E2DDD3]">
              <button
                onClick={() => setLayoutMode('timeline')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  layoutMode === 'timeline' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                연대기 계보
              </button>
              <button
                onClick={() => setLayoutMode('radial')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  layoutMode === 'radial' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                마르크스 허브
              </button>
              <button
                onClick={() => setLayoutMode('concept')}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  layoutMode === 'concept' ? 'bg-white text-[#1C1917] shadow-xs' : 'text-[#78716C]'
                }`}
              >
                개념 변용 체인
              </button>
            </div>

            {/* Zoom & Reset */}
            <div className="flex items-center gap-1 border-l border-[#E7E2D8] pl-2">
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 2.0))}
                className="p-1.5 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4F1EA] rounded cursor-pointer"
                title="확대"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.6))}
                className="p-1.5 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4F1EA] rounded cursor-pointer"
                title="축소"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                className="p-1.5 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4F1EA] rounded cursor-pointer"
                title="뷰 리셋"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Canvas & Inspector Split View */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 bg-white rounded-b-xl border border-[#E7E2D8] overflow-hidden shadow-sm min-h-[620px]">
          {/* Left Canvas Area (lg:col-span-8 or 9) */}
          <div
            className="lg:col-span-8 xl:col-span-9 bg-[#FCFAF7] relative overflow-hidden select-none cursor-grab active:cursor-grabbing border-b lg:border-b-0 lg:border-r border-[#E7E2D8]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {/* Background subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#1C1917 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Layout Era Guideline Labels in timeline mode */}
            {layoutMode === 'timeline' && (
              <div className="absolute top-2 left-0 right-0 px-6 flex justify-between pointer-events-none text-[11px] font-mono text-[#A8A29E] border-b border-[#E7E2D8]/60 pb-1">
                <span>1770~1830 독일 관념론</span>
                <span>1840~1880 마르크스·엥겔스</span>
                <span>1920~1930 초기 서구 마르크스</span>
                <span>1930~1960 비판이론</span>
                <span>1970~1990 현대 사회학</span>
              </div>
            )}

            {/* SVG Graph rendering */}
            <svg
              className="w-full h-[620px] pointer-events-auto"
              viewBox="0 0 1150 720"
              preserveAspectRatio="xMidYMid meet"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              }}
            >
              <defs>
                <marker
                  id="arrow-default"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#A8A29E" />
                </marker>
                <marker
                  id="arrow-critical"
                  viewBox="0 0 10 10"
                  refX="20"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#8B2616" />
                </marker>
                <marker
                  id="arrow-transforms"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#D97706" />
                </marker>
              </defs>

              {/* Render Edges */}
              <g className="edges-layer">
                {filteredEdges.map((edge) => {
                  const srcPos = nodePositions[edge.source];
                  const tgtPos = nodePositions[edge.target];
                  if (!srcPos || !tgtPos) return null;

                  const isSelectedConnected =
                    selectedNode &&
                    (selectedNode.id === edge.source || selectedNode.id === edge.target);
                  const isHighlighted =
                    questionFilter > 0 && edge.highlightInQuestion === questionFilter;

                  const markerId =
                    edge.type === 'CRITICAL_INHERITANCE'
                      ? 'url(#arrow-critical)'
                      : edge.type === 'TRANSFORMS'
                      ? 'url(#arrow-transforms)'
                      : 'url(#arrow-default)';

                  return (
                    <g key={edge.id} className="transition-opacity duration-200">
                      <line
                        x1={srcPos.x}
                        y1={srcPos.y}
                        x2={tgtPos.x}
                        y2={tgtPos.y}
                        stroke={getEdgeColor(edge.type, isHighlighted)}
                        strokeWidth={isHighlighted || isSelectedConnected ? 2.5 : 1.2}
                        strokeDasharray={edge.type === 'TRANSFORMS' ? '4 3' : undefined}
                        strokeOpacity={
                          isSelectedConnected || isHighlighted
                            ? 0.95
                            : selectedNode
                            ? 0.25
                            : 0.6
                        }
                        markerEnd={markerId}
                      />
                      {(isSelectedConnected || isHighlighted) && (
                        <text
                          x={(srcPos.x + tgtPos.x) / 2}
                          y={(srcPos.y + tgtPos.y) / 2 - 6}
                          textAnchor="middle"
                          fill="#1C1917"
                          fontSize="9.5"
                          fontWeight="600"
                          className="bg-white px-1 font-sans"
                        >
                          {edge.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Render Nodes */}
              <g className="nodes-layer">
                {filteredNodes.map((node) => {
                  const pos = nodePositions[node.id];
                  if (!pos) return null;

                  const isSelected = selectedNode?.id === node.id;
                  const isConnected =
                    selectedNode &&
                    connectedEdges.some(
                      (e) => e.source === node.id || e.target === node.id
                    );

                  const { bg, border, text } = getNodeColor(node.type, node.isHub);
                  const radius = node.isHub ? 32 : node.type === 'thinker' ? 24 : node.type === 'school' ? 22 : 18;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer transition-all duration-150"
                    >
                      {/* Selection highlight ring */}
                      {isSelected && (
                        <circle
                          r={radius + 8}
                          fill="none"
                          stroke="#8B2616"
                          strokeWidth="2.5"
                          strokeDasharray="4 2"
                          opacity="0.8"
                        />
                      )}

                      {/* Node circle */}
                      <circle
                        r={radius}
                        fill={bg}
                        stroke={isSelected ? '#8B2616' : border}
                        strokeWidth={isSelected ? 3 : 1.5}
                        opacity={
                          !selectedNode || isSelected || isConnected
                            ? 1
                            : 0.4
                        }
                        className="hover:scale-110 transition-transform"
                      />

                      {/* Node label */}
                      <text
                        textAnchor="middle"
                        dy={node.type === 'concept' || node.type === 'work' ? 4 : 4}
                        fill={text}
                        fontSize={node.isHub ? '12' : radius > 20 ? '10.5' : '9'}
                        fontWeight={node.isHub || isSelected ? '700' : '500'}
                        pointerEvents="none"
                        className="font-sans select-none"
                      >
                        {node.name.length > 8 ? `${node.name.slice(0, 7)}…` : node.name}
                      </text>

                      {/* Subtitle / Year below */}
                      <text
                        textAnchor="middle"
                        y={radius + 14}
                        fill="#57534E"
                        fontSize="9"
                        fontWeight="500"
                        className="font-mono select-none"
                      >
                        {node.year ? String(node.year) : ''}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs bg-white/90 backdrop-blur-sm p-2.5 rounded-lg border border-[#E7E2D8] text-[#78716C]">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-semibold text-[#1C1917]">범례:</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B2616]" />
                  <span>중심 허브 (Karl Marx)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#292524]" />
                  <span>인물 (Thinker)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]" />
                  <span>개념 (Concept)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
                  <span>대표 저서 (Work)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#14532D]" />
                  <span>사조 (School)</span>
                </span>
              </div>
              <div className="text-[11px] text-[#A8A29E] font-mono">
                드래그로 화면 이동 · 스크롤 또는 ± 로 확대/축소
              </div>
            </div>
          </div>

          {/* Right Inspector Panel (lg:col-span-4 or 3) */}
          <div className="lg:col-span-4 xl:col-span-3 p-5 flex flex-col justify-between bg-white overflow-y-auto max-h-[620px]">
            {selectedNode ? (
              <div>
                {/* Node Inspector Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D8] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8B2616] font-semibold">
                      {selectedNode.type === 'thinker'
                        ? '사상가 / 이론가'
                        : selectedNode.type === 'work'
                        ? '대표 저작'
                        : selectedNode.type === 'concept'
                        ? '핵심 개념 / 쟁점'
                        : '학파 / 사조'}
                    </span>
                    {selectedNode.isHub && (
                      <span className="text-[10px] font-mono font-bold bg-[#8B2616]/10 text-[#8B2616] px-1.5 py-0.5 rounded">
                        HUB
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#78716C] font-mono tabular-nums">
                    {selectedNode.year}
                  </span>
                </div>

                {/* Node Main Title */}
                <h3 className="font-editorial-serif text-2xl font-bold text-[#1C1917] mb-1">
                  {selectedNode.name}
                </h3>
                {selectedNode.originalName && (
                  <p className="font-editorial-serif italic text-xs text-[#78716C] mb-3">
                    {selectedNode.originalName}
                  </p>
                )}

                {/* School affiliation */}
                {selectedNode.school && (
                  <div className="text-xs text-[#57534E] mb-3 pb-3 border-b border-[#E7E2D8]/60 flex items-center gap-2">
                    <span className="text-[#78716C]">소속 사조:</span>
                    <strong className="text-[#1C1917]">{selectedNode.school}</strong>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                  {selectedNode.description}
                </p>

                {/* Famous quote if available */}
                {selectedNode.quote && (
                  <div className="p-3 rounded bg-[#FAF8F5] border border-[#E7E2D8] mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8B2616] block mb-1">
                      원문 인용 / 명제
                    </span>
                    <blockquote className="font-editorial-serif italic text-xs text-[#1C1917] leading-relaxed">
                      "{selectedNode.quote}"
                    </blockquote>
                  </div>
                )}

                {/* Hub score indicator if available */}
                {selectedNode.hubScore !== undefined && (
                  <div className="mb-4 p-2.5 rounded bg-[#FAF8F5] border border-[#E7E2D8] text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#78716C]">매개 중심성 (Hub Score)</span>
                      <strong className="font-mono text-[#8B2616] tabular-nums">
                        {(selectedNode.hubScore * 100).toFixed(0)}%
                      </strong>
                    </div>
                    <div className="w-full bg-[#E7E2D8] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#8B2616] h-1.5 rounded-full"
                        style={{ width: `${selectedNode.hubScore * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Connected Relationships in Graph */}
                <div className="mt-4 pt-3 border-t border-[#E7E2D8]">
                  <h4 className="text-xs font-semibold text-[#1C1917] mb-2 flex items-center justify-between">
                    <span>연결된 관계 ({connectedEdges.length}개)</span>
                    <Share2 className="w-3.5 h-3.5 text-[#78716C]" />
                  </h4>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {connectedEdges.map((edge) => {
                      const isOutgoing = edge.source === selectedNode.id;
                      const otherId = isOutgoing ? edge.target : edge.source;
                      const otherNode = graphNodes.find((n) => n.id === otherId);

                      return (
                        <div
                          key={edge.id}
                          onClick={() => otherNode && setSelectedNode(otherNode)}
                          className="p-2 rounded bg-[#FAF8F5] hover:bg-[#F3EFE8] border border-[#E7E2D8] cursor-pointer transition-colors text-xs"
                        >
                          <div className="flex items-center justify-between text-[#8B2616] font-medium mb-1">
                            <span>{edge.label}</span>
                            <span className="text-[10px] text-[#A8A29E] font-mono">
                              {isOutgoing ? '→ 대상' : '← 출발'}
                            </span>
                          </div>
                          <div className="text-[#1C1917] font-semibold flex items-center gap-1">
                            {otherNode?.name}
                            <ChevronRight className="w-3 h-3 text-[#A8A29E]" />
                          </div>
                          <p className="text-[11px] text-[#78716C] mt-0.5 line-clamp-2">
                            {edge.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-[#A8A29E]">
                <Info className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs">
                  그래프의 노드를 클릭하면 사상가의 상세 정보, 저서, 소외/물화 등 핵심 개념의 인과 관계가 표시됩니다.
                </p>
              </div>
            )}

            {/* Quick reset node button */}
            <div className="pt-4 border-t border-[#E7E2D8] mt-4">
              <button
                onClick={() => {
                  const marx = graphNodes.find((n) => n.id === 'thinker-marx');
                  if (marx) setSelectedNode(marx);
                }}
                className="w-full py-1.5 text-xs font-medium text-[#1C1917] bg-[#EFECE6] hover:bg-[#E5E0D6] rounded border border-[#DCD5C9] transition-colors cursor-pointer"
              >
                중심 허브(마르크스)로 포커스
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
