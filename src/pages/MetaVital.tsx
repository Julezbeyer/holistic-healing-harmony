import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { ArrowLeft, CheckCheck, Wand2, Brain, Target, Leaf, HeartPulse, Info, Plus, Minus, History, Zap, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MetaVital() {
  // Beim Zurücknavigieren zur Hauptseite zum Feature-Bereich scrollen
  const handleBackNavigation = () => {
    // Erstellt eine URL mit einem Hash-Fragment, das zum Features-Bereich führt
    return {
      pathname: "/",
      hash: "#features-section"
    };
  };

  return (
    <Layout>
      <div className="relative pt-16 pb-24 overflow-hidden">
        {/* Hero-Bereich */}
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Link to={handleBackNavigation()} className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Startseite
            </Link>
          </div>
          
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-primary/10 text-primary mb-4">
              Modernste Frequenztechnologie
            </span>
            <h1 className="heading-lg mb-6">Meta Vital Frequenztherapie</h1>
            <p className="subtitle mx-auto max-w-3xl">
              Entdecke die revolutionäre Methode zur ganzheitlichen Analyse und harmonischen Balance deines Körpers
            </p>
          </div>
        </div>

        {/* Hauptinhalt */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Linke Spalte */}
            <div>
              <div className="bg-white rounded-xl p-8 shadow-card mb-8">
                <h2 className="heading-md mb-6">Tiefgehende Analyse</h2>
                <p className="text-pretty mb-6">
                  Über sanfte, nicht-invasive Messungen erfasst Meta Vital die individuellen Schwingungen deines 
                  Körpers und vergleicht sie mit einem umfangreichen Referenzspektrum. So lassen sich Abweichungen 
                  und Disharmonien gezielt lokalisieren. Die gewonnenen Daten ermöglichen eine tiefgehende Analyse, 
                  die wertvolle Einblicke in deine aktuelle Gesundheitslage gibt.
                </p>
                
                <h3 className="text-xl font-medium mt-8 mb-4">So funktioniert Meta Vital:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-christiane-medium-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span>Schmerzfreie & nicht-invasive Diagnostik und Behandlung</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-christiane-medium-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ganzheitliche Analyse auf physischer, mentaler und energetischer Ebene</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-christiane-medium-blue mr-2 mt-0.5 flex-shrink-0" />
                    <span>Erkennung feinster Ungleichgewichte vor Symptombildung</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Rechte Spalte */}
            <div>
              <div className="bg-christiane-soft-blue/20 rounded-xl p-8 shadow-card mb-8">
                <h2 className="heading-md mb-6">Aktivierung der Selbstheilungskräfte</h2>
                <p className="text-pretty mb-6">
                  Basierend auf diesen Erkenntnissen können individuelle Maßnahmen entwickelt werden, um den Körper 
                  in seiner natürlichen Regeneration zu unterstützen. Ziel ist es, die Selbstheilungskräfte zu aktivieren, 
                  Blockaden zu lösen und dein inneres Gleichgewicht wiederherzustellen – für mehr Energie, Vitalität und 
                  ganzheitliches Wohlbefinden.
                </p>

                <div className="bg-white rounded-lg p-6 mt-8">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-christiane-soft-blue mr-4">
                      <Wand2 className="h-5 w-5 text-christiane-medium-blue" />
                    </div>
                    <h3 className="font-medium">Individuell abgestimmte Frequenzen</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Die Meta Vital Technologie ermöglicht es, harmonisierende Frequenzen exakt auf deine persönlichen 
                    Bedürfnisse abzustimmen und gezielt anzuwenden.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Wissenschaftlicher Hintergrund */}
          <div className="bg-christiane-soft-purple/10 rounded-xl p-8 md:p-12 mb-20">
            <div className="text-center mb-10">
              <h2 className="heading-md">Wissenschaftlicher Hintergrund</h2>
              <p className="subtitle max-w-3xl mx-auto mt-4">
                Meta Vital basiert auf fundierten wissenschaftlichen Erkenntnissen aus den Bereichen Quantenphysik, 
                Biophysik und Informationsmedizin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Zap className="h-10 w-10 text-christiane-medium-blue mb-4" />
                <h3 className="text-lg font-medium mb-2">Zelluläre Kommunikation</h3>
                <p className="text-sm text-muted-foreground">
                  Jede unserer Zellen kommuniziert über elektromagnetische Schwingungen. Diese Schwingungsmuster 
                  können durch äußere Einflüsse gestört werden und zu energetischen Blockaden führen.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <BarChart3 className="h-10 w-10 text-christiane-medium-blue mb-4" />
                <h3 className="text-lg font-medium mb-2">Frequenzmuster</h3>
                <p className="text-sm text-muted-foreground">
                  Meta Vital analysiert die individuellen Frequenzmuster des Körpers und vergleicht sie mit gesunden 
                  Referenzmustern. Abweichungen werden erkannt und können gezielt harmonisiert werden.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Brain className="h-10 w-10 text-christiane-medium-blue mb-4" />
                <h3 className="text-lg font-medium mb-2">Biofeedback</h3>
                <p className="text-sm text-muted-foreground">
                  Durch ein ausgeklügeltes Biofeedback-Verfahren reagiert der Körper auf die eingesetzten 
                  Frequenzen und gibt Informationen über Disharmonien und Blockaden preis.
                </p>
              </div>
            </div>
          </div>

          {/* Anwendungsbereiche und Prozess */}
          <Tabs defaultValue="anwendungsgebiete" className="mb-20">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="anwendungsgebiete">Anwendungsgebiete</TabsTrigger>
              <TabsTrigger value="ablauf">Behandlungsablauf</TabsTrigger>
            </TabsList>

            <TabsContent value="anwendungsgebiete">
              <div className="bg-white rounded-xl p-8 shadow-card">
                <h3 className="heading-sm mb-8">Meta Vital kann bei folgenden Bereichen unterstützend wirken:</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <HeartPulse className="h-5 w-5 text-christiane-medium-blue mr-2" />
                      <h4 className="font-medium">Chronische Beschwerden</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Langanhaltende gesundheitliche Probleme, die auf energetische Blockaden zurückzuführen sein können.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Brain className="h-5 w-5 text-christiane-medium-blue mr-2" />
                      <h4 className="font-medium">Stress & Burn-out</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Unterstützung bei der Regeneration des Nervensystems und Stärkung der Resilienz.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Leaf className="h-5 w-5 text-christiane-medium-blue mr-2" />
                      <h4 className="font-medium">Energiemangel</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Aktivierung der Energiezentren und Wiederherstellung eines harmonischen Energieflusses.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Target className="h-5 w-5 text-christiane-medium-blue mr-2" />
                      <h4 className="font-medium">Immunsystem</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Unterstützung der körpereigenen Abwehrkräfte und Harmonisierung der Immunreaktionen.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <History className="h-5 w-5 text-christiane-medium-blue mr-2" />
                      <h4 className="font-medium">Erholung & Regeneration</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Beschleunigung der natürlichen Erholungsprozesse und Unterstützung der Regenerationsfähigkeit.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Info className="h-5 w-5 text-christiane-medium-blue mr-2" />
                      <h4 className="font-medium">Unklare Symptome</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Analyse von Beschwerden ohne eindeutige schulmedizinische Diagnose auf energetischer Ebene.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ablauf">
              <div className="bg-white rounded-xl p-8 shadow-card">
                <h3 className="heading-sm mb-8">Der Ablauf einer Meta Vital Behandlung:</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-christiane-soft-blue text-christiane-medium-blue font-semibold mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Ausführliches Erstgespräch</h4>
                      <p className="text-muted-foreground">
                        Wir beginnen mit einer umfassenden Anamnese, um deine aktuelle Situation, Beschwerden und Ziele 
                        genau zu erfassen. Dabei berücksichtige ich sowohl körperliche als auch emotionale Aspekte.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-christiane-soft-blue text-christiane-medium-blue font-semibold mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Ganzheitliche Analyse mit Meta Vital</h4>
                      <p className="text-muted-foreground">
                        Durch sanfte, schmerzfreie Messungen erstellt das System ein umfassendes Bild deines energetischen 
                        Zustands. Blockaden und Disharmonien werden sichtbar gemacht und können gezielt adressiert werden.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-christiane-soft-blue text-christiane-medium-blue font-semibold mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Individuelles Behandlungskonzept</h4>
                      <p className="text-muted-foreground">
                        Basierend auf den Analyseergebnissen entwickle ich ein maßgeschneidertes Therapiekonzept, 
                        das auf deine spezifischen Bedürfnisse abgestimmt ist und verschiedene Therapieansätze integriert.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-christiane-soft-blue text-christiane-medium-blue font-semibold mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Frequenztherapie und Harmonisierung</h4>
                      <p className="text-muted-foreground">
                        Die eigentliche Behandlung erfolgt durch gezielte Frequenztherapie, die den Körper dabei unterstützt, 
                        sein natürliches Gleichgewicht wiederzufinden. Dies geschieht völlig schmerzfrei und nicht-invasiv.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-christiane-soft-blue text-christiane-medium-blue font-semibold mr-4 flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Nachbesprechung und Empfehlungen</h4>
                      <p className="text-muted-foreground">
                        Im Anschluss besprechen wir die Ergebnisse und ich gebe dir konkrete Empfehlungen für deinen Alltag, 
                        um die Wirkung der Behandlung zu unterstützen und nachhaltige Veränderungen zu fördern.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Erfahrungsberichte */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="heading-md">Erfahrungsberichte</h2>
              <p className="subtitle max-w-3xl mx-auto mt-4">
                Was Klienten über ihre Erfahrungen mit Meta Vital berichten
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <p className="italic mb-4">
                    "Nach Jahren mit diffusen Beschwerden konnte mir Meta Vital endlich helfen. Bereits nach der 
                    ersten Sitzung spürte ich eine deutliche Verbesserung meiner Energie. Frau Beyer hat mir nicht 
                    nur mit der Frequenztherapie geholfen, sondern mir auch wertvolle Tipps für meinen Alltag gegeben."
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Sabine K.</p>
                    <p className="text-sm text-muted-foreground">Klientin seit 2021</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <p className="italic mb-4">
                    "Als Leistungssportler bin ich auf meinen Körper angewiesen. Die Meta Vital Analyse hat mir 
                    geholfen, Schwachstellen zu identifizieren und gezielt zu behandeln. Meine Regenerationszeit 
                    hat sich deutlich verkürzt und ich fühle mich insgesamt leistungsfähiger."
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Markus T.</p>
                    <p className="text-sm text-muted-foreground">Klient seit 2022</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <p className="italic mb-4">
                    "Durch die Kombination aus Meta Vital und psychotherapeutischer Begleitung konnte ich meine 
                    chronischen Kopfschmerzen endlich in den Griff bekommen. Christiane Beyer hat mir gezeigt, wie eng 
                    körperliche und seelische Prozesse miteinander verbunden sind."
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Elisabeth M.</p>
                    <p className="text-sm text-muted-foreground">Klientin seit 2020</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Häufig gestellte Fragen */}
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-card mb-20">
            <h2 className="heading-md text-center mb-10">Häufig gestellte Fragen</h2>

            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Ist Meta Vital wissenschaftlich anerkannt?
                </AccordionTrigger>
                <AccordionContent>
                  Meta Vital ist ein zertifiziertes Medizinprodukt und basiert auf wissenschaftlichen Erkenntnissen 
                  der Biophysik und Quantenphysik. Es wird in vielen Praxen als komplementäres Verfahren eingesetzt. 
                  Die Wirksamkeit frequenzbasierter Therapien wird durch zahlreiche Studien gestützt, wenn auch noch 
                  nicht alle Wirkungsmechanismen vollständig erforscht sind.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Welche Beschwerden können mit Meta Vital behandelt werden?
                </AccordionTrigger>
                <AccordionContent>
                  Meta Vital kann bei vielen funktionellen Störungen und chronischen Beschwerden unterstützend wirken. 
                  Dies umfasst unter anderem Stress, Erschöpfungszustände, Schlafstörungen, diffuse Schmerzen, 
                  Verdauungsprobleme und energetische Blockaden. Es eignet sich besonders für Beschwerdebilder, bei 
                  denen konventionelle Behandlungen allein nicht ausreichend Linderung bringen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Wie viele Sitzungen sind in der Regel notwendig?
                </AccordionTrigger>
                <AccordionContent>
                  Die Anzahl der benötigten Sitzungen ist individuell sehr unterschiedlich und hängt von der Art 
                  und Dauer der Beschwerden ab. Bei akuten Zuständen können oft schon 1-3 Sitzungen deutliche 
                  Verbesserungen bringen. Bei chronischen Beschwerden empfehle ich meist 5-10 Sitzungen, um nachhaltige 
                  Ergebnisse zu erzielen. Nach der Erstanalyse kann ich eine genauere Einschätzung geben.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Ersetzt Meta Vital eine schulmedizinische Behandlung?
                </AccordionTrigger>
                <AccordionContent>
                  Nein, Meta Vital ist eine komplementäre Methode und ersetzt nicht die schulmedizinische Diagnostik 
                  und Behandlung. Es kann jedoch sinnvoll ergänzend eingesetzt werden, um die Selbstheilungskräfte 
                  zu aktivieren und das Wohlbefinden zu steigern. Ich lege Wert auf eine gute Zusammenarbeit mit Ärzten 
                  und anderen Therapeuten, um für dich das bestmögliche Gesamtkonzept zu entwickeln.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Ist die Behandlung mit Meta Vital schmerzhaft?
                </AccordionTrigger>
                <AccordionContent>
                  Nein, die Behandlung mit Meta Vital ist völlig schmerzfrei und nicht-invasiv. Die Analyse und 
                  Therapie erfolgt über spezielle Sensoren, die sanft am Körper platziert werden. Viele Klienten 
                  empfinden die Behandlung als sehr angenehm und entspannend.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* CTA-Bereich */}
          <div className="mt-16 text-center bg-christiane-soft-cream/40 rounded-xl p-8 md:p-12">
            <h2 className="heading-md mb-6">Erlebe Meta Vital selbst</h2>
            <p className="subtitle mx-auto max-w-2xl mb-8">
              Möchtest du herausfinden, wie Meta Vital deine Gesundheit und dein Wohlbefinden verbessern kann? 
              Vereinbare jetzt einen persönlichen Beratungstermin für deine individuelle Analyse.
            </p>
            <Button size="lg" asChild>
              <Link to="/booking">Termin vereinbaren</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
