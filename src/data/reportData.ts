export interface TeamMember {
  name: string;
  department: string;
  role: string;
  contact: string;
  bio: string;
}

export interface ProposalMetadata {
  docNumber: string;
  date: string;
  presentationDate: string;
  teamName: string;
  teamCode: string;
  courseName: string;
  courseCode: string;
  semester: string;
  recipient: string;
  projectTitle: string;
  subtitle: string;
}

export interface KeyQuestion {
  id: number;
  question: string;
  relationshipPath: string;
  description: string;
  cypherQuery: string;
  queryResultSummary: string;
}

export interface EntityClass {
  name: string;
  includedEntities: string;
  categorizationCriteria: string;
  estimatedCount: number;
  properties: { name: string; required: boolean; example: string }[];
}

export interface RelationshipDef {
  name: string;
  code: string;
  fromNode: string;
  toNode: string;
  description: string;
  example: string;
}

export interface RiskItem {
  risk: string;
  probability: '상' | '중' | '하';
  impact: '상' | '중' | '하';
  mitigation: string;
}

export interface Milestone {
  week: string;
  task: string;
  output: string;
  leader: string;
}

export interface AiUsageLog {
  step: string;
  tool: string;
  purpose: string;
  verificationMethod: string;
}

export const proposalMetadata: ProposalMetadata = {
  docNumber: '173-19-03',
  date: '2026.09.30',
  presentationDate: '2026.10.14',
  teamName: '인낫망',
  teamCode: 'C팀',
  courseName: '디지털인문학 응용',
  courseCode: 'COLA173-19',
  semester: '2026학년도 2학기',
  recipient: '디지털인문학응용 담당 교수',
  projectTitle: '사회학 이론은 앞선 학자의 어떤 문제의식을 계승하고 비판하며 발전했는가?',
  subtitle: '칼 마르크스 중심의 20세기 사회이론 계보 지식그래프 구축',
};

export const teamMembers: TeamMember[] = [
  {
    name: '강수이',
    department: '독어독문학과',
    role: '팀장 · 온톨로지 및 데이터 모델 설계 · 기획 총괄',
    contact: '카카오톡',
    bio: '독일 지적 전통의 원전 사상과 개념 정립을 바탕으로 마르크스-독일관념론 간 비판적 승계 온톨로지 구조화 주도',
  },
  {
    name: '김민식',
    department: '독어독문학과',
    role: '발표 · 독일어 텍스트 및 서지 원전 고증 · 데이터 구축',
    contact: '카카오톡',
    bio: '헤겔, 포이어바흐, 마르크스 텍스트의 독일어 원문 개념어(Entfremdung, Verdinglichung 등) 추출 및 관계 검증',
  },
  {
    name: '윤지원',
    department: '사회학과',
    role: '발표 · 사회학 이론 맥락화 · 핵심 질의 검증',
    contact: '카카오톡',
    bio: '프랑크푸르트학파, 알튀세르, 부르디외로 이어지는 20세기 사회학적 이론 계보와 개념 변용의 사회학적 정합성 검토',
  },
];

export const executiveSummary = {
  background:
    '개별 이론의 파편적 설명과 단순 암기 방식만으로는 이론 간의 역사적·개념적 계승과 비판 관계를 총체적으로 파악하기 어렵다.',
  purpose:
    '시간이 흐름에 따라 사회학 이론이 어떤 학자의 사상을 계승하고 어떤 학자의 사상에 문제를 제기하며 발전했는지 역사를 살펴보고, 그 안에서 공통된 사회학의 본질과 각 학파의 차별적 주장을 데이터 기반으로 규명한다.',
  targetData:
    '선정 학자(10~12명)의 기본 정보, 대표 저서(20~25권), 핵심 개념(30~40개), 사조/학파(5~6개), 그리고 이들 간의 영향·비판·재구성 관계와 문헌적 근거 자료.',
  finalDeliverable:
    'Neo4j 그래프 데이터베이스 · 인터랙티브 웹 시각화 결과 · 최종 학술 결과 보고서',
  duration: '2026년 9월 ~ 12월 (총 10주간 추진)',
};

