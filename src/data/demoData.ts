export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type FeatureStatus = 'Aligned' | 'Drift Detected' | 'Review Required' | 'Review Created' | 'Review Complete';
export type FeatureCategory = 'Privacy' | 'Traditional ML' | 'GenAI' | 'Design';
export type DriftSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type DriftStatus = 'Open' | 'Acknowledged' | 'Accepted' | 'Resolved';
export type SourceStatus = 'Connected' | 'Syncing' | 'Warning' | 'Disconnected';

export interface Requirement {
  id: string;
  title: string;
  approvedBehavior: string;
  sourceDoc: string;
  approvedDate: string;
  approver: string;
  status: 'Aligned' | 'Drifted' | 'Partial';
}

export interface ImplementationObservation {
  id: string;
  requirementId: string;
  currentBehavior: string;
  evidenceSource: string;
  filePath: string;
  lastDetected: string;
  status: 'Aligned' | 'Drifted' | 'Partial';
}

export interface DiffItem {
  id: string;
  requirement: string;
  changeType: string;
  severity: DriftSeverity;
  status: DriftStatus;
  tag: string;
}

export interface SourceArtifact {
  id: string;
  name: string;
  type: string;
  path: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  actorInitials: string;
  action: string;
  detail: string;
  type: 'scan' | 'approval' | 'review' | 'comment' | 'disclosure' | 'risk' | 'system';
}

export interface ConnectedSource {
  id: string;
  name: string;
  type: string;
  icon: string;
  status: SourceStatus;
  lastSynced: string;
  coverage: number;
  linkedRequirements: number;
  artifacts: SourceArtifact[];
}

export interface DemoFeature {
  id: string;
  name: string;
  category: FeatureCategory;
  productArea: string;
  owner: string;
  ownerInitials: string;
  status: FeatureStatus;
  risk: RiskLevel;
  summary: string;
  driftSummary: string;
  platform: string;
  approvedDocs: string[];
  releaseTarget: string;
  latestScan: string;
  approvedIntent: Requirement[];
  currentImplementation: ImplementationObservation[];
  diffs: DiffItem[];
  suggestedReviewers: string[];
  auditTrail: AuditEvent[];
  phonePreviewType: 'profile' | 'feed' | 'chat' | 'redesign';
}

export interface SystemContract {
  id: string;
  name: string;
  productArea: string;
  sourceDocs: string[];
  implementationSource: string;
  lastScan: string;
  driftStatus: 'Aligned' | 'Drift Detected' | 'Review Required' | 'Review Created' | 'Review Complete';
  owner: string;
  risk: RiskLevel;
}

// ─── Use Case 1: Privacy — Smart Profiles ────────────────────────────────────

