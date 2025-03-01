
import { Brain, CheckCheck, Flower, HeartPulse, Stethoscope, Therapy } from 'lucide-react';
import TestimonialCard from '../ui/TestimonialCard';

export default function TherapyApproaches() {
  return (
    <section id="therapy" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-christiane-soft-purple/50 text-foreground mb-4">
            Meta Vital & Ganzheitliche Therapie
          </span>
          <h2 className="heading-lg mb-6">Meine Therapieansätze</h2>
          <p className="subtitle mx-auto">
            Die Verbindung von wissenschaftlich fundierter Frequenztherapie mit traditionellen 
            Heilmethoden schafft ein einzigartiges Spektrum an Behandlungsmöglichkeiten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-christiane-soft-blue/20 rounded-xl p-8 md:p-10">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white mb-6">
              <Stethoscope className="h-7 w-7 text-christiane-medium-blue" />
            </div>
            <h3 className="text-2xl font-medium mb-4">Meta Vital Frequenztherapie</h3>
            <p className="text-pretty mb-6">
              Als verifiziertes Medizinprodukt ermöglicht Meta Vital eine präzise Resonanzanalyse, 
              um energetische Ungleichgewichte im Körper frühzeitig zu erkennen. Durch gezielte 
              Frequenztherapie können Regenerationsprozesse aktiviert und das körpereigene 
              Regulationssystem unterstützt werden.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCheck className="h-5 w-5 text-christiane-medium-blue mr-2 mt-0.5 flex-shrink-0" />
                <span>Schmerzfreie & nicht-invasive Behandlung</span>
              </li>
              <li className="flex items-start">
                <CheckCheck className="h-5 w-5 text-christiane-medium-blue mr-2 mt-0.5 flex-shrink-0" />
                <span>Erkennung von Belastungen auf zellulärer Ebene</span>
              </li>
              <li className="flex items-start">
                <CheckCheck className="h-5 w-5 text-christiane-medium-blue mr-2 mt-0.5 flex-shrink-0" />
                <span>Unterstützung natürlicher Heilungsprozesse</span>
              </li>
            </ul>
          </div>

          <div className="bg-christiane-soft-green/40 rounded-xl p-8 md:p-10">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white mb-6">
              <Therapy className="h-7 w-7 text-christiane-medium-blue" />
            </div>
            <h3 className="text-2xl font-medium mb-4">Ganzheitliche Therapie</h3>
            <p className="text-pretty mb-6">
              Als Heilpraktikerin für Psychotherapie (HPP) lege ich besonderen Wert auf die 
              seelischen Hintergründe von Beschwerden. Oftmals sind es unbewusste Stressoren, 
              Traumata oder emotionale Muster, die zu Krankheitssymptomen führen können.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCheck className="h-5 w-5 text-christiane-medium-blue mr-2 mt-0.5 flex-shrink-0" />
                <span>Integration von Schulmedizin und alternativen Methoden</span>
              </li>
              <li className="flex items-start">
                <CheckCheck className="h-5 w-5 text-christiane-medium-blue mr-2 mt-0.5 flex-shrink-0" />
                <span>Auflösung emotionaler Blockaden</span>
              </li>
              <li className="flex items-start">
                <CheckCheck className="h-5 w-5 text-christiane-medium-blue mr-2 mt-0.5 flex-shrink-0" />
                <span>Individuelle psychologische Begleitung</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-christiane-soft-cream/50 rounded-xl p-8 md:p-12 mb-20">
          <h3 className="heading-md mb-8 text-center">Ideal für Menschen mit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <Flower className="h-8 w-8 text-christiane-medium-blue mx-auto mb-4" />
              <h4 className="font-medium mb-1">Chronische Beschwerden</h4>
              <p className="text-sm text-muted-foreground">Langanhaltende oder wiederkehrende gesundheitliche Probleme</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <Stethoscope className="h-8 w-8 text-christiane-medium-blue mx-auto mb-4" />
              <h4 className="font-medium mb-1">Unklare Symptome</h4>
              <p className="text-sm text-muted-foreground">Beschwerden ohne eindeutige medizinische Diagnose</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <Brain className="h-8 w-8 text-christiane-medium-blue mx-auto mb-4" />
              <h4 className="font-medium mb-1">Stress & Erschöpfung</h4>
              <p className="text-sm text-muted-foreground">Burn-out-Symptome und stressbedingte Erkrankungen</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <HeartPulse className="h-8 w-8 text-christiane-medium-blue mx-auto mb-4" />
              <h4 className="font-medium mb-1">Emotionale Blockaden</h4>
              <p className="text-sm text-muted-foreground">Psychosomatische Beschwerden mit emotionalem Ursprung</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="heading-md mb-6">Erfahrungen meiner Klienten</h3>
          <p className="subtitle mx-auto">
            Erleben Sie, wie mein ganzheitlicher Ansatz das Leben anderer Menschen positiv verändert hat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Nach jahrelangen Rückenschmerzen habe ich durch die Frequenztherapie endlich Linderung gefunden. Frau Beyer hat nicht nur meine körperlichen Symptome behandelt, sondern auch die emotionalen Ursachen aufgedeckt."
            author="Maria S."
            role="Klientin seit 2021"
          />
          <TestimonialCard 
            quote="Die Kombination aus Meta Vital und psychologischer Betreuung hat mir geholfen, meinen Burn-out zu überwinden. Ich fühle mich energetisch wieder im Gleichgewicht und habe gelernt, besser mit Stress umzugehen."
            author="Thomas K."
            role="Klient seit 2022"
          />
          <TestimonialCard 
            quote="Frau Beyers einfühlsame Art und ihr ganzheitlicher Ansatz haben mir geholfen, meine chronischen Verdauungsbeschwerden zu verstehen und zu lindern. Endlich fühle ich mich wieder wohl in meinem Körper."
            author="Julia M."
            role="Klientin seit 2020"
          />
        </div>
      </div>
    </section>
  );
}
