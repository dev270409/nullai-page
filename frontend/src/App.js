import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import TopBanner from "@/components/TopBanner";
import HeroSection from "@/components/HeroSection";
import PrimaryContractBox from "@/components/PrimaryContractBox";
import ContractsList from "@/components/ContractsList";
import AuditBadge from "@/components/AuditBadge";
import FeaturesGrid from "@/components/FeaturesGrid";
import WhitepaperSection from "@/components/WhitepaperSection";
import TokenomicsPanel from "@/components/TokenomicsPanel";
import Footer from "@/components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  useEffect(() => {
    // Lightweight backend ping (kept from template; non-blocking).
    // API and axios are stable module-scoped values — safe to omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios.get(`${API}/`).catch(() => {});
  }, []);

  return (
    <main data-testid="nullai-home" className="min-h-screen bg-black text-white">
      <TopBanner />
      <HeroSection />
      <PrimaryContractBox />
      <ContractsList />
      <AuditBadge />
      <FeaturesGrid />
      <WhitepaperSection />
      <TokenomicsPanel />
      <Footer />
    </main>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
