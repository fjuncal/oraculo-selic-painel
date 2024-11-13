export interface FormularioConfig {
  label: string;
  name: string;
  type: string;
  tagXML: string;
  required: boolean;
  length: number; // Adiciona o comprimento para a string posicional
}

export const formularios = {
  Comando: [
    {
      label: "Emissor",
      tagXML: "Emi",
      name: "Emissor",
      type: "text",
      length: 10,
    },
    {
      label: "Numero Operação Selic",
      tagXML: "NUOp",
      name: "NumeroOperacaoSelic",
      type: "text",
      length: 8,
    },
    // Outros campos que podem estar em Informações Básicas
  ],
  Partes: [
    {
      label: "Conta Cedente",
      name: "ContaCedente",
      tagXML: "ctCed",
      type: "text",
      length: 8,
    },
    {
      label: "Conta Cessionária",
      name: "ContaCessionaria",
      tagXML: "ctCes",
      type: "text",
      length: 8,
    },
    // Outros campos de Detalhes Financeiros
  ],
  Financeiro: [
    {
      label: "Preço Unitário",
      name: "PrecoUnitario",
      tagXML: "Pu",
      type: "number",
      length: 8,
    },
    {
      label: "Valor Financeiro",
      name: "ValorFinanceiro",
      tagXML: "VlrFinanc",
      type: "number",
      length: 10,
    },
    // Outros campos de Detalhes Financeiros
  ],
  // Outros conjuntos de campos podem ser definidos aqui
};
