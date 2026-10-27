import BrandMark from "./BrandMark";
import Icon from "./Icon";
import { company, ecosystem } from "../data/content";

const divisionMailto = (title) =>
  `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${title} — D6 Global Services`)}`;

// Company node -> trunk -> rail -> three division branches. The connector
// lines are drawn with CSS in the gutters around the panels, so they never
// cross any text. Desktop: horizontal tree. Mobile: vertical spine.
const ServiceEcosystem = () => (
  <section id="capabilities" className="ecosystem" aria-labelledby="ecosystem-title">
    <div className="shell">
      <header className="section-head reveal">
        <p className="eyebrow">{ecosystem.eyebrow}</p>
        <h2 id="ecosystem-title" className="section-title">
          {ecosystem.title}
        </h2>
      </header>

      <div className="tree">
        <div className="tree__root reveal">
          <BrandMark size={48} />
          <div>
            <p className="tree__root-name">{ecosystem.root.name}</p>
            <p className="tree__root-caption">{ecosystem.root.caption}</p>
          </div>
        </div>

        <ol className="tree__branches" aria-label="Divisions">
          {ecosystem.divisions.map((d, i) => (
            <li key={d.id} className="division reveal" style={{ "--reveal-delay": `${i * 90}ms` }}>
              <article aria-labelledby={`div-${d.id}`}>
                <div className="division__head">
                  <span className="division__icon">
                    <Icon name={d.icon} size={22} />
                  </span>
                  <span className="division__index">0{i + 1}</span>
                </div>
                <h3 id={`div-${d.id}`} className="division__title">
                  {d.title}
                </h3>
                <p className="division__desc">{d.description}</p>
                <ul className="division__services">
                  {d.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <a className="division__link" href={divisionMailto(d.title)}>
                  Enquire now<span className="visually-hidden"> about {d.title}</span>
                  <Icon name="arrowRight" size={16} />
                </a>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default ServiceEcosystem;
