// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast } from 'sonner';
// import { Link } from 'react-router-dom';
// import {
//     Calendar,
//     ArrowRight,
//     User,
//     Clock,
//     Eye,
//     Bookmark,
//     Share2,
//     TrendingUp,
//     Sparkles
// } from 'lucide-react';
// import BlogHero from '../components/Blog/BlogHero';


// import API from '../api/api'

// const Blogs = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState('all');
//     const [search, setSearch] = useState('');
//     const [hoveredBlog, setHoveredBlog] = useState(null);

//     useEffect(() => {
//         const fetchBlogs = async () => {
//             try {

//                 const { data } = await API.get('/blogs');

//                 if (data.success) setBlogs(data.data);
//             } catch (error) {
//                 console.error('Error fetching blogs:', error);
//                 toast.error("Failed to load blogs");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchBlogs();
//     }, []);

//     const getColorByCategory = (category) => {
//         const colorMap = {
//             'Technology': 'from-blue-500 to-cyan-600',
//             'Design': 'from-purple-500 to-pink-600',
//             'AI/ML': 'from-emerald-500 to-teal-600',
//             'Business': 'from-amber-500 to-orange-600',
//             'Development': 'from-violet-500 to-indigo-600',
//             'Tutorial': 'from-rose-500 to-fuchsia-600',
//             'News': 'from-orange-500 to-red-600',
//             'default': 'from-gray-500 to-gray-700'
//         };
//         return colorMap[category] || colorMap.default;
//     };

//     const formatDate = (dateString) => {
//         try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 year: 'numeric'
//             });
//         } catch (error) {
//             return 'Recent';
//         }
//     };

//     const getReadingTime = (content) => {
//         if (!content) return '1 min read';
//         const words = content.split(/\s+/).length;
//         const minutes = Math.ceil(words / 200);
//         return `${minutes} min read`;
//     };

//     // Function to safely get author name
//     const getAuthorName = (author) => {
//         if (!author) return 'Admin';

//         // If author is a string, return it
//         if (typeof author === 'string') return author;

//         // If author is an object with name property
//         if (typeof author === 'object' && author !== null) {
//             return author.name || author.username || author.email || 'Admin';
//         }

//         return 'Admin';
//     };

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900">
//             <div className="text-center">
//                 <div className="relative mb-8">
//                     <div className="w-20 h-20 border-4 border-gray-800 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                         <Sparkles className="w-10 h-10 text-orange-400 animate-pulse" />
//                     </div>
//                 </div>
//                 <motion.div
//                     animate={{ opacity: [0.5, 1, 0.5] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                     className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
//                 >
//                     Curating Insights...
//                 </motion.div>
//             </div>
//         </div>
//     );

//     const filteredBlogs = blogs.filter(blog => {
//         if (!blog) return false;

//         if (filter !== 'all' && blog.category !== filter) return false;
//         if (search && !blog.title?.toLowerCase().includes(search.toLowerCase())) return false;
//         return true;
//     });

//     // Function to safely extract excerpt
//     const getExcerpt = (content) => {
//         if (!content) return 'No content available...';

//         // Remove HTML tags
//         const plainText = content.replace(/<[^>]*>/g, '');

//         // Limit to 150 characters
//         return plainText.length > 150
//             ? plainText.substring(0, 150) + '...'
//             : plainText;
//     };

//     return (
//         <div className="bg-gradient-to-b from-gray-950 to-black min-h-screen">
//             {/* 🌟 1. Hero Section */}
//             <BlogHero />




//             {/* 🎯 3. Blogs Grid Section */}
//             <section className="py-32 px-6 max-w-7xl mx-auto">
//                 {/* Stats Bar */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="mb-16 flex flex-wrap items-center justify-between gap-6"
//                 >
//                     <div className="flex items-center gap-4">
//                         <TrendingUp className="w-6 h-6 text-orange-400" />
//                         <div>
//                             <h3 className="text-white font-bold">Latest Insights</h3>
//                             <p className="text-gray-500 text-sm">{filteredBlogs.length} articles found</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-6 text-sm text-gray-400">
//                         <span className="flex items-center gap-2">
//                             <Eye className="w-4 h-4" />
//                             10K+ monthly readers
//                         </span>
//                         <span className="flex items-center gap-2">
//                             <Clock className="w-4 h-4" />
//                             Updated weekly
//                         </span>
//                     </div>
//                 </motion.div>

//                 {/* Grid with Proper Spacing */}
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={filter + search}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//                     >
//                         {filteredBlogs.map((blog, index) => {
//                             if (!blog) return null; // Skip invalid blog entries

