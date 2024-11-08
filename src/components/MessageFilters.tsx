import { ChangeEvent } from "react";
import styled from "styled-components";

interface MessageFiltersProps {
  searchContent: string;
  setSearchContent(value: string): void;
  statusFilter: string;
  setStatusFilter(value: string): void;
  startDate: string;
  setStartDate(value: string): void;
  endDate: string;
  setEndDate(value: string): void;
}

export default function MessageFilters({
  searchContent,
  setSearchContent,
  statusFilter,
  setStatusFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: MessageFiltersProps) {
  return (
    <FiltersContainer>
      <Input
        type="text"
        placeholder="Buscar por conteúdo"
        value={searchContent}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchContent(e.target.value)
        }
      />
      <Select
        value={statusFilter}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setStatusFilter(e.target.value)
        }
      >
        <option value="">Todos os Status</option>
        <option value="RECEIVED">Recebido</option>
        <option value="PROCESSING">Processando</option>
        <option value="FAILED">Falhou</option>
        <option value="COMPLETED">Completo</option>
      </Select>
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
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
`;
