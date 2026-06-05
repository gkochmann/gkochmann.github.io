import { useState } from 'react';
import { motion } from 'framer-motion';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${checked ? 'bg-[#3157F6]' : 'bg-gray-200'}`}
    >
      <motion.span
        animate={{ x: checked ? 16 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50/30">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  );
}

function SettingsRow({
  label, description, children,
}: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 gap-4">
      <div>
        <div className="text-sm font-medium text-gray-800">{label}</div>
        {description && <div className="text-xs text-gray-400 mt-0.5">{description}</div>}
      </div>
      {children}
    </div>
  );
}

export function SettingsScreen() {
  const [settings, setSettings] = useState({
    autoScan: true,
    scanFrequency: 15,
    criticalAlerts: true,
    highAlerts: true,
    mediumAlerts: false,
    slackNotify: true,
    emailDigest: false,
    autoClassifyLow: true,
    requireJustification: true,
    privacyCounselAuto: true,
    legalCounselAuto: false,
    mlGovernanceAuto: true,
    severityThreshold: 'High',
  });

  function set(key: keyof typeof settings, value: unknown) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      <div className="mb-1">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Workspace configuration for Friendli Production</p>
      </div>

      {/* Scan Settings */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <SettingsSection title="Scan Configuration">
          <SettingsRow label="Automatic Scanning" description="Continuously scan sources for drift">
            <Toggle checked={settings.autoScan} onChange={v => set('autoScan', v)} />
          </SettingsRow>
          <SettingsRow label="Scan Frequency" description="How often sources are checked for changes">
            <select
              value={settings.scanFrequency}
              onChange={e => set('scanFrequency', Number(e.target.value))}
              className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3157F6]/20"
            >
              <option value={5}>Every 5 minutes</option>
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
              <option value={60}>Every hour</option>
            </select>
          </SettingsRow>
          <SettingsRow label="Auto-classify Low Risk" description="Automatically classify minor drifts as low risk">
            <Toggle checked={settings.autoClassifyLow} onChange={v => set('autoClassifyLow', v)} />
          </SettingsRow>
          <SettingsRow label="Severity Threshold for Alerts" description="Minimum severity to trigger a review alert">
            <select
              value={settings.severityThreshold}
              onChange={e => set('severityThreshold', e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3157F6]/20"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </SettingsRow>
        </SettingsSection>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <SettingsSection title="Notifications">
          <SettingsRow label="Critical risk alerts" description="Immediate alerts for critical drift">
            <Toggle checked={settings.criticalAlerts} onChange={v => set('criticalAlerts', v)} />
          </SettingsRow>
          <SettingsRow label="High risk alerts" description="Alerts for high-severity changes">
            <Toggle checked={settings.highAlerts} onChange={v => set('highAlerts', v)} />
          </SettingsRow>
          <SettingsRow label="Medium risk alerts" description="Alerts for medium-severity changes">
            <Toggle checked={settings.mediumAlerts} onChange={v => set('mediumAlerts', v)} />
          </SettingsRow>
          <SettingsRow label="Slack notifications" description="Send alerts to #codecounsel-alerts">
            <Toggle checked={settings.slackNotify} onChange={v => set('slackNotify', v)} />
          </SettingsRow>
          <SettingsRow label="Email digest" description="Daily summary email to team leads">
            <Toggle checked={settings.emailDigest} onChange={v => set('emailDigest', v)} />
          </SettingsRow>
        </SettingsSection>
      </motion.div>

      {/* Review Routing */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <SettingsSection title="Review Routing Rules">
          <SettingsRow label="Require justification for risk acceptance" description="Users must provide a written justification">
            <Toggle checked={settings.requireJustification} onChange={v => set('requireJustification', v)} />
          </SettingsRow>
          <SettingsRow label="Auto-assign Privacy Counsel" description="Auto-add privacy counsel to privacy-related drifts">
            <Toggle checked={settings.privacyCounselAuto} onChange={v => set('privacyCounselAuto', v)} />
          </SettingsRow>
          <SettingsRow label="Auto-assign Legal Counsel" description="Auto-add legal counsel to disclosure drifts">
            <Toggle checked={settings.legalCounselAuto} onChange={v => set('legalCounselAuto', v)} />
          </SettingsRow>
          <SettingsRow label="Auto-assign ML Governance" description="Auto-add ML governance to model-related drifts">
            <Toggle checked={settings.mlGovernanceAuto} onChange={v => set('mlGovernanceAuto', v)} />
          </SettingsRow>
        </SettingsSection>
      </motion.div>

      {/* Integrations */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <SettingsSection title="Integrations">
          {[
            { name: 'GitHub', description: 'Code scanning for mobile + backend repos', status: 'Connected' },
            { name: 'Figma', description: 'Design file diff monitoring', status: 'Connected' },
            { name: 'Slack', description: '#codecounsel-alerts webhook', status: 'Connected' },
            { name: 'Jira', description: 'Auto-create tickets for reviews', status: 'Not configured' },
            { name: 'Linear', description: 'Sync review tasks to engineering board', status: 'Not configured' },
          ].map(integration => (
            <SettingsRow key={integration.name} label={integration.name} description={integration.description}>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-xl border ${
                integration.status === 'Connected'
                  ? 'text-green-700 bg-green-50 border-green-200'
                  : 'text-gray-500 bg-gray-50 border-gray-200'
              }`}>
                {integration.status}
              </span>
            </SettingsRow>
          ))}
        </SettingsSection>
      </motion.div>

      {/* Danger zone */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Legal & Compliance</h3>
          <div className="flex flex-wrap gap-2">
            <button className="btn-secondary text-xs py-2">Export Audit Log</button>
            <button className="btn-secondary text-xs py-2">Download All Contracts</button>
            <button className="btn-secondary text-xs py-2">Legal Hold Export</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
