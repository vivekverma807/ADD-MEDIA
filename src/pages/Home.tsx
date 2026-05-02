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
      <section id="services" className="py-16 md:py-24 relative">
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

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-accent-teal/20 blur-[100px]" />
              <div className="relative glass p-4 rounded-[3rem] border border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                  alt="Creative Team" 
                  className="rounded-[2.5rem] w-full h-64 md:h-[500px] object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8">
              <span className="text-accent-orange font-black uppercase tracking-[0.3em] text-xs">Our Story</span>
              <h2 className="text-4xl md:text-6xl font-black leading-tight">We Bring Brands <br className="hidden md:block"/> to Life Through <span className="text-accent-teal">Motion</span></h2>
              <p className="text-xl text-white/60 leading-relaxed">
                Founded on the intersection of technology and art, ADD MEDIA has spent years perfecting the craft of logo animation. We believe that a logo isn't just a mark—it's the heartbeat of your brand that deserves to move.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-4xl font-black text-white mb-2">500+</h4>
                  <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Projects Delivered</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-white mb-2">98%</h4>
                  <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="orange-gradient p-8 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                Ready to animate your brand?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Join hundreds of brands that have elevated their identity with ADD MEDIA. Start your project today.
              </p>
              <Link to="/order" className="w-full sm:w-auto inline-block">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 shadow-2xl px-6 md:px-12 h-16 text-base md:text-lg border border-white/10 w-full sm:w-auto">
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
