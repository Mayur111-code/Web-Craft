import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Send, MapPin, Mail, Shield, Users, Globe, Lock, CheckCircle } from 'lucide-react';
import ContactHero from '../components/Contact/ContactHero';
import API from '../api/api';
import GlobalPresence from './user/GlobalPresence';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Contact = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ subject: '', message: '', category: 'general' });

  
  const categories = useMemo(() => [
    { value: 'general', label: 'General', icon: <Globe className="w-4 h-4" /> },
    { value: 'project', label: 'Project', icon: <Shield className="w-4 h-4" /> },
    { value: 'support', label: 'Support', icon: <Users className="w-4 h-4" /> },
    { value: 'partnership', label: 'Partner', icon: <Mail className="w-4 h-4" /> },
  ], []);


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');

    setLoading(true);
    try {
      const { data } = await API.post('/inquiries', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (data.success) {
        setSuccess(true);
        setFormData({ subject: '', message: '', category: 'general' });
        toast.success("Message Sent!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans selection:bg-emerald-500/30">
      <ContactHero />

      <main className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
        
        {/* Left Side: Info */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-8">
          <h2 className="text-5xl font-extrabold tracking-tight">Let's build <span className="text-emerald-400">Future.</span></h2>
          <p className="text-gray-400 text-lg">Have an idea? We have the execution power.</p>
          
          <div className="space-y-4">
            {[{ icon: <MapPin />, text: "Pune, India" }, { icon: <Mail />, text: "itserviceswebcraft@gmail.com" }].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
                <div className="text-emerald-400">{item.icon}</div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

      
        <div className="relative group">
          <AnimatePresence>
            {!user && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 backdrop-blur-md bg-gray-950/40 flex items-center justify-center rounded-[2rem] border border-gray-800"
              >
                <button onClick={() => navigate('/login')} className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                  <Lock className="w-4 h-4" /> Unlock Form
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className={`space-y-6 p-8 bg-gray-900/30 rounded-[2rem] border border-gray-800 transition-all ${!user ? 'blur-sm grayscale' : ''}`}>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(cat => (
                <button 
                  key={cat.value} type="button" 
                  onClick={() => setFormData(p => ({ ...p, category: cat.value }))}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${formData.category === cat.value ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-gray-800/50 border-gray-700 text-gray-400'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <input 
              name="subject" value={formData.subject} onChange={handleChange}
              placeholder="Subject" required
              className="w-full bg-gray-800/50 border border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />

            <textarea 
              name="message" value={formData.message} onChange={handleChange}
              placeholder="Your Message" rows="5" required
              className="w-full bg-gray-800/50 border border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />

            <button 
              type="submit" disabled={loading || !user}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </main>

      
    </div>
  );
};

export default Contact;