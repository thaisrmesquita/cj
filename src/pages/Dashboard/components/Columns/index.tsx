import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Registration } from "~/@types/registration";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type ColumnProps = {
  registrations: Registration[];
};

const Collumns = ({ registrations }: ColumnProps) => {
  return (
    <S.Container>
      {allColumns.map((column) => {
        const registrationsColumn = registrations.filter(
          (registration) => registration.status === column.status
        );

        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrationsColumn.map((registration) => {
                  return (
                    <RegistrationCard
                      registration={registration}
                      key={registration.id}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
