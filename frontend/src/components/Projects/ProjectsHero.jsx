// import { motion } from 'framer-motion';
// import { Rocket, Layers, PenTool, ExternalLink, Sparkles, Globe, Cpu, BarChart, Zap, ArrowRight } from 'lucide-react';

// const ProjectsHero = () => {
//   const floatingElements = [
//     {
//       icon: <Layers className="w-4 h-4" />,
//       text: "Case Studies",
//       color: "from-purple-500 to-pink-600",
//       position: "top-5 right-5 lg:top-10 lg:right-20",
//       animation: { y: [0, -15, 0], x: [0, 10, 0] },
//       delay: 0
//     },
//     {
//       icon: <PenTool className="w-4 h-4" />,
//       text: "UI/UX Design",
//       color: "from-cyan-500 to-blue-600",
//       position: "bottom-20 left-5 lg:bottom-1/3 lg:left-10",
//       animation: { y: [0, 15, 0], x: [0, -8, 0] },
//       delay: 1
//     },
//     {
//       icon: <Globe className="w-4 h-4" />,
//       text: "Web Apps",
//       color: "from-emerald-500 to-teal-600",
//       position: "top-1/4 left-10 lg:top-1/3 lg:left-20",
//       animation: { y: [0, -12, 0], x: [0, 12, 0] },
//       delay: 0.5
//     },
//     {
//       icon: <Cpu className="w-4 h-4" />,
//       text: "AI Projects",
//       color: "from-amber-500 to-orange-600",
//       position: "bottom-10 right-10 lg:bottom-20 lg:right-25",
//       animation: { y: [0, -18, 0], x: [0, -15, 0] },
//       delay: 1.5
//     }
//   ];

//   return (
//     <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 pt-24 pb-10">
      
//       {/* 🌌 Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        
//         {/* Floating Particles */}
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-[1px] h-[1px] bg-purple-400 rounded-full"
//             initial={{
//               x: Math.random() * 100 + 'vw',
//               y: Math.random() * 100 + 'vh',
//             }}
//             animate={{
//               y: [null, `-${Math.random() * 100}px`],
//               x: [null, `${Math.random() * 50 - 25}px`],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//             style={{ opacity: Math.random() * 0.3 + 0.1 }}
//           />
//         ))}
        
//         {/* Glowing Orbs */}
//         <motion.div
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{ scale: [1.2, 1, 1.2] }}
//           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
//         />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        
//         {/* Left Side: Text Content */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="text-center lg:text-left"
//         >
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="inline-flex items-center gap-3 px-5 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800 mb-8 group hover:border-purple-500/50 transition-all cursor-pointer"
//           >
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-md"></div>
//               <div className="relative w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
//                 <Rocket className="w-3 h-3 text-white" />
//               </div>
//             </div>
//             <span className="text-sm font-bold text-purple-400 uppercase tracking-widest">
//               Our Portfolio
//             </span>
//             <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
//           </motion.div>

//           {/* Main Heading */}
//           <motion.h1 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-6"
//           >
//             <span className="text-white">Innovative</span>{' '}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
//               Showcase
//             </span>
//             <br />
//             <span className="text-white">of Excellence</span>
//             <span className="text-purple-400">.</span>
//           </motion.h1>

//           {/* Description */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="text-xl text-gray-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
//           >
//             Where cutting-edge technology meets visionary design - explore our portfolio of groundbreaking digital solutions.
//           </motion.p>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.7 }}
//             className="flex flex-wrap gap-8 justify-center lg:justify-start"
//           >
//             {[
//               { value: '100+', label: 'Projects' },
//               { value: '50+', label: 'Clients' },
//               { value: '95%', label: 'Satisfaction' }
//             ].map((stat, idx) => (
//               <div key={idx} className="text-center lg:text-left">
//                 <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
//                 <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
//               </div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Right Side: 3D Visual with Floating Elements */}
//         <div className="relative flex justify-center items-center h-[500px] lg:h-[600px]">
          
//           {/* Main 3D Illustration Container */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
//             animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//             transition={{ duration: 1, delay: 0.4, type: "spring" }}
//             className="relative group"
//           >
//             {/* Glow Effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 blur-3xl rounded-[3rem] group-hover:scale-110 transition-transform duration-700"></div>
            
//             {/* Main Image Container */}
//             <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-gray-800/50 shadow-2xl shadow-purple-900/30 group-hover:border-purple-500/30 transition-all duration-500">
//               <img 
//                 src="/project.jpg" 
//                 alt="Projects Showcase 3D"
//                 className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
//               />
              
//               {/* Overlay Gradient */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
//               {/* Interactive Hover Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             </div>

