import { useState } from "react";
import {
  FormContainer,
  InputContainer,
  SubmitButton,
} from "./CenarioForm.styles";

interface CenarioFormProps {
  onSubmit: (cenario: { descricao: string; tipo: string }) => void;
}

export default function CenarioForm({ onSubmit }: CenarioFormProps) {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ descricao, tipo });
    setDescricao("");
    setTipo("");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <label htmlFor="descricao">Descrição:</label>
        <input
          type="text"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
      </InputContainer>

      <InputContainer>
        <label htmlFor="tipo">Tipo:</label>
        <input
          type="text"
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        />
      </InputContainer>

      <SubmitButton type="submit">Criar Cenário</SubmitButton>
    </FormContainer>
  );
}
