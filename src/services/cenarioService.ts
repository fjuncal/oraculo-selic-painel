import axios from "axios";

export async function salvarCenario(cenario: {
  descricao: string;
  tipo: string;
}) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cenarios`,
      cenario,
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

export async function relacionarCenario(
  cenarioId: number,
  passosTestesIds: number[]
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cenarios/relate`,
      { cenarioId, passosTestesIds },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao relacionar cenários com passos testes:", error);
    throw new Error("Erro ao relacionar cenários com passos testes");
  }
}

export async function buscarCenarios() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cenarios/list`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cenários:", error);
    throw new Error("Erro ao buscar cenários");
  }
}
