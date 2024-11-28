import SnackbarComponent from "@/components/SnackbarComponent";
import PlanilhaUpload from "@/components/Upload/PlanilhaUpload";
import { uploadPlanilha } from "@/services/cenarioService";
import { useState } from "react";
import styled from "styled-components";

export default function Upload() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [uploadStatus, setUploadStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleUpload = async (file: File) => {
    setUploadStatus(null);
    try {
      await uploadPlanilha(file);
      setSnackbarMessage("Planilha enviada e processada com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setUploadStatus("success");
    } catch (error) {
      setSnackbarMessage("Erro ao processar a planilha. Tente novamente.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setUploadStatus("error");
    }
  };

  return (
    <PageContainer>
      <h1 style={{ textAlign: "center" }}>Upload de Planilha</h1>
      <PlanilhaUpload onUpload={handleUpload} />
      <SnackbarComponent
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
      {uploadStatus === "success" && (
        <StatusMessage status="success">
          Planilha enviada com sucesso!
        </StatusMessage>
      )}
      {uploadStatus === "error" && (
        <StatusMessage status="error">
          Erro ao processar a planilha. Tente novamente.
        </StatusMessage>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const StatusMessage = styled.p<{ status: "success" | "error" }>`
  color: ${(props) => (props.status === "success" ? "green" : "red")};
  font-weight: bold;
  margin-top: 24px;
  text-align: center;
`;
