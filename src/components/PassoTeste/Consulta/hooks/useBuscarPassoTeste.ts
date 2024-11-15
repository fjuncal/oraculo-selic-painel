import { buscarPassoTeste } from "@/services/passoTesteService";
import { useEffect, useState } from "react";
import { PassoTeste } from "../PassoTesteTabela";

export const useBuscarPassosTestes = () => {
  const [passosTestes, setPassosTestes] = useState<PassoTeste[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const obterPassoTeste = async () => {
      try {
        const data = await buscarPassoTeste();
        setPassosTestes(data);
      } catch (error) {
        console.error("Erro ao buscar passo teste:", error);
      } finally {
        setCarregando(false);
      }
    };
    obterPassoTeste();
  }, []);

  return { passosTestes, carregando };
};
