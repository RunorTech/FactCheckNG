import { sharedApis } from "@/mock/apiUrl";
import { ApiMethods } from "@/types/services";


export const allClaimsService: ServiceInterface<GetClaimsRequestProps, GetClaimsResponseProps> = {
  path: sharedApis.claims,
  method: ApiMethods.GET,
};
export const allUsersService: ServiceInterface<GetClaimsRequestProps, GetClaimsResponseProps> = {
  path: sharedApis.users,
  method: ApiMethods.GET,
};
export const claimService: ServiceInterface<GetClaimRequestProps, GetClaimResponseProps> = {
  path: '',
  method: ApiMethods.GET,
};
export const relatedClaimService: ServiceInterface<Request, GetRelatedClaimsResponseProps> = {
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
export const CreateUserService: ServiceInterface<CreateUseRequestProps, SubmitClaimResponseProps> = {
  path: sharedApis.users,
  method: ApiMethods.POST,
};

export const LikeClaimService: ServiceInterface<CreateUseRequestProps, SubmitClaimResponseProps> = {
  path: sharedApis.likes,
  method: ApiMethods.POST,
};

export const DislikeClaimService: ServiceInterface<CreateUseRequestProps, SubmitClaimResponseProps> = {
  path: sharedApis.disLikes,
  method: ApiMethods.POST,
};

