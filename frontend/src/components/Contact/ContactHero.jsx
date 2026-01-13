import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Clock,
  Shield,
  Zap,
  Users,
  ArrowRight
} from 'lucide-react';

const ContactHero = () => {
  const floatingElements = [
    {
      icon: <MessageSquare className="w-4 h-4" />,
      text: "Quick Response",
      color: "from-emerald-500 to-teal-600",
      position: "top-10 right-5 lg:top-20 lg:right-10",
      delay: 0
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: "24/7 Support",
      color: "from-blue-500 to-cyan-600",
      position: "bottom-20 left-5 lg:bottom-32 lg:left-10",
      delay: 1
    },
    {
      icon: <Shield className="w-4 h-4" />,
      text: "Secure Protocol",
      color: "from-violet-500 to-indigo-600",
      position: "top-1/3 left-5 lg:top-1/3 lg:left-20",
      delay: 0.5
    }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black pt-32 pb-20">
      
      {/*  Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-black to-black"></div>
        
        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-500/20 rounded-full"
            initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh' }}
            animate={{ y: [0, -100], opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
        
        {/* Left Side: Copywriting */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-3 h-3" />
            Ready for takeoff
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
            Turn your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Ideas</span> <br />
            into <span className="italic font-light text-gray-400">Impact.</span>
          </h1>

          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Whether you have a fully-fledged concept or just a spark of an idea, we're here to engineer your next digital breakthrough.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 group hover:border-emerald-500/40 transition-all cursor-default">
              <Zap className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">Fast Execution</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 group hover:border-emerald-500/40 transition-all cursor-default">
              <Users className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">Expert Team</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual Elements */}
        <div className="relative order-1 lg:order-2 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-[450px]"
          >
            {/* Image Container */}
            <div className="relative z-20 rounded-[3rem] overflow-hidden border border-white/10 bg-gray-900 group shadow-2xl">
              <img 
                src="/contact.jpg" 
                alt="Collaboration" 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>

            {/* Floating Badges */}
            {floatingElements.map((el, i) => (
              <motion.div
                key={i}
                className={`absolute ${el.position} z-30`}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, delay: el.delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${el.color} text-white`}>
                    {el.icon}
                  </div>
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">{el.text}</span>
                </div>
              </motion.div>
            ))}

            {/* Glowing Backdrop */}
            <div className="absolute -inset-10 bg-emerald-500/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;