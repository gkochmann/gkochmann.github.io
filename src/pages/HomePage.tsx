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
                Product governance for fast-moving teams
              </div>
              <h1>Your product changes constantly. Do you know what is live?</h1>
              <p>
                CodeCounsel helps legal, compliance, product, and engineering teams track whether
                shipped features still match approved uses, controls, disclosures, and requirements.
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

      <section className="cc-section">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>How it works</span>
            <h2>Connect approvals to the product that actually ships.</h2>
          </div>
          <div className="cc-card-grid three">
            <article className="cc-info-card">
              <GitBranch className="cc-card-icon" />
              <h3>Connect your review sources</h3>
              <p>Link PRDs, legal approvals, privacy reviews, model cards, prompts, policies, and disclosures.</p>
            </article>
            <article className="cc-info-card">
              <Layers className="cc-card-icon" />
              <h3>Track product changes</h3>
              <p>Watch code, models, prompts, data use, vendors, and feature flags for changes that matter.</p>
            </article>
            <article className="cc-info-card">
              <Shield className="cc-card-icon" />
              <h3>Send the right changes for review</h3>
              <p>Route important changes with evidence, owners, context, and a clear record of each decision.</p>
            </article>
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
