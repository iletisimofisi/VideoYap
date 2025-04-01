import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProfilePage from "@/pages/ProfilePage";
import NotificationsPage from "@/pages/NotificationsPage";
import MyVideosPage from "@/pages/videos/MyVideosPage";
import VideoDetailPage from "@/pages/videos/VideoDetailPage";
import CreateVideoPage from "@/pages/CreateVideoPage";
import { lazy, Suspense } from "react";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { LoginModal } from "@/components/auth/LoginModal";
import { TermsOfServiceModal } from "@/components/auth/TermsOfServiceModal";
import { useModal } from "@/context/ModalContext";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

// Admin Pages
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));

// Static Pages
const HelpPage = lazy(() => import("@/pages/static/HelpPage"));
const AboutPage = lazy(() => import("@/pages/static/AboutPage"));
const PrivacyPolicy = lazy(() => import("@/pages/static/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/static/TermsOfService"));
const CareersPage = lazy(() => import("@/pages/static/CareersPage"));
const ContactPage = lazy(() => import("@/pages/static/ContactPage"));

function Router() {
  const loading = <div className="p-12 text-center">Yükleniyor...</div>;

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/videos" component={MyVideosPage} />
      <Route path="/videos/:videoId" component={VideoDetailPage} />
      <Route path="/video-olustur" component={CreateVideoPage} />
      
      {/* Admin Routes */}
      <Route path="/admin">
        <Suspense fallback={loading}>
          <AdminDashboard />
        </Suspense>
      </Route>
      
      {/* Static Pages */}
      <Route path="/yardim">
        <Suspense fallback={loading}>
          <HelpPage />
        </Suspense>
      </Route>
      <Route path="/hakkimizda">
        <Suspense fallback={loading}>
          <AboutPage />
        </Suspense>
      </Route>
      <Route path="/gizlilik-politikasi">
        <Suspense fallback={loading}>
          <PrivacyPolicy />
        </Suspense>
      </Route>
      <Route path="/kullanim-sartlari">
        <Suspense fallback={loading}>
          <TermsOfService />
        </Suspense>
      </Route>
      <Route path="/kariyer">
        <Suspense fallback={loading}>
          <CareersPage />
        </Suspense>
      </Route>
      <Route path="/iletisim">
        <Suspense fallback={loading}>
          <ContactPage />
        </Suspense>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isLoginModalOpen, isTermsModalOpen } = useModal();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-darkBg text-lightText">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        {isLoginModalOpen && <LoginModal />}
        {isTermsModalOpen && <TermsOfServiceModal />}
        <ScrollToTop />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
