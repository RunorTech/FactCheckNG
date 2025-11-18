import { sharedApis } from "@/mock/apiUrl";
import { deleteClaimService} from "@/service/service";
import { useMutationService } from "@/utils/useMutationService";
import { useToast } from "@/utils/useToast";
// import { useRouter } from "next/navigation";

export const useDeleteClaim = () => {
  const { errorToast, successToast } = useToast();
  // const router = useRouter()
  const {
    mutateAsync: deleteClaimMutateAsync,
    isPending: isDeleteClaimPending,
  } = useMutationService({
    service: deleteClaimService,
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

  const deleteClaim = async (id: string) => {
    await deleteClaimMutateAsync({
      path: sharedApis.claim(id),
    });
  };

  return { deleteClaim, isDeleteClaimPending };
};
