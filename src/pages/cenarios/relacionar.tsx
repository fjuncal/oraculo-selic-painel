import RelatePassoTeste from "@/components/Cenario/Relate/RelatePassoTeste";
import SnackbarComponent from "@/components/SnackbarComponent";
import { buscarCenarios, relacionarCenario } from "@/services/cenarioService";
import { buscarPassosTestes } from "@/services/passoTesteService";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function RelacionarCenario() {
  const [cenarios, setCenarios] = useState([]);
  const [passosTestes, setPassosTestes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => setSnackbarOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cenariosData, passosTestesData] = await Promise.all([
          buscarCenarios(),
          buscarPassosTestes(),
        ]);
        setCenarios(cenariosData);
        setPassosTestes(passosTestesData);
        setIsLoading(false);
        setSnackbarMessage("Conseguiu buscar os relacionamentos!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        setIsLoading(true);
        setSnackbarMessage("Erro ao buscar os relacionamentos.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchData();
  }, []);

  const handleRelate = async (cenarioId: number, passosTestesIds: number[]) => {
    try {
      await relacionarCenario(cenarioId, passosTestesIds);
      setSnackbarMessage("Relacionamento realizado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Erro ao realizar o relacionamento.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  return (
    <div>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        <RelatePassoTeste
          cenarios={cenarios}
          passosTestes={passosTestes}
          onRelate={handleRelate}
        />
      )}
      <SnackbarComponent
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}
