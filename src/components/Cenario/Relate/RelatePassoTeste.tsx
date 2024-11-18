import { dividerClasses } from "@mui/material";
import { useState } from "react";
import {
  Container,
  PassosTestesList,
  PassoTesteItem,
  RelateButton,
  Select,
} from "./RelatePassoTeste.styles";

interface PassoTeste {
  id: number;
  descricao: string;
}

interface RelatePassoTesteProps {
  cenarios: { id: number; descricao: string }[];
  passosTestes: PassoTeste[];
  onRelate: (cenarioId: number, passosTestesIds: number[]) => void;
}

export default function RelatePassoTeste({
  cenarios,
  passosTestes,
  onRelate,
}: RelatePassoTesteProps) {
  const [selectedCenario, setSelectedCenario] = useState<number | null>(null);
  const [selectedPassosTestes, setSelectedPassosTestes] = useState<number[]>(
    []
  );

  const togglePassoTeste = (passoTesteId: number) => {
    setSelectedPassosTestes((prev) =>
      prev.includes(passoTesteId)
        ? prev.filter((id) => id !== passoTesteId)
        : [...prev, passoTesteId]
    );
  };

  const handleRelate = () => {
    if (selectedCenario) {
      onRelate(selectedCenario, selectedPassosTestes);
      setSelectedPassosTestes([]);
    }
  };

  return (
    <Container>
      <h2>Relacionar Cenário com Passos Testes</h2>
      <Select
        value={selectedCenario || ""}
        onChange={(e) => setSelectedCenario(Number(e.target.value))}
      >
        <option value="" disabled>
          Selecione um Cenário
        </option>
        {cenarios.map((cenario) => (
          <option key={cenario.id} value={cenario.id}>
            {cenario.descricao}
          </option>
        ))}
      </Select>

      <PassosTestesList>
        {passosTestes.map((passoTeste) => (
          <PassoTesteItem key={passoTeste.id}>
            <input
              type="checkbox"
              checked={selectedPassosTestes.includes(passoTeste.id)}
              onChange={() => togglePassoTeste(passoTeste.id)}
            />
            {passoTeste.descricao}
          </PassoTesteItem>
        ))}
      </PassosTestesList>

      <RelateButton onClick={handleRelate} disabled={!selectedCenario}>
        Relacionar
      </RelateButton>
    </Container>
  );
}
