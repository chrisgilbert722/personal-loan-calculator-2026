import React from 'react';
import type { LoanInput } from '../logic/loanCalculations';

interface InputCardProps {
    values: LoanInput;
    onChange: (field: keyof LoanInput, value: number | boolean | string) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Loan Amount */}
                <div>
                    <label htmlFor="loanAmount">Loan Amount ($)</label>
                    <input
                        type="number"
                        id="loanAmount"
                        value={values.loanAmount}
                        onChange={(e) => onChange('loanAmount', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="1000"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        The total amount you wish to borrow
                    </span>
                </div>

                {/* Interest Rate */}
                <div>
                    <label htmlFor="interestRate">Interest Rate (APR) %</label>
                    <input
                        type="number"
                        id="interestRate"
                        value={values.interestRate}
                        onChange={(e) => onChange('interestRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="50"
                        step="0.1"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Annual percentage rate offered by the lender
                    </span>
                </div>

                {/* Loan Term */}
                <div>
                    <label htmlFor="loanTermMonths">Loan Term (Months)</label>
                    <input
                        type="number"
                        id="loanTermMonths"
                        value={values.loanTermMonths}
                        onChange={(e) => onChange('loanTermMonths', parseFloat(e.target.value) || 0)}
                        min="6"
                        max="84"
                        step="6"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Common terms: 24, 36, 48, 60, or 72 months
                    </span>
                </div>

                {/* Origination Fee */}
                <div>
                    <label htmlFor="originationFeePercent">Origination Fee (%)</label>
                    <input
                        type="number"
                        id="originationFeePercent"
                        value={values.originationFeePercent}
                        onChange={(e) => onChange('originationFeePercent', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="10"
                        step="0.5"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        One-time fee charged by lender (typically 1-6%)
                    </span>
                </div>

                {/* Payment Frequency */}
                <div>
                    <label htmlFor="paymentFrequency">Payment Frequency</label>
                    <select
                        id="paymentFrequency"
                        value={values.paymentFrequency}
                        onChange={(e) => onChange('paymentFrequency', e.target.value)}
                    >
                        <option value="monthly">Monthly (12 payments/year)</option>
                        <option value="biweekly">Bi-Weekly (26 payments/year)</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Bi-weekly payments may reduce total interest
                    </span>
                </div>
            </div>
        </div>
    );
};
