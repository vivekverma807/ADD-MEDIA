import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function Terms() {
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-8 md:mb-12">Terms & Conditions</h1>
        <div className="glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] space-y-6 md:space-y-8 text-white/70 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Service Scope</h2>
            <p>ADD MEDIA provides custom logo animation services based on the styles selected from our showcase. Each project includes a set number of revisions as specified in the service tier chosen during checkout.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Intellectual Property</h2>
            <p>Upon final payment and project completion, the client receives full commercial usage rights for the animated logo. ADD MEDIA retains the right to display the completed work in our portfolio and showcase for promotional purposes.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Delivery Timelines</h2>
            <p>Standard delivery is 3-5 business days. Express delivery guarantees a 24-48 hour turnaround. Timelines begin once the client has provided all necessary brand assets and clear instructions.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
