import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-[100vh] flex flex-col justify-center relative overflow-hidden">
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <video
          src="/attached_assets/istockphoto-1308208110-640_adpp_is.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/attached_assets/istockphoto-1308208110-640_adpp_is.mp4"
            type="video/mp4"
          />
          Ihr Browser unterstützt keine Video-Wiedergabe.
        </video>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[10%] right-[10%] w-60 h-60 bg-green-100 rounded-full blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-[15%] left-[5%] w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float animation-delay-2000" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <span className="inline-block text-sm font-medium py-1 px-3 rounded-full bg-amber-100 mb-6 text-gray-800">
          Ihr Weg zu neuer Lebensenergie
        </span>
        <h1 className="heading-xl mb-6 max-w-4xl text-gray-800 font-bold">
          Schluss mit Erschöpfung & Unwohlsein – Spüren Sie den Unterschied!
        </h1>
        <p className="subtitle mb-10 max-w-2xl text-gray-700">
          Entdecken Sie, was tausende Menschen bereits erlebt haben: Die revolutionäre Kombination aus 
          Meta Vital Frequenztherapie und ganzheitlicher Heilpraxis, die dort ansetzt, wo herkömmliche 
          Methoden oft an ihre Grenzen stoßen. <span className="font-semibold">Vereinbaren Sie jetzt Ihren persönlichen Kennenlerntermin!</span>
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="default"
            size="lg"
            className="text-base font-semibold px-6 py-6 hover:scale-105 transition-transform"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Jetzt kostenfreies Erstgespräch sichern!
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base hover:bg-primary/10 px-6 py-6"
            onClick={() =>
              document
                .getElementById("therapy")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Entdecken Sie Ihre Behandlungsmöglichkeiten
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-10"
        onClick={scrollToAbout}
      >
        <span className="text-sm mb-2 text-white font-medium">
          Mehr erfahren
        </span>
        <ArrowDown className="h-5 w-5 text-white animate-bounce" />
      </div>
    </div>
  );
}
