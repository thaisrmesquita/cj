import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistrations } from "~/hooks/useRegistrations";

const DashboardPage = () => {
  const { getRegistrations } = useRegistrations();
  const { data: registrations } = getRegistrations;

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations || []} />
    </S.Container>
  );
};
export default DashboardPage;
