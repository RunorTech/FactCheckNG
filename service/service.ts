import { sharedApis } from "@/mock/apiUrl";
import { ApiMethods } from "@/types/services";


export const allClaimsService: ServiceInterface<GetClaimsRequestProps, GetClaimsResponseProps> = {
  path: sharedApis.claims,
  method: ApiMethods.GET,
};
export const claimService: ServiceInterface<GetClaimRequestProps, GetClaimResponseProps> = {
  path: '',
  method: ApiMethods.GET,
};
export const relatedClaimService: ServiceInterface<Request, GetClaimsResponseProps> = {
  path: '',
  method: ApiMethods.GET,
};
export const submitClaimService: ServiceInterface<SubmitClaimRequestProps, SubmitClaimResponseProps> = {
  path: sharedApis.claims,
  method: ApiMethods.POST,
};
export const deleteClaimService: ServiceInterface<DeleteClaimRequestProps, SubmitClaimResponseProps> = {
  path: '',
  method: ApiMethods.DELETE,
};


