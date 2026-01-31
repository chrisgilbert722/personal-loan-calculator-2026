export interface LoanInput {
    loanAmount: number;
    interestRate: number;
    loanTermMonths: number;
    originationFeePercent: number;
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
    yearsToPayoff: number;
    monthsToPayoff: number;
    principalPercent: number;
    interestPercent: number;
    feesPercent: number;
    monthlyTotalInterest: number;
    biweeklyTotalInterest: number;
    biweeklyInterestSavings: number;
    message: string;
}

function calculateMonthlyPayment(principal: number, monthlyRate: number, termMonths: number): number {
    if (monthlyRate === 0) {
        return principal / termMonths;
    }
    const factor = Math.pow(1 + monthlyRate, termMonths);
    return principal * (monthlyRate * factor) / (factor - 1);
}

export function calculateLoan(input: LoanInput): LoanResult {
    const { loanAmount, interestRate, loanTermMonths, originationFeePercent } = input;

    if (loanAmount <= 0 || loanTermMonths <= 0) {
        return {
            monthlyPayment: 0,
            biweeklyPayment: 0,
            totalInterest: 0,
            totalLoanCost: 0,
            principalAmount: 0,
            originationFeeAmount: 0,
            totalRepaymentAmount: 0,
            yearsToPayoff: 0,
            monthsToPayoff: 0,
            principalPercent: 0,
            interestPercent: 0,
            feesPercent: 0,
            monthlyTotalInterest: 0,
            biweeklyTotalInterest: 0,
            biweeklyInterestSavings: 0,
            message: 'Enter loan details to see estimates'
        };
    }

    const monthlyRate = interestRate / 100 / 12;
    const originationFeeAmount = loanAmount * (originationFeePercent / 100);
    const principalAmount = loanAmount;

    // Monthly payment calculation
    const monthlyPayment = calculateMonthlyPayment(principalAmount, monthlyRate, loanTermMonths);
    const monthlyTotalInterest = (monthlyPayment * loanTermMonths) - principalAmount;

    // Bi-weekly payment calculation (26 payments per year)
    // Bi-weekly payment is half the monthly payment, but you make 26 payments (13 months worth)
    const biweeklyPayment = monthlyPayment / 2;

    // Calculate bi-weekly payoff (accelerated due to extra payments)
    let biweeklyBalance = principalAmount;
    let biweeklyTotalPaid = 0;
    let biweeklyPayments = 0;
    const biweeklyRate = interestRate / 100 / 26;

    while (biweeklyBalance > 0.01 && biweeklyPayments < 1000) {
        const interest = biweeklyBalance * biweeklyRate;
        const payment = Math.min(biweeklyPayment, biweeklyBalance + interest);
        biweeklyBalance = biweeklyBalance + interest - payment;
        biweeklyTotalPaid += payment;
        biweeklyPayments++;
    }

    const biweeklyTotalInterest = biweeklyTotalPaid - principalAmount;
    const biweeklyInterestSavings = Math.max(0, monthlyTotalInterest - biweeklyTotalInterest);

    // Total costs
    const totalInterest = monthlyTotalInterest;
    const totalLoanCost = principalAmount + totalInterest;
    const totalRepaymentAmount = totalLoanCost + originationFeeAmount;

    // Payoff time
    const yearsToPayoff = Math.floor(loanTermMonths / 12);
    const monthsToPayoff = loanTermMonths % 12;

    // Percentages
    const totalCost = principalAmount + totalInterest + originationFeeAmount;
    const principalPercent = totalCost > 0 ? (principalAmount / totalCost) * 100 : 0;
    const interestPercent = totalCost > 0 ? (totalInterest / totalCost) * 100 : 0;
    const feesPercent = totalCost > 0 ? (originationFeeAmount / totalCost) * 100 : 0;

    // Message
    let message = '';
    if (interestRate > 20) {
        message = 'High interest rate - consider alternatives';
    } else if (biweeklyInterestSavings > 500) {
        message = 'Bi-weekly payments could save significant interest';
    } else {
        message = `${loanTermMonths} month loan at ${interestRate}% APR`;
    }

    return {
        monthlyPayment,
        biweeklyPayment,
        totalInterest,
        totalLoanCost,
        principalAmount,
        originationFeeAmount,
        totalRepaymentAmount,
        yearsToPayoff,
        monthsToPayoff,
        principalPercent,
        interestPercent,
        feesPercent,
        monthlyTotalInterest,
        biweeklyTotalInterest,
        biweeklyInterestSavings,
        message
    };
}
