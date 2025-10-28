import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Safety Guidelines | NMGToursJam',
  description: 'Important safety information for tours and cultural experiences in New Mexico.',
}

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Safety Guidelines</h1>
      
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-8 space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800">
            <strong>Your safety is our priority.</strong> Please read these guidelines 
            carefully before participating in any tours or cultural jams.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">General Safety Guidelines</h2>
          <ul className="list-disc ml-6 space-y-2 text-zinc-300">
            <li>Always follow your guide instructions</li>
            <li>Stay with your group unless otherwise directed</li>
            <li>Inform your guide of any medical conditions or allergies</li>
            <li>Wear appropriate clothing and footwear for activities</li>
            <li>Stay hydrated, especially in New Mexico dry climate</li>
            <li>Use sunscreen and wear sun protection</li>
            <li>Respect wildlife and maintain safe distances</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Desert Safety</h2>
          <ul className="list-disc ml-6 space-y-2 text-zinc-300">
            <li>Carry extra water (minimum 2 liters per person)</li>
            <li>Avoid hiking during extreme heat (10 AM - 4 PM in summer)</li>
            <li>Watch for rattlesnakes and other desert wildlife</li>
            <li>Never touch unknown plants (some cacti and plants are harmful)</li>
            <li>Check weather for flash flood warnings</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">High Altitude Considerations</h2>
          <p className="text-zinc-300 mb-2">
            Much of New Mexico is at high elevation (Santa Fe: 7,199 ft). Be aware of:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-zinc-300">
            <li>Altitude sickness symptoms: headache, nausea, fatigue</li>
            <li>Take it easy your first day to acclimate</li>
            <li>Drink plenty of water and avoid alcohol initially</li>
            <li>Consider altitude sickness medication if sensitive</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Emergency Procedures</h2>
          <div className="bg-red-50 p-4 rounded">
            <p className="font-semibold mb-2">In case of emergency:</p>
            <ol className="list-decimal ml-6 space-y-1 text-zinc-300">
              <li>Call 911 immediately for life-threatening situations</li>
              <li>Contact your tour guide (number provided at booking)</li>
              <li>Contact NMGToursJam emergency line: 1-800-NMG-HELP</li>
              <li>Know your location (guides will inform you)</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">COVID-19 Safety</h2>
          <ul className="list-disc ml-6 space-y-2 text-zinc-300">
            <li>Follow current CDC and New Mexico health guidelines</li>
            <li>Masks may be required for certain indoor venues</li>
            <li>Maintain respectful distances when requested</li>
            <li>Stay home if you feel unwell</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Insurance Recommendation</h2>
          <p className="text-zinc-300">
            We strongly recommend travel insurance that covers adventure activities. 
            Check that your policy includes coverage for the specific activities you will 
            be participating in.
          </p>
        </section>
      </div>
    </div>
  )
}