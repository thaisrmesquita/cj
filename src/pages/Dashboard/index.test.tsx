import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import DashboardPage from ".";
import { ModalProvider } from "~/context/modal";
import { toast, ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

jest.mock("~/hooks/useRegistrations", () => ({
  useRegistrations: () => ({
    getRegistrations: {
      data: [
        {
          admissionDate: "22/10/2023",
          email: "luiz@caju.com.br",
          employeeName: "Luiz Filho",
          status: "REVIEW",
          cpf: "56642105087",
          id: "3",
        },
      ],
    },
    searchRegistrationsByCpf: {
      mutateAsync: jest.fn(),
    },
    updateRegistrations: jest.fn(),
    deleteRegistration: jest.fn(),
  }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: jest.fn(() => null),
}));

describe("Dashboard", () => {
  it("Should render Dashboard Page", async () => {
    await waitFor(() => {
      render(
        <BrowserRouter>
          <ModalProvider>
            <QueryClientProvider client={queryClient}>
              <DashboardPage />
            </QueryClientProvider>
          </ModalProvider>
        </BrowserRouter>
      );
    });

    expect(screen.getByText("Nova Admissão")).toBeInTheDocument();
  });

  it("Should show repprove modal Dashboard Page", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ModalProvider>
          <QueryClientProvider client={queryClient}>
            <DashboardPage />
          </QueryClientProvider>
        </ModalProvider>
      </BrowserRouter>
    );

    const repproveBtn = getByText("Reprovar");
    fireEvent.click(repproveBtn);

    await waitFor(() => {
      expect(
        getByText("Deseja reprovar o/a candidato(a) Luiz Filho?")
      ).toBeInTheDocument();
    });
  });

  // it("Should filter cards by CPF", async () => {
  //   const { getByPlaceholderText } = render(
  //     <BrowserRouter>
  //       <ModalProvider>
  //         <QueryClientProvider client={queryClient}>
  //           <DashboardPage />
  //         </QueryClientProvider>
  //       </ModalProvider>
  //     </BrowserRouter>
  //   );

  //   const inputCPFFilter = getByPlaceholderText("Digite um CPF válido");

  //   await waitFor(() => {
  //     fireEvent.change(inputCPFFilter, { target: { value: "057.327.693-58" } });
  //   });

  //   await waitFor(() => {
  //     expect(toast.success).toBeInTheDocument();
  //   });
  // });
});
