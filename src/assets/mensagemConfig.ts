export const mensagemConfig: {
  [key: string]: { label: string; name: string; type: string }[];
} = {
  SEL1052: [
    { label: "Código da Mensagem", name: "codigoMensagem", type: "text" },
    { label: "Valor Financeiro", name: "valorFinanceiro", type: "number" },
    { label: "Data de Vencimento", name: "dataVencimento", type: "date" },
  ],
  SEL1054: [
    { label: "Código da Mensagem", name: "codigoMensagem", type: "text" },
    {
      label: "Valor Financeiro Retorno",
      name: "valorFinanceiroRetorno",
      type: "number",
    },
    {
      label: "Identificador de Retorno",
      name: "identificadorRetorno",
      type: "text",
    },
  ],
};
