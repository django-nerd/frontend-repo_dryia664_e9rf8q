import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 text-slate-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">{brand}</h1>
            <p className="text-slate-600 mt-2">Bitte lies die folgenden Nutzungsbedingungen und bestätige deine Zustimmung, um fortzufahren.</p>
          </div>

          <div className="bg-white/90 border border-slate-200 rounded-2xl p-6 backdrop-blur shadow-sm">
            <div className="max-h-[55vh] overflow-y-auto pr-2 custom-scroll">
              <TermsContent brand={brand} />
            </div>

            <div className="mt-6 flex items-start gap-3">
              <input
                id="accept-terms"
                type="checkbox"
                checked={accepted}
                onChange={handleAcceptChange}
                className="mt-1 h-5 w-5 rounded border-slate-300 bg-white text-sky-600 focus:ring-sky-500"
              />
              <label htmlFor="accept-terms" className="text-slate-800">
                Ich habe die Nutzungsbedingungen gelesen und akzeptiere sie.
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleContinue}
                disabled={!accepted}
                className={`px-5 py-2 rounded-lg font-semibold transition ${accepted ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
              >
                Weiter
              </button>
              <a href="/" className="px-5 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">Abbrechen</a>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(2,132,199,0.35); border-radius: 9999px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(241,245,249,0.6); }
      `}</style>
    </div>
  )
}
