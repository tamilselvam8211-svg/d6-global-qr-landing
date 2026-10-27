import BrandMark from "./BrandMark";
import { company, enquiryMailto } from "../data/content";

const SiteHeader = () => (
  <header className="site-header">
    <div className="shell site-header__inner">
      <a className="site-header__brand" href={company.website} aria-label={`${company.name} — main website`}>
        <BrandMark size={40} />
        <span className="site-header__name">{company.name}</span>
      </a>
      <nav className="site-header__nav" aria-label="Page sections">
        <a href="#capabilities">Capabilities</a>
        <a href="#aurawork">AuraWork</a>
        <a className="site-header__contact" href={enquiryMailto}>
          Contact
        </a>
      </nav>
    </div>
  </header>
);

export default SiteHeader;
