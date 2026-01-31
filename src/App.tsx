import { useState } from 'react';
import { Header } from './components/Header';
import { InputCard } from './components/InputCard';
import { ResultsPanel } from './components/ResultsPanel';
import { ScenarioControls } from './components/ScenarioControls';
import { AdContainer } from './components/AdContainer';
import { BreakdownTable } from './components/BreakdownTable';
import { SEOText } from './components/SEOText';
import { Footer } from './components/Footer';
import { calculateLoan } from './logic/loanCalculations';
import type { LoanInput } from './logic/loanCalculations';

function App() {
  const [values, setValues] = useState<LoanInput>({
    loanAmount: 15000,
    interestRate: 10.5,
    loanTermMonths: 48,
    originationFeePercent: 2,
    paymentFrequency: 'monthly'
  });

  const handleChange = (field: keyof LoanInput, value: number | boolean | string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const result = calculateLoan(values);

  return (
    <>
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

        {/* 1) HEADER */}
        <Header />

        {/* 2) INPUT CARD */}
        <InputCard values={values} onChange={handleChange} />

        {/* 3) RESULTS PANEL */}
        <ResultsPanel result={result} paymentFrequency={values.paymentFrequency} />

        {/* 4) SCENARIO CONTROLS */}
        <ScenarioControls values={values} onChange={handleChange} />

        {/* 5) NATIVE AD */}
        <AdContainer slotId="native-slot-placeholder" sticky={false} />

        {/* 6) BREAKDOWN TABLE */}
        <BreakdownTable result={result} loanTermMonths={values.loanTermMonths} paymentFrequency={values.paymentFrequency} />

        {/* 7) SEO TEXT */}
        <SEOText />

        {/* 8) FOOTER */}
        <Footer />

        {/* 9) STICKY FOOTER AD */}
        <AdContainer slotId="sticky-footer-placeholder" sticky={true} />

      </main>
    </>
  );
}

export default App;