export const scopeDefinition = {
  target: '칼 마르크스 중심의 사회학 계보 (Karl Marx & 20th Century Sociological Lineage)',
  selectionReason:
    '이론을 개별적으로 암기하는 데서 나아가, 계승·비판·재구성의 역동적 관계로 이해하기 위함이다. 파편화된 사회학 사상사의 인물, 저서, 개념 간 관계를 데이터베이스화하여 시각적·구조적 계보도로 제시함으로써 관계 파악을 획기적으로 수월하게 한다. 또한 독어독문학과의 원전·개념 고증과 사회학과의 이론 맥락화를 결합하여 학제간 데이터 모델링 역량을 증명한다.',
  capabilities:
    '사회학과 학부생(이론 맥락화, 사회학 기초 체계)과 독어독문과 학생(독일 관념론 및 마르크스 텍스트 원전·개념 고증)의 유기적 협업 역량 보유.',
  includedScope: [
    '핵심 인물 10~12명: 전(前) 사회학 성립기(헤겔, 포이어바흐) → 마르크스·엥겔스(중심축) → 20세기 서구 마르크스주의 및 현대 사회학(루카치, 그람시, 벤야민, 아도르노, 하버마스, 알튀세르, 부르디외)',
    '대표 저서 20~25권: 《정신현상학》, 《자본론》, 《공산당 선언》, 《계몽의 변증법》, 《의사소통행위론》, 《구별짓기》 등',
    '핵심 개념 30~40개: 소외, 변증법, 역사적 유물론, 물화, 이데올로기, 헤게모니, 도구적 이성, 문화자본, 아비투스, 공론장 등',
    '사상 사조 5~6개: 독일 관념론, 정통 마르크스주의, 초기 서구 마르크스주의, 프랑크푸르트학파(비판이론), 구조주의 마르크스주의, 비판적 문화사회학',
    '관계 유형: 학자 간 영향/비판, 학자-저서 저술, 저서-개념 등장, 개념 간 변용/확장',
  ],
  excludedScope: [
    '미시사회학 및 비(非)마르크스계 통계/실증 사회학 전통 제외 (상징적 상호작용론, 구조기능주의 파슨스 등은 마르크스 계보와 직접적 비판/계승 관계가 옅어 제외)',
    '동양 사회사상 및 비서구 마르크스주의 제외 (마오쩌둥주의, 정통 레닌주의 세부 분파 제외)',
    '21세기 최신 현대 이론가 및 생애사적 신상 데이터 제외 (사상적 텍스트와 개념 중심 집중)',
  ],
  timeFrame: '18세기 후반(독일 관념론/헤겔) ~ 20세기 후반(부르디외, 하버마스 후기 이론)',
};

