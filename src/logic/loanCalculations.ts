export interface LoanInput {
    loanAmount: number;
    interestRate: number; // Annual percentage rate
    loanTermMonths: number;
    originationFee: number; // Dollar amount or percentage
    originationFeePercent: boolean; // true = percentage, false = dollar amount
    paymentFrequency: 'monthly' | 'biweekly';
}

export interface LoanResult {
    monthlyPayment: number;
    biweeklyPayment: number;
    totalInterest: number;
    totalLoanCost: number;
    principalAmount: number;
    originationFeeAmount: number;
    totalRepaymentAmount: number;
    // Cost breakdown percentages
    principalPercent: number;
    interestPercent: number;
    feesPercent: number;
}

export function calculateLoan(input: LoanInput): LoanResult {
    const principalAmount = input.loanAmount;

    // Calculate origination fee
    let originationFeeAmount: number;
    if (input.originationFeePercent) {
        originationFeeAmount = (input.originationFee / 100) * input.loanAmount;
    } else {
        originationFeeAmount = input.originationFee;
    }

    // Calculate monthly payment using amortization formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyRate = input.interestRate / 100 / 12;
    const numPayments = input.loanTermMonths;

    let monthlyPayment: number;

    if (monthlyRate === 0) {
        // No interest - simple division
        monthlyPayment = principalAmount / numPayments;
    } else if (principalAmount === 0) {
        monthlyPayment = 0;
    } else {
        const factor = Math.pow(1 + monthlyRate, numPayments);
        monthlyPayment = principalAmount * (monthlyRate * factor) / (factor - 1);
    }

    // Calculate totals
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - principalAmount;
    const totalLoanCost = totalInterest + originationFeeAmount;
    const totalRepaymentAmount = principalAmount + totalInterest + originationFeeAmount;

    // Calculate bi-weekly payment (26 payments per year = monthly * 12 / 26)
    const biweeklyPayment = (monthlyPayment * 12) / 26;

    // Calculate cost breakdown percentages
    const principalPercent = totalRepaymentAmount > 0 ? (principalAmount / totalRepaymentAmount) * 100 : 0;
    const interestPercent = totalRepaymentAmount > 0 ? (totalInterest / totalRepaymentAmount) * 100 : 0;
    const feesPercent = totalRepaymentAmount > 0 ? (originationFeeAmount / totalRepaymentAmount) * 100 : 0;

    return {
        monthlyPayment,
        biweeklyPayment,
        totalInterest,
        totalLoanCost,
        principalAmount,
        originationFeeAmount,
        totalRepaymentAmount,
        principalPercent,
        interestPercent,
        feesPercent
    };
}
