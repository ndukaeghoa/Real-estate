export const AboutPage = () => (
  <section className="space-y-6">
    <header className="bg-white border rounded-xl p-6">
      <h1 className="text-3xl font-bold text-slate-900">About Efortlex</h1>
      <p className="text-slate-600 mt-2">
        Efortlex helps tenants discover quality apartments while giving landlords powerful tools to publish,
        manage, and maintain properties in one place.
      </p>
    </header>

    <div className="grid md:grid-cols-3 gap-4">
      <InfoCard
        title="Trusted Listings"
        text="Listings go through moderation so tenants can browse with confidence."
      />
      <InfoCard
        title="Role-based Workflows"
        text="Dedicated experiences for tenants, landlords, and admins keep the platform simple and secure."
      />
      <InfoCard
        title="End-to-End Rental Journey"
        text="From search to applications, payments, and maintenance—everything is connected."
      />
    </div>
  </section>
);

const InfoCard = ({ title, text }) => (
  <article className="bg-white border rounded-lg p-4">
    <h2 className="font-semibold text-lg">{title}</h2>
    <p className="text-sm text-slate-600 mt-1">{text}</p>
  </article>
);
