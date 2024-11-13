import styled from "styled-components";

interface FieldProps {
  field: {
    label: string;
    name: string;
    type: string;
    required: boolean;
    length: number;
  };
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export default function CenarioFormField({
  field,
  value,
  onChange,
  error,
}: FieldProps) {
  return (
    <FieldContainer>
      <label>{field.label}:</label>
      <Input
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
        maxLength={field.length} // Usa o comprimento do campo, se definido
        required={field.required} // Define como obrigatório se necessário
        style={{ borderColor: error ? "red" : undefined }}
      />
      {error && <ErrorMessage>Campo obrigatório</ErrorMessage>}
    </FieldContainer>
  );
}

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* Faz com que cada campo ocupe a largura total do container */

  /* Define o comportamento responsivo para exibir lado a lado em telas maiores */
  @media (min-width: 768px) {
    width: 48%; /* Define a largura para caber dois campos por linha */
  }
`;
const Input = styled.input`
  padding: 6px 10px; /* Reduz o padding para tornar o campo menor */
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem; /* Diminui o tamanho da fonte */
  background-color: #f9f9f9;
  color: #333;
  margin-top: 5px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;
