import React from 'react';
import type { LoanInput } from '../logic/loanCalculations';

interface ScenarioControlsProps {
    values: LoanInput;
    onChange: (field: keyof LoanInput, value: number | boolean | string) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const termOptions = [
        { label: '2 Years', value: 24 },
        { label: '3 Years', value: 36 },
        { label: '4 Years', value: 48 },
        { label: '5 Years', value: 60 },
    ];

    const amountOptions = [
        { label: '$5K', value: 5000 },
        { label: '$10K', value: 10000 },
        { label: '$15K', value: 15000 },
        { label: '$25K', value: 25000 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Loan Term Quick Select */}
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

            {/* Loan Amount Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Loan Amount</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {amountOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('loanAmount', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.loanAmount === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.loanAmount === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.loanAmount === option.value ? '#fff' : 'var(--color-text-primary)',
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
