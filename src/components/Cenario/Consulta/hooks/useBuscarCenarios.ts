// src/hooks/useBuscarCenarios.ts
import { useEffect, useState } from "react";
import { buscarCenarios } from "../../../../services/cenarioService";

export const useBuscarCenarios = () => {
  const [cenarios, setCenarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const obterCenarios = async () => {
      try {
        const data = await buscarCenarios();
        setCenarios(data);
      } catch (error) {
        console.error("Erro ao buscar cenários:", error);
      } finally {
        setCarregando(false);
      }
    };
    obterCenarios();
  }, []);

  return { cenarios, carregando };
};
