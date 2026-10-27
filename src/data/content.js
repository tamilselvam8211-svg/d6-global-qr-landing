// All page copy and links in one place. Everything here is supplied by
// D6 Global Services -- do not add registrations, certifications, clients,
// testimonials, awards, figures or product features that are not verified.

export const company = {
  name: "D6 Global Services",
  shortName: "D6 Global",
  tagline: "Business Solutions. Digital Innovation. Lasting Impact.",
  email: "d6globaluk@gmail.com",
  phone: "+447776635958",
  phoneDisplay: "+44 7776 635958",
  website: "https://www.d6globalmedia.com/",
  websiteLabel: "www.d6globalmedia.com",
};

export const enquiryMailto = `mailto:${company.email}?subject=${encodeURIComponent(
  "Business enquiry for D6 Global Services"
)}&body=${encodeURIComponent("Hello D6 Global team,\n\nI would like to discuss ")}`;

export const hero = {
  eyebrow: "D6 Global Services",
  // Rendered one sentence per line.
  headline: ["Business Solutions.", "Digital Innovation.", "Lasting Impact."],
  body:
    "D6 Global Services brings together digital growth, event management and business technology solutions to help organisations move forward.",
  primaryCta: "Explore Our Capabilities",
  secondaryCta: "Connect With Our Team",
};

export const ecosystem = {
  eyebrow: "Our capabilities",
  title: "One company. Three specialist divisions.",
  root: { name: "D6 GLOBAL SERVICES", caption: "Business Services & Technology Solutions" },
  divisions: [
    {
      id: "digital-marketing",
      icon: "signal",
      title: "Digital Marketing",
      description: "Strengthen your digital presence and connect with the right audience.",
      services: [
        "Social Media Marketing",
        "Search Engine Optimization",
        "Digital Advertising",
        "Website Design and Development",
        "Branding and Content Creation",
      ],
    },
    {
      id: "event-management",
      icon: "calendar",
      title: "Event Management",
      description: "Professional planning and coordination for business events and special occasions.",
      services: [
        "Corporate Events",
        "Weddings and Engagements",
        "Conferences",
        "Private Celebrations",
        "Event Planning and Coordination",
      ],
    },
    {
      id: "business-technology",
      icon: "layers",
      title: "Business & Technology Solutions",
      description: "Practical technology and operational support for businesses.",
      services: [
        "IT and Technology Solutions",
        "IT Operations",
        "Customer Support Services",
        "Logistics Support",
        "Commercial Support",
      ],
    },
  ],
};

export const aurawork = {
  eyebrow: "OUR DIGITAL PRODUCT",
  title: "Smarter Workforce Management with AuraWork",
  body:
    "Discover AuraWork, our workforce management platform designed to simplify employee administration and everyday HR workflows.",
  url: "https://aurawork.d6globalmedia.com/",
  urlLabel: "aurawork.d6globalmedia.com",
  cta: "Explore AuraWork",
};

export const contact = {
  title: "Let's Build Something Great Together",
  body: "Have a project, event or business requirement? Contact our team to discuss your needs.",
  // kind = icon name; id = unique key
  links: [
    { id: "email", kind: "mail", label: "Email", value: company.email, href: enquiryMailto },
    { id: "phone", kind: "phone", label: "Phone", value: company.phoneDisplay, href: `tel:${company.phone}` },
    { id: "website", kind: "globe", label: "Company website", value: company.websiteLabel, href: company.website, external: true },
    { id: "aurawork", kind: "product", label: "AuraWork", value: aurawork.urlLabel, href: aurawork.url, external: true },
    {
      id: "instagram-services",
      kind: "instagram",
      label: "Instagram — D6 Global Services",
      value: "@d6_global_services",
      href: "https://www.instagram.com/d6_global_services/",
      external: true,
    },
    {
      id: "instagram-media",
      kind: "instagram",
      label: "Instagram — D6 Global Media",
      value: "@d6_global_media_",
      href: "https://www.instagram.com/d6_global_media_/",
      external: true,
    },
  ],
};
