import { ChangeEvent, useState } from "react";
import styled from "styled-components";

interface CenarioFiltroProps {
  codigoMensagem: string;
  setCodigoMensagem(value: string): void;
  descricao: string;
  setDescricao(value: string): void;
  tipoCenario: string;
  setTipoCenario(value: string): void;
  startDate: string;
  setStartDate(value: string): void;
  endDate: string;
  setEndDate(value: string): void;
}

export default function CenarioFiltro({
  codigoMensagem,
  setCodigoMensagem,
  descricao,
  setDescricao,
  tipoCenario,
  setTipoCenario,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: CenarioFiltroProps) {
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
        placeholder="Buscar por tipo de cenário"
        value={tipoCenario}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTipoCenario(e.target.value)
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
