import { Registration } from "~/@types/registration";
import { ButtonSmall } from "../Buttons";
import * as S from "./styles";
import { HiOutlineX } from "react-icons/hi";
import { useRegistrations } from "~/hooks/useRegistrations";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  registrationModal?: Registration | undefined;
  newUserModal?: string | undefined;
  onSubmit?: () => void;
};

const Modal = ({
  isOpen,
  onClose,
  registrationModal,
  newUserModal,
  onSubmit,
}: ModalProps) => {
  const { updateRegistrations, deleteRegistration } = useRegistrations();

  if (!isOpen) return;

  const { mutateAsync } = updateRegistrations;
  const { mutateAsync: deleteR } = deleteRegistration;

  async function handleConfirmModal() {
    if (newUserModal && onSubmit) {
      onSubmit();
      onClose();
      return;
    }
    registrationModal?.status === "DELETE"
      ? await deleteR({ data: registrationModal, id: registrationModal.id! })
      : mutateAsync({
          data: registrationModal!,
          newStatus: registrationModal?.status!,
        });
    onClose();
  }

  const actions = {
    REVIEW: "revisar novamente",
    APPROVED: "aprovar",
    REPROVED: "reprovar",
    DELETE: "apagar",
  };

  return (
    <S.Container data-testid="modal">
      <S.ModalContainer>
        <S.ModalContainerText>
          <S.ModalCointainerHeader>
            <S.ModalTitle>
              {newUserModal
                ? "Cadastrar funcionário"
                : registrationModal?.employeeName}
            </S.ModalTitle>
            <HiOutlineX
              style={{ cursor: "pointer" }}
              onClick={() => onClose()}
            />
          </S.ModalCointainerHeader>
          <S.ModalText>
            {newUserModal
              ? `Deseja cadastrar ${newUserModal}`
              : `Deseja ${
                  actions[registrationModal?.status]
                } o/a candidato(a) ${registrationModal?.employeeName}?`}
          </S.ModalText>
        </S.ModalContainerText>
        <S.ButtonRowContainer>
          <ButtonSmall
            bgcolor="rgba(255, 145, 154, 0.2)"
            onClick={() => onClose()}
          >
            Cancelar
          </ButtonSmall>
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={() => handleConfirmModal()}
          >
            Confirmar
          </ButtonSmall>
        </S.ButtonRowContainer>
      </S.ModalContainer>
    </S.Container>
  );
};

export default Modal;
