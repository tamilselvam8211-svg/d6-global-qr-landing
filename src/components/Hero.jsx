import Icon from "./Icon";
import { hero, enquiryMailto } from "../data/content";

const Hero = () => (
  <section className="hero" aria-labelledby="hero-title">
    {/* architectural line work: a fine measured grid and two long rules */}
    <svg className="hero__lines" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0H0V80" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="1200" height="640" fill="url(#hero-grid)" opacity="0.5" />
      <path d="M0 512H1200" stroke="currentColor" strokeWidth="0.75" opacity="0.9" />
      <path d="M880 0V640" stroke="currentColor" strokeWidth="0.75" opacity="0.9" />
      <circle cx="880" cy="512" r="3" fill="currentColor" />
    </svg>

    <div className="shell hero__inner">
      <p className="eyebrow eyebrow--on-dark reveal">{hero.eyebrow}</p>
      <h1 id="hero-title" className="hero__title reveal">
        {hero.headline.map((line, i) => (
          <span key={line} className={i === hero.headline.length - 1 ? "hero__accent" : undefined}>
            {line}
          </span>
        ))}
      </h1>
      <p className="hero__body reveal">{hero.body}</p>
      <div className="hero__actions reveal">
        <a className="button button--primary" href="#capabilities">
          {hero.primaryCta}
          <Icon name="arrowDown" size={18} />
        </a>
        <a className="button button--ghost" href={enquiryMailto}>
          <Icon name="mail" size={18} />
          {hero.secondaryCta}
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
