import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Cpu, MessageSquare, Layout, CheckCircle,
  AlertTriangle, Send, FileText,
  AlertCircle, Download, ArrowRight
} from 'lucide-react';
import { demoFeatures, type DemoFeature, type AuditEvent, type RiskLevel } from '../data/demoData';
import { RiskBadge } from './RiskBadge';
import { StatusBadge } from './StatusBadge';
import { DiffTag } from './DiffTag';
import { AuditTimeline } from './AuditTimeline';
import { PhonePreview } from './PhonePreview';
import { ReviewTaskModal } from './ReviewTaskModal';
import { DisclosureDraftPanel } from './DisclosureDraftPanel';
import { MarkLowRiskModal } from './MarkLowRiskModal';

const categoryIcon: Record<string, React.ElementType> = {
  Privacy: Shield,
  'Traditional ML': Cpu,
  GenAI: MessageSquare,
  Design: Layout,
};

const categoryColor: Record<string, string> = {
  Privacy: 'text-red-600 bg-red-50 border-red-100',
  'Traditional ML': 'text-purple-600 bg-purple-50 border-purple-100',
  GenAI: 'text-blue-600 bg-blue-50 border-blue-100',
  Design: 'text-indigo-600 bg-indigo-50 border-indigo-100',
};

const statusColor: Record<string, string> = {
  Aligned: 'text-green-600 bg-green-50 border-green-200',
  Drifted: 'text-red-600 bg-red-50 border-red-200',
  Partial: 'text-orange-600 bg-orange-50 border-orange-200',
};

interface ReviewDashboardProps {
  initialFeatureId?: string;
}

function makeId() {
  return Math.random().toString(36).slice(2);
}

function now() {
  return 'Just now';
}

