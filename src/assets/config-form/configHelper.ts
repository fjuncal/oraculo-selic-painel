import { formularios, FormularioConfig } from "../formulariosConfig";
import { mensagemConfig } from "../mensagemConfig";

export function getCamposParaCodigoMensagem(
  codigoMensagem: keyof typeof mensagemConfig
) {
  const config = mensagemConfig[codigoMensagem];
  if (!config) return null;

  return Object.entries(config).reduce((acc, [setor, campos]) => {
    // Convertemos `setor` explicitamente para uma das chaves do tipo `formularios`
    const setorTyped = setor as keyof typeof formularios;

    // Mapeamos os campos e filtramos qualquer `undefined`
    acc[setor] = campos
      .map((campoName) => {
        const isRequired = campoName.startsWith("#");
        const cleanCampoName = isRequired ? campoName.slice(1) : campoName;
        const campoConfig = formularios[setorTyped]?.find(
          (campo) => campo.name === cleanCampoName
        );

        return campoConfig
          ? { ...campoConfig, required: isRequired }
          : undefined;
      })
      .filter((campo): campo is FormularioConfig => campo !== undefined); // Filtra `undefined`

    return acc;
  }, {} as Record<string, FormularioConfig[]>);
}
