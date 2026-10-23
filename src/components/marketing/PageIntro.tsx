import { Container } from "@/components/layout/Container";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export function PageIntro({
  eyebrow,
  title,
  accent,
  description,
  breadcrumbs = [],
}: PageIntroProps) {
  return (
    <section className="page-intro">
      <Container>
        {breadcrumbs.length > 0 ? (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => (
              <span className="breadcrumbs__item" key={`${item.label}-${index}`}>
                {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
                {index < breadcrumbs.length - 1 ? <span aria-hidden="true">/</span> : null}
              </span>
            ))}
          </nav>
        ) : null}
        <p className="eyebrow"><span /> {eyebrow}</p>
        <h1 className="page-intro__title">
          {title} {accent ? <span>{accent}</span> : null}
        </h1>
        <p className="page-intro__description">{description}</p>
      </Container>
      <div className="page-intro__rule" aria-hidden="true" />
    </section>
  );
}
