import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { LoginModal } from "@/components/auth/LoginModal";
import { TermsOfServiceModal } from "@/components/auth/TermsOfServiceModal";
import { useModal } from "@/context/ModalContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
