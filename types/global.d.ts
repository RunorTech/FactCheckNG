/* eslint-disable @typescript-eslint/no-explicit-any */

interface CombinedReducerType {
  shared: SharedReduxState;
  authentication: AuthenticationReduxState;
}

declare module "*.webm";

interface GetClaimRequestProps {
  data: string
}
type ClaimStatus = "verified" | "unverified" | "false";
type VerdictStatus = "true" | "false" | "pending" | "inconclusive";

interface GetClaimResponseProps {
  claims: ClaimCardProps[]
}

interface ClaimCardProps {
  id: string
  userId: string
  title: string
  description: string
  attachments: string
  lgaId: string
  category: string
  verdict: VerdictStatus 
  verdictSummary: string | null
  submittedDate: string
  verdictDate: string | null
  investigatorNotes: string | null
  investigatorId: string | null
  views: number
  isAnonymous: boolean
  createdAt: string
  updatedAt: string

  lga: {
    id: string
    name: string
    stateId: string
    createdAt: string
    state: {
      id: string
      name: string
      createdAt: string
    }
  }

  evidence: any[] // replace with your Evidence type if you have one
  citations: any[] // replace with your Citation type
  comments: any[] // replace with your Comment type
  likes: any[] // replace with your Comment type


  profile: {
    id: string
    fullName: string
    avatarUrl: string 
    bio: string | null
    location: string | null
    verifiedClaims: number
    createdAt: string
    updatedAt: string
  }
}