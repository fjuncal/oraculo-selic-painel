import { formularios } from "../formulariosConfig"; // Configuração dos formulários
import { mensagemConfig } from "../mensagemConfig"; // Configuração das mensagens

// Função para pegar os campos de acordo com o código da mensagem
export function getCamposParaCodigoMensagem(
  codigoMensagem: keyof typeof mensagemConfig
) {
  const config = mensagemConfig[codigoMensagem];

  if (!config) {
    return {}; // Retorna um objeto vazio se o código de mensagem não existir
  }

  // Para cada setor no `config`, convertemos `setor` explicitamente para `keyof typeof formularios`
  const camposPorSetor = Object.keys(config).reduce((acc, setor) => {
    const setorKey = setor as keyof typeof formularios;
    acc[setorKey] =
      config[setorKey]?.map((fieldName: string) =>
        formularios[setorKey]?.find((field) => field.name === fieldName)
      ) || [];
    return acc;
  }, {} as { [key in keyof typeof formularios]: any[] });

  return camposPorSetor;
}
