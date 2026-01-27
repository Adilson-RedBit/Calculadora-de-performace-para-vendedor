/**
 * Utilitários gerais para a aplicação
 */

/**
 * Formata um número como moeda brasileira
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor)
}

/**
 * Formata um número com separadores de milhares
 */
export function formatarNumero(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(valor)
}

/**
 * Formata uma porcentagem
 */
export function formatarPorcentagem(valor: number): string {
  return `${Math.round(valor)}%`
}

/**
 * Valida um email
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Cria um delay (para simulações)
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Copia texto para clipboard
 */
export async function copiarParaClipboard(texto: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(texto)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
}

/**
 * Gera um ID único
 */
export function gerarID(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Formata uma data
 */
export function formatarData(data: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(data)
}

/**
 * Calcula a diferença entre duas datas em dias
 */
export function diasEntre(data1: Date, data2: Date): number {
  const umDiaEmMs = 24 * 60 * 60 * 1000
  return Math.round(Math.abs(data2.getTime() - data1.getTime()) / umDiaEmMs)
}

/**
 * Trunca um texto com elipsis
 */
export function truncarTexto(texto: string, limite: number): string {
  return texto.length > limite ? `${texto.substring(0, limite)}...` : texto
}

/**
 * Capitaliza a primeira letra de uma string
 */
export function capitalizarPrimeira(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

/**
 * Capitaliza todas as palavras
 */
export function capitalizarTodas(texto: string): string {
  return texto
    .split(' ')
    .map(palavra => capitalizarPrimeira(palavra.toLowerCase()))
    .join(' ')
}
