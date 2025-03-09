import { Brain, HeartPulse, Flower } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-white to-christiane-soft-blue/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary mb-4">
            Über Mich
          </span>
          <h2 className="heading-lg mb-6">Christiane Beyer</h2>
          <div className="flex justify-center mb-8">
            <img 
              src="/Christiane Beyer.jpg" 
              alt="Christiane Beyer - Heilpraktikerin" 
              className="w-64 h-auto rounded-full shadow-lg border-4 border-white"
            />
          </div>
          <p className="subtitle mx-auto">
            Als Heilpraktikerin für Psychotherapie (HPP) ist es meine Leidenschaft, Menschen auf ihrem Weg zu mehr 
            innerer Balance und Lebensqualität zu begleiten. Dabei schöpfe ich aus einem breiten Erfahrungsschatz 
            verschiedener Heilmethoden und kombiniere moderne Frequenztherapie mit bewährten ganzheitlichen Ansätzen.
            <br /><br />
            Mein Konzept basiert auf einer tiefgehenden Analyse aller Ebenen – körperlich, mental, seelisch und energetisch. 
            Denn wahres Wohlbefinden entsteht, wenn alle Aspekte des Seins in Einklang gebracht werden. Durch meine individuell 
            abgestimmten Methoden unterstütze ich dich dabei, Blockaden zu lösen, neue Energie zu gewinnen und dein volles 
            Potenzial zu entfalten.
            <br /><br />
            Lass uns gemeinsam deinen persönlichen Weg zu mehr Balance und Lebensqualität finden.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="features-section">
          <FeatureCard
            icon={HeartPulse}
            title="Ganzheitliche Analyse mit Meta Vital"
            description="Mit Meta Vital, einem verifizierten Medizinprodukt, wird dein Körper auf allen Ebenen – physisch, mental, seelisch und energetisch – präzise analysiert. Durch modernste Frequenztechnologie erkennt das System feinste Ungleichgewichte, noch bevor sie sich als spürbare Beschwerden äußern."
            action={
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/meta-vital">Mehr erfahren</Link>
              </Button>
            }
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