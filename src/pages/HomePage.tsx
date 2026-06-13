import { ArrowRight, Bell, Check, FileText, GitBranch, Layers, RefreshCw, Shield, Sparkles, Users } from 'lucide-react';
import { LogoMark } from '../components/LogoMark';

export function HomePage() {
  return (
    <main className="cc-marketing">
      <section className="cc-hero">
        <div className="cc-page">
          <div className="cc-hero-grid">
            <div className="cc-hero-copy">
              <div className="cc-kicker">
                <Sparkles className="h-3.5 w-3.5" />
                Live system contracts for product teams
              </div>
              <h1>Turn static legal and engineering documentation into live system contracts.</h1>
              <p>
                CodeCounsel keeps product, legal, privacy, and engineering aligned as features evolve,
                before material risk slips into production.
              </p>
              <div className="cc-hero-actions">
                <a href="/demo" className="cc-btn cc-btn-primary">
                  View demo <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/partnerships" className="cc-btn cc-btn-secondary">
                  Partner program
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
                <h2>Live Review Dashboard</h2>
                <div className="cc-pill-row">
                  <span>Service: User Profile</span>
                  <span>PRD v3.2</span>
                  <span>Scan: 12 min ago</span>
                </div>
              </div>

              <div className="cc-review-cols">
                <div className="cc-review-col">
                  <div className="cc-col-heading cc-green">1</div>
                  <h3>Approved Intent</h3>
                  <p>Email and name only</p>
                  <p>Personalization only</p>
                  <p>90 day retention</p>
                  <div className="cc-approved"><Check className="h-3 w-3" /> Approved Apr 15</div>
                </div>
                <div className="cc-review-col">
                  <div className="cc-col-heading cc-blue">2</div>
                  <h3>Current Implementation</h3>
                  <p>Email, name, <strong>device ID</strong></p>
                  <p>Personalization and <strong>analytics</strong></p>
                  <p><strong>120 day retention</strong></p>
                  <div className="cc-scan"><RefreshCw className="h-3 w-3" /> Scan complete</div>
                </div>
                <div className="cc-review-col">
                  <div className="cc-col-heading cc-orange">3</div>
                  <h3>Diff / Review</h3>
                  <span className="cc-diff-tag">NEW FIELD</span>
                  <span className="cc-diff-tag">EXPANDED USE</span>
                  <div className="cc-alert-box">
                    <strong>Material change detected</strong>
                    <a href="/demo">Start review task</a>
                  </div>
                </div>
              </div>

              <div className="cc-audit-strip">
                <span>Drift detected</span>
                <span>Review task created</span>
                <span>Decision captured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cc-section">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>How it works</span>
            <h2>Connect the sources of intent to the systems that ship.</h2>
          </div>
          <div className="cc-card-grid three">
            <article className="cc-info-card">
              <GitBranch className="cc-card-icon" />
              <h3>Configure sources</h3>
              <p>Connect requirements, legal approvals, specs, code, design files, model cards, prompts, and disclosures.</p>
            </article>
            <article className="cc-info-card">
              <Layers className="cc-card-icon" />
              <h3>Continuously monitor changes</h3>
              <p>Approved obligations become live contracts that are compared against the current product implementation.</p>
            </article>
            <article className="cc-info-card">
              <Shield className="cc-card-icon" />
              <h3>Escalate material drift</h3>
              <p>Only meaningful differences trigger review, with evidence, ownership, and an auditable decision trail.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cc-section cc-section-soft">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>Outcomes that matter</span>
            <h2>Reduce review drag without losing control.</h2>
          </div>
          <div className="cc-card-grid four">
            <article className="cc-info-card compact">
              <Shield className="cc-card-icon" />
              <h3>Reduce legal risk</h3>
              <p>Keep disclosures and obligations matched to actual product behavior.</p>
            </article>
            <article className="cc-info-card compact">
              <Sparkles className="cc-card-icon" />
              <h3>Catch drift early</h3>
              <p>Detect material changes before launch, incidents, or audit pressure.</p>
            </article>
            <article className="cc-info-card compact">
              <Users className="cc-card-icon" />
              <h3>Reduce back-and-forth</h3>
              <p>Give reviewers clear diffs, context, source evidence, and owners.</p>
            </article>
            <article className="cc-info-card compact">
              <FileText className="cc-card-icon" />
              <h3>Create audit trails</h3>
              <p>Capture every approval, drift, review task, comment, and risk decision.</p>
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
          <p>Keep intent and implementation in sync. Build trustworthy products at scale.</p>
        </div>
      </footer>
    </main>
  );
}