export function ReviewDashboard({ initialFeatureId }: ReviewDashboardProps) {
  const [features, setFeatures] = useState<DemoFeature[]>(demoFeatures);
  const [activeId, setActiveId] = useState(initialFeatureId ?? demoFeatures[0].id);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [showMarkLow, setShowMarkLow] = useState(false);
  const [comment, setComment] = useState('');

  const feature = features.find(f => f.id === activeId) ?? features[0];

  function updateFeature(updater: (f: DemoFeature) => DemoFeature) {
    setFeatures(prev => prev.map(f => f.id === activeId ? updater(f) : f));
  }

  function addAuditEvent(event: Omit<AuditEvent, 'id'>) {
    updateFeature(f => ({
      ...f,
      auditTrail: [{ ...event, id: makeId() }, ...f.auditTrail],
    }));
  }

  function handleReviewCreated(reviewers: string[], note: string, priority: string) {
    updateFeature(f => ({ ...f, status: 'Review Created' }));
    addAuditEvent({
      timestamp: now(),
      actor: 'Demo User',
      actorInitials: 'VC',
      action: 'Review task created',
      detail: `${priority} priority review created. Assigned to: ${reviewers.join(', ')}.${note ? ` Note: ${note}` : ''}`,
      type: 'review',
    });
  }

  function handleDisclosureSaved(draft: string) {
    addAuditEvent({
      timestamp: now(),
      actor: 'Demo User',
      actorInitials: 'VC',
      action: 'Disclosure draft generated',
      detail: `Updated disclosure draft saved: "${draft.slice(0, 80)}..."`,
      type: 'disclosure',
    });
  }

  function handleRiskAccepted(justification: string) {
    const riskDowngrade: Record<RiskLevel, RiskLevel> = {
      Critical: 'High', High: 'Medium', Medium: 'Low', Low: 'Low',
    };
    const newRisk = riskDowngrade[feature.risk];
    updateFeature(f => ({ ...f, risk: newRisk }));
    addAuditEvent({
      timestamp: now(),
      actor: 'Demo User',
      actorInitials: 'VC',
      action: 'Risk accepted with justification',
      detail: `Risk reduced from ${feature.risk} to ${newRisk}. Justification: "${justification}"`,
      type: 'risk',
    });
  }

  function handleComment() {
    if (!comment.trim()) return;
    addAuditEvent({
      timestamp: now(),
      actor: 'Demo User',
      actorInitials: 'VC',
      action: 'Reviewer comment added',
      detail: comment,
      type: 'comment',
    });
    setComment('');
  }

  function handleClarification() {
    addAuditEvent({
      timestamp: now(),
      actor: 'Demo User',
      actorInitials: 'VC',
      action: 'Clarification requested',
      detail: `Clarification requested on ${feature.name} — awaiting engineering team response.`,
      type: 'review',
    });
  }

  const Icon = categoryIcon[feature.category] ?? Shield;

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden">
      {/* Feature selector sidebar */}
      <div className="w-52 shrink-0 border-r border-gray-100 bg-white flex flex-col">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Features</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {features.map(f => {
            const FIcon = categoryIcon[f.category] ?? Shield;
            const isActive = f.id === activeId;
            return (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all
                  ${isActive ? 'bg-[#F4F6FF] border border-[#3157F6]/15' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${categoryColor[f.category]}`}>
                  <FIcon className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-semibold truncate ${isActive ? 'text-[#3157F6]' : 'text-gray-700'}`}>{f.name}</div>
                  <div className="mt-0.5 flex items-center gap-1 flex-wrap">
                    <RiskBadge risk={f.risk} pulse={isActive} size="sm" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main review area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top metadata bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={feature.id + '-meta'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-b border-gray-100 px-5 py-3 shrink-0"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${categoryColor[feature.category]} border`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-gray-900">{feature.name}</h2>
                    <RiskBadge risk={feature.risk} pulse />
                    <StatusBadge status={feature.status} />
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-3 flex-wrap">
                    <span>Friendli Mobile App · {feature.platform}</span>
                    <span>Owner: {feature.owner}</span>
                    <span>Scan: {feature.latestScan}</span>
                    <span>{feature.releaseTarget}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden md:flex flex-wrap gap-1">
                  {feature.approvedDocs.slice(0, 2).map(doc => (
                    <span key={doc} className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] text-gray-500 font-medium flex items-center gap-1">
                      <FileText className="h-2.5 w-2.5" />{doc}
                    </span>
                  ))}
                  {feature.approvedDocs.length > 2 && (
                    <span className="px-2 py-0.5 text-[10px] text-gray-400">+{feature.approvedDocs.length - 2}</span>
                  )}
                </div>
                <button className="btn-secondary text-xs py-1.5 gap-1.5">
                  <Download className="h-3 w-3" /> Export
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Three columns */}
        <div className="flex-1 overflow-hidden flex gap-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={feature.id + '-cols'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex min-w-0 overflow-hidden"
            >
              {/* Column 1: Approved Intent */}
              <div className="w-[30%] min-w-0 flex flex-col border-r border-gray-100 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-100 bg-green-50/50">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    <span className="text-xs font-semibold text-green-800">Approved Intent</span>
                    <span className="ml-auto text-[10px] text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full font-medium">
                      {feature.approvedIntent.length} requirements
                    </span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {feature.approvedIntent.map(req => (
                    <div key={req.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-card">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-gray-800 leading-snug">{req.title}</h4>
                        <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${statusColor[req.status]}`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[11px] text-gray-600 leading-relaxed">{req.approvedBehavior}</p>
                      <div className="mt-2 pt-2 border-t border-gray-50 space-y-0.5">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1">
                          <FileText className="h-2.5 w-2.5" />
                          <span className="truncate">{req.sourceDoc}</span>
                        </div>
                        <div className="text-[10px] text-gray-400">{req.approvedDate} · {req.approver}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Current Implementation */}
              <div className="w-[30%] min-w-0 flex flex-col border-r border-gray-100 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-100 bg-red-50/40">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                    <span className="text-xs font-semibold text-red-800">Current Implementation</span>
                    <span className="ml-auto text-[10px] text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full font-medium">
                      {feature.diffs.length} drifts
                    </span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {feature.currentImplementation.map(impl => {
                    const req = feature.approvedIntent.find(r => r.id === impl.requirementId);
                    return (
                      <div
                        key={impl.id}
                        className={`bg-white border rounded-xl p-3 shadow-card
                          ${impl.status === 'Drifted' ? 'border-red-200' :
                            impl.status === 'Partial' ? 'border-orange-200' : 'border-gray-100'}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-gray-800 leading-snug">{req?.title ?? 'Implementation'}</h4>
                          <span className={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${statusColor[impl.status]}`}>
                            {impl.status}
                          </span>
                        </div>
                        <p className={`mt-1.5 text-[11px] leading-relaxed ${impl.status !== 'Aligned' ? 'text-red-700' : 'text-gray-600'}`}>
                          {impl.currentBehavior}
                        </p>
                        <div className="mt-2 pt-2 border-t border-gray-50 space-y-0.5">
                          <div className="text-[10px] text-gray-400 truncate">{impl.evidenceSource}</div>
                          <code className="text-[9px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded font-mono block truncate">
                            {impl.filePath}
                          </code>
                          <div className="text-[10px] text-gray-400">{impl.lastDetected}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Diff / Review */}
              <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-100 bg-orange-50/30">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-orange-600" />
                    <span className="text-xs font-semibold text-orange-800">Diff / Review</span>
                    <span className="ml-auto text-[10px] text-orange-600">92% evidence confidence</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {/* Drift table */}
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-card">
                    <div className="px-3 py-2 border-b border-gray-50 bg-gray-50/50">
                      <span className="text-[11px] font-semibold text-gray-700">Material Changes Detected</span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {feature.diffs.map(diff => (
                        <div key={diff.id} className="px-3 py-2 flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-800">{diff.requirement}</div>
                            <div className="text-[10px] text-gray-500 mt-0.5 leading-snug">{diff.changeType}</div>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <DiffTag tag={diff.tag} />
                            <span className={`text-[9px] font-medium ${
                              diff.severity === 'Critical' ? 'text-red-600' :
                              diff.severity === 'High' ? 'text-orange-600' :
                              diff.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                            }`}>{diff.severity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Material change alert */}
                  <div className={`rounded-xl border p-3 ${
                    feature.risk === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'
                  }`}>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${feature.risk === 'Critical' ? 'text-red-600' : 'text-orange-600'}`} />
                      <div>
                        <div className={`text-xs font-bold ${feature.risk === 'Critical' ? 'text-red-800' : 'text-orange-800'}`}>
                          Material Change Detected
                        </div>
                        <p className={`text-[10px] mt-0.5 leading-relaxed ${feature.risk === 'Critical' ? 'text-red-700' : 'text-orange-700'}`}>
                          {feature.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Suggested reviewers */}
                  <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-card">
                    <div className="text-[11px] font-semibold text-gray-700 mb-2">Suggested Reviewers</div>
                    <div className="flex flex-wrap gap-1.5">
                      {feature.suggestedReviewers.map(r => (
                        <span key={r} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] text-gray-700 font-medium">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
                            <span className="text-white text-[7px] font-bold">{r[0]}</span>
                          </div>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShowReviewModal(true)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#3157F6] text-white rounded-xl text-xs font-semibold hover:bg-[#2347e0] transition-colors col-span-2"
                    >
                      Start Review Task <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setShowMarkLow(true)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium hover:bg-gray-50 transition-colors"
                    >
                      Mark Low Risk
                    </button>
                    <button
                      onClick={handleClarification}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium hover:bg-gray-50 transition-colors"
                    >
                      Request Clarification
                    </button>
                    <button
                      onClick={() => setShowDisclosure(true)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium hover:bg-gray-50 transition-colors col-span-2"
                    >
                      <FileText className="h-3 w-3" /> Create Disclosure Update
                    </button>
                  </div>

                  {/* Comment box */}
                  <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-card">
                    <div className="text-[11px] font-semibold text-gray-700 mb-2">Add Review Comment</div>
                    <textarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="No reviewer comments yet — add a note..."
                      rows={2}
                      className="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#3157F6]/20 focus:border-[#3157F6]/40 text-gray-700 placeholder-gray-400"
                    />
                    <button
                      onClick={handleComment}
                      disabled={!comment.trim()}
                      className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-[#3157F6] text-white rounded-lg text-xs font-medium hover:bg-[#2347e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-3 w-3" /> Post Comment
                    </button>
                  </div>

                  {/* Audit trail */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
                    <div className="px-3 py-2.5 border-b border-gray-50 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-gray-700">Audit Trail</span>
                      <span className="text-[10px] text-gray-400">{feature.auditTrail.length} events</span>
                    </div>
                    <div className="p-3">
                      <AuditTimeline events={feature.auditTrail} compact />
                    </div>
                  </div>

                  {/* Phone preview */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
                    <div className="px-3 py-2.5 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-gray-700">Mobile Preview</span>
                        <span className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full font-medium">Drift highlighted</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <PhonePreview type={feature.phonePreviewType} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showReviewModal && (
          <ReviewTaskModal
            featureName={feature.name}
            suggestedReviewers={feature.suggestedReviewers}
            onClose={() => setShowReviewModal(false)}
            onCreated={handleReviewCreated}
          />
        )}
        {showDisclosure && (
          <DisclosureDraftPanel
            feature={feature}
            onClose={() => setShowDisclosure(false)}
            onSaved={handleDisclosureSaved}
          />
        )}
        {showMarkLow && (
          <MarkLowRiskModal
            featureName={feature.name}
            currentRisk={feature.risk}
            onClose={() => setShowMarkLow(false)}
            onAccepted={handleRiskAccepted}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
