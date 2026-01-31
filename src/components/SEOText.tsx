import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This personal loan calculator provides estimated monthly payments, total interest, and
                loan costs based on the amount, interest rate, and term you enter. Actual loan terms
                and rates depend on your credit profile, lender policies, and other factors. These
                figures are estimates only and do not represent a loan offer or guarantee of terms.
                This calculator is for informational purposes only and does not constitute financial advice.
            </p>
        </div>
    );
};
