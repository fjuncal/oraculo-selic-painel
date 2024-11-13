export interface FormularioConfig {
  label: string;
  name: string;
  type: string;
  tagXML: string;
  required: boolean;
  length: number; // Adiciona o comprimento para a string posicional
}

export const formularios = {
  informacoesBasicas: [
    {
      label: "Emissor",
      tagXML: "Emi",
      name: "Emissor",
      type: "text",
      required: true,
      length: 10,
    },
    {
      label: "Numero Operação Selic",
      tagXML: "NUOp",
      name: "NumeroOperacaoSelic",
      type: "text",
      required: false,
      length: 12,
    },
    // Outros campos que podem estar em Informações Básicas
  ],
  detalhesFinanceiros: [
    {
      label: "Tipo de Repasse Financeiro",
      name: "TipoRepasseFinanceiro",
      tagXML: "TpRep",
      type: "text",
      required: true,
      length: 15,
    },
    {
      label: "Valor Financeiro",
      name: "ValorFinanceiro",
      tagXML: "VlrFinanc",
      type: "number",
      required: false,
      length: 10,
    },
    // Outros campos de Detalhes Financeiros
  ],
  // Outros conjuntos de campos podem ser definidos aqui
};
