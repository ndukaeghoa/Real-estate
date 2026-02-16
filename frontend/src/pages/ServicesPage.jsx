export const ServicesPage = () => (
  <section className="space-y-6">
    <header className="bg-white border rounded-xl p-6">
      <h1 className="text-3xl font-bold text-slate-900">Services</h1>
      <p className="text-slate-600 mt-2">Everything Efortlex offers to help renters and property owners succeed.</p>
    </header>

    <div className="grid md:grid-cols-2 gap-4">
      <ServiceCard title="Apartment Discovery" text="Search by location, rent, bedrooms, and amenities with live filters." />
      <ServiceCard title="Application Management" text="Tenants apply online and landlords review applications in one dashboard." />
      <ServiceCard title="Rent Payments" text="Track payment status with a simple, transparent payment workflow." />
      <ServiceCard title="Maintenance Tracking" text="Submit and resolve maintenance issues with request-level updates." />
    </div>
  </section>
);

const ServiceCard = ({ title, text }) => (
  <article className="bg-white border rounded-lg p-4">
    <h2 className="font-semibold">{title}</h2>
    <p className="text-sm text-slate-600 mt-1">{text}</p>
  </article>
);
