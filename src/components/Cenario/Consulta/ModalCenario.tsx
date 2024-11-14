import { Cenario } from "./CenarioTabela";
import {
  Overlay,
  ModalContent,
  CloseButton,
} from "./styles/TabelaCenarioStyles";

interface ModalProps {
  cenario: Cenario | null;
  onClose: () => void;
}

export default function ModalCenario({ cenario, onClose }: ModalProps) {
  if (!cenario) return null;

  return (
    <Overlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Detalhes do Cenário</h2>
        <p>
          <strong>ID:</strong> {cenario.id}
        </p>
        <p>
          <strong>Descrição:</strong> {cenario.descricao}
        </p>
        <p>
          <strong>Tipo de Cenário:</strong> {cenario.tipoCenario}
        </p>
        <p>
          <strong>Canal:</strong> {cenario.canal}
        </p>
        <p>
          <strong>Código da Mensagem:</strong> {cenario.codigoMsg}
        </p>
        <p>
          <strong>Conta Cedente:</strong> {cenario.contaCedente}
        </p>
        <p>
          <strong>Conta Cessionário:</strong> {cenario.contaCessionaria}
        </p>
        <p>
          <strong>Emissor:</strong> {cenario.emissor}
        </p>
        <p>
          <strong>Valor Financeiro:</strong> {cenario.valorFinanceiro}
        </p>
        <p>
          <strong>Data de Inclusão:</strong> {cenario.dataInclusao}
        </p>
      </ModalContent>
    </Overlay>
  );
}
