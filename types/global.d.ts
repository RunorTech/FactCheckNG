/* eslint-disable @typescript-eslint/no-explicit-any */

interface CombinedReducerType {
  shared: SharedReduxState;
  authentication: AuthenticationReduxState;
}

declare module "*.webm";

interface GetClaimsRequestProps {
  // data: string
  query?: string
  page?: string
  limit: string
}
interface GetClaimRequestProps {
  id: string
}
interface DeleteClaimRequestProps {
  path: string
}

interface SubmitClaimRequestProps extends  SubmitClaimForm {
data: string
}
interface SubmitClaimResponseProps {
  message: string
}

type ClaimStatus = "verified" | "unverified" | "false";
type VerdictStatus = "true" | "false" | "pending" | "inconclusive";

interface GetClaimsResponseProps {
  data: {
    count: number
    data: ClaimCardProps[]
  }
  parameters: {
    page: number
  }
  
}
interface GetRelatedClaimsResponseProps {
  claims: ClaimCardProps[]
  
}
interface GetClaimResponseProps {
  claim: ClaimCardProps
}
interface locationResponseProps {
  ISO3166_2_lvl4: string;
  amenity: string;
  country: string;
  country_code: string;
  county: string;
  postcode: string;
  road: string;
  state: string;
}
interface UserProfileProps {
  avatarUrl: string;
bio: string;
createdAt : string;
fullName : string;
id : string;
location : string;
updatedAt :string;
verifiedClaims: number;
}
interface ClaimCardProps {
  id: string
  userId: string
  title: string
  description: string
  attachments?: string
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