import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TermsWithConsent from './components/TermsWithConsent'

function App() {
  const [acceptedAt, setAcceptedAt] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('cosmos.acceptedAt')
    if (saved) setAcceptedAt(saved)
  }, [])

  const handleAccepted = (ts) => {
    localStorage.setItem('cosmos.acceptedAt', ts)
    setAcceptedAt(ts)
  }

  if (!acceptedAt) {
    return (
      <TermsWithConsent
        brand="Cosmos TicketSystem"
        onAccept={handleAccepted}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-6">
              <img
                src="/flame-icon.svg"
                alt="Flames"
                className="w-20 h-20 drop-shadow-[0_0_25px_rgba(14,165,233,0.4)]"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
              Willkommen bei Cosmos TicketSystem
            </h1>

            <p className="text-base sm:text-lg text-slate-600">
              Zustimmung erteilt am {new Date(acceptedAt).toLocaleString()}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Danke für deine Zustimmung</h3>
                <p className="text-slate-600 text-sm">Du kannst die Plattform jetzt nutzen.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-sky-500 text-white rounded-lg flex items-center justify-center font-bold">
                ℹ️
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Hinweis</h3>
                <p className="text-slate-600 text-sm">Deine Zustimmung wurde lokal gespeichert, damit du sie nicht bei jedem Besuch erneut bestätigen musst.</p>
              </div>
            </div>
          </div>

          <div className="text-center flex flex-wrap items-center justify-center gap-3">
            <a href="/tickets" className="inline-block px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition shadow-sm">Tickets öffnen</a>
            <a href="/test" className="inline-block px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition">Backend/DB-Test</a>
            <button onClick={()=>{ localStorage.removeItem('cosmos.acceptedAt'); location.reload() }} className="inline-block px-5 py-2.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition">Zustimmung zurücksetzen</button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
