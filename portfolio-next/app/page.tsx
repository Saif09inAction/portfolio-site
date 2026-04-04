import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";

const SectionDeveloper = dynamic(() =>
  import("@/components/SectionDeveloper").then((m) => ({ default: m.SectionDeveloper }))
);
const SectionEditor = dynamic(() =>
  import("@/components/SectionEditor").then((m) => ({ default: m.SectionEditor }))
);
const IdeasSection = dynamic(() =>
  import("@/components/IdeasSection").then((m) => ({ default: m.IdeasSection }))
);
const AboutSection = dynamic(() =>
  import("@/components/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const SkillsSection = dynamic(() =>
  import("@/components/SkillsSection").then((m) => ({ default: m.SkillsSection }))
);
const TimelineSection = dynamic(() =>
  import("@/components/TimelineSection").then((m) => ({ default: m.TimelineSection }))
);
const ContactSection = dynamic(() =>
  import("@/components/ContactSection").then((m) => ({ default: m.ContactSection }))
);
const Footer = dynamic(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionDeveloper />
      <SectionEditor />
      <IdeasSection />
      <AboutSection />
      <SkillsSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
