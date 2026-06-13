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

type NavSection = 'overview' | 'live-reviews' | 'contracts' | 'sources' | 'audit' | 'settings';

export function DemoApp() {
  const [loading, setLoading] = useState(true);
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex h-[calc(100vh-57px)] overflow-hidden bg-[#F4F6FF]"
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
                    onExploreSources={() => navigateTo('sources')}
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
      )}
    </ToastProvider>
  );
}
