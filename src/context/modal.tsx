import { createContext, useState } from "react";
import { Registration } from "~/@types/registration";

type ModalContextProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  registrationModal: Registration | undefined;
  setRegistrationModalToChange: (data: Registration) => void;
};

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [registrationModal, setRegistrationModal] = useState<
    Registration | undefined
  >();

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const setRegistrationModalToChange = (registration: Registration) => {
    setRegistrationModal(registration);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        onClose,
        onOpen,
        registrationModal,
        setRegistrationModalToChange,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext };
