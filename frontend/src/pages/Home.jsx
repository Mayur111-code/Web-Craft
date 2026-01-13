import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import { Sparkles, Zap, Cloud, Code, Globe, Shield, ArrowRight } from 'lucide-react';

const Home = () => {
  const services = [
    { title: 'Web Development', desc: 'Modern, responsive websites with cutting-edge tech stacks.', icon: <Code />, color: 'from-cyan-500 to-blue-600' },
    { title: 'App Design', desc: 'Intuitive UI/UX that engages and converts users instantly.', icon: <Zap />, color: 'from-purple-500 to-pink-600' },
    { title: 'AI Integration', desc: 'Smart automation and machine learning solutions for scale.', icon: <Sparkles />, color: 'from-rose-500 to-fuchsia-600' },
  ];

  const stats = [
    { value: '100+', label: 'Projects', icon: '🚀' },
    { value: '50+', label: 'Clients', icon: '🌟' },
    { value: '99%', label: 'Success', icon: '✨' },
    { value: '24/7', label: 'Support', icon: '⚡' },
  ];

  return (
    <div className="bg-[#030712] text-white">
      
      {/*  1. Hero Section */}
      <Hero />

      {/*  2. Services Section (Teaser) */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Expertise</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Future-ready digital solutions built with precision.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/10`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
                <Link to="/services" className="flex items-center gap-2 text-cyan-400 text-sm font-bold group-hover:gap-4 transition-all">
                  Read More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  3. Quick Stats */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">{stat.icon} {stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  4. Simple Process Flow */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">How We Make It <span className="text-indigo-500">Happen</span></h2>
          </div>
          <div className="space-y-4">
            {[
              { s: '01', t: 'Discovery', d: 'Deep dive into your goals.' },
              { s: '02', t: 'Execution', d: 'Agile development & design.' },
              { s: '03', t: 'Delivery', d: 'Quality check & deployment.' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                whileInView={{ x: [ -20, 0 ], opacity: [ 0, 1 ] }}
                className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <span className="text-3xl font-black text-white/20">{step.s}</span>
                <div>
                  <h4 className="font-bold text-white">{step.t}</h4>
                  <p className="text-sm text-gray-400">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  5. Final CTA */}
      <section className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-indigo-600 to-purple-700 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Ready to scale?</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto opacity-80">Let's build something extraordinary together. Your vision, our tech.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:bg-gray-100 transition-all">Start Project</Link>
              <Link to="/projects" className="px-10 py-4 bg-indigo-500/50 text-white rounded-2xl font-black border border-indigo-400/30 hover:bg-indigo-500/70 transition-all">View Work</Link>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full" />
        </motion.div>
      </section>

    </div>
  );
};

export default Home;