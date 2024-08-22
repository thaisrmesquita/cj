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

type RegistrationCardProps = {
  registration: Registration;
};

const RegistrationCard = ({ registration }: RegistrationCardProps) => {
  const { updateRegistrations } = useRegistrations();
  const { mutateAsync } = updateRegistrations;
  const { employeeName, email, admissionDate } = registration;

  const renderButtons = () => {
    const toReview = registration.status === "REVIEW";
    return toReview ? (
      <>
        <ButtonSmall
          bgcolor="rgb(255, 145, 154)"
          onClick={() =>
            mutateAsync({ data: registration, newStatus: "REPROVED" })
          }
        >
          Reprovar
        </ButtonSmall>
        <ButtonSmall
          bgcolor="rgb(155, 229, 155)"
          onClick={() =>
            mutateAsync({ data: registration, newStatus: "APPROVED" })
          }
        >
          Aprovar
        </ButtonSmall>
      </>
    ) : (
      <>
        <ButtonSmall
          bgcolor="#ff8858"
          onClick={() =>
            mutateAsync({ data: registration, newStatus: "REVIEW" })
          }
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
        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
