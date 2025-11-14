import { submitClaimService } from "@/service/service";
import { useMutationService } from "@/utils/useMutationService";
import { useToast } from "@/utils/useToast";

export const useSubmitClaims = () => {
  const { errorToast, successToast } = useToast();
  const {
    mutateAsync: submitClaimMutateAsync,
    isPending: isSubmitClaimPending,
  } = useMutationService({
    service: submitClaimService,
    options: {
      onSuccess: async (response) => {
          successToast(response.message)
       
      },
      onError: ({ message }) => {
        errorToast(message)
      },
    },
  });

  const submitClaim = async (data: SubmitClaimRequestProps) => {
    await submitClaimMutateAsync({
      ...data,
    });
  };

  return { submitClaim, isSubmitClaimPending };
};
