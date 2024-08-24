import Router from "~/router";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./context/modal";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
