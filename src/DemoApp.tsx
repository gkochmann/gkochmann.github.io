import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastProvider } from './components/ToastProvider';
import { LoadingScreen } from './components/LoadingScreen';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { OverviewScreen } from './components/OverviewScreen';
import { ReviewDashboard } from './components/ReviewDashboard';
import { SystemContractsTable } from './components/SystemContractsTable';
import { SourceExplorer } from './components/SourceExplorer';
import { AuditScreen } from './components/AuditScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { DemoIntroModal } from './components/DemoIntroModal';
import { TabContextPopup } from './components/TabContextPopup';

type NavSection = 'overview' | 'live-reviews' | 'contracts' | 'sources' | 'audit' | 'settings';

export function DemoApp() {
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [tabContextSection, setTabContextSection] = useState<NavSection | null>(null);
  const [seenTabContexts, setSeenTabContexts] = useState<NavSection[]>([]);
  const [activeSection, setActiveSection] = useState<NavSection>('overview');
  const [reviewFeatureId, setReviewFeatureId] = useState<string | undefined>(undefined);

  const handleDoneLoading = useCallback(() => setLoading(false), []);

  function openReview(featureId: string) {
    setReviewFeatureId(featureId);
    setActiveSection('live-reviews');
  }

  function navigateTo(section: NavSection) {
    setActiveSection(section);
    if (section !== 'live-reviews') setReviewFeatureId(undefined);
    if (section !== 'overview' && !seenTabContexts.includes(section)) {
      setTabContextSection(section);
      setSeenTabContexts(prev => [...prev, section]);
    }
  }

  return (
    <ToastProvider>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingScreen onDone={handleDoneLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex h-[calc(100vh-57px)] overflow-hidden border-t-2 border-gray-300 bg-[#F4F6FF] transition duration-200 ${
              showIntro ? 'pointer-events-none blur-[2px]' : ''
            }`}
          >
            <Sidebar activeSection={activeSection} onNavigate={navigateTo} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <Topbar />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex-1 flex min-h-0 overflow-hidden"
                >
                  {activeSection === 'overview' && (
                    <OverviewScreen
                      onOpenReview={openReview}
                    />
                  )}
                  {activeSection === 'live-reviews' && (
                    <ReviewDashboard initialFeatureId={reviewFeatureId} />
                  )}
                  {activeSection === 'contracts' && <SystemContractsTable />}
                  {activeSection === 'sources' && <SourceExplorer />}
                  {activeSection === 'audit' && <AuditScreen />}
                  {activeSection === 'settings' && <SettingsScreen />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <AnimatePresence>
            {showIntro && <DemoIntroModal onClose={() => setShowIntro(false)} />}
          </AnimatePresence>
          <AnimatePresence>
            {tabContextSection && !showIntro && (
              <TabContextPopup
                section={tabContextSection}
                onClose={() => setTabContextSection(null)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </ToastProvider>
  );
}