//                             const colorClass = getColorByCategory(blog.category);
//                             const authorName = getAuthorName(blog.author);
//                             const excerpt = getExcerpt(blog.content);
//                             const readingTime = getReadingTime(blog.content);

//                             return (
//                                 <motion.article
//                                     key={blog._id || index}
//                                     layout
//                                     initial={{ opacity: 0, y: 30, scale: 0.95 }}
//                                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                                     transition={{
//                                         duration: 0.6,
//                                         delay: index * 0.1,
//                                         type: "spring",
//                                         stiffness: 100
//                                     }}
//                                     onHoverStart={() => setHoveredBlog(blog._id)}
//                                     onHoverEnd={() => setHoveredBlog(null)}
//                                     className="group relative"
//                                 >
//                                     {/* Glow Effect */}
//                                     <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

//                                     {/* Blog Card */}
//                                     <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl shadow-black/30 overflow-hidden hover:border-gray-700/50 transition-all duration-300 h-full flex flex-col">

//                                         {/* Image Container */}
//                                         <div className="relative h-64 overflow-hidden">
//                                             <motion.img
//                                                 src={blog.image || 'https://via.placeholder.com/400x250/1f2937/6b7280?text=Blog+Image'}
//                                                 alt={blog.title || 'Blog Post'}
//                                                 className="w-full h-full object-cover"
//                                                 whileHover={{ scale: 1.1 }}
//                                                 transition={{ duration: 0.5 }}
//                                                 onError={(e) => {
//                                                     e.target.src = 'https://via.placeholder.com/400x250/1f2937/6b7280?text=Blog+Image';
//                                                 }}
//                                             />

//                                             {/* Gradient Overlay */}
//                                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

//                                             {/* Category Badge */}
//                                             <div className="absolute top-4 left-4">
//                                                 <span className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${colorClass} text-white shadow-lg`}>
//                                                     {blog.category || 'Technology'}
//                                                 </span>
//                                             </div>

//                                             {/* Reading Time */}
//                                             <div className="absolute top-4 right-4">
//                                                 <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-2">
//                                                     <Clock className="w-3 h-3" />
//                                                     {readingTime}
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Content */}
//                                         <div className="p-8 flex flex-col flex-grow">
//                                             {/* Meta Info */}
//                                             <div className="flex items-center gap-4 mb-6 text-gray-400 text-xs font-medium">
//                                                 <span className="flex items-center gap-2">
//                                                     <Calendar className="w-4 h-4" />
//                                                     {formatDate(blog.createdAt)}
//                                                 </span>
//                                                 <span className="flex items-center gap-2">
//                                                     <User className="w-4 h-4" />
//                                                     {authorName}
//                                                 </span>
//                                             </div>

//                                             {/* Title */}
//                                             <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-100 transition-colors line-clamp-2 leading-tight">
//                                                 {blog.title || 'Untitled Blog Post'}
//                                             </h3>

//                                             {/* Excerpt */}
//                                             <p className="text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
//                                                 {excerpt}
//                                             </p>

//                                             {/* Action Bar */}
//                                             <div className="flex items-center justify-between pt-6 border-t border-gray-800/50 mt-auto">
//                                                 <Link
//                                                     to={`/blog/${blog._id}`}
//                                                     className="flex items-center gap-2 text-orange-400 font-bold text-sm group/btn hover:text-orange-300 transition-colors"
//                                                 >
//                                                     Read Full Story
//                                                     <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
//                                                 </Link>

//                                                 <div className="flex items-center gap-3">
//                                                     <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
//                                                         <Bookmark className="w-4 h-4 text-gray-400 hover:text-orange-400" />
//                                                     </button>
//                                                     <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
//                                                         <Share2 className="w-4 h-4 text-gray-400 hover:text-orange-400" />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Hover Indicator */}
//                                     <AnimatePresence>
//                                         {hoveredBlog === blog._id && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, scale: 0.8 }}
//                                                 animate={{ opacity: 1, scale: 1 }}
//                                                 exit={{ opacity: 0, scale: 0.8 }}
//                                                 className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center shadow-2xl z-20`}
//                                             >
//                                                 <Sparkles className="w-4 h-4 text-white" />
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.article>
//                             );
//                         })}
//                     </motion.div>
//                 </AnimatePresence>

              



//             </section>
//         </div>
//     );
// };

// export default Blogs;




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
            {/* 🌟 1. Hero Section */}
            <BlogHero />

            {/* 🎯 2. Stats & Title Section (Clean Look) */}
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

            {/* 🎯 3. Blogs Grid Section */}
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