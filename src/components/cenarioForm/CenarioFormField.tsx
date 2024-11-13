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
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #333;
  margin-top: 5px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;
