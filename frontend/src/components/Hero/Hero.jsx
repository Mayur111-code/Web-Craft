import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#030712] pt-20">
      
      {/*  High-Performance Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} /> 
            Top-Rated Digital Agency
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1] tracking-tighter">
            We Design <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-500">
              Future Tech.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Building high-performance applications and immersive user experiences that help your business scale at the speed of light.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link to="/contact">
              <button className="group bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300">
                Start Your Journey 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <Link to="/projects">
              <button className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
                Our Work
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Visuals */}
        <div className="relative">
          {/* Main Hero Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            <img 
              src="/home.jpg" 
              alt="Digital Concept"
              className="w-full max-w-[550px] mx-auto drop-shadow-[0_0_50px_rgba(99,102,241,0.3)] animate-float"
              style={{ animationDuration: '6s' }}
            />
          </motion.div>

          {/* Optimized Floating Cards */}
          <FloatingCard 
            icon={<ShieldCheck className="text-emerald-400"/>} 
            label="STATUS" title="Enterprise Secure" 
            pos="top-0 -right-4" delay={0}
          />
          <FloatingCard 
            icon={<Zap className="text-amber-400"/>} 
            label="PERFORMANCE" title="Lightning Fast" 
            pos="bottom-12 -left-4" delay={2}
          />
          <FloatingCard 
            icon={<Cpu className="text-indigo-400"/>} 
            label="TECHNOLOGY" title="AI Powered" 
            pos="top-1/4 -left-8" delay={1}
          />
          <FloatingCard 
            icon={<Globe className="text-blue-400"/>} 
            label="REACH" title="Global Scale" 
            pos="bottom-0 right-4" delay={3}
          />
        </div>
      </div>
    </section>
  );
};

// Reusable Floating Card for Clean Code
const FloatingCard = ({ icon, label, title, pos, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 + delay * 0.2 }}
    className={`absolute ${pos} hidden md:block bg-gray-900/40 backdrop-blur-2xl p-4 rounded-2xl border border-white/10 z-20 shadow-2xl animate-float`}
    style={{ animationDelay: `${delay}s`, animationDuration: '5s' }}
  >
    <div className="flex items-center gap-3">
      <div className="bg-white/5 p-2 rounded-xl border border-white/10">{icon}</div>
      <div>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-sm font-bold text-white leading-none">{title}</p>
      </div>
    </div>
  </motion.div>
);

export default Hero;

