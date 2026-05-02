import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function Privacy() {
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      <main className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-8 md:mb-12">Privacy Policy</h1>
        <div className="glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] space-y-6 md:space-y-8 text-white/70 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Data Collection</h2>
            <p>At ADD MEDIA, we collect only the necessary information required to provide our cinematic logo animation services. This includes your name, email address, and the creative assets (logos) you upload for processing.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Use of Information</h2>
            <p>Your data is used solely for project fulfillment, communication regarding your orders, and improving our platform experience. We do not sell or share your personal data with third-party marketing agencies.</p>
          </section>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Asset Security</h2>
            <p>The logos and brand assets you upload are stored securely and accessed only by our professional animators. After project completion and delivery, assets are archived or removed according to our internal security protocols.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
