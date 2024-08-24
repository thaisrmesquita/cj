import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Registration } from "~/@types/registration";
import { apiInstance } from "~/services.api";
import { toast } from "react-toastify";

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

        toast.success(
          `Status de ${variables.data.employeeName} atualizado com sucesso`,
          {
            position: "bottom-left",
            theme: "colored",
          }
        );

        return [...newData];
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar status, tente novamente", {
        position: "bottom-left",
        theme: "colored",
      });
    },
  });

  const createRegistration = async (registration: Registration) => {
    await apiInstance.post("/registrations", { ...registration });
  };

  const deleteRegistration = useMutation({
    mutationFn: async (info: { data: Registration; id: string }) => {
      return apiInstance.delete(`/registrations/${info.id}`);
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["registrations"], (data: Registration[]) => {
        const newData = data.filter(
          (registration) => registration.id !== variables.data.id
        );
        toast.success(`Registro de ${variables.data.employeeName} deletado`, {
          position: "bottom-left",
          theme: "colored",
        });
        return [...newData];
      });
    },
    onError: () => {
      toast.error(`Erro ao apagar, tente novamente`, {
        position: "bottom-left",
        theme: "colored",
      });
    },
  });

  const { refetch } = getRegistrations;

  const refetchRegistration = () => {
    refetch();
    toast.success(`Dados atualizados!`, {
      position: "bottom-left",
      theme: "colored",
    });
  };

  const searchRegistrationsByCpf = useMutation({
    mutationFn: async (cpf: string) => {
      return apiInstance.get(`/registrations/?cpf=${cpf}`);
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["registrations"], (data: Registration[]) => {
        const newData = data.filter(
          (registration) => registration.cpf === variables
        );
        toast.success(
          newData.length < 2
            ? `${newData.length} registro foi encontrado`
            : `${newData.length} registros foram encontrados`,
          {
            position: "bottom-left",
            theme: "colored",
          }
        );
        return [...newData];
      });
    },
    onError: () => {
      toast.error(`Erro ao realizar busca, tente novamente`, {
        position: "bottom-left",
        theme: "colored",
      });
    },
  });

  return {
    getRegistrations,
    updateRegistrations,
    createRegistration,
    deleteRegistration,
    refetchRegistration,
    searchRegistrationsByCpf,
  };
};
