import React from 'react';
import type { LoanInput } from '../logic/loanCalculations';

interface ScenarioControlsProps {
    values: LoanInput;
    onChange: (field: keyof LoanInput, value: number | boolean | string) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const termOptions = [
        { label: '2 yr', value: 24 },
        { label: '3 yr', value: 36 },
        { label: '5 yr', value: 60 },
        { label: '7 yr', value: 84 },
    ];

    const rateOptions = [
        { label: '6%', value: 6 },
        { label: '10%', value: 10 },
        { label: '15%', value: 15 },
        { label: '20%', value: 20 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Term Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Loan Term</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {termOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('loanTermMonths', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.loanTermMonths === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.loanTermMonths === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.loanTermMonths === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Rate Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Interest Rate</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {rateOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('interestRate', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.interestRate === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.interestRate === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.interestRate === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
