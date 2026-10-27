import { Fragment } from "react";
import Icon from "./Icon";
import { contact } from "../data/content";

// Long addresses may only wrap after a "." or "@" (never a leading "@", as
// in an Instagram handle), never mid-word.
const breakable = (text) =>
  text.split(/(?<=.[.@])/).map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </Fragment>
  ));

const Contact = () => (
  <section id="contact" className="contact" aria-labelledby="contact-title">
    <div className="shell">
      <header className="section-head reveal">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className="section-title">
          {contact.title}
        </h2>
        <p className="section-lead">{contact.body}</p>
      </header>

      <ul className="contact__list">
        {contact.links.map((l, i) => (
          <li key={l.id} className="reveal" style={{ "--reveal-delay": `${i * 60}ms` }}>
            <a
              className="contact__item"
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="contact__icon">
                <Icon name={l.kind} size={22} />
              </span>
              <span className="contact__text">
                <span className="contact__label">{l.label}</span>
                <span className="contact__value">{breakable(l.value)}</span>
              </span>
              <Icon name={l.external ? "external" : "arrowRight"} size={18} className="contact__arrow" />
              {l.external && <span className="visually-hidden"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Contact;
