import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button, { ButtonSmall } from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useRegistrations } from "~/hooks/useRegistrations";
import { useState } from "react";
import { isCPF, formatToCPF } from "brazilian-values";

export const SearchBar = () => {
  const [cpfValue, setCpfValue] = useState("");
  const { refetchRegistration, searchRegistrationsByCpf } = useRegistrations();
  const history = useHistory();

  const { mutateAsync: filter } = searchRegistrationsByCpf;

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <S.ContainerInput>
        <TextField
          placeholder="Digite um CPF válido"
          onChange={(e) => {
            const { value } = e.target;
            if (value.length < 1) refetchRegistration();
            setCpfValue(formatToCPF(value));
            if (isCPF(formatToCPF(value))) filter(value.replace(/\D/g, ""));
          }}
          value={cpfValue}
          maxLength={14}
          error={
            !isCPF(cpfValue.replace(/\D/g, "")) && cpfValue.length === 14
              ? "Digite um cpf válido"
              : ""
          }
        />
      </S.ContainerInput>
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh onClick={() => refetchRegistration()} />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
