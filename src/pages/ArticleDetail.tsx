import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";

// Diese Daten würden normalerweise aus einer Datenbank oder einem CMS kommen
// Die erweiterte Artikelliste mit allen neuen Einträgen
const articles = [
  {
    id: "frequenztherapie-grundlagen",
    title: "Die Grundlagen der Frequenztherapie",
    excerpt: "Eine Einführung in die Wissenschaft hinter der Frequenztherapie und wie sie auf zellulärer Ebene wirkt.",
    category: "Frequenztechnologie",
    image: "/images/blog/frequency-therapy.jpg",
    date: "15.09.2023",
    content: `
      <h2>Die Wissenschaft der Frequenztherapie</h2>
      <p>Jede Zelle in unserem Körper hat eine eigene Schwingungsfrequenz. In einem gesunden Zustand schwingen diese Zellen in ihrer optimalen Frequenz. Krankheiten, Stress und andere negative Einflüsse können diese Schwingungen aus dem Gleichgewicht bringen.</p>
      <p>Die Frequenztherapie nutzt spezifische Frequenzen, um die natürlichen Schwingungsmuster des Körpers wiederherzustellen. Diese Methode basiert auf dem Prinzip der Resonanz, wonach Objekte mit gleicher natürlicher Schwingungsfrequenz miteinander interagieren können.</p>
      
      <h3>Historische Entwicklung</h3>
      <p>Die Ursprünge der Frequenztherapie reichen bis ins frühe 20. Jahrhundert zurück, als Forscher wie Royal Raymond Rife und Georges Lakhovsky mit Frequenzen experimentierten und ihre Auswirkungen auf Mikroorganismen und menschliches Gewebe untersuchten.</p>
      
      <h3>Moderne Forschung</h3>
      <p>Aktuelle wissenschaftliche Studien zeigen, dass bestimmte Frequenzen verschiedene biologische Wirkungen haben können, darunter Schmerzlinderung, verbesserte Zellregeneration und Unterstützung des Immunsystems. Die Forschung auf diesem Gebiet entwickelt sich ständig weiter.</p>
    `
  },
  {
    id: "ganzheitliche-gesundheit",
    title: "Ganzheitliche Gesundheit: Mehr als die Abwesenheit von Krankheit",
    excerpt: "Warum ein ganzheitlicher Ansatz für nachhaltige Gesundheit und Wohlbefinden essentiell ist.",
    category: "Ganzheitsmedizin",
    image: "/images/blog/holistic-health.jpg",
    date: "28.10.2023",
    content: `
      <h2>Der ganzheitliche Gesundheitsansatz</h2>
      <p>Gesundheit ist mehr als nur die Abwesenheit von Krankheit. Ein ganzheitlicher Ansatz berücksichtigt physische, emotionale, mentale, spirituelle und soziale Aspekte des Wohlbefindens. Diese Komponenten sind untrennbar miteinander verbunden und beeinflussen sich gegenseitig.</p>
      
      <h3>Körper, Geist und Seele</h3>
      <p>Die traditionelle Medizin konzentriert sich oft auf die Behandlung einzelner Symptome. Die ganzheitliche Medizin betrachtet dagegen den Menschen als Einheit und sucht nach den zugrunde liegenden Ursachen für gesundheitliche Probleme.</p>
      
      <h3>Prävention statt Reaktion</h3>
      <p>Ein Schlüsselaspekt ganzheitlicher Gesundheit ist die Prävention. Durch bewusste Ernährung, regelmäßige Bewegung, Stressmanagement und emotionales Wohlbefinden können viele gesundheitliche Probleme vermieden werden, bevor sie entstehen.</p>
    `
  },
  {
    id: "bioresonanz-mythen",
    title: "Mythen und Fakten der Bioresonanztherapie",
    excerpt: "Eine evidenzbasierte Betrachtung der Bioresonanztherapie und ihrer Wirksamkeit bei verschiedenen Gesundheitszuständen.",
    category: "Frequenztechnologie",
    image: "/images/blog/bioresonance.jpg",
    date: "07.11.2023",
    content: `
      <h2>Bioresonanz: Zwischen Wissenschaft und Skepsis</h2>
      <p>Die Bioresonanztherapie ist ein Verfahren, das kontrovers diskutiert wird. Befürworter berichten von beeindruckenden Ergebnissen bei verschiedenen Beschwerden, während Kritiker auf den Mangel an groß angelegten klinischen Studien hinweisen.</p>
      
      <h3>Wie funktioniert Bioresonanz?</h3>
      <p>Bei der Bioresonanztherapie werden elektromagnetische Frequenzen des Körpers gemessen und analysiert. Anschließend werden harmonisierende Frequenzen zurück in den Körper geleitet, um gestörte Energiemuster auszugleichen.</p>
      
      <h3>Wissenschaftliche Erkenntnisse</h3>
      <p>Während die Mainstream-Medizin oft skeptisch ist, zeigen kleinere Studien vielversprechende Ergebnisse bei Allergien, chronischen Schmerzen und Stressfolgen. Die Forschung auf diesem Gebiet entwickelt sich stetig weiter.</p>
    `
  },
  // Neue Artikel mit Platzhalterbildern
  {
    id: "stress-und-energiefelder",
    title: "Stress und sein Einfluss auf unsere Energiefelder",
    excerpt: "Wie chronischer Stress unsere energetischen Strukturen beeinträchtigt und welche Frequenzbehandlungen helfen können.",
    category: "Stressmanagement",
    image: "/images/placeholder.jpg",
    date: "03.01.2024",
    content: `
      <h2>Die energetische Dimension von Stress</h2>
      <p>Chronischer Stress ist nicht nur ein psychologisches oder biochemisches Phänomen, sondern beeinflusst auch direkt unsere energetischen Strukturen. Im Zustand anhaltender Belastung verändern sich die Schwingungsmuster unserer Zellen und Gewebe, was zu einer Dysregulation der gesamten Energiefelder führen kann.</p>
      
      <h3>Messbare Veränderungen</h3>
      <p>Moderne biophysikalische Messverfahren können diese energetischen Veränderungen heute sichtbar machen. Bei chronisch gestressten Menschen zeigen sich oft charakteristische Muster gestörter Energiefelder, besonders in den Bereichen des Nervensystems und der endokrinen Drüsen.</p>
      
      <h3>Frequenztherapeutische Ansätze</h3>
      <p>Gezielte Frequenzanwendungen können dabei helfen, diese energetischen Disbalancen zu harmonisieren. Besonders bewährt haben sich hierbei Frequenzspektren, die beruhigend auf das autonome Nervensystem wirken und die Selbstregulationskräfte des Körpers aktivieren.</p>
      
      <h3>Integration in ein ganzheitliches Stressmanagement</h3>
      <p>Für nachhaltige Ergebnisse sollte die Frequenztherapie stets in ein umfassendes Stressmanagement-Konzept eingebettet sein, das auch Lebensstiländerungen und mentale Techniken umfasst.</p>
    `
  },
  {
    id: "zellulaere-kommunikation",
    title: "Die Wissenschaft der zellulären Kommunikation",
    excerpt: "Neueste Forschungsergebnisse zur Kommunikation zwischen Zellen und wie Frequenztherapie diesen Prozess unterstützen kann.",
    category: "Wissenschaft",
    image: "/images/placeholder.jpg",
    date: "17.02.2024",
    content: `
      <h2>Zelluläre Kommunikation und Gesundheit</h2>
      <p>Unsere Körperzellen kommunizieren ständig miteinander - über biochemische Botenstoffe, elektrische Signale und, wie neuere Forschungen zeigen, auch über elektromagnetische Frequenzmuster. Diese komplexe Kommunikation ist entscheidend für alle physiologischen Prozesse und für die Aufrechterhaltung unserer Gesundheit.</p>
      
      <h3>Biophotonen: Die Lichtsprache der Zellen</h3>
      <p>Seit den bahnbrechenden Arbeiten des Biophysikers Fritz-Albert Popp wissen wir, dass Zellen ultraschwache Lichtquanten (Biophotonen) aussenden. Diese Biophotonen scheinen eine wichtige Rolle bei der Informationsübertragung zwischen Zellen zu spielen und könnten einen Schlüssel zum Verständnis feinstofflicher Regulationssysteme darstellen.</p>
      
      <h3>Störungen der Zellkommunikation</h3>
      <p>Bei chronischen Erkrankungen und Stressbelastungen lassen sich häufig Störungen dieser interzellulären Kommunikation nachweisen. Diese können zu fehlerhaften Signalübertragungen führen und physiologische Prozesse beeinträchtigen.</p>
      
      <h3>Frequenztherapeutische Intervention</h3>
      <p>Durch gezielte Frequenzmuster kann die Zellkommunikation unterstützt und normalisiert werden. Bestimmte Frequenzspektren können dabei helfen, Störsignale zu neutralisieren und die natürlichen Kommunikationswege wiederherzustellen.</p>
    `
  },
  {
    id: "elektrosensitivitaet-verstehen",
    title: "Elektrosensitivität verstehen und behandeln",
    excerpt: "Ein tieferer Blick auf Elektrosensitivität, ihre Auswirkungen und mögliche therapeutische Ansätze mit Frequenzmedizin.",
    category: "Umweltmedizin",
    image: "/images/placeholder.jpg",
    date: "05.03.2024",
    content: `
      <h2>Das Phänomen Elektrosensitivität</h2>
      <p>Elektrosensitivität oder Elektromagnetische Hypersensitivität (EHS) bezeichnet eine erhöhte Empfindlichkeit gegenüber elektromagnetischen Feldern. Betroffene berichten von vielfältigen Symptomen wie Kopfschmerzen, Konzentrationsstörungen, Schlafproblemen und Erschöpfung bei Exposition gegenüber elektromagnetischer Strahlung.</p>
      
      <h3>Wissenschaftlicher Stand</h3>
      <p>Obwohl die konventionelle Medizin EHS oft als nicht objektivierbar betrachtet, häufen sich Forschungsergebnisse, die auf messbare physiologische Veränderungen bei exponierten sensiblen Personen hinweisen. Besonders im Bereich der Neurophysiologie und des oxidativen Stresses zeigen sich interessante Korrelationen.</p>
      
      <h3>Diagnose mit biophysikalischen Messverfahren</h3>
      <p>Moderne frequenzdiagnostische Verfahren können individuelle Reaktionen auf verschiedene Frequenzspektren erfassen und so Hinweise auf eine erhöhte Elektrosensitivität geben. Diese Messungen ermöglichen es, ein personalisiertes Behandlungskonzept zu entwickeln.</p>
      
      <h3>Therapieansätze mit Frequenzmedizin</h3>
      <p>Die Frequenztherapie bietet verschiedene Ansätze zur Unterstützung elektrosensibler Menschen. Zum einen können harmonisierende Frequenzen die Regulationsfähigkeit des Körpers stärken, zum anderen können spezifische Frequenzmuster als energetischer "Schutz" vor belastenden Umwelteinflüssen wirken.</p>
    `
  },
  {
    id: "quantenphysik-heilung",
    title: "Quantenphysik und ihre Bedeutung für Heilungsprozesse",
    excerpt: "Die Brücke zwischen moderner Quantenphysik und ganzheitlichen Heilungsansätzen in der Frequenzmedizin.",
    category: "Wissenschaft",
    image: "/images/placeholder.jpg",
    date: "20.03.2024",
    content: `
      <h2>Quantenphysikalische Grundlagen der Heilung</h2>
      <p>Die Quantenphysik hat unser mechanistisches Weltbild revolutioniert und eröffnet neue Perspektiven für das Verständnis von Gesundheit und Heilung. Konzepte wie Nichtlokalität, Verschränkung und Wellencharakter der Materie haben weitreichende Implikationen für die Medizin der Zukunft.</p>
      
      <h3>Der Beobachtereffekt in der Heilkunde</h3>
      <p>Ein zentrales Prinzip der Quantenphysik ist der Beobachtereffekt - die Tatsache, dass der Akt der Beobachtung das Beobachtete verändert. Übertragen auf Heilungsprozesse bedeutet dies, dass Intention und Aufmerksamkeit des Therapeuten wie auch des Patienten einen direkten Einfluss auf physiologische Prozesse haben können.</p>
      
      <h3>Informationsfelder und morphische Resonanz</h3>
      <p>Theorien zu Informationsfeldern und morphischer Resonanz, wie sie von Wissenschaftlern wie Rupert Sheldrake vorgestellt wurden, bieten Erklärungsmodelle für die nicht-stoffliche Informationsübertragung in biologischen Systemen. Diese Konzepte werden zunehmend zur Erklärung der Wirkungsweise von Frequenztherapie herangezogen.</p>
      
      <h3>Praktische Anwendungen in der Frequenzmedizin</h3>
      <p>Moderne frequenzmedizinische Geräte arbeiten bereits mit quantenphysikalisch basierten Technologien, die über die klassische Signalübertragung hinausgehen. Besonders im Bereich der Informationsübertragung und der nicht-lokalen Wirkung von Heilfrequenzen zeigen sich vielversprechende Forschungsergebnisse.</p>
    `
  },
  {
    id: "emotionen-koerper-verbindung",
    title: "Die Verbindung zwischen Emotionen und körperlicher Gesundheit",
    excerpt: "Wie emotionale Muster sich in unseren Körperzellen speichern und wie Frequenztherapie bei der Transformation helfen kann.",
    category: "Ganzheitsmedizin",
    image: "/images/placeholder.jpg",
    date: "12.04.2024",
    content: `
      <h2>Emotionen als biochemische Realität</h2>
      <p>Jede emotionale Erfahrung geht mit spezifischen biochemischen Veränderungen in unserem Körper einher. Neuropeptide, Hormone und andere Botenstoffe transportieren die "Information" unserer Emotionen in jede einzelne Zelle. Bei chronischen emotionalen Mustern kann sich dies im Zellgedächtnis manifestieren.</p>
      
      <h3>Die zelluläre Erinnerung</h3>
      <p>Forschungen zur zellulären Erinnerung zeigen, dass nicht nur unser Gehirn, sondern der gesamte Körper Informationen und Erfahrungen speichert. Traumatische Erlebnisse können sich als spezifische energetische Blockaden oder Schwingungsmuster im Gewebe manifestieren.</p>
      
      <h3>Psychosomatische Zusammenhänge aus Frequenzsicht</h3>
      <p>Aus frequenzmedizinischer Perspektive lassen sich emotionale Muster als charakteristische Schwingungsmuster identifizieren. Diese können mit bestimmten Organsystemen oder Körperbereichen in Resonanz treten und dort physische Symptome hervorrufen oder verstärken.</p>
      
      <h3>Frequenzbasierte Transformation emotionaler Muster</h3>
      <p>Durch gezielte Frequenzanwendungen können belastende emotionale Muster erkannt und transformiert werden. Die Behandlung zielt darauf ab, festgefahrene energetische Strukturen wieder in Fluss zu bringen und die natürliche Selbstregulation auf allen Ebenen zu unterstützen.</p>
    `
  }
];

export default function ArticleDetail() {
  const { articleId } = useParams<{ articleId: string }>();
  const article = articles.find(article => article.id === articleId);
  
  if (!article) {
    return <Navigate to="/wissen" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to="/wissen" className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Übersicht
          </Link>
        </div>
        
        <article className="max-w-3xl mx-auto">
          {article.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-64 object-cover"
                onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
              />
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              {article.date}
            </div>
            <div className="flex items-center text-primary text-sm">
              <Tag className="mr-2 h-4 w-4" />
              {article.category}
            </div>
          </div>
          
          <h1 className="heading-lg mb-6">{article.title}</h1>
          
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
          
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-xl font-medium mb-4">Haben Sie Fragen zu diesem Thema?</h3>
            <p className="text-muted-foreground mb-6">
              Ich freue mich, Ihnen bei Ihren individuellen Gesundheitsfragen weiterzuhelfen und einen persönlichen Termin zu vereinbaren.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button>Kontakt aufnehmen</Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline">Termin vereinbaren</Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
}
