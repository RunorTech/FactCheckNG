import { DislikeClaimService, LikeClaimService } from "@/service/service";
import { useMutationService } from "@/utils/useMutationService";
import { useToast } from "@/utils/useToast";
import { useDispatch } from "react-redux";

export const useGiveVerdict = () => {
  const { errorToast, successToast } = useToast();
    const reduxDispatch = useDispatch();

  const {
    mutateAsync: likeClaimMutateAsync,
    isPending: isLikeClaimPending,
  } = useMutationService({
    service: LikeClaimService,
    options: {
      onSuccess: async (response) => {
          successToast(response.message)
      },
      onError: ({ message }) => {
        errorToast(message)
      },
    },
  });

  const likeClaim = async (data: CreateUseRequestProps) => {
    await likeClaimMutateAsync(data);
  };

   const {
    mutateAsync: disLikeClaimMutateAsync,
    isPending: isDisLikeClaimPending,
  } = useMutationService({
    service: DislikeClaimService,
    options: {
      onSuccess: async (response) => {
          successToast(response.message)
      },
      onError: ({ message }) => {
        errorToast(message)
      },
    },
  });

  const disLikeClaim = async (data: CreateUseRequestProps) => {
    await disLikeClaimMutateAsync(data);
  };

  return {disLikeClaim, isDisLikeClaimPending, likeClaim, isLikeClaimPending };
};
