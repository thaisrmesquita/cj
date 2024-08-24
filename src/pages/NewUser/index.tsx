import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isCPF, formatToCPF } from "brazilian-values";
import { useRegistrations } from "~/hooks/useRegistrations";
import { useContext } from "react";
import { ModalContext } from "~/context/modal";
import Modal from "~/components/Modal";
import { toast } from "react-toastify";

const registrationFormSchema = z.object({
  admissionDate: z
    .string()
    .min(1, { message: "Preencha o campo Data de Admissão" }),
  cpf: z.string().refine((cpf) => isCPF(cpf), { message: "CPF é inválido" }),
  email: z
    .string()
    .min(1, { message: "Preencha o campo E-mail" })
    .email({ message: "E-mail inválido" }),
  employeeName: z.string().min(1, { message: "Preencha o campo Nome" }),
});

export type RegistrationFormSchemaType = z.infer<typeof registrationFormSchema>;

const NewUserPage = () => {
  const { createRegistration } = useRegistrations();
  const { isOpen, onClose, onOpen } = useContext(ModalContext);

  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const { register, handleSubmit, formState, watch } =
    useForm<RegistrationFormSchemaType>({
      resolver: zodResolver(registrationFormSchema),
    });

  const formValues = watch();

  const hasEmptyInput = Object.values(formValues).some((value) => value === "");

  const { errors } = formState;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const date = data.admissionDate.split("-").reverse().join("/");

      const registration = {
        ...data,
        admissionDate: date,
        cpf: data.cpf.replace(/\D/g, ""),
        status: "REVIEW",
      };

      await createRegistration(registration);

      toast.success(`Funcionário ${watch("employeeName")} criado com sucesso`, {
        position: "bottom-left",
        theme: "colored",
      });

      goToHome();
    } catch (error) {
      alert(error);
    }
  });

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          error={errors.employeeName?.message}
          {...register("employeeName")}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          placeholder="CPF"
          label="CPF"
          error={errors.cpf?.message}
          maxLength={14}
          {...register("cpf", {
            onChange: (e) => {
              e.target.value = formatToCPF(e.target.value);
            },
            required: "CPF obrigatório",
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: "CPF inválido",
            },
          })}
        />
        <TextField
          label="Data de admissão"
          type="date"
          error={errors.admissionDate?.message}
          {...register("admissionDate")}
        />
        <Button onClick={() => onOpen()} disabled={hasEmptyInput}>
          Cadastrar
        </Button>
      </S.Card>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        newUserModal={watch("employeeName")}
        onSubmit={onSubmit}
      />
    </S.Container>
  );
};

export default NewUserPage;
