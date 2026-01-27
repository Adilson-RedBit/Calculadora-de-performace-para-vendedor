/**
 * Fórmulas matemáticas para cálculo de lucro perdido
 * Baseado na tese de negócio: Fadiga Cognitiva = Perda de Revenue
 */

const INVESTIMENTO_MENSAL = 297 // R$ do Micro SaaS
const FATOR_IMPACTO_FADIGA = 0.30 // 30% de perda por fadiga
const FATOR_MELHORIA = 0.20 // 20% de melhoria potencial
const DIAS_UTEIS_MES = 20

/**
 * Calcula a perda mensal de receita devido à fadiga
 * PERDA_MENSAL = (T × R × 20 × C%) × (F / 5) × 0.30
 */
export function calcularPerdaMensal(
  ticketMedio: number,
  reunioesPerDia: number,
  taxaConversao: number,
  nivelFadiga: number
): number {
  const recebiaPotencial = ticketMedio * reunioesPerDia * DIAS_UTEIS_MES * (taxaConversao / 100)
  const fatorFadiga = nivelFadiga / 5
  const perdaMensal = recebiaPotencial * fatorFadiga * FATOR_IMPACTO_FADIGA

  return Math.round(perdaMensal)
}

/**
 * Calcula o potencial de ganho com 20% de melhoria
 * POTENCIAL_GANHO = (T × R × 20 × C%) × 0.20
 */
export function calcularPotencialGanho(
  ticketMedio: number,
  reunioesPerDia: number,
  taxaConversao: number
): number {
  const recebiaPotencial = ticketMedio * reunioesPerDia * DIAS_UTEIS_MES * (taxaConversao / 100)
  const potencialGanho = recebiaPotencial * FATOR_MELHORIA

  return Math.round(potencialGanho)
}

/**
 * Calcula o payback do investimento em dias
 * PAYBACK_DIAS = (INVESTIMENTO_MENSAL / POTENCIAL_GANHO) × 30
 */
export function calcularPaybackDias(
  potencialGanho: number
): number {
  if (potencialGanho === 0) return 0
  const payback = (INVESTIMENTO_MENSAL / potencialGanho) * 30
  return Math.round(payback * 10) / 10 // 1 casa decimal
}

/**
 * Calcula o ROI anual
 * ROI_ANUAL = (POTENCIAL_GANHO × 12) - (INVESTIMENTO_MENSAL × 12)
 */
export function calcularROIAnual(
  potencialGanho: number
): number {
  const ganhoAnual = potencialGanho * 12
  const investimentoAnual = INVESTIMENTO_MENSAL * 12
  const roiAnual = ganhoAnual - investimentoAnual

  return Math.round(roiAnual)
}

/**
 * Função principal que retorna todos os cálculos
 */
export function calcularResultados(
  ticketMedio: number,
  reunioesPerDia: number,
  taxaConversao: number,
  nivelFadiga: number
) {
  const perdaMensal = calcularPerdaMensal(
    ticketMedio,
    reunioesPerDia,
    taxaConversao,
    nivelFadiga
  )

  const potencialGanho = calcularPotencialGanho(
    ticketMedio,
    reunioesPerDia,
    taxaConversao
  )

  const paybackDias = calcularPaybackDias(potencialGanho)
  const roiAnual = calcularROIAnual(potencialGanho)

  return {
    perdaMensal,
    potencialGanho,
    paybackDias,
    roiAnual,
    investimentoMensal: INVESTIMENTO_MENSAL,
  }
}

/**
 * Calcula a perda anual (para contexto)
 */
export function calcularPerdaAnual(perdaMensal: number): number {
  return perdaMensal * 12
}

/**
 * Retorna insights baseados nos dados
 */
export function gerarInsights(
  perdaMensal: number,
  potencialGanho: number,
  nivelFadiga: number
): string[] {
  const insights: string[] = []

  // Insight 1: Severidade da perda
  if (perdaMensal > 50000) {
    insights.push('🚨 CRÍTICO: Você está perdendo mais de R$ 50k/mês. Ação imediata necessária.')
  } else if (perdaMensal > 20000) {
    insights.push('⚠️ ALTO: Perda significativa de receita. Considere otimizar sua performance.')
  } else if (perdaMensal > 5000) {
    insights.push('⚡ MODERADO: Há oportunidade de melhoria na sua performance.')
  }

  // Insight 2: Nível de fadiga
  if (nivelFadiga >= 4) {
    insights.push('😴 Sua fadiga está acima do normal. Biohacking pode fazer uma diferença real.')
  }

  // Insight 3: ROI
  if (potencialGanho > INVESTIMENTO_MENSAL * 10) {
    insights.push('💰 Seu potencial de ganho é EXCELENTE. O ROI justifica o investimento.')
  }

  return insights
}
