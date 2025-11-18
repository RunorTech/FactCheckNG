
export const sharedApis = {
  claims: '/api/claims',
  claim: (id: string) => `/api/claims/${id}`,
  relatedClaim: (lga: string) => `/api/claims/related/${lga}`,


}
