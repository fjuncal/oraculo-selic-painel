import styled from "styled-components";

interface TableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T;
    isAction?: boolean; // Define se a coluna é para uma ação específica
    onClick?: (id: string) => void;
  }[];
}

export default function GenericTable<T>({ data, columns }: TableProps<T>) {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <Th key={index}>{col.header}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <StyledRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <Td key={colIndex}>
                  {col.isAction && col.onClick ? (
                    <ActionButton
                      onClick={() => col.onClick!(String(item[col.accessor]))}
                    >
                      Ver Status
                    </ActionButton>
                  ) : (
                    <>{String(item[col.accessor])}</> // Converte para string antes de renderizar
                  )}
                </Td>
              ))}
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  padding: 10px 12px;
  background-color: #4f46e5;
  color: #fff;
  font-weight: bold;
  text-align: left;
  font-size: 0.85rem;
`;

const Td = styled.td`
  padding: 10px 12px;
  font-size: 0.85rem;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const StyledRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #3730a3;
  }
`;
