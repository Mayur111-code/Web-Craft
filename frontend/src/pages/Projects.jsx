import { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Zap, Eye, Github, Globe, ExternalLink, Code2 } from 'lucide-react';
import ProjectsHero from '../components/Projects/ProjectsHero';
import API from '../api/api';


const ProjectCard = memo(({ project, index, colorClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glow Background */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorClass} rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-500`} />
      
      <div className="relative h-full bg-[#0d0d12] border border-white/5 rounded-[1.8rem] overflow-hidden flex flex-col">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/50 backdrop-blur-md border border-white/10 text-white`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {project.techStack?.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-[10px] font-medium text-purple-300/70 px-2 py-1 rounded-md bg-purple-500/5 border border-purple-500/10">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <a
            href={project.projectLink}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold transition-all duration-300 group/btn`}
          >
            View Case Study
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
});

// --- 2. Main Projects Component ---
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get('/projects');
        if (data.success) setProjects(data.data);
      } catch (error) {
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getColorByCategory = (cat) => {
    const colors = {
      'Web': 'from-blue-500 to-indigo-600',
      'AI/ML': 'from-purple-500 to-fuchsia-600',
      'Design': 'from-orange-400 to-rose-500',
      'default': 'from-gray-600 to-gray-400'
    };
    return colors[cat] || colors.default;
  };

  return (
    <div className="bg-[#030014] min-h-screen text-white font-sans selection:bg-purple-500/30">
      <ProjectsHero />

      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {loading ? (
          // Optimized Skeleton Loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[450px] rounded-[2rem] bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="relative z-10">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={project._id} 
                    project={project} 
                    index={index} 
                    colorClass={getColorByCategory(project.category)} 
                  />
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <Eye className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold">No projects found</h3>
                <p className="text-gray-500 mt-2">Check back soon for new updates.</p>
              </motion.div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;