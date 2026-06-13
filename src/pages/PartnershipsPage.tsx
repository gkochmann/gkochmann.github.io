import { ArrowRight, CheckCircle, ClipboardList, FileSearch, Lock, MessageSquare, Rocket, ShieldCheck, Users } from 'lucide-react';

const receiveItems = [
  { icon: FileSearch, text: 'A documentation and development alignment assessment delivered by CodeCounsel' },
  { icon: Rocket, text: 'Early access to new features before general availability' },
  { icon: Users, text: 'Direct access to the founding team, not a sales process' },
];

const contributeItems = [
  { icon: ClipboardList, text: 'Access to real protected requirements docs, specs, and code workflows' },
  { icon: MessageSquare, text: 'Structured feedback sessions with the CodeCounsel team' },
  { icon: CheckCircle, text: 'Use case input that directly shapes product priorities and roadmap design' },
];

export function PartnershipsPage() {
  return (
    <main className="cc-marketing">
      <section className="cc-partner-hero">
        <div className="cc-page">
          <div className="cc-program-badge">Discovery Partner Program</div>
          <h1>Shape how legal and engineering stay in sync.</h1>
          <div className="cc-partner-intro">
            <div className="cc-spots">
              <strong>10</strong>
              <span>partner spots available</span>
            </div>
            <p>
              We are inviting a select group of teams to work directly with CodeCounsel before
              general availability. We will deliver a free assessment of risk and gaps in your
              development process in exchange for real workflow insight that helps drive the roadmap.
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
            <h2>A symbiotic program to make sure that provides value today, and helps us build a product you will love.</h2>
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
            <h2>Built for teams who prioritize speed <em>and</em> accuracy in development.</h2>
          </div>
          <div className="cc-card-grid three">
            <article className="cc-info-card">
              <h3>In-house legal and privacy teams</h3>
              <p>For growth-stage or enterprise tech companies managing evolving product obligations.</p>
            </article>
            <article className="cc-info-card">
              <h3>Product and engineering orgs</h3>
              <p>For teams where legal coverage is lean and implementation changes faster than review cycles.</p>
            </article>
            <article className="cc-info-card">
              <h3>Compliance and GRC teams</h3>
              <p>For groups accountable for audit trails, controls, and cross-functional alignment.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cc-section">
        <div className="cc-page">
          <div className="cc-section-heading">
            <span>How it works</span>
            <h2>Four steps from fit check to product feedback.</h2>
          </div>
          <div className="cc-step-grid">
            {[
              ['Apply & align', 'Short conversation to confirm fit and scope. We select partners where we can deliver immediate value.'],
              ['Connect your sources', 'Link your existing tools using CodeCounsels existing secure connectors.'],
              ['Receive your assessment', 'We assess drift between intent and implementation and provide structure for long-term alignment.'],
              ['Shape the roadmap', 'Weekly or monthly feedback sessions where your feedback directly informs our next build.'],
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
              <p>All information shared during the program including product plans, workflows, and documentation is treated as confidential by both parties. A mututal NDA is required prior to onboarding.</p>
            </article>
            <article className="cc-info-card compact">
              <ShieldCheck className="cc-card-icon" />
              <h3>Data use</h3>
              <p>Partner data and documents are used solely to deliver assessments and improve CodeCounsel's product. No partner data is shared with third parties, used for model training, or retained beyond the program without agreement.</p>
            </article>
            <article className="cc-info-card compact">
              <ClipboardList className="cc-card-icon" />
              <h3>Intellectual property</h3>
              <p>Partner data and documents are used solely to deliver assessments and improve CodeCounsel's product. No partner data is shared with third parties, used for model training, or retained beyond the program without agreement.</p>
            </article>
            <article className="cc-info-card compact">
              <MessageSquare className="cc-card-icon" />
              <h3>Termination</h3>
              <p>Either party may exit the program with 7 days written notice. Upon exit, CodeCounsel will delete or return partner materials as directed. Confidentiality obligations survive termination.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
