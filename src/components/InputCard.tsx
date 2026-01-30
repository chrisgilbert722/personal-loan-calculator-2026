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
                        step="100"
                    />
                </div>

                {/* Interest Rate */}
                <div>
                    <label htmlFor="interestRate">Interest Rate (APR %)</label>
                    <input
                        type="number"
                        id="interestRate"
                        value={values.interestRate}
                        onChange={(e) => onChange('interestRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="50"
                        step="0.1"
                    />
                </div>

                {/* Loan Term */}
                <div>
                    <label htmlFor="loanTermMonths">Loan Term (months)</label>
                    <select
                        id="loanTermMonths"
                        value={values.loanTermMonths}
                        onChange={(e) => onChange('loanTermMonths', parseInt(e.target.value))}
                    >
                        <option value={12}>12 months (1 year)</option>
                        <option value={24}>24 months (2 years)</option>
                        <option value={36}>36 months (3 years)</option>
                        <option value={48}>48 months (4 years)</option>
                        <option value={60}>60 months (5 years)</option>
                        <option value={72}>72 months (6 years)</option>
                        <option value={84}>84 months (7 years)</option>
                    </select>
                </div>

                {/* Origination Fee */}
                <div>
                    <label htmlFor="originationFee">
                        Origination Fee ({values.originationFeePercent ? '%' : '$'})
                    </label>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                        <input
                            type="number"
                            id="originationFee"
                            value={values.originationFee}
                            onChange={(e) => onChange('originationFee', parseFloat(e.target.value) || 0)}
                            min="0"
                            step={values.originationFeePercent ? 0.5 : 50}
                            style={{ flex: 1 }}
                        />
                        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 0, cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={values.originationFeePercent}
                                onChange={(e) => onChange('originationFeePercent', e.target.checked)}
                            />
                            <span style={{ fontSize: '0.8125rem' }}>%</span>
                        </label>
                    </div>
                </div>

                {/* Payment Frequency */}
                <div>
                    <label htmlFor="paymentFrequency">Payment Frequency</label>
                    <select
                        id="paymentFrequency"
                        value={values.paymentFrequency}
                        onChange={(e) => onChange('paymentFrequency', e.target.value as 'monthly' | 'biweekly')}
                    >
                        <option value="monthly">Monthly</option>
                        <option value="biweekly">Bi-Weekly (every 2 weeks)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
