import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import LoginTribal from "./pages/LoginTribal.tsx";
import LoginGovernment from "./pages/LoginGovernment.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import DashboardTribal from "./pages/DashboardTribal.tsx";
import DashboardGovernment from "./pages/DashboardGovernment.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login/tribal" element={<LoginTribal />} />
          <Route path="/login/government" element={<LoginGovernment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/tribal" element={<DashboardTribal />} />
          <Route path="/dashboard/government" element={<DashboardGovernment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
