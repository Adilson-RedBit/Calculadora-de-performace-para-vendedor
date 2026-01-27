'use client'

import { useState } from 'react'
import { calcularResultados } from '@/lib/formulas'

interface CalculadoraFormProps {
  onSubmit: (dados: any) => void
  isLoading: boolean
}

export default function CalculadoraForm({ onSubmit, isLoading }: CalculadoraFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    ticketMedio: 5000,
    reunioesPerDia: 5,
    taxaConversao: 20,
    nivelFadiga: 3,
  })

  const [erros, setErros] = useState<Record<string, string>>({})

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {}

    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      novosErros.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      novosErros.email = 'Email inválido'
    }

    if (formData.ticketMedio < 100) {
      novosErros.ticketMedio = 'Ticket mínimo é R$ 100'
    }

    if (formData.reunioesPerDia < 1 || formData.reunioesPerDia > 100) {
      novosErros.reunioesPerDia = 'Insira um número entre 1 e 100'
    }

    if (formData.taxaConversao < 0 || formData.taxaConversao > 100) {
      novosErros.taxaConversao = 'Porcentagem deve estar entre 0 e 100'
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'nome' || name === 'email' ? value : Number(value),
    }))
    // Limpar erro ao digitar
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    const resultados = calcularResultados(
      formData.ticketMedio,
      formData.reunioesPerDia,
      formData.taxaConversao,
      formData.nivelFadiga
    )

    onSubmit({
      ...formData,
      ...resultados,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome */}
      <div>
        <label className="block text-sm font-semibold mb-2">Seu Nome *</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="João Silva"
          className="input-field"
        />
        {erros.nome && <p className="text-danger text-sm mt-1">{erros.nome}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          className="input-field"
        />
        {erros.email && <p className="text-danger text-sm mt-1">{erros.email}</p>}
      </div>

      {/* Ticket Médio */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Ticket Médio (R$)
          <span className="text-success ml-2">R$ {formData.ticketMedio.toLocaleString('pt-BR')}</span>
        </label>
        <input
          type="range"
          name="ticketMedio"
          min="100"
          max="50000"
          step="100"
          value={formData.ticketMedio}
          onChange={handleChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>R$ 100</span>
          <span>R$ 50.000</span>
        </div>
        {erros.ticketMedio && <p className="text-danger text-sm mt-1">{erros.ticketMedio}</p>}
      </div>

      {/* Reuniões por Dia */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Reuniões de Vendas por Dia
          <span className="text-success ml-2">{formData.reunioesPerDia}</span>
        </label>
        <input
          type="range"
          name="reunioesPerDia"
          min="1"
          max="20"
          step="1"
          value={formData.reunioesPerDia}
          onChange={handleChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>1 reunião</span>
          <span>20 reuniões</span>
        </div>
        {erros.reunioesPerDia && <p className="text-danger text-sm mt-1">{erros.reunioesPerDia}</p>}
      </div>

      {/* Taxa de Conversão */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Taxa de Conversão (%)
          <span className="text-success ml-2">{formData.taxaConversao}%</span>
        </label>
        <input
          type="range"
          name="taxaConversao"
          min="0"
          max="100"
          step="1"
          value={formData.taxaConversao}
          onChange={handleChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>0%</span>
          <span>100%</span>
        </div>
        {erros.taxaConversao && <p className="text-danger text-sm mt-1">{erros.taxaConversao}</p>}
      </div>

      {/* Nível de Fadiga */}
      <div>
        <label className="block text-sm font-semibold mb-2">Nível de Fadiga Percebida</label>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((nivel) => (
            <button
              key={nivel}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, nivelFadiga: nivel }))}
              className={`py-3 rounded-lg font-bold transition-all duration-300 ${
                formData.nivelFadiga === nivel
                  ? 'bg-accent text-white scale-110'
                  : 'bg-primary border border-gray-600 hover:border-accent'
              }`}
            >
              {nivel}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Sempre Disposto</span>
          <span>Exaurido</span>
        </div>
      </div>

      {/* Descrição da Fadiga */}
      <div className="bg-primary rounded-lg p-3 border border-gray-700">
        <p className="text-sm text-gray-300">
          {formData.nivelFadiga === 1 && '✓ Você está em perfeito estado. Mantenha assim!'}
          {formData.nivelFadiga === 2 && '⚠ Você está começando a sentir cansaço. Atenção!'}
          {formData.nivelFadiga === 3 && '⚠⚠ Fadiga moderada. Hora de otimizar.'}
          {formData.nivelFadiga === 4 && '🚨 Fadiga alta. Você está perdendo muito dinheiro.'}
          {formData.nivelFadiga === 5 && '🚨🚨 Exaustão. Ação imediata necessária!'}
        </p>
      </div>

      {/* Botão Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Calculando...
          </span>
        ) : (
          'Calcular Meu Lucro Perdido'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        * Seus dados são privados e seguros. Nunca compartilharemos sem sua permissão.
      </p>
    </form>
  )
}
