import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { Zap, Target, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Sparkles className="text-accent-teal" size={32} />,
    title: "Cloth Logo Animation",
    description: "Elegant and realistic cloth-based transitions, ideal for fashion, lifestyle, and premium textile brands."
  },
  {
    icon: <Target className="text-accent-teal" size={32} />,
    title: "Hospital Logo Animation",
    description: "Clean, professional, and trustworthy animations tailored for healthcare providers, clinics, and medical startups."
  },
  {
    icon: <Zap className="text-accent-teal" size={32} />,
    title: "Nature Logo Animation",
    description: "Organic, earth-inspired motion graphics that perfectly complement eco-friendly, outdoor, and organic brands."
  },
  {
    icon: <TrendingUp className="text-accent-teal" size={32} />,
    title: "School Logo Animation",
    description: "Dynamic and inspiring animations designed for educational institutions, schools, colleges, and e-learning platforms."
  }
];

export default function Home() {
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      <Hero />

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Expert Services</h2>
            <p className="text-xl text-white/60">
              We provide a full suite of advertising and marketing solutions to help your business stand out in a crowded digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl glass hover:border-accent-teal/50 transition-all group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="orange-gradient p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                Ready to animate your brand?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Join hundreds of brands that have elevated their identity with ADD MEDIA. Start your project today.
              </p>
              <Link to="/order">
                <Button size="lg" className="bg-white text-accent-orange hover:bg-white/90 shadow-2xl">
                  Order Your Animation Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
