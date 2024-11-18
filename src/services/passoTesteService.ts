import { PassoTeste } from "@/components/PassoTeste/Consulta/PassoTesteTabela";
import axios from "axios";

export async function salvarPassoTeste(passoTesteData: any) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/passo-teste`,
      passoTesteData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar passo teste:", error);
    throw new Error("Erro ao salvar passo teste");
  }
}

export const buscarPassosTestes = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/passo-teste/list`
  );
  return response.data;
};

export const enviarPassoTeste = async (passoTeste: PassoTeste[]) => {
  console.log(passoTeste);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages`,
    { passoTeste }
  );
  return response.data;
};
