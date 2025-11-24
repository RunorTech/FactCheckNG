import { CreateUserService } from "@/service/service";
import { setHasProfile } from "@/utils/store/redux/slices/shared.slice";
import { useMutationService } from "@/utils/useMutationService";
import { useToast } from "@/utils/useToast";
import { useDispatch } from "react-redux";

export const useCreateUser = () => {
  const { errorToast, successToast } = useToast();
    const reduxDispatch = useDispatch();

  const {
    mutateAsync: createUserMutateAsync,
    isPending: isCreateUserPending,
  } = useMutationService({
    service: CreateUserService,
    options: {
      onSuccess: async (response) => {
          successToast(response.message)
          reduxDispatch(setHasProfile(true));
      },
      onError: ({ message }) => {
        errorToast(message)
      },
    },
  });

  const createUser = async (data: CreateUseRequestProps) => {
    await createUserMutateAsync(data);
  };

  return { createUser, isCreateUserPending };
};
