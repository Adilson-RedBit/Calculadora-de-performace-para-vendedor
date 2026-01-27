import { NextRequest, NextResponse } from 'next/server'
import { calcularResultados } from '@/lib/formulas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      nome,
      email,
      ticketMedio,
      reunioesPerDia,
      taxaConversao,
      nivelFadiga,
    } = body

    // Validações básicas
    if (!nome || !email || !ticketMedio || !reunioesPerDia || !taxaConversao || !nivelFadiga) {
      return NextResponse.json(
        { erro: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Calcular resultados
    const resultados = calcularResultados(
      Number(ticketMedio),
      Number(reunioesPerDia),
      Number(taxaConversao),
      Number(nivelFadiga)
    )

    // Aqui você integraria com Make.com para:
    // 1. Salvar no Google Sheets
    // 2. Enviar email personalizado
    // 3. Adicionar à lista VIP

    return NextResponse.json(
      {
        sucesso: true,
        mensagem: 'Cálculo realizado com sucesso',
        resultados,
        dados: {
          nome,
          email,
          ticketMedio,
          reunioesPerDia,
          taxaConversao,
          nivelFadiga,
          dataCriacao: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao processar cálculo:', error)
    return NextResponse.json(
      { erro: 'Erro ao processar cálculo' },
      { status: 500 }
    )
  }
}
