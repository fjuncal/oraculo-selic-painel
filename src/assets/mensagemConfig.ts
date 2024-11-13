export interface FieldConfig {
  label: string;
  name: string;
  type: string;
}

export interface MessageConfig {
  [key: string]: {
    informacoesBasicas: FieldConfig[];
    detalhesFinanceiros: FieldConfig[];
  };
}

export const mensagemConfig: MessageConfig = {
  SEL1052: {
    informacoesBasicas: [
      { label: "Código da Operação", name: "codigoOperacao", type: "text" },
      { label: "Data de Operação", name: "dataOperacao", type: "date" },
    ],
    detalhesFinanceiros: [
      { label: "Valor Financeiro", name: "valorFinanceiro", type: "number" },
      { label: "Taxa", name: "taxa", type: "number" },
    ],
  },
  SEL1054: {
    informacoesBasicas: [
      { label: "Código da Transação", name: "codigoTransacao", type: "text" },
      { label: "Data de Vencimento", name: "dataVencimento", type: "date" },
    ],
    detalhesFinanceiros: [
      {
        label: "Valor Financeiro Retorno",
        name: "valorFinanceiroRetorno",
        type: "number",
      },
      {
        label: "Percentual de Retorno",
        name: "percentualRetorno",
        type: "number",
      },
    ],
  },
};
