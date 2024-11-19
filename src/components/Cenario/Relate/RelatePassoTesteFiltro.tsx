import { ChangeEvent, useState } from "react";
import styled from "styled-components";

interface RelatePassoTesteFiltroProps {
  canal: string;
  setCanal(value: string): void;
  codigoMensagem: string;
  setCodigoMensagem(value: string): void;
  descricao: string;
  setDescricao(value: string): void;
}

export default function RelatePassoTesteFiltro({
  canal,
  setCanal,
  codigoMensagem,
  setCodigoMensagem,
  descricao,
  setDescricao,
}: RelatePassoTesteFiltroProps) {
  return (
    <FiltersContainer>
      <Input
        type="text"
        placeholder="Código da Mensagem"
        value={codigoMensagem}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCodigoMensagem(e.target.value)
        }
      />
      <Input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescricao(e.target.value)
        }
      />
      <Input
        type="text"
        placeholder="Buscar por Canal"
        value={canal}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCanal(e.target.value)
        }
      />
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente (se necessário) */
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f3f4f6;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap; /* Permite quebra de linha em telas menores */
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
