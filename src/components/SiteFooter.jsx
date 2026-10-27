import BrandMark from "./BrandMark";
import { company } from "../data/content";

const SiteFooter = () => (
  <footer className="site-footer">
    <div className="shell site-footer__inner">
      <div className="site-footer__brand">
        <BrandMark size={34} />
        <div>
          <p className="site-footer__name">{company.name}</p>
          <p className="site-footer__tagline">{company.tagline}</p>
        </div>
      </div>
      <p className="site-footer__copy">
        &copy; {new Date().getFullYear()} {company.name}
      </p>
    </div>
  </footer>
);

export default SiteFooter;
