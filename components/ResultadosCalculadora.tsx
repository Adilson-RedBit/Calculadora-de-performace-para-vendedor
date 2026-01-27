'use client'

import { formatarMoeda, formatarNumero } from '@/lib/utils'

interface ResultadosCalculadoraProps {
  resultados: {
    perdaMensal: number
    potencialGanho: number
    paybackDias: number
    roiAnual: number
    investimentoMensal: number
  }
}

export default function ResultadosCalculadora({ resultados }: ResultadosCalculadoraProps) {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Card Principal - Perda Mensal */}
      <div className="bg-danger bg-opacity-10 border-2 border-danger rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-2">Perda Mensal de Receita</p>
            <h3 className="text-4xl font-bold text-danger">
              {formatarMoeda(resultados.perdaMensal)}
            </h3>
            <p className="text-gray-400 text-xs mt-2">
              Por mês • {formatarMoeda(resultados.perdaMensal * 12)}/ano
            </p>
          </div>
          <div className="text-5xl">📉</div>
        </div>
      </div>

      {/* Card Secundário - Potencial de Ganho */}
      <div className="bg-success bg-opacity-10 border-2 border-success rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-2">Potencial de Ganho (20% melhoria)</p>
            <h3 className="text-4xl font-bold text-success">
              +{formatarMoeda(resultados.potencialGanho)}
            </h3>
            <p className="text-gray-400 text-xs mt-2">
              Por mês • {formatarMoeda(resultados.potencialGanho * 12)}/ano
            </p>
          </div>
          <div className="text-5xl">📈</div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

      {/* Métricas de ROI */}
      <div className="grid grid-cols-2 gap-4">
        {/* Payback */}
        <div className="bg-primary rounded-lg p-4 border border-accent border-opacity-30">
          <p className="text-gray-400 text-xs mb-2">Payback do Investimento</p>
          <h4 className="text-2xl font-bold text-accent">
            {formatarNumero(resultados.paybackDias)}
          </h4>
          <p className="text-gray-400 text-xs mt-1">dias</p>
        </div>

        {/* ROI Anual */}
        <div className="bg-primary rounded-lg p-4 border border-success border-opacity-30">
          <p className="text-gray-400 text-xs mb-2">ROI Anual</p>
          <h4 className="text-2xl font-bold text-success">
            {formatarMoeda(resultados.roiAnual)}
          </h4>
          <p className="text-gray-400 text-xs mt-1">lucro líquido</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-primary rounded-lg p-4 border border-gray-700 space-y-3">
        <p className="text-sm font-semibold text-gray-300">Análise Detalhada</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Investimento Mensal (SaaS):</span>
            <span className="font-semibold">{formatarMoeda(resultados.investimentoMensal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Potencial Ganho Mensal:</span>
            <span className="font-semibold text-success">+{formatarMoeda(resultados.potencialGanho)}</span>
          </div>
          <div className="h-px bg-gray-700 my-2"></div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lucro Líquido Mensal:</span>
            <span className="font-semibold text-success">
              {formatarMoeda(resultados.potencialGanho - resultados.investimentoMensal)}
            </span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-accent to-success rounded-lg p-6 text-center">
        <p className="text-primary font-bold mb-4">
          Seus números provam: você precisa otimizar sua performance cognitiva
        </p>
        <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-secondary transition-all">
          Entrar na Lista VIP
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 text-center">
        *Cálculos baseados em modelos científicos de fadiga cognitiva e performance. Resultados podem variar.
      </p>
    </div>
  )
}
