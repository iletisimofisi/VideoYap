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
import { lazy, Suspense } from "react";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { LoginModal } from "@/components/auth/LoginModal";
import { TermsOfServiceModal } from "@/components/auth/TermsOfServiceModal";
import { useModal } from "@/context/ModalContext";

const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/videos" component={MyVideosPage} />
      <Route path="/videos/:videoId" component={VideoDetailPage} />
      <Route path="/admin">
        <Suspense fallback={<div className="p-12 text-center">Yükleniyor...</div>}>
          <AdminDashboard />
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
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
