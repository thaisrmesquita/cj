import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Registration } from "~/@types/registration";
import { apiInstance } from "~/services.api";

export const useRegistrations = () => {
  const queryClient = useQueryClient();
  const getRegistrations = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const { data } = await apiInstance.get("/registrations");
      return data;
    },
  });

  const updateRegistrations = useMutation({
    mutationFn: async (info: { data: Registration; newStatus: string }) => {
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      return apiInstance.put(`/registrations/${info.data.id}`, {
        ...info.data,
        status: info.newStatus,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["registrations"], (data: Registration[]) => {
        const newData = [...data];
        const indexToUpdate = newData.findIndex(
          (registration) => registration.id === variables.data.id
        );
        newData[indexToUpdate] = {
          ...newData[indexToUpdate],
          status: variables.newStatus,
        };
        alert("Status atualizado com sucesso");
        return [...newData];
      });
    },
    onError: () => {
      alert("Erro ao atualizar status");
    },
  });

  return { getRegistrations, updateRegistrations };
};
