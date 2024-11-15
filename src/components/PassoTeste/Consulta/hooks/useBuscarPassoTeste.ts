import { buscarPassoTeste } from "@/services/passoTesteService";
import { useEffect, useState } from "react";

export const useBuscarPassosTestes = () => {
  const [passosTestes, setPassosTestes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const obterPassoTeste = async () => {
      try {
        const data = await buscarPassoTeste();
        setPassosTestes(data);
        console.log(data);
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
