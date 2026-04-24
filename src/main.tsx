import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import S4 from './components/S4/S4';
import ProgrammeOverview from './components/ProgrammeOverview/ProgrammeOverview';
import FAQs from './components/FAQs/FAQs';
import ChangeNetwork from './components/ChangeNetwork/ChangeNetwork';
import { ErrorToastProvider } from './components/common/ErrorToast/ErrorToastProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorToastProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<S4 />} />
          <Route path="/overview" element={<ProgrammeOverview onBack={() => { }} />} />
          <Route path="/faqs" element={<FAQs onBack={() => { }} onNavigate={() => { }} />} />
          <Route path="/change-network" element={<ChangeNetwork onBack={() => { }} />} />
        </Routes>
      </HashRouter>
    </ErrorToastProvider>
  </React.StrictMode>
);