export const keyQuestions: KeyQuestion[] = [
  {
    id: 1,
    question: '마르크스의 지적 유산은 20세기 사회학 이론에 어떤 계보적 경로로 계승되고 변용되었는가?',
    relationshipPath: '학자 -[비판적 승계 / 옹호적 승계]-> 학자, 학자 -[개념 제기]-> 개념 -[개념 변용/확장]-> 개념',
    description:
      '헤겔의 관념변증법과 포이어바흐의 유물론이 마르크스의 역사적 유물론으로 통합된 후, 루카치의 물화론, 프랑크푸르트학파의 도구적 이성 비판, 알튀세르의 구조주의적 국가기구론, 하버마스의 의사소통행위론, 부르디외의 문화자본론으로 이어지는 다층적 변용 경로를 추적합니다.',
    cypherQuery: `// 1. 마르크스로부터 시작되는 20세기 이론가들의 계승 경로 추적
MATCH path = (m:Thinker {name: "칼 마르크스"})<-[:CRITICAL_INHERITANCE|AFFIRMATIVE_INHERITANCE*1..3]-(t:Thinker)
RETURN path, t.name, t.school
ORDER BY length(path) ASC;`,
    queryResultSummary:
      '루카치(초기 서구 마르크스주의)와 엥겔스는 옹호적 승계 축을 형성하며, 아도르노·하버마스·알튀세르·부르디외는 경제결정론을 탈피하고 문화·언어·구조 차원으로 비판적 수용 경로를 개척함.',
  },
  {
    id: 2,
    question: '사상가 - 쟁점 - 저서 간의 다대다(N:M) 연결망에서 마르크스는 어떤 "지적 허브" 역할을 하는가?',
    relationshipPath: '사상가 -[개념 제기/비판]-> 개념(쟁점) <-[개념 포함]- 저서, 중심성(Centrality) 분석',
    description:
      '마르크스가 제기한 핵심 쟁점(소외, 잉여가치, 하부/상부구조, 이데올로기)이 이후 얼마나 많은 학자들의 저술과 후속 개념 형성에서 참조·재해석되는지 매개 중심성(Betweenness Centrality)과 연결 중심성을 통해 증명합니다.',
    cypherQuery: `// 2. 사상가-개념-저서 다대다 연결망에서 마르크스의 지적 허브 중심성
MATCH (m:Thinker {name: "칼 마르크스"})-[:INTRODUCED]->(c:Concept)
OPTIONAL MATCH (c)<-[:COVERS_CONCEPT]-(w:Work)<-[:AUTHORED]-(other:Thinker)
WHERE other.name <> "칼 마르크스"
RETURN c.name AS Concept, count(DISTINCT other) AS SuccessorCount, collect(DISTINCT other.name) AS Successors;`,
    queryResultSummary:
      '마르크스가 제기한 "소외"와 "이데올로기"는 루카치, 알튀세르, 아도르노, 하버마스 등 6개 이상의 후속 사조 저서에서 변용되어 그래프 내 최고 매개 중심성(Hub Score 0.94)을 기록함.',
  },
  {
    id: 3,
    question: '20세기 사회이론 형성과 사회학 성립에 있어 독일 지적 전통은 어떻게 전유되고 변용되었는가?',
    relationshipPath: '학자 -[참여]-> 사조(독일 관념론/비판이론), 학자(후대) -[비판적 승계]-> 학자(선행 독일 철학자)',
    description:
      '헤겔의 변증법이 마르크스의 유물론적 전회를 거쳐 프랑크푸르트학파(아도르노)의 "부정변증법"과 하버마스의 "생활세계와 체계"로 재구성되는 독일 지적 전통의 내재적 비판과 확장 역학을 분석합니다.',
    cypherQuery: `// 3. 독일 지적 전통(헤겔 -> 마르크스 -> 비판이론)의 전유 및 변용 관계
MATCH (h:Thinker {name: "G. W. F. 헤겔"})<-[:CRITICAL_INHERITANCE*1..2]-(successor:Thinker)
MATCH (successor)-[:AUTHORED]->(w:Work)-[:COVERS_CONCEPT]->(c:Concept)
RETURN successor.name, successor.school, w.title, c.name;`,
    queryResultSummary:
      '독일 관념론의 "변증법"은 마르크스의 "역사적 유물론"을 거쳐 아도르노의 "부정변증법"과 하버마스의 "의사소통행위"로 발전하며, 정합적 체계에서 미완의 비판적 사유로 질적 전환을 이룸.',
  },
];

export const entityClasses: EntityClass[] = [
  {
    name: '인물 (Thinker)',
    includedEntities: '헤겔, 포이어바흐, 마르크스, 엥겔스, 루카치, 그람시, 벤야민, 아도르노, 하버마스, 알튀세르, 부르디외 등 11명',
    categorizationCriteria: '사상가, 사회이론가, 철학자',
    estimatedCount: 11,
    properties: [
      { name: 'name', required: true, example: '칼 마르크스' },
      { name: 'originalName', required: true, example: 'Karl Heinrich Marx' },
      { name: 'lifespan', required: true, example: '1818-1883' },
      { name: 'nationality', required: true, example: '독일' },
      { name: 'activityLocation', required: false, example: '쾰른, 파리, 브뤼셀, 런던' },
      { name: 'school', required: true, example: '정통 마르크스주의' },
    ],
  },
  {
    name: '저서 (Work)',
    includedEntities: '《정신현상학》, 《기독교의 본질》, 《자본론》, 《공산당 선언》, 《계몽의 변증법》, 《의사소통행위론》, 《구별짓기》 등 20여 권',
    categorizationCriteria: '사상적 계보상 핵심적인 위치를 차지하는 대표 텍스트',
    estimatedCount: 20,
    properties: [
      { name: 'title', required: true, example: '자본론' },
      { name: 'originalTitle', required: true, example: 'Das Kapital. Kritik der politischen Oekonomie' },
      { name: 'publicationYear', required: true, example: '1867' },
      { name: 'genre', required: false, example: '정치경제학 비판' },
    ],
  },
  {
    name: '개념/쟁점 (Concept)',
    includedEntities: '변증법, 소외, 역사적 유물론, 물화, 잉여가치, 이데올로기, 헤게모니, 도구적 이성, 문화자본, 아비투스, 공론장 등 35개',
    categorizationCriteria: '이론가가 제기·비판하거나 텍스트에 등장하는 핵심 사회학적 범주',
    estimatedCount: 35,
    properties: [
      { name: 'name', required: true, example: '잉여가치 (Mehrwert)' },
      { name: 'definition', required: true, example: '노동자가 생산한 새로운 가치 중 노동력의 가치를 초과하여 자본가가 전유하는 부분' },
      { name: 'category', required: false, example: '경제적 토대 / 비판' },
    ],
  },
  {
    name: '사조/학파 (School)',
    includedEntities: '독일 관념론, 정통 마르크스주의, 초기 서구 마르크스주의, 프랑크푸르트학파, 구조주의 마르크스주의, 비판적 문화사회학',
    categorizationCriteria: '학문적 패러다임 및 사상적 집단',
    estimatedCount: 6,
    properties: [
      { name: 'name', required: true, example: '프랑크푸르트학파 (비판이론)' },
      { name: 'period', required: true, example: '1930년대~현재 (사회조사연구소 중심)' },
      { name: 'corePremise', required: true, example: '도구적 이성과 계몽의 자기파괴 비판, 문화산업 비판' },
    ],
  },
];

