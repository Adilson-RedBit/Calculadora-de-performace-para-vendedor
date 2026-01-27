'use client'

import { useState } from 'react'
import CalculadoraForm from '@/components/CalculadoraForm'
import ResultadosCalculadora from '@/components/ResultadosCalculadora'

interface ResultadosType {
  perdaMensal: number
  potencialGanho: number
  paybackDias: number
  roiAnual: number
  investimentoMensal: number
}

export default function Home() {
  const [resultados, setResultados] = useState<ResultadosType | null>(null)
  const [enviando, setEnviando] = useState(false)

  const handleFormSubmit = async (dados: any) => {
    setEnviando(true)
    try {
      // Aqui você integraria com sua API do Make.com ou backend
      const response = await fetch('/api/calcular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      })

      if (response.ok) {
        const data = await response.json()
        setResultados(data.resultados)
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
          Quanto você está <br /> perdendo por mês?
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Descubra o impacto financeiro real da fadiga cognitiva na sua performance de vendas. 
          Use dados, não intuição.
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-accent to-success mx-auto"></div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Formulário */}
        <div className="bg-secondary rounded-2xl p-8 border border-accent border-opacity-20">
          <h2 className="text-2xl font-bold mb-6">Calcule seu Lucro Perdido</h2>
          <CalculadoraForm onSubmit={handleFormSubmit} isLoading={enviando} />
        </div>

        {/* Resultados */}
        {resultados ? (
          <div className="bg-secondary rounded-2xl p-8 border border-success border-opacity-20">
            <h2 className="text-2xl font-bold mb-6">Seus Resultados</h2>
            <ResultadosCalculadora resultados={resultados} />
          </div>
        ) : (
          <div className="bg-secondary rounded-2xl p-8 border border-gray-700 flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-400">Preencha o formulário para ver seus resultados personalizados</p>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      {resultados && (
        <section className="mt-16 bg-gradient-to-r from-accent to-success p-12 rounded-2xl text-center">
          <h3 className="text-3xl font-bold text-primary mb-4">Pronto para aumentar sua performance?</h3>
          <p className="text-lg text-primary mb-8 max-w-2xl mx-auto">
            Junte-se à comunidade de top closers que estão otimizando seu desempenho cognitivo com biohacking.
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-secondary transition-all duration-300 transform hover:scale-105">
            Entrar na Lista VIP
          </button>
        </section>
      )}
    </div>
  )
}
