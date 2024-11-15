import { FieldContainer, Input, ErrorMessage } from "./styles";

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

export default function PassoTesteFormField({
  field,
  value,
  onChange,
  error,
}: FieldProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Limita o número de caracteres se o campo for numérico e exceder o comprimento definido
    if (field.type === "number" && value.length > field.length) {
      e.target.value = value.slice(0, field.length); // Trunca o valor para o comprimento máximo
    }
    onChange(e);
  };
  return (
    <FieldContainer>
      <label>{field.label}:</label>
      <Input
        type={field.type}
        name={field.name}
        value={value}
        onChange={handleInputChange}
        maxLength={field.length} // Usa o comprimento do campo, se definido
        required={field.required} // Define como obrigatório se necessário
        style={{ borderColor: error ? "red" : undefined }}
      />
      {error && <ErrorMessage>Campo obrigatório</ErrorMessage>}
    </FieldContainer>
  );
}
