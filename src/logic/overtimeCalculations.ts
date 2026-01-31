export interface OvertimeInput {
    hourlyRate: number;
    regularHours: number;
    overtimeHours: number;
    state: string;
    overtimeMultiplier: number; // Default 1.5
    includeDoubleTime: boolean;
    doubleTimeHours: number; // Hours at 2x rate (if enabled)
}

export interface OvertimeResult {
    regularPay: number;
    overtimePay: number;
    doubleTimePay: number;
    totalGrossPay: number;
    effectiveHourlyRate: number;
    overtimeRate: number;
    doubleTimeRate: number;
    totalHours: number;
    // State info
    stateHasSpecialRules: boolean;
    stateRuleNote: string;
}

// Simplified state rules - extensible for future expansion
// Currently all states use federal default (40 hr threshold, 1.5x)
// States with known special rules are flagged for user awareness
interface StateRule {
    hasSpecialRules: boolean;
    note: string;
}

const STATE_RULES: Record<string, StateRule> = {
    'CA': { hasSpecialRules: true, note: 'California has daily overtime rules (after 8 hrs/day) not reflected here' },
    'AK': { hasSpecialRules: true, note: 'Alaska has daily overtime rules (after 8 hrs/day) not reflected here' },
    'NV': { hasSpecialRules: true, note: 'Nevada has daily overtime rules (after 8 hrs/day) not reflected here' },
    'CO': { hasSpecialRules: true, note: 'Colorado has daily overtime rules (after 12 hrs/day) not reflected here' },
};

export function calculateOvertime(input: OvertimeInput): OvertimeResult {
    const hourlyRate = Math.max(0, input.hourlyRate);
    const regularHours = Math.max(0, input.regularHours);
    const overtimeHours = Math.max(0, input.overtimeHours);
    const doubleTimeHours = input.includeDoubleTime ? Math.max(0, input.doubleTimeHours) : 0;
    const overtimeMultiplier = input.overtimeMultiplier || 1.5;

    // Calculate rates
    const overtimeRate = hourlyRate * overtimeMultiplier;
    const doubleTimeRate = hourlyRate * 2;

    // Calculate pay components
    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * overtimeRate;
    const doubleTimePay = doubleTimeHours * doubleTimeRate;

    // Total calculations
    const totalGrossPay = regularPay + overtimePay + doubleTimePay;
    const totalHours = regularHours + overtimeHours + doubleTimeHours;
    const effectiveHourlyRate = totalHours > 0 ? totalGrossPay / totalHours : 0;

    // State rules
    const stateRule = STATE_RULES[input.state];
    const stateHasSpecialRules = stateRule?.hasSpecialRules || false;
    const stateRuleNote = stateRule?.note || 'Uses federal overtime rules (1.5x after 40 hours/week)';

    return {
        regularPay,
        overtimePay,
        doubleTimePay,
        totalGrossPay,
        effectiveHourlyRate,
        overtimeRate,
        doubleTimeRate,
        totalHours,
        stateHasSpecialRules,
        stateRuleNote
    };
}

export const US_STATES: Array<{ value: string; label: string }> = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
    { value: 'DC', label: 'District of Columbia' },
];
 
