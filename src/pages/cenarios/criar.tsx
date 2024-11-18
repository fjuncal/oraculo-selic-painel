import CenarioForm from "@/components/Cenario/Form/CenarioForm";
import SnackbarComponent from "@/components/SnackbarComponent";
import { salvarCenario } from "@/services/cenarioService";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CriarCenario() {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleCenarioSubmit = async (cenario: any) => {
    try {
      await salvarCenario(cenario);

      // Exibe mensagem de sucesso
      setSnackbarMessage("Cenário criado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Redireciona após criar o cenário
      //router.push("/cenarios");
    } catch (error) {
      // Exibe mensagem de erro
      setSnackbarMessage("Erro ao criar o cenário. Tente novamente.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <h1>Criar Cenario</h1>
      <CenarioForm onSubmit={handleCenarioSubmit} />
      <SnackbarComponent
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}
