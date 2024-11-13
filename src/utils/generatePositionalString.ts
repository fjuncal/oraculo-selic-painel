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

  // Itera pelos setores do config e constrói a string posicional
  Object.entries(config).forEach(([sector, fields]) => {
    fields.forEach((fieldName) => {
      // Encontra o campo com base no nome no config e aplica o `length`
      const fieldConfig = formularios[sector as keyof typeof formularios].find(
        (field) => field.name === fieldName
      );

      if (fieldConfig) {
        const value = formData[fieldConfig.name] || ""; // Pega o valor preenchido ou vazio
        let formattedValue = "";

        // Verifica o tipo do campo e aplica preenchimento
        if (fieldConfig.type === "number") {
          // Preenche com zeros à esquerda para campos numéricos
          formattedValue = value.toString().padStart(fieldConfig.length, "0");
        } else {
          // Preenche com espaços à direita para campos de texto
          formattedValue = value.toString().padEnd(fieldConfig.length, " ");
        }

        // Adiciona o valor formatado à string final
        posString += formattedValue.slice(0, fieldConfig.length); // Garante que o comprimento seja exato
      }
    });
  });

  return posString;
}