//             {/* Floating Elements */}
//             {floatingElements.map((element, index) => (
//               <motion.div
//                 key={index}
//                 className={`absolute ${element.position} z-30`}
//                 animate={element.animation}
//                 transition={{
//                   duration: 4 + index,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: element.delay
//                 }}
//               >
//                 <div className="group/element relative">
//                   {/* Glow Effect */}
//                   <div className={`absolute inset-0 bg-gradient-to-br ${element.color} rounded-2xl blur-xl opacity-0 group-hover/element:opacity-30 transition-opacity`}></div>
                  
//                   {/* Element Content */}
//                   <div className="relative bg-gray-900/80 backdrop-blur-xl p-3 rounded-2xl border border-gray-800/50 shadow-xl hover:border-gray-700 transition-all duration-300 flex items-center gap-3 min-w-[140px]">
//                     <div className={`p-2 rounded-xl bg-gradient-to-br ${element.color}`}>
//                       {element.icon}
//                     </div>
//                     <span className="font-bold text-white text-sm">{element.text}</span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}

//             {/* Central Sparkle */}
//             <motion.div
//               animate={{ 
//                 scale: [1, 1.2, 1],
//                 rotate: [0, 180, 360]
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//               className="absolute -top-4 -right-4 z-20"
//             >
//               <div className="relative">
//                 <div className="absolute inset-0 bg-purple-500 rounded-full blur-md"></div>
//                 <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
//                   <Sparkles className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Background Rings */}
//           <div className="absolute -z-10 w-[120%] h-[120%]">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-gray-800/20 rounded-full"
//             ></motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         animate={{ y: [0, 10, 0] }}
//         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
//       >
//         <div className="flex flex-col items-center">
//           <span className="text-gray-500 text-sm mb-2 tracking-widest">EXPLORE</span>
//           <div className="w-1 h-16 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent rounded-full">
//             <motion.div
//               animate={{ y: [0, 40, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//               className="w-1 h-4 bg-white rounded-full"
//             />
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default ProjectsHero;



import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Layers, PenTool, ExternalLink, Sparkles, Globe, Cpu, ArrowRight } from 'lucide-react';

// 1. Logic extracted outside component to prevent re-creation on every render
const FLOATING_DATA = [
  { icon: Layers, text: "Case Studies", color: "from-purple-500 to-pink-600", pos: "top-5 right-5 lg:top-10 lg:right-20", delay: 0 },
  { icon: PenTool, text: "UI/UX Design", color: "from-cyan-500 to-blue-600", pos: "bottom-20 left-5 lg:bottom-1/3 lg:left-10", delay: 1 },
  { icon: Globe, text: "Web Apps", color: "from-emerald-500 to-teal-600", pos: "top-1/4 left-10 lg:top-1/3 lg:left-20", delay: 0.5 },
  { icon: Cpu, text: "AI Projects", color: "from-amber-500 to-orange-600", pos: "bottom-10 right-10 lg:bottom-20 lg:right-25", delay: 1.5 }
];

const ProjectsHero = () => {
  // 2. Performance: Only render particles once
  const particles = useMemo(() => [...Array(12)], []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030014] pt-20">
      
      {/* 🌌 Optimized Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.15),transparent_70%)]" />
        
        {/* Simplified Particles - Using simpler animations for performance */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/40 rounded-full"
            animate={{ 
              y: [0, -100], 
              opacity: [0, 1, 0] 
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:bg-white/10 transition-colors cursor-default">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-purple-100 uppercase">Portfolio 2024</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter text-white mb-6">
            Future <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              Defined.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-md leading-relaxed mb-8">
            Turning complex ideas into seamless digital realities through precision engineering and artistic design.
          </p>

          <div className="flex flex-wrap gap-10">
            {[
              { val: '100+', lab: 'Projects' },
              { val: '95%', lab: 'Success' }
            ].map((s, i) => (
              <div key={i}>
                <h3 className="text-3xl font-bold text-white leading-none">{s.val}</h3>
                <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">{s.lab}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Visual Showcase */}
        <div className="relative group perspective-1000">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-20 rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-2xl shadow-2xl"
          >
            <div className="overflow-hidden rounded-2xl relative">
              <img 
                src="/project.jpg" 
                alt="Showcase" 
                className="w-full object-cover aspect-[4/3] opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Floating Elements - Now Optimized */}
          {FLOATING_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              className={`absolute ${item.pos} z-30 hidden md:block`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0a0a0c]/80 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} shadow-lg`}>
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-200">{item.text}</span>
              </div>
            </motion.div>
          ))}
          
          {/* Background Glows */}
          <div className="absolute -inset-4 bg-purple-500/20 blur-[100px] -z-10 rounded-full" />
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-8 w-full flex justify-center">
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent" 
        />
      </div>
    </section>
  );
};

export default ProjectsHero;