import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, ArrowRight, Bell, BellRing, Calendar, Check, CheckCircle,
  Code2, Database, FileCheck2, FileText,
  GitBranch, Layers, RefreshCw, Scale, Search, Shield, Sparkles, UserCheck, Users,
} from 'lucide-react';
import { LogoMark } from '../components/LogoMark';

const howItWorksItems = [
  {
    icon: GitBranch,
    title: 'Connect your review sources',
    summary: 'Link PRDs, legal approvals, privacy reviews, model cards, prompts, policies, and disclosures.',
    action: 'Your team connects the places where product intent and implementation live—from approval documents and policies to code repositories, model registries, and design files.',
    product: 'CodeCounsel identifies approved requirements, owners, controls, and limitations, then links each requirement back to its original evidence.',
    result: 'You start with a shared, traceable record of what the team intended and approved.',
  },
  {
    icon: Layers,
    title: 'Track product changes',
    summary: 'Watch code, models, prompts, data use, vendors, and feature flags for changes that matter.',
    action: 'Engineering and product continue shipping updates through their normal workflows. No one has to manually reconcile every release against past approvals.',
    product: 'CodeCounsel compares approved intent with current implementation evidence and identifies meaningful differences, such as a new data field, changed prompt, longer retention period, or expanded rollout.',
    result: 'Routine updates stay out of the way while material changes are surfaced with the context needed to understand them.',
  },
  {
    icon: Shield,
    title: 'Send the right changes for review',
    summary: 'Route important changes with evidence, owners, context, and a clear record of each decision.',
    action: 'Legal, privacy, compliance, product, or engineering reviews only the changes that need a decision.',
    product: 'CodeCounsel packages the approved requirement, live behavior, supporting evidence, and risk context into a review task for the appropriate owners.',
    result: 'The team can approve, request clarification, update disclosures, or accept risk while preserving an audit-ready decision history.',
  },
];

function HowItWorksVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="cc-story-visual cc-source-visual" aria-label="Connected documents and systems flowing into CodeCounsel">
        <div className="cc-visual-source-list">
          <div><FileText /><span>Approvals</span></div>
          <div><Code2 /><span>Code</span></div>
          <div><Database /><span>Systems</span></div>
        </div>
        <div className="cc-visual-flow-lines" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="cc-visual-core">
          <LogoMark className="h-9 w-9" />
          <strong>CodeCounsel</strong>
          <small>Sources connected</small>
        </div>
        <div className="cc-visual-status"><CheckCircle /> 9 sources verified</div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="cc-story-visual cc-compare-visual" aria-label="Approved requirement compared with the live product">
        <div className="cc-compare-card approved">
          <span>Approved</span>
          <strong>90 day retention</strong>
          <small>Privacy review v2.1</small>
        </div>
        <div className="cc-scan-orbit">
          <Search />
          <span>Compare</span>
        </div>
        <div className="cc-compare-card live">
          <span>Live product</span>
          <strong>180 day retention</strong>
          <small>retention_config.yaml</small>
        </div>
        <div className="cc-change-found"><AlertTriangle /> Material change found</div>
      </div>
    );
  }

  return (
    <div className="cc-story-visual cc-review-visual" aria-label="A material change routed to the right reviewer">
      <div className="cc-review-ticket">
        <div className="cc-ticket-top">
          <FileCheck2 />
          <div>
            <span>Review task</span>
            <strong>Retention policy changed</strong>
          </div>
        </div>
        <div className="cc-ticket-evidence">
          <span>Approved: 90 days</span>
          <ArrowRight />
          <span>Live: 180 days</span>
        </div>
      </div>
      <div className="cc-review-route" aria-hidden="true"><span /></div>
      <div className="cc-review-owner">
        <div><UserCheck /></div>
        <strong>Privacy Counsel</strong>
        <small>Review assigned</small>
      </div>
      <div className="cc-visual-status"><CheckCircle /> Evidence included</div>
    </div>
  );
}

