import { useContext, useState } from "react";
import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistrations } from "~/hooks/useRegistrations";
import Modal from "~/components/Modal";
import { ModalContext } from "~/context/modal";
import { ToastContainer } from "react-toastify";

const DashboardPage = () => {
  const { getRegistrations } = useRegistrations();
  const { data: registrations } = getRegistrations;

  const { isOpen, onClose, registrationModal } = useContext(ModalContext);

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations || []} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        registrationModal={registrationModal}
      />
      <ToastContainer />
    </S.Container>
  );
};
export default DashboardPage;
