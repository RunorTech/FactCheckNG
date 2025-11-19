import { submitClaimService } from "@/service/service";
import { useMutationService } from "@/utils/useMutationService";
import { useToast } from "@/utils/useToast";
// import { useRouter } from "next/navigation";

export const useSubmitClaims = () => {
  const { errorToast, successToast } = useToast();
  // const router = useRouter()
  const {
    mutateAsync: submitClaimMutateAsync,
    isPending: isSubmitClaimPending,
  } = useMutationService({
    service: submitClaimService,
    options: {
      onSuccess: async (response) => {
          successToast(response.message)
          // router.push("/claims")
       
      },
      onError: ({ message }) => {
        errorToast(message)
      },
    },
  });

  const submitClaim = async (data: SubmitClaimRequestProps) => {
    await submitClaimMutateAsync(
      data,
    );
  };

  return { submitClaim, isSubmitClaimPending };
};
