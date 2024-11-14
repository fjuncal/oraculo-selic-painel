import { formularios } from "@/assets/formulariosConfig";
import { mensagemConfig } from "@/assets/mensagemConfig";

export function generatePositionalString(
  formData: { [key: string]: any },
  codigoMensagem: string
): string {
  const config = mensagemConfig[codigoMensagem as keyof typeof mensagemConfig];

  if (!config) {
    return "Código de mensagem inválido";
  }

  let posString = "";

  // Itera pelos setores e campos no config para construir a string posicional
  Object.entries(config).forEach(([sector, fields]) => {
    console.log(`Setor: ${sector}, Campos: ${JSON.stringify(fields)}`);

    fields.forEach((fieldName) => {
      // Remove o # do nome do campo, se existir
      const normalizedFieldName = fieldName.startsWith("#")
        ? fieldName.slice(1)
        : fieldName;

      // Localiza a configuração do campo com base no nome normalizado
      const fieldConfig = formularios[sector as keyof typeof formularios].find(
        (field) => field.name === normalizedFieldName
      );

      if (fieldConfig) {
        const value = formData[fieldConfig.name] ?? "";
        let formattedValue = "";

        if (fieldConfig.type === "number") {
          // Preenche com zeros à esquerda para campos numéricos, caso vazio usa "0"
          formattedValue = value
            ? value.toString().padStart(fieldConfig.length, "0")
            : "0".repeat(fieldConfig.length);
        } else {
          // Preenche com espaços à direita para campos de texto
          formattedValue = value.toString().padEnd(fieldConfig.length, " ");
        }

        // Adiciona o valor formatado à string final
        posString += formattedValue.slice(0, fieldConfig.length); // Garante que o comprimento seja exato
      } else {
        console.warn(
          `Configuração não encontrada para o campo: ${normalizedFieldName}`
        );
      }
    });
  });

  console.log("String Posicional Final:", posString);
  return posString;
}
