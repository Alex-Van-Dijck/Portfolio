import { ExternalLink } from "lucide-react";

interface Certificate {
  id: string;
  name: string;
  logo: string;
  href: string;
}

const CERTS: Certificate[] = [
  {
    id: "react",
    name: "Certified Senior React Developer",
    logo: "/certificate-logos/react.svg",
    href: "https://certificates.dev/c/a2355458-45d4-44f0-8dcd-864a4e414681",
  },
  {
    id: "angular",
    name: "Certified Mid-Level Angular Developer",
    logo: "/certificate-logos/angular.svg",
    href: "https://certificates.dev/angular/certificates/a2e00be0-7359-4f7f-b717-ae70f0afc6dc",
  },
  {
    id: "apollo",
    name: "Graph Developer - Associate",
    logo: "/certificate-logos/apollo.svg",
    href: "https://www.apollographql.com/tutorials/certifications/6c9264c1-e082-4a63-98d1-f22b69e16b75",
  },
  {
    id: "anthropic",
    name: "Building with the Claude API",
    logo: "/certificate-logos/anthropic.svg",
    href: "https://verify.skilljar.com/c/sta3idurtyzg",
  },
];

const Certificates = () => {
  return (
    <section
      id="certificates"
      className="py-20 md:py-28 px-8 md:px-16 lg:px-24 border-t border-border"
    >
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-mono text-xs text-muted-fg tracking-widest uppercase mb-12">
          Certificates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {CERTS.map((cert) => (
            <a
              key={cert.id}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col items-center justify-center p-6 md:p-8 rounded-lg border border-border bg-surface/50 hover:bg-surface hover:border-border/60 transition-all duration-300 group cursor-pointer"
            >
              <ExternalLink className="absolute top-3 right-3 h-3.5 w-3.5 text-muted-fg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={cert.logo}
                alt={cert.name}
                className={`h-16 md:h-20 w-auto mb-5 opacity-80 group-hover:opacity-100 transition-all duration-300 ${
                  cert.id === "anthropic" || cert.id === "apollo"
                    ? "cert-logo-recolor"
                    : ""
                }`}
              />
              <p className="font-mono text-xs md:text-sm text-center text-foreground tracking-wide leading-relaxed">
                [{cert.name}]
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Certificates;
