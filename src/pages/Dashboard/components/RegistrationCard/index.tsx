import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration } from "~/@types/registration";
import { useRegistrations } from "~/hooks/useRegistrations";
import { useContext } from "react";
import { ModalContext } from "~/context/modal";

type RegistrationCardProps = {
  registration: Registration;
};

const RegistrationCard = ({ registration }: RegistrationCardProps) => {
  const { onOpen, setRegistrationModalToChange } = useContext(ModalContext);

  const { employeeName, email, admissionDate } = registration;

  const openModalConfirm = (status: string) => {
    setRegistrationModalToChange({ ...registration, status });
    onOpen();
  };

  const renderButtons = () => {
    const toReview = registration.status === "REVIEW";
    return toReview ? (
      <>
        <ButtonSmall
          bgcolor="rgb(255, 145, 154)"
          onClick={() => openModalConfirm("REPROVED")}
        >
          Reprovar
        </ButtonSmall>
        <ButtonSmall
          bgcolor="rgb(155, 229, 155)"
          onClick={() => openModalConfirm("APPROVED")}
        >
          Aprovar
        </ButtonSmall>
      </>
    ) : (
      <>
        <ButtonSmall
          bgcolor="#ff8858"
          onClick={() => openModalConfirm("REVIEW")}
        >
          Revisar novamente
        </ButtonSmall>
      </>
    );
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {renderButtons()}
        <HiOutlineTrash onClick={() => openModalConfirm("DELETE")} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
