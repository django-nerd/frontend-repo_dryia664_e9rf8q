import React, { useState } from 'react'
import TermsContent from './TermsContent'

export default function TermsWithConsent({ brand = 'Cosmos TicketSystem', onAccept }) {
  const [accepted, setAccepted] = useState(false)

  const handleAcceptChange = (e) => {
    setAccepted(e.target.checked)
  }

  const handleContinue = () => {
    if (accepted) {
      onAccept?.(new Date().toISOString())
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_55%)]" />

      <div className="relative max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{brand}</h1>
          <p className="text-blue-200/80 mt-2">Bitte lies die folgenden Nutzungsbedingungen und bestätige deine Zustimmung, um fortzufahren.</p>
        </div>

        <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 backdrop-blur">
          <div className="max-h-[55vh] overflow-y-auto pr-2 custom-scroll">
            <TermsContent brand={brand} />
          </div>

          <div className="mt-6 flex items-start gap-3">
            <input
              id="accept-terms"
              type="checkbox"
              checked={accepted}
              onChange={handleAcceptChange}
              className="mt-1 h-5 w-5 rounded border-slate-600 bg-slate-900 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="accept-terms" className="text-blue-100/90">
              Ich habe die Nutzungsbedingungen gelesen und akzeptiere sie.
            </label>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleContinue}
              disabled={!accepted}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors ${accepted ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 cursor-not-allowed'}`}
            >
              Weiter
            </button>
            <a href="/" className="px-5 py-2 rounded-lg bg-slate-700 text-white/80 hover:bg-slate-600 transition-colors">Abbrechen</a>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.35); border-radius: 9999px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(15,23,42,0.6); }
      `}</style>
    </div>
  )
}
