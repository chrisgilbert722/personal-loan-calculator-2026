import React from 'react';
import type { LoanResult } from '../logic/loanCalculations';

interface ResultsPanelProps {
    result: LoanResult;
    paymentFrequency: 'monthly' | 'biweekly';
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(val);
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, paymentFrequency }) => {
    const isMonthly = paymentFrequency === 'monthly';
    const paymentAmount = isMonthly ? result.monthlyPayment : result.biweeklyPayment;
    const paymentLabel = isMonthly ? 'Estimated Monthly Loan Payment' : 'Estimated Bi-Weekly Loan Payment';

    return (
        <div className="card" style={{ background: 'linear-gradient(to bottom, #F0F9FF, #E8F4FD)', borderColor: '#93C5FD', boxShadow: '0 2px 8px -2px rgba(14, 165, 233, 0.15)' }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    {paymentLabel}
                </h2>
                <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#0C4A6E', lineHeight: 1, letterSpacing: '-0.025em' }}>
                    {formatCurrency(paymentAmount)}
                </div>
            </div>

            <hr style={{ margin: 'var(--space-6) 0', border: 'none', borderTop: '1px solid #93C5FD' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>PRINCIPAL</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{formatCurrency(result.principalAmount)}</div>
                </div>
                <div style={{ borderLeft: '1px solid #93C5FD', borderRight: '1px solid #93C5FD' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL INTEREST</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{formatCurrency(result.totalInterest)}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL COST</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-accent)' }}>
                        {formatCurrency(result.totalLoanCost)}
                    </div>
                </div>
            </div>
        </div>
    );
};
