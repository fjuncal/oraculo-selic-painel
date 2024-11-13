export interface FormularioConfig {
  label: string;
  name: string;
  type: string;
  tagXML: string;
  required: boolean;
}

export const formularios = {
  informacoesBasicas: [
    {
      label: "Emissor",
      tagXML: "Emi",
      name: "Emissor",
      type: "text",
      required: true,
    },
    {
      label: "Numero Operação Selic",
      tagXML: "NUOp",
      name: "NumeroOperacaoSelic",
      type: "text",
      required: false,
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
    },
    {
      label: "Valor Financeiro",
      name: "ValorFinanceiro",
      tagXML: "VlrFinanc",
      type: "number",
      required: false,
    },
    // Outros campos de Detalhes Financeiros
  ],
  // Outros conjuntos de campos podem ser definidos aqui
};
