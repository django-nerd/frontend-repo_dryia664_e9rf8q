import React, { useState } from 'react'
import TermsWithConsent from './components/TermsWithConsent'

function App() {
  const [acceptedAt, setAcceptedAt] = useState(null)

  if (!acceptedAt) {
    return (
      <TermsWithConsent
        brand="Cosmos TicketSystem"
        onAccept={(ts) => setAcceptedAt(ts)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <img
                src="/flame-icon.svg"
                alt="Flames"
                className="w-24 h-24 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              />
            </div>

            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Willkommen bei Cosmos TicketSystem
            </h1>

            <p className="text-xl text-blue-200 mb-6">
              Zustimmung erteilt am {new Date(acceptedAt).toLocaleString()}
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 shadow-xl mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Danke für deine Zustimmung</h3>
                <p className="text-blue-200/80 text-sm">Du kannst die Plattform jetzt nutzen.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">
                ℹ️
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Hinweis</h3>
                <p className="text-blue-200/80 text-sm">Dies ist eine Demo. Die Zustimmung wird nur lokal gespeichert und nicht an einen Server übermittelt.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="/test" className="text-sm text-blue-300 hover:text-blue-200 underline">Backend/DB-Test öffnen</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
