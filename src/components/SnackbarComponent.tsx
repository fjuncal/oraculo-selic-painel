import { Alert, AlertColor, Snackbar } from "@mui/material";

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor; // success | error | warning | info
  onClose: () => void;
  autoHideDuration?: number; // Tempo para fechar automaticamente (em ms)
}

export default function SnackbarComponent({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 3000,
}: SnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
