import { useMutation } from "@tanstack/react-query";
import { createComment as createCommentApi } from "../../services/apiComments";
import toast from "react-hot-toast";

export function useCreateComment() {
  const { mutate: createComment, isLoading: isCreating } = useMutation({
    mutationFn: ({ token, payload }) => createCommentApi(token, payload),
    onSuccess: () => {
      toast.success("Comment added.");
    },
    onError: (err) => {
      toast.error(`Error: ${err}`);
    },
  });

  return { createComment, isCreating };
}
