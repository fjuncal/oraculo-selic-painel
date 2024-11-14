import { mensagemConfig } from "../assets/mensagemConfig";
import { formularios, FormularioConfig } from "../assets/formulariosConfig";

function getFieldDetails(
  fieldName: string,
  sector: keyof typeof formularios
): FormularioConfig | undefined {
  const field = formularios[sector].find((field) => field.name === fieldName);

  // Garante que 'required' seja sempre retornado, mesmo que o campo não o tenha explicitamente
  if (field) {
    return {
      ...field,
      required:
        "required" in field ? (field as FormularioConfig).required : false,
    };
  }

  return undefined;
}

export function generateXML(
  formData: { [key: string]: any },
  codigoMensagem: string
): string {
  const config = mensagemConfig[codigoMensagem as keyof typeof mensagemConfig];

  if (!config) {
    return "<!-- Código de mensagem inválido -->";
  }

  let xml = `<?xml version="1.0"?>\n<DOC xmlns="http://www.bcb.gov.br/SPB/${codigoMensagem}.xsd">\n  <BCMSG>\n`;

  // Bloco BCMSG (informações gerais)
  xml += `    <IdentdDestinatario>00038121</IdentdDestinatario>\n`;
  xml += `    <DomSist>SPB01</DomSist>\n`;

  xml += `  </BCMSG>\n  <SISMSG>\n    <${codigoMensagem}>\n`;

  // Itera pelos setores do config e adiciona as tags preenchidas ao XML
  Object.entries(config).forEach(([sector, fields]) => {
    fields.forEach((fieldName) => {
      const fieldDetails = getFieldDetails(
        fieldName.replace("#", ""), // Remove o '#' do nome do campo
        sector as keyof typeof formularios
      );

      if (fieldDetails) {
        const value = formData[fieldDetails.name];
        if (value !== undefined && value !== null) {
          // Assegura que o campo não está vazio
          xml += `      <${fieldDetails.tagXML}>${value}</${fieldDetails.tagXML}>\n`;
        }
      }
    });
  });

  xml += `    </${codigoMensagem}>\n  </SISMSG>\n</DOC>`;
  return xml;
}
