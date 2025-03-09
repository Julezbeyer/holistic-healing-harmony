import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Leaf, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

type PricingTierProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonLink: string;
};

const PricingTier = ({ title, price, description, features, popular, buttonText, buttonLink }: PricingTierProps) => {
  return (
    <Card className={`flex flex-col ${popular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {popular && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Empfohlen
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold tracking-tight">{price}</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to={buttonLink} className="w-full">
          <Button className="w-full">{buttonText}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default function Pricing() {
  const tiers = [
    {
      title: "Einzelsitzung",
      price: "120€",
      description: "Eine grundlegende Behandlung für Einsteiger",
      features: [
        "60 Minuten Behandlungszeit",
        "Ausführliches Erstgespräch",
        "Individuelle Frequenztherapie",
        "Therapieempfehlungen"
      ],
      buttonText: "Termin vereinbaren",
      buttonLink: "/booking"
    },
    {
      title: "Intensiv-Paket",
      price: "320€",
      description: "Für optimale Ergebnisse und nachhaltige Verbesserungen",
      features: [
        "3 Sitzungen à 60 Minuten",
        "Umfassende Erstanalyse",
        "Individuelle Frequenztherapie",
        "Persönlicher Therapieplan",
        "E-Mail-Support zwischen den Sitzungen"
      ],
      popular: true,
      buttonText: "Paket buchen",
      buttonLink: "/booking"
    },
    {
      title: "Premium-Betreuung",
      price: "560€",
      description: "Kontinuierliche Begleitung für komplexe Gesundheitsthemen",
      features: [
        "6 Sitzungen à 60 Minuten",
        "Detaillierte Gesundheitsanalyse",
        "Maßgeschneiderte Frequenzprogramme",
        "Persönlicher Gesundheitsplan",
        "Telefonische Beratung",
        "Therapiefortschritts-Monitoring"
      ],
      buttonText: "Kontakt aufnehmen",
      buttonLink: "/contact"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="heading-lg mb-4">Preise & Angebote</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Entdecken Sie meine maßgeschneiderten ganzheitlichen Behandlungspakete für Ihr Wohlbefinden. 
            Alle Angebote beinhalten eine persönliche Beratung und individuelle Therapieempfehlungen.
          </p>
        </div>
        
        {/* Neuer Abschnitt: Ganzheitlicher Ansatz */}
        <div className="bg-christiane-soft-blue/20 rounded-xl p-8 max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="rounded-full bg-primary/10 p-8 w-40 h-40 mx-auto flex items-center justify-center">
                <Sparkles className="h-20 w-20 text-primary" />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="heading-md mb-4">Der ganzheitliche Ansatz von Christiane Beyer</h2>
              <p className="mb-4">
                Was meine Therapie besonders macht, ist die einzigartige Integration von 
                <span className="font-semibold"> moderner Frequenztechnologie und psychotherapeutischem Fachwissen</span>. 
                Ich behandle nicht nur einzelne Symptome, sondern betrachte Sie als ganzheitliches Wesen aus Körper, 
                Geist und Seele.
              </p>
              <p>
                Mein Ziel ist es, mit Ihnen gemeinsam die Ursachen Ihrer Beschwerden zu identifizieren und 
                nachhaltige Veränderungen zu bewirken. Durch jahrelange Erfahrung weiß ich, dass echte Heilung 
                erst dann stattfinden kann, wenn alle Ebenen des Menschseins in Einklang gebracht werden.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-start">
              <div className="rounded-full bg-christiane-soft-purple p-2 mr-3">
                <Heart className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Persönliche Betreuung</h3>
                <p className="text-sm text-muted-foreground">Individuelle Begleitung mit voller Aufmerksamkeit für Ihre Bedürfnisse</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="rounded-full bg-christiane-soft-green p-2 mr-3">
                <Leaf className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Ganzheitliche Perspektive</h3>
                <p className="text-sm text-muted-foreground">Integration von körperlicher, emotionaler und energetischer Ebene</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="rounded-full bg-christiane-soft-cream p-2 mr-3">
                <Sparkles className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Nachhaltige Ergebnisse</h3>
                <p className="text-sm text-muted-foreground">Fokus auf langfristige Heilung statt kurzfristiger Symptomlinderung</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
        
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="heading-md mb-6">Zusätzliche Angebote</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
            <Card>
              <CardHeader>
                <CardTitle>Fernbehandlung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Ideal für Klienten, die nicht persönlich kommen können.</p>
                <p className="font-semibold">Ab 85€ pro Sitzung</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Vorträge & Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Für Gruppen und Unternehmen zu Themen der ganzheitlichen Gesundheit.</p>
                <p className="font-semibold">Preis auf Anfrage</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16">
            <p className="text-muted-foreground mb-6">
              Sie haben Fragen zu meinen Angeboten oder benötigen eine individuell angepasste Lösung? 
              Ich berate Sie gerne persönlich.
            </p>
            <Link to="/contact">
              <Button size="lg">Kontakt aufnehmen</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
