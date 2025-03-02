import { Brain, HeartPulse, Flower } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

export default function About() {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-white to-christiane-soft-blue/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary mb-4">
            Über uns
          </span>
          <h2 className="heading-lg mb-6">Christiane Beyer</h2>
          <div className="flex justify-center mb-8">
            <img 
              src="/christiane-beyer.jpg" 
              alt="Christiane Beyer - Heilpraktikerin" 
              className="w-64 h-auto rounded-full shadow-lg border-4 border-white"
            />
          </div>
          <p className="subtitle mx-auto">
            Als Heilpraktikerin für Psychotherapie (HPP) verbinde ich moderne Frequenztherapie mit
            ganzheitlichen Heilmethoden, um Menschen zu ihrem inneren Gleichgewicht zurückzuführen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={HeartPulse}
            title="Ganzheitliche Analyse"
            description="Mit Meta Vital, einem verifizierten Medizinprodukt, kann ich Ungleichgewichte im Körper frühzeitig erkennen und präzise behandeln."
          />
          <FeatureCard
            icon={Brain}
            title="Körper, Geist & Seele"
            description="Mein Ansatz berücksichtigt die psychologischen Hintergründe von Beschwerden, die oft zu körperlichen Symptomen führen können."
          />
          <FeatureCard
            icon={Flower}
            title="Integrativer Ansatz"
            description="Ich kombiniere das Beste aus Schulmedizin und alternativen Heilmethoden für eine umfassende Gesundheit und nachhaltige Vitalität."
          />
        </div>

        <div className="mt-20 bg-white rounded-xl p-8 md:p-12 shadow-card">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h3 className="heading-md mb-6">Meine Philosophie</h3>
              <p className="text-pretty mb-6">
                Ich glaube fest daran, dass wahre Heilung mehr als nur die Abwesenheit von Symptomen bedeutet. 
                Seit über 15 Jahren begleite ich Menschen auf ihrem Weg zu ganzheitlichem Wohlbefinden, indem ich 
                die Verbindung zwischen körperlichen Beschwerden und emotionalen Zuständen aufdecke.
              </p>
              <p className="text-pretty">
                Mein Ziel ist es, nicht nur akute Beschwerden zu lindern, sondern die Selbstheilungskräfte 
                meiner Klienten zu aktivieren und sie zu befähigen, ein Leben in Balance zu führen. 
                Durch die Kombination von Meta Vital Frequenztherapie mit psychotherapeutischen Ansätzen 
                schaffe ich individuelle Behandlungskonzepte, die auf die einzigartigen Bedürfnisse jedes 
                Menschen abgestimmt sind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}