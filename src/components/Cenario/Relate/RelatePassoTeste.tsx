import { useState } from "react";
import {
  Container,
  DetalhesButton,
  Input,
  NavigationButton,
  RelateButton,
  SelectButton,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TablesContainer,
  TableWrapper,
  SearchAndTableContainer,
  Pagination,
  FiltersContainer,
} from "./RelatePassoTeste.styles";
import RelacionamentoModal from "./RelacionamentoModal";
import RelatePassoTesteFiltro from "./RelatePassoTesteFiltro";
import styled from "styled-components";

interface PassoTeste {
  id: number;
  descricao: string;
  codigoMsg: string;
  canal: string;
}

interface Cenario {
  id: number;
  descricao: string;
}

interface RelatePassoTesteProps {
  cenarios: Cenario[];
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

  const [cenarioSearch, setCenarioSearch] = useState("");

  // Estados de paginação
  const [cenariosPage, setCenariosPage] = useState(1);
  const [passosTestesPage, setPassosTestesPage] = useState(1);
  const itemsPerPage = 5;

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

  const filteredCenarios = cenarios.filter((cenario) =>
    cenario.descricao.toLowerCase().includes(cenarioSearch.toLowerCase())
  );

  const paginatedCenarios = filteredCenarios.slice(
    (cenariosPage - 1) * itemsPerPage,
    cenariosPage * itemsPerPage
  );

  const paginatedPassosTestes = filteredPassosTestes.slice(
    (passosTestesPage - 1) * itemsPerPage,
    passosTestesPage * itemsPerPage
  );

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

      <TablesContainer>
        {/* Tabela de cenários */}
        <TableWrapper>
          <h3>Cenários</h3>
          <SearchAndTableContainer>
            {/* Campo de busca acima da tabela de cenários */}
            <FiltersContainer>
              <Input
                type="text"
                placeholder="Buscar Cenário"
                value={cenarioSearch}
                onChange={(e) => setCenarioSearch(e.target.value)}
              />
            </FiltersContainer>

            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Cenário</TableHeader>
                  <TableHeader>Ação</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {paginatedCenarios.map((cenario) => (
                  <TableRow
                    key={cenario.id}
                    style={{
                      backgroundColor:
                        cenario.id === selectedCenario
                          ? "#f3f4f6"
                          : "transparent",
                    }}
                  >
                    <TableCell>{cenario.descricao}</TableCell>
                    <TableCell>
                      <SelectButton
                        isSelected={cenario.id === selectedCenario}
                        onClick={() => setSelectedCenario(cenario.id)}
                      >
                        {selectedCenario === cenario.id
                          ? "Selecionado"
                          : "Selecionar"}
                      </SelectButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>

            {/* Paginação para cenários */}
            <Pagination>
              <NavigationButton
                onClick={() => setCenariosPage((prev) => Math.max(prev - 1, 1))}
                disabled={cenariosPage === 1}
              >
                Anterior
              </NavigationButton>
              <span>
                Página {cenariosPage} de{" "}
                {Math.ceil(filteredCenarios.length / itemsPerPage)}
              </span>
              <NavigationButton
                onClick={() =>
                  setCenariosPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(filteredCenarios.length / itemsPerPage)
                    )
                  )
                }
                disabled={
                  cenariosPage * itemsPerPage >= filteredCenarios.length
                }
              >
                Próxima
              </NavigationButton>
            </Pagination>
          </SearchAndTableContainer>
        </TableWrapper>

        {/* Tabela de passos testes */}
        <TableWrapper>
          <h3>Passos Testes</h3>
          <RelatePassoTesteFiltro
            canal={canal}
            setCanal={setCanal}
            codigoMensagem={codigoMensagem}
            setCodigoMensagem={setCodigoMensagem}
            descricao={descricao}
            setDescricao={setDescricao}
          />
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
              {paginatedPassosTestes.map((passoTeste) => (
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

          {/* Paginação para passos testes */}
          <Pagination>
            <NavigationButton
              onClick={() =>
                setPassosTestesPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={passosTestesPage === 1}
            >
              Anterior
            </NavigationButton>
            <span>
              Página {passosTestesPage} de{" "}
              {Math.ceil(filteredPassosTestes.length / itemsPerPage)}
            </span>
            <NavigationButton
              onClick={() =>
                setPassosTestesPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredPassosTestes.length / itemsPerPage)
                  )
                )
              }
              disabled={
                passosTestesPage * itemsPerPage >= filteredPassosTestes.length
              }
            >
              Próxima
            </NavigationButton>
          </Pagination>
        </TableWrapper>
      </TablesContainer>

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
