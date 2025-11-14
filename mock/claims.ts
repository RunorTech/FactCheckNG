import { StaticImageData } from 'next/image';
import mocks from './claims.json'

export type VerdictStatus = "true" | "false" | "pending" | "inconclusive";

export type Category =
  | "Health"
  | "Politics"
  | "Economy"
  | "Security"
  | "Others";

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
    type: "image" | "video" | "link";
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
  image?: StaticImageData | string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  source: string;
   likes: number;
    comments: number;
    timestamp: string;
}

export const mockClaims = mocks as unknown as ClaimCardProps[];

export const getLGAsByState = () => {
  const lgas: Record<string, string[]> = {};

  mockClaims.forEach((claim) => {
    if (!lgas[claim?.lga?.state?.name]) {
      lgas[claim?.lga?.state?.name] = [];
    }
    if (!lgas[claim?.lga?.state?.name].includes(claim?.lga?.state?.name)) {
      lgas[claim?.lga?.state?.name].push(claim?.lga?.name);
    }
  });

  return lgas;
};

export const getClaimById = (id: string) => {
  return mockClaims.find((claim) => claim.id === id);
};

export const getClaimsByLGA = (lga: string) => {
  return mockClaims.filter(
    (claim) => claim?.lga?.name.toLowerCase() === lga?.toLowerCase()
  );
};