export function HomePage() {
  const [activeHowItWorks, setActiveHowItWorks] = useState(0);
  const activeStep = howItWorksItems[activeHowItWorks];

  return (
    <main className="cc-marketing">
      <section className="cc-hero">
        <div className="cc-page">
          <div className="cc-hero-grid">
            <div className="cc-hero-copy">
              <div className="cc-kicker">
                <Sparkles className="h-3.5 w-3.5" />
                Product governance for fast-moving teams
              </div>
              <h1>Your product changes constantly. Can you keep up?</h1>
              <p>
                CodeCounsel helps legal, compliance, product, and engineering teams ensure that
                the features that are shipped still match approved uses, controls, disclosures, and requirements.
              </p>
              <div className="cc-hero-actions">
                <a href="/demo" className="cc-btn cc-btn-primary">
                  View demo <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://calendly.com/olivermschwartz/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="cc-btn cc-btn-secondary"
                >
                  Schedule a call <Calendar className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="cc-dashboard-card">
              <div className="cc-dashboard-top">
                <div className="cc-dashboard-brand">
                  <LogoMark className="cc-logo-mark-sm" />
                  <span>CodeCounsel</span>
                </div>
                <div className="cc-dashboard-icons">
                  <Bell className="h-4 w-4" />
                  <span>VC</span>
                </div>
              </div>

              <div className="cc-dashboard-title">
                <h2>Product Change Review</h2>
                <div className="cc-pill-row">
                  <span>Service: User Profile</span>
                  <span>Privacy review v3.2</span>
                  <span>Scan: 12 min ago</span>
                </div>
              </div>

              <div className="cc-review-cols">
                <div className="cc-review-col">
                  <div className="cc-col-heading cc-green">1</div>
                  <h3>What Was Approved</h3>
                  <p>Email and name only</p>
                  <p>Personalization only</p>
                  <p>90 day retention</p>
                  <div className="cc-approved"><Check className="h-3 w-3" /> Approved Apr 15</div>
                </div>
                <div className="cc-review-col">
                  <div className="cc-col-heading cc-blue">2</div>
                  <h3>What Changed</h3>
                  <p>Email, name, <strong>device ID</strong></p>
                  <p>Personalization and <strong>analytics</strong></p>
                  <p><strong>120 day retention</strong></p>
                  <div className="cc-scan"><RefreshCw className="h-3 w-3" /> Scan complete</div>
                </div>
                <div className="cc-review-col">
                  <div className="cc-col-heading cc-orange">3</div>
                  <h3>Needs Review</h3>
                  <span className="cc-diff-tag">NEW FIELD</span>
                  <span className="cc-diff-tag">EXPANDED USE</span>
                  <div className="cc-alert-box">
                    <strong>Important change detected</strong>
                    <a href="/demo">Start review task</a>
                  </div>
                </div>
              </div>

              <div className="cc-audit-strip">
                <span>Change detected</span>
                <span>Review task created</span>
                <span>Decision recorded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cc-section cc-problem-section">
        <div className="cc-page">
          <div className="cc-problem-heading">
            <div className="cc-section-heading">
              <span>The problem we solve</span>
              <h2>Product review is still a manual process built on memory and meetings.</h2>
            </div>
            <p>
              Companies approve a product at one point in time, but the product keeps changing.
              Teams then rely on people to collect facts, compare new work against old decisions,
              identify risk, find the right reviewer, and preserve the outcome. That process is
              slow, inconsistent, and difficult to scale.
            </p>
          </div>

          <motion.article
            className="cc-translation-card"
            initial={{ opacity: 0, x: -90, y: 50, scale: 0.92, rotate: -1.5, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cc-translation-copy">
              <div className="cc-problem-card-title">
                <div><Database /></div>
                <h3>Collect the facts in one connected record</h3>
              </div>
              <p>
                Product decisions are spread across documents, tickets, code, models, prompts,
                and designs. CodeCounsel connects those sources, identifies the requirements and
                decisions inside them, and keeps every fact linked to its evidence.
              </p>
              <div className="cc-efficiency-outcome">
                <CheckCircle /> Less time searching for documents, owners, and approvals
              </div>
            </div>
            <div className="cc-translation-visual cc-facts-visual" aria-label="Scattered product sources collected into one approved record">
              <div className="cc-fact-sources">
                <span><FileText /> Privacy review</span>
                <span><GitBranch /> Product requirements</span>
                <span><Code2 /> Code repositories</span>
                <span><Scale /> Legal approval</span>
              </div>
              <div className="cc-translation-arrow">
                <Sparkles />
                <ArrowRight />
              </div>
              <div className="cc-fact-record">
                <span><Database /> Connected record</span>
                <strong>Customer Data Collection</strong>
                <ul>
                  <li><Check /> Approved data fields</li>
                  <li><Check /> Permitted uses and controls</li>
                  <li><Check /> Owners and source evidence</li>
                </ul>
                <small>Facts stay traceable to their source</small>
              </div>
            </div>
          </motion.article>

          <motion.article
            className="cc-translation-card"
            initial={{ opacity: 0, x: 90, y: 50, scale: 0.92, rotate: 1.5, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cc-translation-copy">
              <div className="cc-problem-card-title">
                <div><Scale /></div>
                <h3>Translate technical changes into legal context</h3>
              </div>
              <p>
                Legal and compliance teams should not need to read code to understand a product.
                CodeCounsel turns implementation evidence into a plain-language summary of what
                changed, why it matters, and which approvals or disclosures may be affected.
              </p>
              <div className="cc-efficiency-outcome">
                <CheckCircle /> Better decisions without requiring legal teams to read code
              </div>
            </div>
            <div className="cc-translation-visual" aria-label="Code translated into a plain-language legal summary">
              <div className="cc-code-sample">
                <span><Code2 /> Implementation evidence</span>
                <code>retention_days: 180</code>
                <code>device_id: enabled</code>
                <code>analytics_use: true</code>
              </div>
              <div className="cc-translation-arrow">
                <Sparkles />
                <ArrowRight />
              </div>
              <div className="cc-legal-summary">
                <span><Scale /> Legal summary</span>
                <strong>Three approved limits have changed</strong>
                <ul>
                  <li>Retention doubled from 90 to 180 days</li>
                  <li>A new identifier is being collected</li>
                  <li>Data use expanded to analytics</li>
                </ul>
                <small>Privacy review and disclosure update recommended</small>
              </div>
            </div>
          </motion.article>

          <motion.article
            className="cc-translation-card"
            initial={{ opacity: 0, x: -90, y: 50, scale: 0.92, rotate: -1.5, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cc-translation-copy">
              <div className="cc-problem-card-title">
                <div><RefreshCw /></div>
                <h3>Keep up with a product that never stops changing</h3>
              </div>
              <p>
                Approvals capture one moment, but engineering keeps shipping. CodeCounsel compares
                new implementation evidence with approved requirements, identifies meaningful
                drift, and sends it to the right reviewer with the relevant context attached.
              </p>
              <div className="cc-efficiency-outcome">
                <CheckCircle /> Continuous oversight without adding legal to every release meeting
              </div>
            </div>
            <div className="cc-translation-visual cc-change-visual" aria-label="A product change detected and routed for review">
              <div className="cc-change-timeline">
                <div className="approved">
                  <span>Approved</span>
                  <strong>90 day retention</strong>
                  <small>Privacy review v2.1</small>
                </div>
                <div className="changed">
                  <span>Product changed</span>
                  <strong>180 day retention</strong>
                  <small>Detected in production config</small>
                </div>
              </div>
              <div className="cc-translation-arrow">
                <AlertTriangle />
                <ArrowRight />
              </div>
              <div className="cc-review-notification">
                <span><BellRing /> Review needed</span>
                <strong>Privacy Counsel</strong>
                <p>Retention doubled beyond the approved limit.</p>
                <small><CheckCircle /> Evidence and prior approval attached</small>
              </div>
            </div>
          </motion.article>

          <div className="cc-value-summary">
            <div>
              <strong>From periodic review</strong>
              <span>Point-in-time checks that become outdated as soon as the product changes</span>
            </div>
            <ArrowRight aria-hidden="true" />
            <div>
              <strong>To continuous alignment</strong>
              <span>The right facts, changes, reviewers, and decisions connected throughout the product lifecycle</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cc-section">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>How it works</span>
            <h2>Connect approvals to the product that actually ships.</h2>
          </div>
          <div className="cc-how-tabs" role="tablist" aria-label="How CodeCounsel works">
            {howItWorksItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeHowItWorks === index;

              return (
                <button
                  type="button"
                  role="tab"
                  id={`how-it-works-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="how-it-works-panel"
                  className={`cc-how-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveHowItWorks(index)}
                  key={item.title}
                >
                  <div className="cc-how-tab-heading">
                    <span className="cc-how-step-number">{index + 1}</span>
                    <Icon className="cc-card-icon" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span className="cc-how-tab-link">
                    {isActive ? 'Current step' : 'View step'} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
          <div
            className="cc-how-story"
            role="tabpanel"
            id="how-it-works-panel"
            aria-labelledby={`how-it-works-tab-${activeHowItWorks}`}
            key={activeHowItWorks}
          >
            <div className="cc-how-story-intro">
              <span>Step {activeHowItWorks + 1} of {howItWorksItems.length}</span>
              <h3>{activeStep.title}</h3>
            </div>
            <div className="cc-how-story-body">
              <HowItWorksVisual step={activeHowItWorks} />
              <div className="cc-how-story-grid">
                <div>
                  <span>What your team does</span>
                  <p>{activeStep.action}</p>
                </div>
                <div>
                  <span>What CodeCounsel does</span>
                  <p>{activeStep.product}</p>
                </div>
                <div>
                  <span>The result</span>
                  <p>{activeStep.result}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cc-section cc-section-soft">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>Outcomes that matter</span>
            <h2>Move faster without losing track of product risk.</h2>
          </div>
          <div className="cc-card-grid four">
            <article className="cc-info-card compact">
              <Shield className="cc-card-icon" />
              <h3>Catch risk before launch</h3>
              <p>Spot legal, privacy, and compliance issues before they reach customers.</p>
            </article>
            <article className="cc-info-card compact">
              <Sparkles className="cc-card-icon" />
              <h3>Keep product documentation current</h3>
              <p>See when approved use cases, controls, or disclosures need to be updated.</p>
            </article>
            <article className="cc-info-card compact">
              <Users className="cc-card-icon" />
              <h3>Give teams the same facts</h3>
              <p>Show legal, product, privacy, and engineering what changed and why it matters.</p>
            </article>
            <article className="cc-info-card compact">
              <FileText className="cc-card-icon" />
              <h3>Answer audits faster</h3>
              <p>Keep a clear history of approvals, product changes, reviews, comments, and decisions.</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="cc-footer">
        <div className="cc-page cc-footer-inner">
          <div className="cc-footer-brand">
            <LogoMark className="cc-logo-mark-sm" />
            <span>CodeCounsel</span>
          </div>
          <p>Keep approved use cases, controls, and product behavior in sync.</p>
        </div>
      </footer>
    </main>
  );
}
