import { ChangeEvent } from "react";
import styled from "styled-components";

interface PassoTesteFiltroProps {
  codigoMensagem: string;
  setCodigoMensagem(value: string): void;
  descricao: string;
  setDescricao(value: string): void;
  tipoPassoTeste: string;
  setTipoPassoTeste(value: string): void;
  startDate: string;
  setStartDate(value: string): void;
  endDate: string;
  setEndDate(value: string): void;
}

export default function PassoTesteFiltro({
  codigoMensagem,
  setCodigoMensagem,
  descricao,
  setDescricao,
  tipoPassoTeste,
  setTipoPassoTeste,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: PassoTesteFiltroProps) {
  return (
    <FiltersContainer>
      <Input
        type="text"
        placeholder="Código da mensagem"
        value={codigoMensagem}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCodigoMensagem(e.target.value)
        }
      />
      <Input
        type="text"
        placeholder="Buscar por descrição"
        value={descricao}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescricao(e.target.value)
        }
      />
      <Input
        type="text"
        placeholder="Buscar por tipo de passo teste"
        value={tipoPassoTeste}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTipoPassoTeste(e.target.value)
        }
      />
      <Input
        type="date"
        value={startDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setStartDate(e.target.value)
        }
      />
      <Input
        type="date"
        value={endDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEndDate(e.target.value)
        }
      />
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f3f4f6;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: #fff;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;
