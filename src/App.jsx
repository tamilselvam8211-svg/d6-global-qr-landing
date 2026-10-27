import { useEffect } from "react";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import ServiceEcosystem from "./components/ServiceEcosystem";
import AuraWorkShowcase from "./components/AuraWorkShowcase";
import Contact from "./components/Contact";
import SiteFooter from "./components/SiteFooter";

// Fades sections in once as they enter the viewport. Content is visible by
// default; the effect only applies when JS runs and motion is allowed.
const useReveal = () => {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return undefined;

    root.classList.add("can-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("can-reveal");
    };
  }, []);
};

const App = () => {
  useReveal();

  return (
    <>
      <a className="skip-link" href="#capabilities">
        Skip to capabilities
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <ServiceEcosystem />
        <AuraWorkShowcase />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
};

export default App;