const smartProfilesFeature: DemoFeature = {
  id: 'smart-profiles',
  name: 'Smart Profiles',
  category: 'Privacy',
  productArea: 'User Identity & Privacy',
  owner: 'Maya Chen',
  ownerInitials: 'MC',
  status: 'Review Required',
  risk: 'Critical',
  summary: 'New personal data fields and expanded data usage diverge from approved privacy review.',
  driftSummary: '5 material changes — data collection, retention, and disclosure all drifted from approved Privacy Impact Assessment.',
  platform: 'iOS + Android',
  approvedDocs: ['PRD v3.2', 'Privacy Impact Assessment', 'Legal Approval Memo', 'Disclosure Copy v2'],
  releaseTarget: 'May Release Candidate',
  latestScan: '12 min ago',
  phonePreviewType: 'profile',
  suggestedReviewers: ['Privacy Counsel', 'Product Counsel', 'Data Governance'],
  approvedIntent: [
    {
      id: 'sp-r1',
      title: 'Data Collection Scope',
      approvedBehavior: 'Collect name, profile photo, city, interests, and preferred activity categories only.',
      sourceDoc: 'Privacy Impact Assessment v2.1',
      approvedDate: 'Apr 15, 2026',
      approver: 'Rachel Kim (Privacy Counsel)',
      status: 'Drifted',
    },
    {
      id: 'sp-r2',
      title: 'Data Usage',
      approvedBehavior: 'Use profile information only for personalization and friend discovery features.',
      sourceDoc: 'Legal Approval Memo — Smart Profiles',
      approvedDate: 'Apr 15, 2026',
      approver: 'Legal Team',
      status: 'Drifted',
    },
    {
      id: 'sp-r3',
      title: 'Disclosures',
      approvedBehavior: 'Show Privacy Center disclosures covering all collected fields before feature launch.',
      sourceDoc: 'Disclosure Copy v2',
      approvedDate: 'Apr 18, 2026',
      approver: 'Rachel Kim (Privacy Counsel)',
      status: 'Partial',
    },
    {
      id: 'sp-r4',
      title: 'Retention Policy',
      approvedBehavior: 'Retain inactive profile preference data for 90 days, then purge.',
      sourceDoc: 'Data Governance Policy v4',
      approvedDate: 'Apr 10, 2026',
      approver: 'Data Governance',
      status: 'Drifted',
    },
    {
      id: 'sp-r5',
      title: 'Device Identifiers',
      approvedBehavior: 'No device identifiers used for personalization or profiling.',
      sourceDoc: 'Privacy Impact Assessment v2.1',
      approvedDate: 'Apr 15, 2026',
      approver: 'Rachel Kim (Privacy Counsel)',
      status: 'Drifted',
    },
  ],
  currentImplementation: [
    {
      id: 'sp-i1',
      requirementId: 'sp-r1',
      currentBehavior: 'Collects name, photo, city, interests, categories, birthday month, dietary tags, and device ID.',
      evidenceSource: 'GitHub Mobile Repo — last commit 3 days ago',
      filePath: 'friendli-mobile/src/profile/ProfileFields.tsx',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'sp-i2',
      requirementId: 'sp-r2',
      currentBehavior: 'Profile data used for personalization, friend discovery, push notification targeting, and analytics segmentation.',
      evidenceSource: 'Backend Services Repo + Analytics Tracking Plan',
      filePath: 'friendli-api/services/profile/usage_policy.ts',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'sp-i3',
      requirementId: 'sp-r3',
      currentBehavior: 'Disclosure exists but omits dietary tags and device ID collection. Privacy Center not updated.',
      evidenceSource: 'App Store Build v8.14.0',
      filePath: 'friendli-mobile/src/privacy/PrivacyCenter.tsx',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Partial',
    },
    {
      id: 'sp-i4',
      requirementId: 'sp-r4',
      currentBehavior: 'Retention policy set to 180 days — doubled from the approved 90-day policy.',
      evidenceSource: 'Backend Services Repo',
      filePath: 'friendli-api/services/data/retention_config.yaml',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'sp-i5',
      requirementId: 'sp-r5',
      currentBehavior: 'Device ID included in recommendation feature pipeline and stored in user profile record.',
      evidenceSource: 'Backend Services Repo + ML Feature Store',
      filePath: 'friendli-api/services/recommendations/feature_pipeline.py',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
  ],
  diffs: [
    { id: 'sp-d1', requirement: 'Data Collection Scope', changeType: 'New personal data fields added', severity: 'Critical', status: 'Open', tag: 'NEW FIELD' },
    { id: 'sp-d2', requirement: 'Data Usage', changeType: 'Usage expanded beyond approved scope', severity: 'Critical', status: 'Open', tag: 'EXPANDED USE' },
    { id: 'sp-d3', requirement: 'Disclosures', changeType: 'Disclosure incomplete — missing fields', severity: 'High', status: 'Open', tag: 'MISSING DISCLOSURE' },
    { id: 'sp-d4', requirement: 'Retention Policy', changeType: 'Retention increased 90→180 days without approval', severity: 'High', status: 'Open', tag: 'POLICY CHANGE' },
    { id: 'sp-d5', requirement: 'Device Identifiers', changeType: 'Device ID added without privacy review', severity: 'Critical', status: 'Open', tag: 'NEW FIELD' },
  ],
  auditTrail: [
    { id: 'sp-a1', timestamp: 'May 30, 2026 — 9:41 AM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Code scan detected drift', detail: '5 material changes identified across 4 approved requirements.', type: 'scan' },
    { id: 'sp-a2', timestamp: 'May 28, 2026 — 2:15 PM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Material change classified', detail: 'Device ID field detected in feature pipeline — no prior approval.', type: 'scan' },
    { id: 'sp-a3', timestamp: 'Apr 18, 2026 — 11:30 AM', actor: 'Rachel Kim', actorInitials: 'RK', action: 'Requirement approved', detail: 'Privacy Impact Assessment v2.1 approved. Disclosures signed off.', type: 'approval' },
    { id: 'sp-a4', timestamp: 'Apr 15, 2026 — 9:00 AM', actor: 'Legal Team', actorInitials: 'LT', action: 'Requirement approved', detail: 'Legal memo approved — Smart Profiles data usage scope.', type: 'approval' },
    { id: 'sp-a5', timestamp: 'Apr 10, 2026 — 3:22 PM', actor: 'Data Governance', actorInitials: 'DG', action: 'Requirement approved', detail: 'Retention policy set to 90 days approved in Data Governance Policy v4.', type: 'approval' },
  ],
};

// ─── Use Case 2: Traditional ML — Nearby Ranking Model ───────────────────────

const nearbyRankingFeature: DemoFeature = {
  id: 'nearby-ranking',
  name: 'Nearby Ranking Model',
  category: 'Traditional ML',
  productArea: 'Personalization & ML',
  owner: 'James Park',
  ownerInitials: 'JP',
  status: 'Review Required',
  risk: 'High',
  summary: 'New model features, stale model card, and disabled explainability logging diverge from ML governance approval.',
  driftSummary: '5 ML governance violations — unapproved features, stale documentation, and missing fairness report.',
  platform: 'iOS + Android',
  approvedDocs: ['ML Model Card v2.1', 'ML Governance Review', 'Data Science Sign-off', 'Fairness Evaluation Plan'],
  releaseTarget: 'May Release Candidate',
  latestScan: '12 min ago',
  phonePreviewType: 'feed',
  suggestedReviewers: ['ML Governance', 'Privacy Counsel', 'Data Science Lead'],
  approvedIntent: [
    {
      id: 'nr-r1',
      title: 'Approved Model Features',
      approvedBehavior: 'Rank events using distance, popularity, category preference, and friend attendance signals only.',
      sourceDoc: 'ML Model Card v2.1',
      approvedDate: 'Mar 22, 2026',
      approver: 'James Park (Data Science Lead)',
      status: 'Drifted',
    },
    {
      id: 'nr-r2',
      title: 'Sensitive Field Exclusion',
      approvedBehavior: 'Exclude sensitive profile fields (age, dietary tags, device engagement) from model features.',
      sourceDoc: 'ML Governance Review',
      approvedDate: 'Mar 25, 2026',
      approver: 'ML Governance Committee',
      status: 'Drifted',
    },
    {
      id: 'nr-r3',
      title: 'Model Refresh Cadence',
      approvedBehavior: 'Refresh model weekly using approved training pipeline.',
      sourceDoc: 'ML Model Card v2.1',
      approvedDate: 'Mar 22, 2026',
      approver: 'James Park (Data Science Lead)',
      status: 'Drifted',
    },
    {
      id: 'nr-r4',
      title: 'Explainability Logging',
      approvedBehavior: 'Log feature importance scores for every inference batch for governance review.',
      sourceDoc: 'ML Governance Review',
      approvedDate: 'Mar 25, 2026',
      approver: 'ML Governance Committee',
      status: 'Drifted',
    },
    {
      id: 'nr-r5',
      title: 'Model Documentation',
      approvedBehavior: 'Human-readable model card must be current and reference production model version before deployment.',
      sourceDoc: 'ML Governance Review',
      approvedDate: 'Mar 25, 2026',
      approver: 'ML Governance Committee',
      status: 'Partial',
    },
  ],
  currentImplementation: [
    {
      id: 'nr-i1',
      requirementId: 'nr-r1',
      currentBehavior: 'Model v2.4 uses distance, popularity, category preference, friend attendance, age bucket, dietary tags, device engagement score, and inferred nightlife preference.',
      evidenceSource: 'ML Feature Store + Model Registry',
      filePath: 'friendli-api/services/recommendations/ranker_v2_4.py',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'nr-i2',
      requirementId: 'nr-r2',
      currentBehavior: 'Age bucket, dietary tags, device engagement score, and inferred nightlife preference are active model features in v2.4.',
      evidenceSource: 'ML Feature Store',
      filePath: 'friendli-ml/feature_store/schemas/ranker_features_v2_4.yaml',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'nr-i3',
      requirementId: 'nr-r3',
      currentBehavior: 'Model refreshes daily — cadence changed without governance review or updated model card.',
      evidenceSource: 'ML Training Pipeline Scheduler',
      filePath: 'friendli-ml/pipelines/ranker_training_schedule.yaml',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'nr-i4',
      requirementId: 'nr-r4',
      currentBehavior: 'Feature importance logging disabled for model v2.4 — flag set to false in inference config.',
      evidenceSource: 'Backend Services Repo',
      filePath: 'friendli-api/services/recommendations/inference_config.yaml',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'nr-i5',
      requirementId: 'nr-r5',
      currentBehavior: 'Model card references v2.1 but production is running v2.4. Fairness slice report missing.',
      evidenceSource: 'ML Model Registry',
      filePath: 'friendli-ml/model_cards/nearby_ranker_v2_1.md',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Partial',
    },
  ],
  diffs: [
    { id: 'nr-d1', requirement: 'Approved Model Features', changeType: 'New features added after governance approval', severity: 'High', status: 'Open', tag: 'NEW FIELD' },
    { id: 'nr-d2', requirement: 'Sensitive Field Exclusion', changeType: 'Proxy and sensitive features in production', severity: 'Critical', status: 'Open', tag: 'EXPANDED USE' },
    { id: 'nr-d3', requirement: 'Model Refresh Cadence', changeType: 'Cadence changed weekly→daily without approval', severity: 'Medium', status: 'Open', tag: 'POLICY CHANGE' },
    { id: 'nr-d4', requirement: 'Explainability Logging', changeType: 'Feature importance logging disabled', severity: 'High', status: 'Open', tag: 'STALE DOC' },
    { id: 'nr-d5', requirement: 'Model Documentation', changeType: 'Model card references stale version (v2.1 vs v2.4)', severity: 'High', status: 'Open', tag: 'STALE DOC' },
  ],
  auditTrail: [
    { id: 'nr-a1', timestamp: 'May 30, 2026 — 9:41 AM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Code scan detected drift', detail: 'Model v2.4 diverges from approved Model Card v2.1 on 5 governance dimensions.', type: 'scan' },
    { id: 'nr-a2', timestamp: 'May 27, 2026 — 4:10 PM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Material change classified', detail: 'Sensitive proxy features detected in production model features.', type: 'scan' },
    { id: 'nr-a3', timestamp: 'Mar 25, 2026 — 2:00 PM', actor: 'ML Governance Committee', actorInitials: 'MG', action: 'Requirement approved', detail: 'ML Governance Review approved for Nearby Ranking Model v2.1.', type: 'approval' },
    { id: 'nr-a4', timestamp: 'Mar 22, 2026 — 10:00 AM', actor: 'James Park', actorInitials: 'JP', action: 'Requirement approved', detail: 'ML Model Card v2.1 signed off. Offline evaluation passed.', type: 'approval' },
  ],
};

// ─── Use Case 3: GenAI — Plan Assistant ──────────────────────────────────────

const planAssistantFeature: DemoFeature = {
  id: 'plan-assistant',
  name: 'Plan Assistant',
  category: 'GenAI',
  productArea: 'AI Features',
  owner: 'Priya Sharma',
  ownerInitials: 'PS',
  status: 'Review Required',
  risk: 'Critical',
  summary: 'System prompt materially changed after AI governance approval — sensitive inference guardrail removed and retention extended.',
  driftSummary: '5 critical drifts — prompt changed post-approval, guardrail removed, false booking claims, disclosure missing.',
  platform: 'iOS + Android',
  approvedDocs: ['AI Governance Review v1', 'Prompt Review Sign-off', 'Legal Approval — AI Disclosure', 'Trust & Safety Assessment'],
  releaseTarget: 'May Release Candidate',
  latestScan: '12 min ago',
  phonePreviewType: 'chat',
  suggestedReviewers: ['AI Governance', 'Legal Counsel', 'Trust & Safety'],
  approvedIntent: [
    {
      id: 'pa-r1',
      title: 'Assistant Scope',
      approvedBehavior: 'Assistant can suggest plans, restaurants, and events. Cannot confirm bookings unless user completes checkout.',
      sourceDoc: 'AI Governance Review v1',
      approvedDate: 'Apr 2, 2026',
      approver: 'AI Governance Board',
      status: 'Drifted',
    },
    {
      id: 'pa-r2',
      title: 'Sensitive Inference Guardrail',
      approvedBehavior: 'Prompt must block inference of sensitive traits (health, political, relationship status) from chat history.',
      sourceDoc: 'Trust & Safety Assessment',
      approvedDate: 'Apr 5, 2026',
      approver: 'Priya Sharma (T&S Lead)',
      status: 'Drifted',
    },
    {
      id: 'pa-r3',
      title: 'Safety Instructions',
      approvedBehavior: 'Prompt must include instruction against providing medical, legal, financial, or relationship advice.',
      sourceDoc: 'AI Governance Review v1',
      approvedDate: 'Apr 2, 2026',
      approver: 'AI Governance Board',
      status: 'Aligned',
    },
    {
      id: 'pa-r4',
      title: 'Conversation Retention',
      approvedBehavior: 'Conversation summaries retained for 30 days then deleted.',
      sourceDoc: 'Privacy Impact Assessment — Plan Assistant',
      approvedDate: 'Apr 8, 2026',
      approver: 'Rachel Kim (Privacy Counsel)',
      status: 'Drifted',
    },
    {
      id: 'pa-r5',
      title: 'AI Disclosure',
      approvedBehavior: 'User-facing disclosure must appear on every AI-generated suggestion saying results may be inaccurate.',
      sourceDoc: 'Legal Approval — AI Disclosure',
      approvedDate: 'Apr 3, 2026',
      approver: 'Legal Team',
      status: 'Partial',
    },
  ],
  currentImplementation: [
    {
      id: 'pa-i1',
      requirementId: 'pa-r1',
      currentBehavior: "System prompt optimized for plan completion and engagement. Assistant says 'I booked this for you' when only a draft itinerary was created.",
      evidenceSource: 'Prompt Registry — system_prompt_v7.md',
      filePath: 'prompts/plan-assistant/system_prompt_v7.md',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'pa-i2',
      requirementId: 'pa-r2',
      currentBehavior: 'Sensitive inference guardrail removed in prompt v7. Friend group behavior context added to prompt.',
      evidenceSource: 'Prompt Registry — version diff v5→v7',
      filePath: 'prompts/plan-assistant/system_prompt_v7.md',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'pa-i3',
      requirementId: 'pa-r3',
      currentBehavior: 'Safety instruction present in prompt v7 — no drift detected.',
      evidenceSource: 'Prompt Registry — system_prompt_v7.md',
      filePath: 'prompts/plan-assistant/system_prompt_v7.md',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Aligned',
    },
    {
      id: 'pa-i4',
      requirementId: 'pa-r4',
      currentBehavior: 'Conversation summaries retained for 120 days — 4x the approved 30-day limit.',
      evidenceSource: 'Backend Services Repo',
      filePath: 'friendli-api/services/ai/conversation_retention.yaml',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'pa-i5',
      requirementId: 'pa-r5',
      currentBehavior: 'AI disclosure appears only on first use — omitted in repeat assistant flows and follow-up suggestions.',
      evidenceSource: 'GitHub Mobile Repo',
      filePath: 'friendli-mobile/src/ai/PlanAssistant.tsx',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Partial',
    },
  ],
  diffs: [
    { id: 'pa-d1', requirement: 'Assistant Scope', changeType: 'Prompt changed to overstate booking confirmations', severity: 'Critical', status: 'Open', tag: 'PROMPT CHANGE' },
    { id: 'pa-d2', requirement: 'Sensitive Inference Guardrail', changeType: 'Safety guardrail removed from production prompt', severity: 'Critical', status: 'Open', tag: 'PROMPT CHANGE' },
    { id: 'pa-d3', requirement: 'Conversation Retention', changeType: 'Retention extended 30→120 days without approval', severity: 'High', status: 'Open', tag: 'POLICY CHANGE' },
    { id: 'pa-d4', requirement: 'AI Disclosure', changeType: 'Disclosure not shown on repeat interactions', severity: 'High', status: 'Open', tag: 'MISSING DISCLOSURE' },
    { id: 'pa-d5', requirement: 'Assistant Scope', changeType: 'Prompt version changed after governance approval', severity: 'Critical', status: 'Open', tag: 'PROMPT CHANGE' },
  ],
  auditTrail: [
    { id: 'pa-a1', timestamp: 'May 30, 2026 — 9:41 AM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Code scan detected drift', detail: 'Prompt v7 materially diverges from approved Prompt v5 on 4 governance dimensions.', type: 'scan' },
    { id: 'pa-a2', timestamp: 'May 29, 2026 — 11:05 AM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Material change classified', detail: 'Sensitive inference guardrail removed — no prior approval found in governance trail.', type: 'scan' },
    { id: 'pa-a3', timestamp: 'Apr 8, 2026 — 1:30 PM', actor: 'Rachel Kim', actorInitials: 'RK', action: 'Requirement approved', detail: 'Privacy Impact Assessment for Plan Assistant approved. 30-day retention confirmed.', type: 'approval' },
    { id: 'pa-a4', timestamp: 'Apr 5, 2026 — 10:00 AM', actor: 'Priya Sharma', actorInitials: 'PS', action: 'Requirement approved', detail: 'Trust & Safety Assessment approved. Sensitive inference guardrail required.', type: 'approval' },
    { id: 'pa-a5', timestamp: 'Apr 2, 2026 — 9:00 AM', actor: 'AI Governance Board', actorInitials: 'AG', action: 'Requirement approved', detail: 'AI Governance Review v1 approved. Prompt v5 signed off.', type: 'approval' },
  ],
};

// ─── Use Case 4: Design — Home Feed Redesign ─────────────────────────────────

const homeFeedFeature: DemoFeature = {
  id: 'home-feed',
  name: 'Home Feed Redesign',
  category: 'Design',
  productArea: 'Core Product',
  owner: 'Alex Torres',
  ownerInitials: 'AT',
  status: 'Drift Detected',
  risk: 'High',
  summary: 'Sponsored disclosure hidden, experiment expanded beyond approved scope, privacy settings entry point removed.',
  driftSummary: '5 design and disclosure violations vs approved Figma and product counsel review.',
  platform: 'iOS + Android',
  approvedDocs: ['PRD v4.1', 'Figma — Home Feed v3', 'Product Counsel Review', 'Ads/Legal Memo', 'Experiment Brief'],
  releaseTarget: 'May Release Candidate',
  latestScan: '12 min ago',
  phonePreviewType: 'redesign',
  suggestedReviewers: ['Design Lead', 'Product Counsel', 'Ads/Legal'],
  approvedIntent: [
    {
      id: 'hf-r1',
      title: 'Sponsored Event Labeling',
      approvedBehavior: 'Sponsored events must display a clearly visible "Sponsored" label directly on the event card.',
      sourceDoc: 'Ads/Legal Memo — Feed Redesign',
      approvedDate: 'May 1, 2026',
      approver: 'Legal Team + Ads Policy',
      status: 'Drifted',
    },
    {
      id: 'hf-r2',
      title: 'Recommendation Explanation',
      approvedBehavior: '"Why am I seeing this?" affordance must be immediately visible on personalized recommendation cards.',
      sourceDoc: 'PRD v4.1',
      approvedDate: 'May 3, 2026',
      approver: 'Product Manager',
      status: 'Drifted',
    },
    {
      id: 'hf-r3',
      title: 'Privacy Settings Access',
      approvedBehavior: 'Privacy settings link must remain accessible directly from the feed module.',
      sourceDoc: 'Privacy Impact Assessment — Feed Redesign',
      approvedDate: 'May 5, 2026',
      approver: 'Rachel Kim (Privacy Counsel)',
      status: 'Drifted',
    },
    {
      id: 'hf-r4',
      title: 'Friend Attendance Display',
      approvedBehavior: 'Friend avatars may only appear on event cards if friends have confirmed attendance.',
      sourceDoc: 'Figma — Home Feed v3',
      approvedDate: 'May 3, 2026',
      approver: 'Design Lead',
      status: 'Drifted',
    },
    {
      id: 'hf-r5',
      title: 'A/B Test Scope',
      approvedBehavior: 'Experiment limited to 10% of users. Expansion requires new experiment brief and PM sign-off.',
      sourceDoc: 'Experiment Brief — Feed Redesign v2',
      approvedDate: 'May 6, 2026',
      approver: 'Product Manager',
      status: 'Drifted',
    },
  ],
  currentImplementation: [
    {
      id: 'hf-i1',
      requirementId: 'hf-r1',
      currentBehavior: 'Sponsored label moved into overflow menu — not visible on card face. Users must tap to discover sponsorship.',
      evidenceSource: 'Figma — Experiment_Variant_B',
      filePath: 'figma://HomeFeed/Experiment_Variant_B/EventCard',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'hf-i2',
      requirementId: 'hf-r2',
      currentBehavior: '"Why am I seeing this?" appears only after long press — not immediately visible to users.',
      evidenceSource: 'GitHub Mobile Repo',
      filePath: 'friendli-mobile/src/feed/EventCard.tsx',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'hf-i3',
      requirementId: 'hf-r3',
      currentBehavior: 'Privacy settings link removed from feed module in Variant B. Only accessible via Settings > Privacy.',
      evidenceSource: 'GitHub Mobile Repo',
      filePath: 'friendli-mobile/src/feed/FeedHeader.tsx',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'hf-i4',
      requirementId: 'hf-r4',
      currentBehavior: 'Friend avatars shown for "friends may be interested" events regardless of confirmed attendance.',
      evidenceSource: 'Analytics Tracking Plan',
      filePath: 'analytics/tracking_plan/home_feed_events.yml',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
    {
      id: 'hf-i5',
      requirementId: 'hf-r5',
      currentBehavior: 'Experiment expanded to 35% of users — 3.5x the approved scope without new experiment brief.',
      evidenceSource: 'Experimentation Platform',
      filePath: 'experiments/home_feed_redesign_v2/config.json',
      lastDetected: 'May 30, 2026 — 9:41 AM',
      status: 'Drifted',
    },
  ],
  diffs: [
    { id: 'hf-d1', requirement: 'Sponsored Event Labeling', changeType: 'Disclosure visibility reduced — label hidden in menu', severity: 'High', status: 'Open', tag: 'MISSING DISCLOSURE' },
    { id: 'hf-d2', requirement: 'Recommendation Explanation', changeType: 'Explanation affordance hidden behind long press', severity: 'Medium', status: 'Open', tag: 'DESIGN CHANGE' },
    { id: 'hf-d3', requirement: 'Privacy Settings Access', changeType: 'Privacy settings entry point removed from feed', severity: 'High', status: 'Open', tag: 'DESIGN CHANGE' },
    { id: 'hf-d4', requirement: 'Friend Attendance Display', changeType: 'Unconfirmed attendance shown as social signal', severity: 'Medium', status: 'Open', tag: 'DESIGN CHANGE' },
    { id: 'hf-d5', requirement: 'A/B Test Scope', changeType: 'Experiment expanded 10%→35% without approval', severity: 'High', status: 'Open', tag: 'POLICY CHANGE' },
  ],
  auditTrail: [
    { id: 'hf-a1', timestamp: 'May 30, 2026 — 9:41 AM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Code scan detected drift', detail: '5 design and disclosure violations vs approved Figma and product counsel review.', type: 'scan' },
    { id: 'hf-a2', timestamp: 'May 29, 2026 — 3:45 PM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Material change classified', detail: 'Experiment traffic expanded 3.5x beyond approved scope — auto-flagged.', type: 'scan' },
    { id: 'hf-a3', timestamp: 'May 6, 2026 — 9:00 AM', actor: 'Product Manager', actorInitials: 'PM', action: 'Requirement approved', detail: 'Experiment Brief approved — 10% traffic, 2-week window.', type: 'approval' },
    { id: 'hf-a4', timestamp: 'May 5, 2026 — 11:00 AM', actor: 'Rachel Kim', actorInitials: 'RK', action: 'Requirement approved', detail: 'Privacy settings accessibility requirement approved for feed redesign.', type: 'approval' },
    { id: 'hf-a5', timestamp: 'May 3, 2026 — 2:00 PM', actor: 'Design Lead', actorInitials: 'DL', action: 'Requirement approved', detail: 'Figma — Home Feed v3 approved. Friend attendance display rules confirmed.', type: 'approval' },
  ],
};

export const demoFeatures: DemoFeature[] = [
  smartProfilesFeature,
  nearbyRankingFeature,
  planAssistantFeature,
  homeFeedFeature,
];

// ─── Connected Sources ────────────────────────────────────────────────────────

export const connectedSources: ConnectedSource[] = [
  {
    id: 'github-mobile',
    name: 'GitHub Mobile Repo',
    type: 'Code',
    icon: 'github',
    status: 'Connected',
    lastSynced: '12 min ago',
    coverage: 98,
    linkedRequirements: 34,
    artifacts: [
      { id: 'a1', name: 'ProfileFields.tsx', type: 'Source File', path: 'friendli-mobile/src/profile/ProfileFields.tsx' },
      { id: 'a2', name: 'EventCard.tsx', type: 'Source File', path: 'friendli-mobile/src/feed/EventCard.tsx' },
      { id: 'a3', name: 'PlanAssistant.tsx', type: 'Source File', path: 'friendli-mobile/src/ai/PlanAssistant.tsx' },
      { id: 'a4', name: 'FeedHeader.tsx', type: 'Source File', path: 'friendli-mobile/src/feed/FeedHeader.tsx' },
    ],
  },
  {
    id: 'github-backend',
    name: 'Backend Services Repo',
    type: 'Code',
    icon: 'server',
    status: 'Connected',
    lastSynced: '12 min ago',
    coverage: 95,
    linkedRequirements: 28,
    artifacts: [
      { id: 'a5', name: 'ranker_v2_4.py', type: 'Source File', path: 'friendli-api/services/recommendations/ranker_v2_4.py' },
      { id: 'a6', name: 'retention_config.yaml', type: 'Config', path: 'friendli-api/services/data/retention_config.yaml' },
      { id: 'a7', name: 'feature_pipeline.py', type: 'Source File', path: 'friendli-api/services/recommendations/feature_pipeline.py' },
      { id: 'a8', name: 'inference_config.yaml', type: 'Config', path: 'friendli-api/services/recommendations/inference_config.yaml' },
    ],
  },
  {
    id: 'product-requirements',
    name: 'Product Requirements',
    type: 'Document',
    icon: 'file-text',
    status: 'Connected',
    lastSynced: '2 hours ago',
    coverage: 91,
    linkedRequirements: 42,
    artifacts: [
      { id: 'a9', name: 'PRD v3.2 — Smart Profiles', type: 'PRD', path: 'docs/product/smart_profiles_prd_v3.2.md' },
      { id: 'a10', name: 'PRD v4.1 — Home Feed Redesign', type: 'PRD', path: 'docs/product/home_feed_redesign_prd_v4.1.md' },
      { id: 'a11', name: 'BRD — Nearby Ranking Model', type: 'BRD', path: 'docs/product/nearby_ranking_brd.md' },
    ],
  },
  {
    id: 'privacy-reviews',
    name: 'Privacy Reviews',
    type: 'Document',
    icon: 'shield',
    status: 'Connected',
    lastSynced: '2 hours ago',
    coverage: 88,
    linkedRequirements: 19,
    artifacts: [
      { id: 'a12', name: 'Privacy Impact Assessment v2.1', type: 'PIA', path: 'docs/privacy/smart_profiles_pia_v2.1.md' },
      { id: 'a13', name: 'Privacy Impact Assessment — Plan Assistant', type: 'PIA', path: 'docs/privacy/plan_assistant_pia.md' },
      { id: 'a14', name: 'Privacy Impact Assessment — Feed Redesign', type: 'PIA', path: 'docs/privacy/home_feed_pia.md' },
    ],
  },
  {
    id: 'legal-memos',
    name: 'Legal Memos',
    type: 'Document',
    icon: 'briefcase',
    status: 'Connected',
    lastSynced: '2 hours ago',
    coverage: 85,
    linkedRequirements: 14,
    artifacts: [
      { id: 'a15', name: 'Legal Approval Memo — Smart Profiles', type: 'Legal Memo', path: 'docs/legal/smart_profiles_memo.md' },
      { id: 'a16', name: 'Legal Approval — AI Disclosure', type: 'Legal Memo', path: 'docs/legal/ai_disclosure_approval.md' },
      { id: 'a17', name: 'Ads/Legal Memo — Feed Redesign', type: 'Legal Memo', path: 'docs/legal/feed_redesign_ads_memo.md' },
    ],
  },
  {
    id: 'ml-model-registry',
    name: 'ML Model Registry',
    type: 'ML',
    icon: 'cpu',
    status: 'Connected',
    lastSynced: '1 hour ago',
    coverage: 92,
    linkedRequirements: 11,
    artifacts: [
      { id: 'a18', name: 'nearby_ranker_v2_1.md (stale)', type: 'Model Card', path: 'friendli-ml/model_cards/nearby_ranker_v2_1.md' },
      { id: 'a19', name: 'ranker_features_v2_4.yaml', type: 'Feature Schema', path: 'friendli-ml/feature_store/schemas/ranker_features_v2_4.yaml' },
      { id: 'a20', name: 'ranker_training_schedule.yaml', type: 'Pipeline Config', path: 'friendli-ml/pipelines/ranker_training_schedule.yaml' },
    ],
  },
  {
    id: 'prompt-registry',
    name: 'Prompt Registry',
    type: 'AI',
    icon: 'message-square',
    status: 'Connected',
    lastSynced: '45 min ago',
    coverage: 96,
    linkedRequirements: 8,
    artifacts: [
      { id: 'a21', name: 'system_prompt_v5.md (approved)', type: 'Prompt', path: 'prompts/plan-assistant/system_prompt_v5.md' },
      { id: 'a22', name: 'system_prompt_v7.md (production)', type: 'Prompt', path: 'prompts/plan-assistant/system_prompt_v7.md' },
      { id: 'a23', name: 'prompt_changelog.md', type: 'Changelog', path: 'prompts/plan-assistant/changelog.md' },
    ],
  },
  {
    id: 'figma',
    name: 'Figma Designs',
    type: 'Design',
    icon: 'layers',
    status: 'Connected',
    lastSynced: '3 hours ago',
    coverage: 79,
    linkedRequirements: 9,
    artifacts: [
      { id: 'a24', name: 'Home Feed v3 (approved)', type: 'Figma Frame', path: 'figma://HomeFeed/Approved_v3' },
      { id: 'a25', name: 'Experiment_Variant_B (live)', type: 'Figma Frame', path: 'figma://HomeFeed/Experiment_Variant_B' },
      { id: 'a26', name: 'Smart Profiles — Profile Edit', type: 'Figma Frame', path: 'figma://SmartProfiles/ProfileEdit_v2' },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics Tracking Plan',
    type: 'Analytics',
    icon: 'bar-chart-2',
    status: 'Connected',
    lastSynced: '1 hour ago',
    coverage: 82,
    linkedRequirements: 7,
    artifacts: [
      { id: 'a27', name: 'home_feed_events.yml', type: 'Tracking Plan', path: 'analytics/tracking_plan/home_feed_events.yml' },
      { id: 'a28', name: 'profile_events.yml', type: 'Tracking Plan', path: 'analytics/tracking_plan/profile_events.yml' },
      { id: 'a29', name: 'ai_assistant_events.yml', type: 'Tracking Plan', path: 'analytics/tracking_plan/ai_assistant_events.yml' },
    ],
  },
];

// ─── System Contracts ─────────────────────────────────────────────────────────

export const systemContracts: SystemContract[] = [
  { id: 'sc-1', name: 'Smart Profiles', productArea: 'User Identity & Privacy', sourceDocs: ['PRD v3.2', 'PIA v2.1'], implementationSource: 'friendli-mobile + friendli-api', lastScan: '12 min ago', driftStatus: 'Review Required', owner: 'Maya Chen', risk: 'Critical' },
  { id: 'sc-2', name: 'Nearby Ranking Model', productArea: 'Personalization & ML', sourceDocs: ['ML Model Card v2.1', 'ML Governance Review'], implementationSource: 'friendli-api + friendli-ml', lastScan: '12 min ago', driftStatus: 'Review Required', owner: 'James Park', risk: 'High' },
  { id: 'sc-3', name: 'Plan Assistant', productArea: 'AI Features', sourceDocs: ['AI Governance Review v1', 'Prompt Review v5'], implementationSource: 'friendli-api + Prompt Registry', lastScan: '12 min ago', driftStatus: 'Review Required', owner: 'Priya Sharma', risk: 'Critical' },
  { id: 'sc-4', name: 'Home Feed Redesign', productArea: 'Core Product', sourceDocs: ['PRD v4.1', 'Figma Home Feed v3'], implementationSource: 'friendli-mobile + Experiments', lastScan: '12 min ago', driftStatus: 'Drift Detected', owner: 'Alex Torres', risk: 'High' },
  { id: 'sc-5', name: 'Location Permissions', productArea: 'Privacy', sourceDocs: ['Privacy Policy v6', 'PIA — Location'], implementationSource: 'friendli-mobile', lastScan: '12 min ago', driftStatus: 'Aligned', owner: 'Maya Chen', risk: 'Low' },
  { id: 'sc-6', name: 'Friend Invite Flow', productArea: 'Growth', sourceDocs: ['PRD — Invites', 'Legal Memo'], implementationSource: 'friendli-mobile + friendli-api', lastScan: '12 min ago', driftStatus: 'Aligned', owner: 'Sam Lee', risk: 'Low' },
  { id: 'sc-7', name: 'Event Checkout', productArea: 'Commerce', sourceDocs: ['PRD — Checkout', 'Payment Policy'], implementationSource: 'friendli-api + Stripe', lastScan: '12 min ago', driftStatus: 'Aligned', owner: 'Chris Wu', risk: 'Medium' },
  { id: 'sc-8', name: 'Push Notification Preferences', productArea: 'Notifications', sourceDocs: ['PRD — Notifications', 'Privacy Policy'], implementationSource: 'friendli-mobile + Push Service', lastScan: '12 min ago', driftStatus: 'Drift Detected', owner: 'Maya Chen', risk: 'Medium' },
  { id: 'sc-9', name: 'Age Gate', productArea: 'Trust & Safety', sourceDocs: ['T&S Policy', 'Legal Memo'], implementationSource: 'friendli-mobile', lastScan: '12 min ago', driftStatus: 'Aligned', owner: 'Priya Sharma', risk: 'Low' },
  { id: 'sc-10', name: 'Account Deletion', productArea: 'Privacy', sourceDocs: ['CCPA Compliance Doc', 'PRD — Account'], implementationSource: 'friendli-api', lastScan: '12 min ago', driftStatus: 'Aligned', owner: 'Maya Chen', risk: 'Low' },
  { id: 'sc-11', name: 'Sponsored Event Placement', productArea: 'Ads', sourceDocs: ['Ads Policy', 'Legal Memo'], implementationSource: 'friendli-mobile + Ads API', lastScan: '12 min ago', driftStatus: 'Review Required', owner: 'Alex Torres', risk: 'High' },
  { id: 'sc-12', name: 'Calendar Sync', productArea: 'Core Product', sourceDocs: ['PRD — Calendar', 'Privacy Policy'], implementationSource: 'friendli-mobile + Calendar SDK', lastScan: '12 min ago', driftStatus: 'Aligned', owner: 'Sam Lee', risk: 'Low' },
];

// ─── Global Audit Trail ───────────────────────────────────────────────────────

export const globalAuditEvents: AuditEvent[] = [
  { id: 'g1', timestamp: 'May 30, 2026 — 9:41 AM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Scheduled scan completed', detail: 'Full workspace scan completed. 7 material changes detected across 4 features.', type: 'scan' },
  { id: 'g2', timestamp: 'May 30, 2026 — 9:41 AM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Material change detected — Smart Profiles', detail: '5 drifts detected against approved Privacy Impact Assessment v2.1.', type: 'scan' },
  { id: 'g3', timestamp: 'May 30, 2026 — 9:41 AM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Material change detected — Plan Assistant', detail: 'Prompt v7 diverges from approved v5 — sensitive guardrail removed.', type: 'scan' },
  { id: 'g4', timestamp: 'May 29, 2026 — 3:45 PM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'Experiment scope violation detected', detail: 'Home Feed experiment expanded 10%→35% without approved experiment brief.', type: 'scan' },
  { id: 'g5', timestamp: 'May 27, 2026 — 4:10 PM', actor: 'CodeCounsel Scanner', actorInitials: 'CC', action: 'ML governance drift detected', detail: 'Nearby Ranking Model v2.4 includes unapproved features vs Model Card v2.1.', type: 'scan' },
  { id: 'g6', timestamp: 'May 20, 2026 — 2:00 PM', actor: 'Product Manager', actorInitials: 'PM', action: 'Review completed — Push Notifications', detail: 'Push Notification Preferences review completed. Minor changes accepted.', type: 'review' },
  { id: 'g7', timestamp: 'May 10, 2026 — 10:00 AM', actor: 'ML Governance Committee', actorInitials: 'MG', action: 'Requirement approved — Nearby Ranking Model', detail: 'ML Governance Review for Nearby Ranking Model v2.1 approved.', type: 'approval' },
  { id: 'g8', timestamp: 'Apr 18, 2026 — 11:30 AM', actor: 'Rachel Kim', actorInitials: 'RK', action: 'Privacy review approved — Smart Profiles', detail: 'Privacy Impact Assessment v2.1 approved for Smart Profiles launch.', type: 'approval' },
  { id: 'g9', timestamp: 'Apr 5, 2026 — 10:00 AM', actor: 'Priya Sharma', actorInitials: 'PS', action: 'T&S assessment approved — Plan Assistant', detail: 'Trust & Safety Assessment approved for Plan Assistant launch.', type: 'approval' },
  { id: 'g10', timestamp: 'Apr 2, 2026 — 9:00 AM', actor: 'AI Governance Board', actorInitials: 'AG', action: 'AI governance approved — Plan Assistant', detail: 'AI Governance Review v1 approved. Prompt v5 signed off.', type: 'approval' },
];

export const overviewMetrics = {
  liveContracts: 42,
  activeMaterialChanges: 7,
  lowRiskAutoClassified: 18,
  pendingReviews: 4,
  sourceCoverage: 96,
  lastScanTime: '12 min ago',
  releaseVersion: 'iOS 8.14.0 / Android 8.14.2',
  releaseTrain: 'May Release Candidate',
};
