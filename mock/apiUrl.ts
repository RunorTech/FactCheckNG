interface relatedClaims {
  id: string,
  lga: string
}
export const sharedApis = {
  claims: '/api/claims',
  claim: (id: string) => `/api/claims/${id}`,
  relatedClaim: ({id, lga}: relatedClaims) => `/api/claims/${id}/related/${lga}`,
  users: '/api/users'


}
