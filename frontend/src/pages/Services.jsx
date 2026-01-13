import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import * as LucideIcons from 'lucide-react';
import ServiceHero from '../components/Services/ServiceHero';
import API from '../api/api';

// --- Dynamic Icon Component ---
const DynamicIcon = ({ name, size = 32, className }) => {
    if (!name) return <LucideIcons.Settings size={size} className={className} />;
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    const IconComponent = LucideIcons[formattedName] || LucideIcons[name]; 
    return IconComponent ? <IconComponent size={size} className={className} /> : <LucideIcons.Settings size={size} className={className} />;
};

// --- Skeleton Loading Card ---
const ServiceSkeleton = () => (
    <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl animate-pulse">
        <div className="w-16 h-16 bg-gray-800 rounded-2xl mb-8"></div>
        <div className="h-6 w-2/3 bg-gray-800 rounded mb-4"></div>
        <div className="h-4 w-full bg-gray-800 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
    </div>
);

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await API.get('/services');
                if (data.success) {
                    setServices(data.data);
                }
            } catch (error) {
                toast.error("Failed to load services");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const colorPalettes = [
        'from-cyan-500 to-blue-600',
        'from-purple-500 to-pink-600',
        'from-emerald-500 to-teal-600',
        'from-amber-500 to-orange-600',
        'from-violet-500 to-indigo-600',
        'from-rose-500 to-fuchsia-600',
        'from-blue-500 to-cyan-600',
        'from-orange-500 to-red-600',
        'from-green-500 to-emerald-600',
        'from-pink-500 to-rose-600'
    ];

    return (
        <div className="bg-gray-950 min-h-screen overflow-hidden">
            {/*  1. Premium 3D Service Hero Section */}
            <ServiceHero />

            {/*  2. Services Grid Section */}
            <section className="relative py-32 px-6 max-w-7xl mx-auto">
                {/* Decorative Background Blur */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full"></div>
                </div>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative mb-24 text-center"
                >
                    <div className="inline-flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
                        <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase">
                            What We Offer
                        </span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tight">
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Services</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Cutting-edge digital solutions tailored to elevate your business to new heights.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                    {loading ? (
                        // Show Skeletons while loading
                        [...Array(6)].map((_, i) => <ServiceSkeleton key={i} />)
                    ) : (
                        services.map((service, index) => {
                            const colorClass = colorPalettes[index % colorPalettes.length];
                            
                            return (
                                <motion.div
                                    key={service._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -12 }}
                                    onHoverStart={() => setHoveredCard(service._id)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                    className="relative group h-full"
                                >
                                    {/* Card Aura Glow */}
                                    <div className={`absolute -inset-px bg-gradient-to-br ${colorClass} rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                                    
                                    {/* Main Card */}
                                    <div className="relative h-full bg-gray-900/50 backdrop-blur-xl p-10 rounded-[2rem] border border-white/5 group-hover:border-white/10 transition-all flex flex-col items-start">
                                        
                                        {/* Dynamic Icon */}
                                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${colorClass} mb-8 shadow-2xl shadow-black/50 group-hover:scale-110 transition-transform duration-500`}>
                                            <DynamicIcon name={service.icon} className="text-white w-8 h-8" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                                            {service.title}
                                        </h3>
                                        
                                        <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                                            {service.description}
                                        </p>

                                        {/* Action Indicator */}
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs font-black uppercase tracking-widest ${hoveredCard === service._id ? 'text-white' : 'text-gray-500'} transition-colors`}>
                                                Explore Service
                                            </span>
                                            <motion.div 
                                                animate={hoveredCard === service._id ? { x: 5 } : { x: 0 }}
                                                className={`w-6 h-6 rounded-full flex items-center justify-center bg-white/5 border border-white/10`}
                                            >
                                                <LucideIcons.ArrowRight size={12} className="text-white" />
                                            </motion.div>
                                        </div>

                                        {/* Background Subtle Index */}
                                        <span className="absolute bottom-6 right-8 text-7xl font-black text-white/[0.03] select-none">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>

                {/*  3. Professional CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32"
                >
                    <div className="relative rounded-[3rem] p-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20">
                        <div className="bg-[#0a0f1a] rounded-[2.9rem] p-12 md:p-20 text-center relative overflow-hidden">
                            {/* Decorative Sparkle */}
                            <LucideIcons.Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-8 opacity-50" />
                            
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to scale your <span className="text-cyan-400">idea?</span>
                            </h3>
                            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                                Let's collaborate to build something extraordinary. Our team is ready to turn your vision into a digital reality.
                            </p>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-cyan-400 hover:text-black transition-all shadow-xl shadow-white/5"
                            >
                                Get Started Today
                            </motion.button>

                            {/* Background mesh for CTA */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`,
                                    backgroundSize: '24px 24px'
                                }}
                            ></div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Services;

