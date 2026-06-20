import { ArrowRight, CheckCircle, ClipboardList, FileSearch, Lock, MessageSquare, Rocket, ShieldCheck, Users } from 'lucide-react';

const receiveItems = [
  { icon: FileSearch, text: 'A clear assessment of where your approvals, docs, and product behavior may be out of sync' },
  { icon: Rocket, text: 'Early access to new features before general availability' },
  { icon: Users, text: 'Direct access to the founding team, not a sales handoff' },
];

const contributeItems = [
  { icon: ClipboardList, text: 'Access to real approval, documentation, and product-change workflows' },
  { icon: MessageSquare, text: 'Practical feedback on what is useful, confusing, or missing' },
  { icon: CheckCircle, text: 'Input that directly shapes the product roadmap' },
];

export function PartnershipsPage() {
  return (
    <main className="cc-marketing">
      <section className="cc-partner-hero">
        <div className="cc-page">
          <div className="cc-program-badge">Discovery Partner Program</div>
          <h1>Help build the product that keeps approvals and shipped features in sync.</h1>
          <div className="cc-partner-intro">
            <div className="cc-spots">
              <strong>10</strong>
              <span>partner spots available</span>
            </div>
            <p>
              We are inviting a select group of teams to work directly with CodeCounsel before
              general availability. You get a free assessment of where your product reviews,
              approvals, and live features may be out of sync. In return, we learn from the real
              workflows that should shape the product.
            </p>
          </div>
          <a href="/demo" className="cc-btn cc-btn-primary">
            Explore the demo <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="cc-section">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>What you get / what you give</span>
            <h2>A focused partnership that gives you value now and helps us build the right product.</h2>
          </div>
          <div className="cc-exchange-grid">
            <div className="cc-exchange-col receive">
              <h3>You Receive</h3>
              {receiveItems.map(item => {
                const Icon = item.icon;
                return (
                  <div className="cc-exchange-item" key={item.text}>
                    <Icon className="h-5 w-5" />
                    <p>{item.text}</p>
                  </div>
                );
              })}
            </div>
            <div className="cc-exchange-col">
              <h3>You Contribute</h3>
              {contributeItems.map(item => {
                const Icon = item.icon;
                return (
                  <div className="cc-exchange-item" key={item.text}>
                    <Icon className="h-5 w-5" />
                    <p>{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="cc-section cc-section-soft">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>Who is this for</span>
            <h2>Built for teams that move quickly but still need to prove what is live.</h2>
          </div>
          <div className="cc-card-grid three">
            <article className="cc-info-card">
              <h3>In-house legal and privacy teams</h3>
              <p>For teams reviewing product changes, privacy commitments, disclosures, and customer obligations.</p>
            </article>
            <article className="cc-info-card">
              <h3>Product and engineering orgs</h3>
              <p>For teams shipping faster than legal, privacy, and compliance reviews can manually track.</p>
            </article>
            <article className="cc-info-card">
              <h3>Compliance and GRC teams</h3>
              <p>For groups that need clear evidence of what was approved, what changed, and who reviewed it.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cc-section">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>How it works</span>
            <h2>Four steps from fit check to useful product insight.</h2>
          </div>
          <div className="cc-step-grid">
            {[
              ['Apply & align', 'Short conversation to confirm fit and scope. We select partners where we can deliver immediate value.'],
              ['Connect your sources', 'Link the tools and documents your teams already use for product review and approval.'],
              ['Receive your assessment', 'We identify where approved requirements, disclosures, or controls may no longer match what is live.'],
              ['Shape the roadmap', 'Weekly or monthly feedback sessions where your input directly informs our next build.'],
            ].map(([title, body], index) => (
              <article className="cc-step-card" key={title}>
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cc-section cc-section-soft">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>Partnership details</span>
            <h2>Clear operating terms for early partners.</h2>
          </div>
          <div className="cc-card-grid four">
            <article className="cc-info-card compact">
              <Lock className="cc-card-icon" />
              <h3>Mutual confidentiality</h3>
              <p>Information shared during the program, including product plans, workflows, and documentation, is treated as confidential by both parties. A mutual NDA is required before onboarding.</p>
            </article>
            <article className="cc-info-card compact">
              <ShieldCheck className="cc-card-icon" />
              <h3>Data use</h3>
              <p>Partner data and documents are used only to deliver assessments and improve CodeCounsel. No partner data is shared with third parties, used for model training, or retained beyond the program without agreement.</p>
            </article>
            <article className="cc-info-card compact">
              <ClipboardList className="cc-card-icon" />
              <h3>Intellectual property</h3>
              <p>You keep ownership of your materials, documents, code, data, and internal workflows. CodeCounsel owns the product improvements and general learnings developed through the program.</p>
            </article>
            <article className="cc-info-card compact">
              <MessageSquare className="cc-card-icon" />
              <h3>Termination</h3>
              <p>Either party may leave the program with 7 days written notice. Upon exit, CodeCounsel will delete or return partner materials as directed. Confidentiality obligations survive termination.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
