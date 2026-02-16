export const ContactPage = () => (
  <section className="space-y-6">
    <header className="bg-white border rounded-xl p-6">
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="text-slate-600 mt-2">Need help? Reach out to the Efortlex team.</p>
    </header>

    <div className="grid md:grid-cols-2 gap-4">
      <article className="bg-white border rounded-lg p-4 space-y-2">
        <h2 className="font-semibold">Support</h2>
        <p className="text-sm text-slate-600">Email: support@efortlex.com</p>
        <p className="text-sm text-slate-600">Phone: +1 (555) 321-9090</p>
      </article>

      <article className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold">Business Hours</h2>
        <p className="text-sm text-slate-600 mt-2">Monday - Friday: 9:00 AM to 6:00 PM</p>
        <p className="text-sm text-slate-600">Saturday: 10:00 AM to 2:00 PM</p>
      </article>
    </div>
  </section>
);
