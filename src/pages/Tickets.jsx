import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const statusOptions = [
  { value: 'open', label: 'Offen' },
  { value: 'in_progress', label: 'In Bearbeitung' },
  { value: 'closed', label: 'Geschlossen' },
]

const priorityOptions = [
  { value: 'low', label: 'Niedrig' },
  { value: 'medium', label: 'Mittel' },
  { value: 'high', label: 'Hoch' },
]

function Banner({ type = 'info', message, onClose }) {
  if (!message) return null
  const colors = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    error: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
  }
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={`mb-4 border ${colors[type]} rounded-xl px-4 py-3 flex items-start justify-between`}>
      <div>{message}</div>
      <button onClick={onClose} className="ml-4 text-sky-700 hover:underline">Schließen</button>
    </motion.div>
  )
}

function TicketForm({ initial, onCancel, onSaved }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [status, setStatus] = useState(initial?.status || 'open')
  const [priority, setPriority] = useState(initial?.priority || 'medium')
  const [assignee, setAssignee] = useState(initial?.assignee || '')
  const [submitting, setSubmitting] = useState(false)
  const isEdit = Boolean(initial?.id)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = { title, description, status, priority, assignee: assignee || null }
      const res = await fetch(`${API_BASE}/api/tickets${isEdit ? `/${initial.id}` : ''}` ,{
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Fehler: ${res.status}`)
      const data = await res.json()
      onSaved?.(data)
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-600 mb-1">Titel</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition" placeholder="Kurzer Titel"/>
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Beschreibung</label>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition" placeholder="Beschreibung (optional)"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Status</label>
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition">
            {statusOptions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Priorität</label>
          <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition">
            {priorityOptions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Zuständig</label>
          <input value={assignee} onChange={(e)=>setAssignee(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition" placeholder="Name/ID (optional)"/>
        </div>
      </div>
      <div className="flex gap-3">
        <button disabled={submitting} className={`px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition ${submitting?'opacity-70 cursor-not-allowed':''}`}>{isEdit? 'Speichern' : 'Erstellen'}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">Abbrechen</button>
      </div>
    </form>
  )
}

function RowSkeleton() {
  return (
    <div className="px-5 py-4 grid grid-cols-12 gap-4 animate-pulse">
      <div className="col-span-4 h-4 bg-slate-200 rounded" />
      <div className="col-span-2 h-4 bg-slate-200 rounded" />
      <div className="col-span-2 h-4 bg-slate-200 rounded" />
      <div className="col-span-2 h-4 bg-slate-200 rounded" />
      <div className="col-span-2 h-8 bg-slate-200 rounded" />
    </div>
  )
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [banner, setBanner] = useState({ type: 'info', message: '' })
  const [showCreate, setShowCreate] = useState(false)
  const [editTicket, setEditTicket] = useState(null)
  const [filters, setFilters] = useState({ status: '', priority: '' })

  const filteredTickets = useMemo(()=>{
    return tickets.filter(t => {
      if (filters.status && t.status !== filters.status) return false
      if (filters.priority && t.priority !== filters.priority) return false
      return true
    })
  }, [tickets, filters])

  const loadTickets = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (filters.status) params.set('status', filters.status)
      if (filters.priority) params.set('priority', filters.priority)
      const res = await fetch(`${API_BASE}/api/tickets?${params.toString()}`)
      if (!res.ok) throw new Error('Konnte Tickets nicht laden')
      const data = await res.json()
      setTickets(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ loadTickets() }, [])
  useEffect(()=>{ loadTickets() }, [filters.status, filters.priority])

  const handleDelete = async (id) => {
    if (!confirm('Dieses Ticket wirklich löschen?')) return
    try {
      const res = await fetch(`${API_BASE}/api/tickets/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Löschen fehlgeschlagen')
      setTickets(prev => prev.filter(t => t.id !== id))
      setBanner({ type: 'success', message: 'Ticket wurde gelöscht.' })
    } catch (e) {
      setBanner({ type: 'error', message: e.message })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
            <p className="text-slate-600">Erstellen, ansehen, bearbeiten und löschen</p>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>{ setEditTicket(null); setShowCreate(true) }} className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition">Neues Ticket</button>
            <a href="/" className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">Zur Startseite</a>
          </div>
        </div>

        <AnimatePresence>{banner.message && (
          <Banner type={banner.type} message={banner.message} onClose={()=>setBanner({ type: 'info', message: '' })} />
        )}</AnimatePresence>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Status</label>
              <select value={filters.status} onChange={(e)=>setFilters(f=>({...f,status:e.target.value}))} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:ring-2 focus:ring-sky-300">
                <option value="">Alle</option>
                {statusOptions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Priorität</label>
              <select value={filters.priority} onChange={(e)=>setFilters(f=>({...f,priority:e.target.value}))} className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:ring-2 focus:ring-sky-300">
                <option value="">Alle</option>
                {priorityOptions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={loadTickets} className="w-full px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">Aktualisieren</button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showCreate && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{editTicket ? 'Ticket bearbeiten' : 'Neues Ticket'}</h2>
                <button onClick={()=>{ setShowCreate(false); setEditTicket(null) }} className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">Schließen</button>
              </div>
              <TicketForm
                initial={editTicket}
                onCancel={()=>{ setShowCreate(false); setEditTicket(null) }}
                onSaved={(saved)=>{ setShowCreate(false); setEditTicket(null); setBanner({ type: 'success', message: editTicket ? 'Änderungen gespeichert.' : 'Ticket erstellt.' }); loadTickets(); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 gap-0 px-5 py-3 text-slate-600 border-b border-slate-200 text-sm bg-slate-50">
            <div className="col-span-4">Titel</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priorität</div>
            <div className="col-span-2">Zuständig</div>
            <div className="col-span-2 text-right">Aktionen</div>
          </div>
          {loading ? (
            <div>
              {Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="p-6 text-rose-600">{error}</div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-6 text-slate-600">Keine Tickets vorhanden.</div>
          ) : (
            <ul className="divide-y divide-slate-200">
              <AnimatePresence>
                {filteredTickets.map(t => (
                  <motion.li key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="px-5 py-4 grid grid-cols-12 gap-0 items-start hover:bg-slate-50/80">
                    <div className="col-span-4">
                      <div className="font-medium text-slate-900">{t.title}</div>
                      {t.description && <div className="text-sm text-slate-600 line-clamp-2">{t.description}</div>}
                    </div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200">{t.status}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200">{t.priority}</span>
                    </div>
                    <div className="col-span-2 text-slate-700">{t.assignee || '-'}</div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <button onClick={()=>{ setEditTicket(t); setShowCreate(true) }} className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm shadow-sm transition">Bearbeiten</button>
                      <button onClick={()=>handleDelete(t.id)} className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm shadow-sm transition">Löschen</button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
