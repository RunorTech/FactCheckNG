export interface AnalyticsStats {
  totalClaims: number;
  verifiedTrue: number;
  verifiedFalse: number;
  pending: number;
  avgTimeToVerdict: string;
}

export interface ClaimsPerWeek {
  week: string;
  claims: number;
}

export interface VerdictDistribution {
  name: string;
  value: number;
  color: string;
}

export interface TopLGA {
  lga: string;
  claims: number;
}

export const mockAnalyticsStats: AnalyticsStats = {
  totalClaims: 487,
  verifiedTrue: 134,
  verifiedFalse: 198,
  pending: 87,
  avgTimeToVerdict: '36 hours',
};

export const mockClaimsPerWeek: ClaimsPerWeek[] = [
  { week: 'Week 1', claims: 45 },
  { week: 'Week 2', claims: 52 },
  { week: 'Week 3', claims: 38 },
  { week: 'Week 4', claims: 67 },
  { week: 'Week 5', claims: 54 },
  { week: 'Week 6', claims: 71 },
];

export const mockVerdictDistribution: VerdictDistribution[] = [
  { name: 'True', value: 134, color: 'hsl(var(--verdict-true))' },
  { name: 'False', value: 198, color: 'hsl(var(--verdict-false))' },
  { name: 'Pending', value: 87, color: 'hsl(var(--verdict-pending))' },
  { name: 'Inconclusive', value: 68, color: 'hsl(var(--verdict-inconclusive))' },
];

export const mockTopLGAs: TopLGA[] = [
  { lga: 'Alimosho, Lagos', claims: 87 },
  { lga: 'Kano Municipal, Kano', claims: 76 },
  { lga: 'Ibadan North, Oyo', claims: 54 },
  { lga: 'Abuja Municipal, FCT', claims: 49 },
  { lga: 'Port Harcourt, Rivers', claims: 43 },
];
