import React, { useEffect, useMemo, useState } from 'react'

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
        <label className="block text-sm text-blue-200 mb-1">Titel</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} required className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/30 text-white" placeholder="Kurzer Titel"/>
      </div>
      <div>
        <label className="block text-sm text-blue-200 mb-1">Beschreibung</label>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/30 text-white" placeholder="Beschreibung (optional)"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Status</label>
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/30 text-white">
            {statusOptions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Priorität</label>
          <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/30 text-white">
            {priorityOptions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Zuständig</label>
          <input value={assignee} onChange={(e)=>setAssignee(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/30 text-white" placeholder="Name/ID (optional)"/>
        </div>
      </div>
      <div className="flex gap-3">
        <button disabled={submitting} className={`px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white ${submitting?'opacity-70 cursor-not-allowed':''}`}>{isEdit? 'Speichern' : 'Erstellen'}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white">Abbrechen</button>
      </div>
    </form>
  )
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
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
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tickets</h1>
            <p className="text-blue-200/80">Erstellen, ansehen, bearbeiten und löschen</p>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>{ setEditTicket(null); setShowCreate(true) }} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">Neues Ticket</button>
            <a href="/" className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600">Zur Startseite</a>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-blue-200 mb-1">Status</label>
              <select value={filters.status} onChange={(e)=>setFilters(f=>({...f,status:e.target.value}))} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/30">
                <option value="">Alle</option>
                {statusOptions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-blue-200 mb-1">Priorität</label>
              <select value={filters.priority} onChange={(e)=>setFilters(f=>({...f,priority:e.target.value}))} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-blue-500/30">
                <option value="">Alle</option>
                {priorityOptions.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={loadTickets} className="w-full px-3 py-2 rounded bg-slate-700 hover:bg-slate-600">Aktualisieren</button>
            </div>
          </div>
        </div>

        {showCreate && (
          <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{editTicket ? 'Ticket bearbeiten' : 'Neues Ticket'}</h2>
              <button onClick={()=>{ setShowCreate(false); setEditTicket(null) }} className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600">Schließen</button>
            </div>
            <TicketForm
              initial={editTicket}
              onCancel={()=>{ setShowCreate(false); setEditTicket(null) }}
              onSaved={(saved)=>{ setShowCreate(false); setEditTicket(null); loadTickets(); }}
            />
          </div>
        )}

        <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-0 px-5 py-3 text-blue-200/80 border-b border-blue-500/20 text-sm">
            <div className="col-span-4">Titel</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priorität</div>
            <div className="col-span-2">Zuständig</div>
            <div className="col-span-2 text-right">Aktionen</div>
          </div>
          {loading ? (
            <div className="p-6 text-blue-200/80">Laden...</div>
          ) : error ? (
            <div className="p-6 text-red-400">{error}</div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-6 text-blue-200/80">Keine Tickets vorhanden.</div>
          ) : (
            <ul className="divide-y divide-blue-500/10">
              {filteredTickets.map(t => (
                <li key={t.id} className="px-5 py-4 grid grid-cols-12 gap-0 items-start">
                  <div className="col-span-4">
                    <div className="font-medium">{t.title}</div>
                    {t.description && <div className="text-sm text-blue-200/70 line-clamp-2">{t.description}</div>}
                  </div>
                  <div className="col-span-2">
                    <span className="px-2 py-1 rounded text-xs bg-slate-700">{t.status}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="px-2 py-1 rounded text-xs bg-slate-700">{t.priority}</span>
                  </div>
                  <div className="col-span-2 text-blue-200/80">{t.assignee || '-'}</div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <button onClick={()=>{ setEditTicket(t); setShowCreate(true) }} className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white text-sm">Bearbeiten</button>
                    <button onClick={()=>handleDelete(t.id)} className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-sm">Löschen</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
