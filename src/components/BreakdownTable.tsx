import React from 'react';
import type { LoanResult } from '../logic/loanCalculations';

interface BreakdownTableProps {
    result: LoanResult;
    loanTermMonths: number;
    paymentFrequency: 'monthly' | 'biweekly';
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result, loanTermMonths, paymentFrequency }) => {
    const isMonthly = paymentFrequency === 'monthly';
    const paymentAmount = isMonthly ? result.monthlyPayment : result.biweeklyPayment;
    const paymentsPerYear = isMonthly ? 12 : 26;
    const totalPayments = isMonthly ? loanTermMonths : Math.ceil((loanTermMonths / 12) * 26);

    const paymentRows = [
        {
            label: isMonthly ? 'Estimated Monthly Payment' : 'Estimated Bi-Weekly Payment',
            value: formatMoney(paymentAmount),
            isTotal: false
        },
        {
            label: 'Number of Payments',
            value: `${totalPayments} ${isMonthly ? 'months' : 'bi-weekly payments'}`,
            isTotal: false
        },
        {
            label: 'Payments Per Year',
            value: `${paymentsPerYear}`,
            isTotal: false
        },
    ];

    const costRows = [
        { label: 'Estimated Principal Amount', value: formatMoney(result.principalAmount), isTotal: false },
        { label: 'Estimated Total Interest', value: formatMoney(result.totalInterest), isTotal: false },
        { label: 'Estimated Origination Fees', value: formatMoney(result.originationFeeAmount), isTotal: false },
        { label: 'Estimated Total Repayment', value: formatMoney(result.totalRepaymentAmount), isTotal: true },
    ];

    const breakdownRows = [
        { label: 'Principal Portion', value: `${result.principalPercent.toFixed(1)}%`, isTotal: false },
        { label: 'Interest Portion', value: `${result.interestPercent.toFixed(1)}%`, isTotal: false },
        { label: 'Fees Portion', value: `${result.feesPercent.toFixed(1)}%`, isTotal: false },
    ];

    const comparisonRows = [
        { label: 'Monthly Payment', value: formatMoney(result.monthlyPayment), isTotal: false },
        { label: 'Monthly Total Interest', value: formatMoney(result.monthlyTotalInterest), isTotal: false },
        { label: 'Bi-Weekly Payment', value: formatMoney(result.biweeklyPayment), isTotal: false },
        { label: 'Bi-Weekly Total Interest', value: formatMoney(result.biweeklyTotalInterest), isTotal: false },
        { label: 'Estimated Interest Savings (Bi-Weekly)', value: formatMoney(result.biweeklyInterestSavings), isTotal: true },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? 'var(--color-primary)' : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Payment Details Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Payment Details</h3>
            </div>
            {renderTable(paymentRows)}

            {/* Total Cost Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Total Loan Costs</h3>
            </div>
            {renderTable(costRows)}

            {/* Cost Breakdown Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0FDF4' }}>
                <h3 style={{ fontSize: '1rem', color: '#166534' }}>Cost Breakdown (% of Total)</h3>
            </div>
            {renderTable(breakdownRows)}

            {/* Payment Comparison Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#FEF3C7' }}>
                <h3 style={{ fontSize: '1rem', color: '#92400E' }}>Payment Frequency Comparison</h3>
            </div>
            {renderTable(comparisonRows, true)}
        </div>
    );
};
