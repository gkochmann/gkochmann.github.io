import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, Sparkles } from 'lucide-react';
import { useToast } from './ToastProvider';
import type { DemoFeature } from '../data/demoData';

interface DisclosureDraftPanelProps {
  feature: DemoFeature;
  onClose: () => void;
  onSaved: (draft: string) => void;
}

function generateDraft(feature: DemoFeature): string {
  if (feature.id === 'smart-profiles') {
    return `Privacy Disclosure Update — Smart Profiles

Friendli collects and uses the following information when you use Smart Profiles:

Data We Collect:
• Name, profile photo, city
• Interests and preferred activity categories
• Birthday month
• Dietary preferences and tags
• Device identifier (for personalization)

How We Use This Information:
• To personalize your event and activity recommendations
• To help friends discover and connect with you
• To deliver relevant push notifications
• For aggregated analytics and product improvement

How Long We Keep It:
We retain your profile preference data for 180 days of inactivity, after which it is permanently deleted.

Your Choices:
You can update or delete your profile information at any time in Settings > Privacy Center. To opt out of push notification targeting, visit Settings > Notifications.

Questions? Contact privacy@friendli.app`;
  }
  if (feature.id === 'plan-assistant') {
    return `AI Disclosure — Plan Assistant

The Plan Assistant uses artificial intelligence to generate personalized suggestions for plans, restaurants, and events.

Important:
• AI-generated suggestions may be inaccurate, incomplete, or unavailable.
• The Plan Assistant creates draft itineraries. Reservations and bookings are NOT confirmed unless you complete checkout through the app.
• The Assistant does not provide medical, legal, financial, or relationship advice.

Your data:
• Conversation summaries are retained for 120 days to improve your experience.
• The Assistant may use your group's shared preferences and past activity to generate suggestions.

This disclosure applies every time you use Plan Assistant.`;
  }
  return `Disclosure Update — ${feature.name}

[Auto-generated disclosure draft based on detected implementation drift.]

Please review and update this disclosure to accurately reflect the current product behavior before publishing.

Key changes to disclose:
${feature.diffs.map(d => `• ${d.requirement}: ${d.changeType}`).join('\n')}`;
}

export function DisclosureDraftPanel({ feature, onClose, onSaved }: DisclosureDraftPanelProps) {
  const [draft, setDraft] = useState(() => generateDraft(feature));
  const [saved, setSaved] = useState(false);
  const { showToast } = useToast();

  function handleSave() {
    setSaved(true);
    onSaved(draft);
    showToast('Disclosure draft saved', 'success');
    setTimeout(onClose, 800);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white border-l border-gray-100 z-50 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Create Disclosure Update</h3>
              <p className="text-xs text-gray-500">{feature.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* AI badge */}
        <div className="px-5 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs text-blue-700 font-medium">
              Draft auto-generated from detected drift — review before publishing
            </span>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-y-auto p-5">
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className="w-full h-full min-h-[400px] text-sm text-gray-700 border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#3157F6]/20 focus:border-[#3157F6]/40 font-mono leading-relaxed"
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            This draft will be saved to the review activity feed.
          </p>
          <div className="flex gap-2">
            <button onClick={onClose} className="btn-secondary text-sm py-2">Discard</button>
            <button
              onClick={handleSave}
              disabled={saved}
              className="btn-primary text-sm py-2 disabled:opacity-70"
            >
              {saved ? 'Saved!' : 'Save Draft Disclosure'}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