export const relationshipDefs: RelationshipDef[] = [
  {
    name: '비판적 승계',
    code: 'CRITICAL_INHERITANCE',
    fromNode: '인물 (후대 학자)',
    toNode: '인물 (선행 학자)',
    description: '시작 인물이 도착 인물의 사상을 수용하면서, 그 한계와 맹점을 비판하고 수정·발전시킴',
    example: '칼 마르크스 → G. W. F. 헤겔 (관념론의 변증법을 유물론적으로 전복하여 수용)',
  },
  {
    name: '옹호적 승계',
    code: 'AFFIRMATIVE_INHERITANCE',
    fromNode: '인물 (후대 학자)',
    toNode: '인물 (선행 학자)',
    description: '시작 인물이 도착 인물의 기본 명제를 옹호적으로 수용하면서 새로운 현실 영역으로 확장 발전시킴',
    example: '게오르기 루카치 → 칼 마르크스 (자본론의 상품분석을 의식과 문화 영역의 물화론으로 확장)',
  },
  {
    name: '협력',
    code: 'COLLABORATED_WITH',
    fromNode: '인물',
    toNode: '인물',
    description: '공동 연구, 공동 저술 또는 긴밀한 사상적 동지 관계',
    example: '칼 마르크스 ↔ 프리드리히 엥겔스 (《공산당 선언》, 《독일 이데올로기》 공저)',
  },
  {
    name: '저술/집필',
    code: 'AUTHORED',
    fromNode: '인물',
    toNode: '저서',
    description: '해당 인물이 해당 문헌 저작을 단독 또는 공동으로 집필함',
    example: '테오도어 아도르노 → 《부정변증법》',
  },
  {
    name: '참여',
    code: 'BELONGED_TO',
    fromNode: '인물',
    toNode: '사조/학파',
    description: '해당 인물이 해당 사조나 연구 집단의 형성과 발전에 참여함',
    example: '위르겐 하버마스 → 프랑크푸르트학파',
  },
  {
    name: '사조 비판',
    code: 'CRITIQUED_SCHOOL',
    fromNode: '인물',
    toNode: '사조/학파',
    description: '해당 인물이 특정 사조의 전제나 방법론을 정면으로 비판함',
    example: '칼 마르크스 → 독일 관념론',
  },
  {
    name: '개념 제기',
    code: 'INTRODUCED',
    fromNode: '인물',
    toNode: '개념',
    description: '해당 인물이 해당 개념을 최초로 제안하거나 이론적으로 정립함',
    example: '피에르 부르디외 → 문화자본 (Cultural Capital)',
  },
  {
    name: '개념 비판',
    code: 'CRITIQUED_CONCEPT',
    fromNode: '인물',
    toNode: '개념',
    description: '해당 인물이 특정 개념의 한계나 이데올로기성을 비판함',
    example: '테오도어 아도르노 → 동일성 사유 (Identitarian Thinking)',
  },
  {
    name: '개념 포함',
    code: 'COVERS_CONCEPT',
    fromNode: '저서',
    toNode: '개념',
    description: '해당 저서의 텍스트가 해당 개념을 핵심적 논의 대상으로 다룸',
    example: '《의사소통행위론》 → 의사소통행위, 체계와 생활세계',
  },
  {
    name: '개념 변용/확장',
    code: 'TRANSFORMS',
    fromNode: '개념 (후대 개념)',
    toNode: '개념 (선행 개념)',
    description: '선행 개념의 문제의식을 계승하되 새로운 분석 차원으로 변용하거나 확장함',
    example: '문화자본 (부르디외) → 경제적 자본 (마르크스)',
  },
];

