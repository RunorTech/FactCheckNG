import { sharedApis } from "@/mock/apiUrl";
import { ApiMethods } from "@/types/services";


export const allClaimsService: ServiceInterface<GetClaimRequestProps, GetClaimResponseProps> = {
  path: sharedApis.claims,
  method: ApiMethods.GET,
};


