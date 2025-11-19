import React from 'react'

export default function TermsContent({ brand = 'Cosmos TicketSystem' }) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6">Nutzungsbedingungen – {brand}</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">1. Geltungsbereich</h2>
        <p className="text-blue-100/90">Diese Nutzungsbedingungen regeln die Nutzung der Ticket-Plattform („Plattform“) sowie den Kauf von Tickets über die Plattform. Mit der Nutzung der Plattform akzeptiert der Nutzer diese Bedingungen.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">2. Rolle der Plattform</h2>
        <p className="text-blue-100/90">Die Plattform dient als Vermittler zwischen Veranstaltern und Ticketkäufern. Sofern nicht ausdrücklich angegeben, ist die Plattform nicht Veranstalter des Events.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">3. Nutzerkonto</h2>
        <p className="text-blue-100/90">Zur Nutzung bestimmter Funktionen ist ein Nutzerkonto erforderlich.</p>
        <p className="text-blue-100/90">Der Nutzer ist für die Geheimhaltung seiner Zugangsdaten verantwortlich.</p>
        <p className="text-blue-100/90">Falsche oder missbräuchliche Angaben können zur Sperrung des Kontos führen.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">4. Ticketkauf & Vertragsabschluss</h2>
        <p className="text-blue-100/90">Mit Abschluss des Bezahlvorgangs entsteht ein verbindlicher Kaufvertrag über das Ticket.</p>
        <p className="text-blue-100/90">Die Plattform bestätigt den Kauf per E-Mail oder im Nutzerkonto.</p>
        <p className="text-blue-100/90">Preise verstehen sich inkl. aller angegebenen Gebühren und Steuern, soweit nicht anders ausgewiesen.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">5. Zahlungsarten</h2>
        <p className="text-blue-100/90">Unterstützte Zahlungsmethoden werden auf der Plattform angezeigt. Die Plattform kann Zahlungen über Drittanbieter (z. B. Stripe, PayPal) abwickeln.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">6. Lieferung der Tickets</h2>
        <p className="text-blue-100/90">Tickets werden digital bereitgestellt (Download/QR-Code/E-Mail).</p>
        <p className="text-blue-100/90">Der Nutzer trägt die Verantwortung, das Ticket sicher aufzubewahren.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">7. Rückgabe, Stornierung & Erstattungen</h2>
        <p className="text-blue-100/90">Grundsätzlich sind Tickets vom Widerruf ausgeschlossen, sofern gesetzlich zulässig (digitale Eventprodukte).</p>
        <p className="text-blue-100/90">Bei Absage oder Verschiebung des Events richtet sich die Erstattung nach den Regeln des Veranstalters.</p>
        <p className="text-blue-100/90">Die Plattform kann im Auftrag des Veranstalters Rückerstattungen abwickeln.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">8. Weiterverkauf & Missbrauch</h2>
        <p className="text-blue-100/90">Der Weiterverkauf von Tickets kann untersagt oder beschränkt sein.</p>
        <p className="text-blue-100/90">Manipulation, Duplizieren oder Fälschung von Tickets ist verboten.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">9. Pflichten des Nutzers</h2>
        <p className="text-blue-100/90">Der Nutzer verpflichtet sich:</p>
        <ul className="list-disc list-inside text-blue-100/90">
          <li>keine falschen Informationen bereitzustellen</li>
          <li>keine technischen Sicherheitsmechanismen zu umgehen</li>
          <li>die Plattform nicht für betrügerische Zwecke zu nutzen</li>
        </ul>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">10. Haftung</h2>
        <p className="text-blue-100/90">Die Plattform haftet nur für Schäden, die durch grobe Fahrlässigkeit oder Vorsatz entstanden sind.</p>
        <p className="text-blue-100/90">Für die Durchführung und Qualität der Events haftet ausschließlich der Veranstalter.</p>
        <p className="text-blue-100/90">Die Plattform übernimmt keine Haftung für technische Ausfälle außerhalb ihres Einflussbereichs.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">11. Datenschutz</h2>
        <p className="text-blue-100/90">Die Verarbeitung personenbezogener Daten erfolgt gemäß der Datenschutzerklärung der Plattform. Daten können an Veranstalter oder Zahlungsdienstleister weitergegeben werden, soweit zur Vertragserfüllung notwendig.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">12. Änderungen der Nutzungsbedingungen</h2>
        <p className="text-blue-100/90">Die Plattform kann diese AGB anpassen. Nutzer werden rechtzeitig informiert. Die fortgesetzte Nutzung gilt als Zustimmung.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">13. Anwendbares Recht & Gerichtsstand</h2>
        <p className="text-blue-100/90">Es gilt das Recht des Landes, in dem die Plattform ihren Sitz hat, sofern zwingendes Verbraucherrecht dem nicht entgegensteht.</p>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold text-white">14. Kontakt</h2>
        <p className="text-blue-100/90">Supportanfragen können an den im Impressum angegebenen Kontakt gerichtet werden.</p>
      </section>
    </div>
  )
}