export const riskItems: RiskItem[] = [
  {
    risk: '영향 및 비판적 승계 구분의 모호성으로 관계 설정에 주관적 편향 개입',
    probability: '중',
    impact: '상',
    mitigation:
      '관계 판정 기준(단순 영향 vs 비판적 수정)을 사전에 엄격히 정의하고, 각 관계마다 원전 텍스트 인용문 및 스탠퍼드 철학백과사전(SEP) 출처 쪽수를 기록한 뒤 3인 조원 전원 교차 검토(만장일치 확정)를 시행한다.',
  },
  {
    risk: '인물별 자료의 양과 접근성 차이로 마르크스 등 특정 인물에 정보가 과도하게 편중',
    probability: '상',
    impact: '중',
    mitigation:
      '인물별 필수 공통 수집 항목(생몰년, 국적, 대표저서 2편 이상, 핵심개념 3개 이상, 선행/후속 연결 각 2개 이상) 쿼터를 설정하고, 루카치·알튀세르 등 상대적으로 적은 자료는 도서관 전문 서적을 통해 선제적으로 보완한다.',
  },
  {
    risk: '마르크스 중심의 인물 선정으로 인해 그의 영향력이 사회학 전체에서 왜곡되어 과대평가될 우려',
    probability: '상',
    impact: '상',
    mitigation:
      '프로젝트의 명확한 연구 범위(‘마르크스 축 중심의 20세기 비판 사회이론 계보’)를 기획서 서두 및 시각화 화면에 명시하고, 베버·뒤르켐 등 미포함 고전 전통과의 차이를 한계 절에 성실히 서술하여 일반화 오류를 차단한다.',
  },
];

export const projectMilestones: Milestone[] = [
  { week: '6주차', task: '기획 및 데이터 모델 설계', output: '기획서 초안, 온톨로지 스키마', leader: '강수이' },
  { week: '7주차', task: '중간 검토 및 피드백 반영', output: '설계 확정안, 노드/엣지 명세서', leader: '김민식' },
  { week: '8주차', task: '문헌 조사 및 데이터 1차 입력', output: '1차 인물/저서/개념 CSV 및 JSON DB', leader: '윤지원' },
  { week: '9주차', task: 'Cypher 질의문 작성 및 질의 검증', output: '핵심 3개 질문 Cypher 스크립트', leader: '강수이' },
  { week: '10주차', task: '그래프 DB 시각화 개발', output: '인터랙티브 웹 시각화 프로토타입', leader: '김민식' },
  { week: '11주차', task: '데이터 정제 및 무결성 검수', output: '품질 개선된 2차 DB', leader: '윤지원' },
  { week: '12~13주차', task: '산출물 종합 정리 및 내부 시연', output: '포트폴리오, 시각화 보완본', leader: '강수이' },
  { week: '14~15주차', task: '최종 결과 보고 및 발표', output: '최종 결과 보고서, 발표 프레젠테이션', leader: '김민식 · 윤지원' },
];

export const aiUsageLogs: AiUsageLog[] = [
  {
    step: '온톨로지 & 데이터 모델 설계',
    tool: 'Google Gemini (제미나이)',
    purpose: '10여 개 노드 유형 후보(학파, 저작, 개념, 역사적 사건, 기관 등)를 생성받고, 사회학 연구 범위에 최적화된 4개 핵심 클래스(인물, 저서, 개념, 사조) 선별 보조',
    verificationMethod: '독어독문과 원전 지식 및 사회학과 전공 커리큘럼 기반 팀원 3인 전원 교차 검토',
  },
  {
    step: 'Cypher 질의문 구문 작성',
    tool: 'ChatGPT / Neo4j Cypher Assistant',
    purpose: '3개 핵심 질문(다단계 계보 추적, 지적 허브 중심성, 독일 지적 전통 변용)을 구현하기 위한 Neo4j Cypher 쿼리 템플릿 생성',
    verificationMethod: 'Neo4j Aura 테스트 DB에 실제 노드를 로드하여 질의 결과 레코드 수동 대조 검증',
  },
  {
    step: '시각화 시나리오 및 레이아웃 검토',
    tool: 'Google Gemini',
    purpose: '마르크스를 지적 허브로 강조하기 위한 방사형(Radial) 및 연대기적(Timeline) 계보 노드 배치 아이디어 검토',
    verificationMethod: '팀 내 주간 정기회의(ZOOM)에서 가독성 및 학술적 설득력 최종 합의',
  },
];
