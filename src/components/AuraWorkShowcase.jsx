import Icon from "./Icon";
import { aurawork } from "../data/content";

// Showcase + external link only. No screenshot or feature list is shown:
// none is available in the repository, and nothing unverified is claimed.
// The visual panel is abstract line work, not a mock product UI.
const AuraWorkShowcase = () => (
  <section id="aurawork" className="product" aria-labelledby="aurawork-title">
    <div className="shell product__inner">
      <div className="product__copy reveal">
        <p className="eyebrow eyebrow--on-dark">{aurawork.eyebrow}</p>
        <h2 id="aurawork-title" className="section-title section-title--on-dark">
          {aurawork.title}
        </h2>
        <p className="product__body">{aurawork.body}</p>
        <a className="button button--primary" href={aurawork.url} target="_blank" rel="noopener noreferrer">
          {aurawork.cta}
          <Icon name="external" size={18} />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </div>

      <a
        className="product__panel reveal"
        href={aurawork.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`AuraWork — ${aurawork.urlLabel} (opens in a new tab)`}
      >
        <svg className="product__lines" viewBox="0 0 480 320" aria-hidden="true" focusable="false">
          <path d="M40 260H440" />
          <path d="M40 200H440" opacity="0.45" />
          <path d="M40 140H440" opacity="0.3" />
          <path d="M120 60V280" opacity="0.3" />
          <path d="M240 60V280" opacity="0.45" />
          <path d="M360 60V280" opacity="0.3" />
          <path className="product__curve" d="M40 236C120 236 150 176 240 170S376 104 440 92" />
          <circle cx="240" cy="170" r="4" />
          <circle cx="440" cy="92" r="4" />
        </svg>
        <span className="product__wordmark">AuraWork</span>
        <span className="product__caption">Workforce management platform</span>
        <span className="product__url">
          {aurawork.urlLabel}
          <Icon name="external" size={15} />
        </span>
      </a>
    </div>
  </section>
);

export default AuraWorkShowcase;
