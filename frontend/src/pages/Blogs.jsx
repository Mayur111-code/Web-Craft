import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import {
    Calendar,
    ArrowRight,
    User,
    Clock,
    Eye,
    Bookmark,
    Share2,
    TrendingUp,
    Sparkles
} from 'lucide-react';
import BlogHero from '../components/Blog/BlogHero';
import API from '../api/api';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredBlog, setHoveredBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await API.get('/blogs');
                if (data.success) setBlogs(data.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                toast.error("Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const getColorByCategory = (category) => {
        const colorMap = {
            'Technology': 'from-blue-500 to-cyan-600',
            'Design': 'from-purple-500 to-pink-600',
            'AI/ML': 'from-emerald-500 to-teal-600',
            'Business': 'from-amber-500 to-orange-600',
            'Development': 'from-violet-500 to-indigo-600',
            'default': 'from-gray-500 to-gray-700'
        };
        return colorMap[category] || colorMap.default;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getExcerpt = (content) => {
        if (!content) return 'No content available...';
        const plainText = content.replace(/<[^>]*>/g, '').trim();
        return plainText.length > 130 ? plainText.substring(0, 130) + '...' : plainText;
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="bg-black min-h-screen selection:bg-orange-500/30">
            {/*  1. Hero Section */}
            <BlogHero />

            {/*  2. Stats & Title Section (Clean Look) */}
            <section className="pt-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-800 pb-12">
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-orange-500 mb-4"
                        >
                            <TrendingUp className="w-5 h-5" />
                            <span className="text-sm font-black uppercase tracking-[0.2em]">Latest Publications</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Explore our <span className="text-gray-500 text-3xl md:text-4xl font-light italic">Insights</span>
                        </h2>
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-8 text-gray-500 text-sm">
                        <div className="flex flex-col items-end">
                            <span className="text-white font-bold text-lg">{blogs.length}</span>
                            <span>Total Articles</span>
                        </div>
                        <div className="w-[1px] h-10 bg-gray-800"></div>
                        <div className="flex flex-col items-end">
                            <span className="text-white font-bold text-lg">Weekly</span>
                            <span>Fresh Content</span>
                        </div>
                    </div>
                </div>
            </section>

            {/*  3. Blogs Grid Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.map((blog, index) => {
                        const colorClass = getColorByCategory(blog.category);
                        
                        return (
                            <motion.article
                                key={blog._id || index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onHoverStart={() => setHoveredBlog(blog._id)}
                                onHoverEnd={() => setHoveredBlog(null)}
                                className="group relative flex flex-col"
                            >
                                {/* Glow Effect on Hover */}
                                <div className={`absolute -inset-2 bg-gradient-to-br ${colorClass} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col h-full hover:border-white/10 transition-colors shadow-2xl">
                                    
                                    {/* Image Section */}
                                    <div className="relative h-60 overflow-hidden">
                                        <motion.img
                                            src={blog.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'}
                                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                            alt={blog.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                                        
                                        {/* Category Tag */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/10 text-white`}>
                                                {blog.category || 'Technology'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-gray-500 text-[11px] mb-4 font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(blog.createdAt)}</span>
                                            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 5 min</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                                            {blog.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                                            {getExcerpt(blog.content)}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="text-white text-sm font-bold flex items-center gap-2 group/link"
                                            >
                                                Read Article
                                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform text-orange-500" />
                                            </Link>
                                            
                                            <div className="flex gap-2">
                                                <button className="p-2 text-gray-500 hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
                                                <button className="p-2 text-gray-500 hover:text-white transition-colors"><Bookmark className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        )
                    })}
                </div>
            </section>
        </div>
    );
};

export default Blogs;