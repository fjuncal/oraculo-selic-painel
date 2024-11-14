import axios from "axios";

export async function salvarCenario(cenarioData: any) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cenarios`,
      cenarioData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar cenário:", error);
    throw new Error("Erro ao salvar cenário");
  }
}

export const buscarCenarios = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cenarios/list`
  );
  return response.data;
};
