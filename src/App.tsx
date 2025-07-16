import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import FAQ from "./pages/FAQ";
import Vacancies from "./pages/Vacancies";
import Events from './pages/Events';
import Bids from "./pages/Bids";
import Publications from "./pages/Publications";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import NewsDetail from './pages/NewsDetail';
import Districts from './pages/Districts';
import DistrictDetail from './pages/DistrictDetail';
import React from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./i18n"; // Import i18n configuration

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider delayDuration={200}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/vacancies" element={<Vacancies />} />
                <Route path="/events" element={<Events />} />
                <Route path="/bids" element={<Bids />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/districts" element={<Districts />} />
                <Route path="/districts/:id" element={<DistrictDetail />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
