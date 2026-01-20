import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestService, type RequestItem } from "./service";
import { requestKeys } from "./keys";

export const useRequests = () =>
  useQuery({
    queryKey: requestKeys.list(),
    queryFn: requestService.getAll,
  });

export const useRequest = (id: string, enabled: boolean = true) =>
  useQuery({
    queryKey: requestKeys.detail(id),
    queryFn: () => requestService.getById(id),
    enabled: Boolean(id) && enabled,
  });

export const useCreateRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<RequestItem>) => requestService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: requestKeys.list() });
    },
  });
};

export const useUpdateRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<RequestItem> }) =>
      requestService.update(id, payload),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: requestKeys.detail(variables.id) });
      qc.invalidateQueries({ queryKey: requestKeys.list() });
    },
  });
};

export const useDeleteRequest = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requestService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: requestKeys.list() });
    },
  });
};
