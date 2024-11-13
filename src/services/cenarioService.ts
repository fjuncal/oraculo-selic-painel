export async function saveCenario(cenarioData: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cenarios`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cenarioData),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao salvar cenário");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao salvar cenário:", error);
    throw error;
  }
}
