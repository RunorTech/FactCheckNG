export type VerdictStatus = 'true' | 'false' | 'pending' | 'inconclusive';

export type Category = 'Health' | 'Politics' | 'Economy' | 'Security' | 'Others';

export interface Claim {
  id: string;
  title: string;
  description: string;
  lga: string;
  state: string;
  category: Category;
  verdict: VerdictStatus;
  verdictSummary?: string;
  submittedDate: string;
  verdictDate?: string;
  investigatorNotes?: string;
  evidence: {
    type: 'image' | 'video' | 'link';
    url: string;
    caption?: string;
  }[];
  citations: {
    title: string;
    url: string;
  }[];
  investigator?: string;
  views: number;
  relatedClaims?: string[];
}

export const mockClaims: Claim[] = [
  {
    id: '1',
    title: 'Lagos State Government to Distribute Free Food Items',
    description: 'A message circulating on WhatsApp claims that Lagos State Government will distribute free food items to residents of Alimosho LGA this weekend.',
    lga: 'Alimosho',
    state: 'Lagos',
    category: 'Economy',
    verdict: 'false',
    verdictSummary: 'The Lagos State Government has not announced any such program. The message is a hoax.',
    submittedDate: '2025-10-15',
    verdictDate: '2025-10-16',
    investigatorNotes: 'Contacted Lagos State Ministry of Information. No such program exists. Similar hoaxes have been circulating for months.',
    evidence: [],
    citations: [
      {
        title: 'Lagos State Official Statement',
        url: 'https://lagosstate.gov.ng/statement',
      },
    ],
    investigator: 'Dr. Adeyemi Johnson',
    views: 1547,
    relatedClaims: ['2'],
  },
  {
    id: '2',
    title: 'New Malaria Vaccine Available at all PHCs in Abuja',
    description: 'Claims that a new malaria vaccine is now being administered free at all Primary Health Centers in Abuja Municipal.',
    lga: 'Abuja Municipal',
    state: 'Federal Capital Territory',
    category: 'Health',
    verdict: 'true',
    verdictSummary: 'Confirmed: The R21/Matrix-M malaria vaccine rollout began in FCT on October 1st, 2025.',
    submittedDate: '2025-10-01',
    verdictDate: '2025-10-02',
    investigatorNotes: 'Verified with FCT Primary Healthcare Board. Rollout confirmed via NPHCDA press release.',
    evidence: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800',
        caption: 'Healthcare worker administering vaccine',
      },
    ],
    citations: [
      {
        title: 'NPHCDA Official Announcement',
        url: 'https://nphcda.gov.ng/malaria-vaccine',
      },
    ],
    investigator: 'Dr. Fatima Abubakar',
    views: 3201,
    relatedClaims: [],
  },
  {
    id: '3',
    title: 'Fuel Price to Increase to ₦1,500 per Litre Next Week',
    description: 'Social media posts claim that the NNPC will increase fuel prices to ₦1,500 per litre starting next Monday.',
    lga: 'Ikeja',
    state: 'Lagos',
    category: 'Economy',
    verdict: 'pending',
    submittedDate: '2025-10-28',
    investigatorNotes: 'Currently investigating. Awaiting response from NNPC spokesperson.',
    evidence: [],
    citations: [],
    views: 892,
    relatedClaims: [],
  },
  {
    id: '4',
    title: 'Armed Robbery at Garki Market Last Night',
    description: 'Reports circulating that there was an armed robbery incident at Garki Market involving multiple casualties.',
    lga: 'Garki',
    state: 'Federal Capital Territory',
    category: 'Security',
    verdict: 'inconclusive',
    verdictSummary: 'Partial truth: There was a robbery, but casualty numbers are unconfirmed and likely exaggerated.',
    submittedDate: '2025-10-20',
    verdictDate: '2025-10-22',
    investigatorNotes: 'Police confirmed robbery occurred but denied casualty claims. Market association president could not verify details.',
    evidence: [],
    citations: [
      {
        title: 'FCT Police Command Statement',
        url: 'https://fctpolice.gov.ng',
      },
    ],
    investigator: 'Musa Ibrahim',
    views: 2103,
    relatedClaims: [],
  },
  {
    id: '5',
    title: 'New Road Construction Project in Enugu North',
    description: 'Claims that the Federal Government has approved ₦50 billion for road construction in Enugu North LGA.',
    lga: 'Enugu North',
    state: 'Enugu',
    category: 'Politics',
    verdict: 'pending',
    submittedDate: '2025-10-25',
    evidence: [],
    citations: [],
    views: 432,
    relatedClaims: [],
  },
  {
    id: '6',
    title: 'COVID-19 Resurgence in Kano Central Hospitals',
    description: 'Messages claim hospitals in Kano Central are overwhelmed with COVID-19 patients.',
    lga: 'Kano Municipal',
    state: 'Kano',
    category: 'Health',
    verdict: 'false',
    verdictSummary: 'No evidence of COVID-19 surge. Hospital occupancy is normal according to state health officials.',
    submittedDate: '2025-10-18',
    verdictDate: '2025-10-19',
    investigatorNotes: 'Contacted Kano State Ministry of Health and three major hospitals. No unusual patient influx reported.',
    evidence: [],
    citations: [
      {
        title: 'Kano State Health Ministry Statement',
        url: 'https://kanostate.gov.ng/health',
      },
    ],
    investigator: 'Dr. Aisha Muhammad',
    views: 1823,
    relatedClaims: [],
  },
];

export const getLGAsByState = () => {
  const lgas: Record<string, string[]> = {};
  
  mockClaims.forEach(claim => {
    if (!lgas[claim.state]) {
      lgas[claim.state] = [];
    }
    if (!lgas[claim.state].includes(claim.lga)) {
      lgas[claim.state].push(claim.lga);
    }
  });
  
  return lgas;
};

export const getClaimById = (id: string) => {
  return mockClaims.find(claim => claim.id === id);
};

export const getClaimsByLGA = (lga: string) => {
  return mockClaims.filter(claim => 
    claim.lga.toLowerCase() === lga.toLowerCase()
  );
};
