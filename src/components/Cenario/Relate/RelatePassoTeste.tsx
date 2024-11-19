import { dividerClasses } from "@mui/material";
import { useState } from "react";
import {
  Container,
  DetalhesButton,
  RelateButton,
  Select,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "./RelatePassoTeste.styles";
import RelacionamentoModal from "./RelacionamentoModal";
import RelatePassoTesteFiltro from "./RelatePassoTesteFiltro";

interface PassoTeste {
  id: number;
  descricao: string;
  codigoMsg: string;
  canal: string;
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
  const [modalPassoTeste, setModalPassoTeste] = useState<PassoTeste | null>(
    null
  );

  const [canal, setCanal] = useState("");
  const [codigoMensagem, setCodigoMensagem] = useState("");
  const [descricao, setDescricao] = useState("");

  const filteredPassosTestes = passosTestes.filter((passoTeste) => {
    return (
      (!canal ||
        passoTeste.canal.toLowerCase().includes(canal.toLowerCase())) &&
      (!codigoMensagem ||
        passoTeste.codigoMsg
          .toLowerCase()
          .includes(codigoMensagem.toLowerCase())) &&
      (!descricao ||
        passoTeste.descricao.toLowerCase().includes(descricao.toLowerCase()))
    );
  });

  const handleOpenModal = (content: PassoTeste) => {
    setModalPassoTeste(content);
  };

  const handleCloseModal = () => {
    setModalPassoTeste(null);
  };
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

      {/* Dropdown para selecionar cenários */}
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

      {/* Filtro para passos testes */}
      <RelatePassoTesteFiltro
        canal={canal}
        setCanal={setCanal}
        codigoMensagem={codigoMensagem}
        setCodigoMensagem={setCodigoMensagem}
        descricao={descricao}
        setDescricao={setDescricao}
      />
      {/* Tabela para exibir passos testes */}
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Selecionar</TableHeader>
            <TableHeader>Código da Mensagem</TableHeader>
            <TableHeader>Descrição</TableHeader>
            <TableHeader>Canal</TableHeader>
            <TableHeader>Ação</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {filteredPassosTestes &&
            filteredPassosTestes.map((passoTeste) => (
              <TableRow key={passoTeste.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedPassosTestes.includes(passoTeste.id)}
                    onChange={() => togglePassoTeste(passoTeste.id)}
                  />
                </TableCell>
                <TableCell>{passoTeste.codigoMsg}</TableCell>
                <TableCell>{passoTeste.descricao}</TableCell>
                <TableCell>{passoTeste.canal}</TableCell>
                <TableCell>
                  <DetalhesButton onClick={() => handleOpenModal(passoTeste)}>
                    Ver Detalhes
                  </DetalhesButton>
                </TableCell>
              </TableRow>
            ))}
        </tbody>
      </Table>

      {/* Botão para relacionar */}
      <RelateButton
        onClick={handleRelate}
        disabled={!selectedCenario || selectedPassosTestes.length === 0}
      >
        Relacionar
      </RelateButton>

      {/* Modal para exibir detalhes do passo teste */}
      <RelacionamentoModal
        isOpen={!!modalPassoTeste}
        onClose={handleCloseModal}
        passoTeste={modalPassoTeste}
      />
    </Container>
  );
}
