// utils/configHelper.ts
import { formularios } from '../formulariosConfig'; // Importa os campos do formulariosConfig
import { mensagemConfig } from '../mensagemConfig'; // Importa a configuração do código de mensagem

// Função para pegar os campos por código da mensagem
export function getCamposParaCodigoMensagem(codigoMensagem: keyof typeof mensagemConfig) {
    const config = mensagemConfig[codigoMensagem];  // Pega a configuração do código da mensagem
    if (!config) return { informacoesBasicas: [], detalhesFinanceiros: [] };

  // Pega os campos para informacoesBasicas e detalhesFinanceiros, com base nos nomes de campos definidos
   // Pega os campos para informacoesBasicas e detalhesFinanceiros, com base nos nomes de campos definidos
   const informacoesBasicas = config.informacoesBasicas
   .map(fieldName => formularios.informacoesBasicas.find(field => field.name === fieldName))
   .filter(Boolean); // Remove valores `undefined` no caso de campos não encontrados

 const detalhesFinanceiros = config.detalhesFinanceiros
   .map(fieldName => formularios.detalhesFinanceiros.find(field => field.name === fieldName))
   .filter(Boolean); // Remove valores `undefined` no caso de campos não encontrados

  return {
    informacoesBasicas,
    detalhesFinanceiros,
  };
}
