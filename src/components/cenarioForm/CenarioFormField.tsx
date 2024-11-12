import styled from "styled-components";

interface FieldProps {
  field: {
    label: string;
    name: string;
    type: string;
  };
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ScenarioFormField({
  field,
  value,
  onChange,
}: FieldProps) {
  return (
    <FieldContainer>
      <label>{field.label}:</label>
      <Input
        type={field.type}
        name={field.name}
        value={value}
        onChange={onChange}
      />
    </FieldContainer>
  );
}

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #333;
  margin-top: 5px;
`;
