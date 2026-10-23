import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageIntro } from "@/components/marketing/PageIntro";
import { services, getServiceBySlug } from "@/config/services";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageIntro
        eyebrow={`Service ${service.number}`}
        title={service.title}
        accent="with purpose."
        description={service.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: service.title },
        ]}
      />

      <Section className="service-detail">
        <Container>
          <div className="service-detail__grid">
            <div>
              <p className="eyebrow"><span /> What this can help with</p>
              <h2 className="section-title">A clear approach to<br /><span>the right outcome.</span></h2>
              <p className="section-copy">{service.summary}</p>
              <p className="section-copy">
                We begin by understanding the context, users, constraints, and
                priorities. The scope and delivery plan should fit the actual
                problem rather than force every project into the same template.
              </p>
            </div>
            <aside className="service-detail__focus">
              <span className="service-detail__focus-symbol" aria-hidden="true">{service.symbol}</span>
              <p className="eyebrow">Areas of focus</p>
              <h2>{service.title}</h2>
              <p>{service.outcome}</p>
              <Link className="text-link" href="/contact/">Discuss your requirements <span aria-hidden="true">↗</span></Link>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="service-related">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> Related capabilities</p>
              <h2 className="section-title">More ways to<br /><span>move forward.</span></h2>
            </div>
            <Link className="text-link" href="/services/">All services <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="service-related__grid">
            {otherServices.map((item) => (
              <Link className="service-related__card" href={`/services/${item.slug}/`} key={item.slug}>
                <span>{item.number} / {item.symbol}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span className="service-related__arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="services-cta">
        <Container>
          <div className="services-cta__panel">
            <div>
              <p className="eyebrow"><span /> Next step</p>
              <h2>Let&apos;s talk about<br /><span>what you need.</span></h2>
              <p>We can start with your goals and identify a practical way forward.</p>
            </div>
            <ButtonLink href="/contact/">Contact Kurarin <span aria-hidden="true">↗</span></ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
