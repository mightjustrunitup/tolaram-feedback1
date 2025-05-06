
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/utils/ScrollToTop";
import NavigationBar from "./components/layout/NavigationBar";
import ThankYou from "./pages/ThankYou";

const queryClient = new QueryClient();

// Create a layout component to conditionally render the NavigationBar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isThankYouPage = location.pathname === "/thank-you";
  
  return (
    <>
      {!isThankYouPage && <NavigationBar />}
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Index />
            </AppLayout>
          } />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={
            <AppLayout>
              <NotFound />
            </AppLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
