export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);

    // Verifica se a data é inválida
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }

    // Utiliza o Intl.DateTimeFormat para lidar com formatos locais e UTC
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Formato de 24 horas
      timeZone: "UTC", // Garante consistência no fuso horário
    });

    // Formata a data completa
    return formatter.format(date);
  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return "Erro ao formatar data";
  }
}
