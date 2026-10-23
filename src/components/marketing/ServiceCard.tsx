import Link from "next/link";

export type ServiceItem = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  outcome: string;
  symbol: string;
};

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="service-card">
      <div className="service-card__topline">
        <span className="service-card__number">{service.number}</span>
        <span className="service-card__symbol" aria-hidden="true">{service.symbol}</span>
      </div>
      <h2>{service.title}</h2>
      <p className="service-card__summary">{service.summary}</p>
      <div className="service-card__outcome">
        <span className="service-card__outcome-label">The focus</span>
        <p>{service.outcome}</p>
      </div>
      <Link className="service-card__link" href={`/services/${service.slug}/`}>
        Explore service <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
