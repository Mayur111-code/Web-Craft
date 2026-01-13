// import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { 
//   User, LogOut, Settings, ChevronDown, Menu, X, Home, Briefcase, 
//   FolderKanban, MessageSquare, Mail, Sparkles, Zap, Star, Layers, Shield, 
  
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userInfo, setUserInfo] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeHover, setActiveHover] = useState(null);
//   const dropdownRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   // 🔄 Sync User from LocalStorage (Supports all login types)
//   const syncUser = () => {
//     try {
//       const data = localStorage.getItem('user') || localStorage.getItem('userInfo');
//       if (data) {
//         setUserInfo(JSON.parse(data));
//       } else {
//         setUserInfo(null);
//       }
//     } catch (error) {
//       console.error('Auth Sync Error:', error);
//       setUserInfo(null);
//     }
//   };

//   useEffect(() => {
//     syncUser();
//     window.addEventListener('storage', syncUser);
//     return () => window.removeEventListener('storage', syncUser);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('userInfo');
//     setUserInfo(null);
//     setShowDropdown(false);
//     navigate('/login');
//   };

//   const getDisplayName = () => {
//     if (!userInfo) return null;
//     const userObj = userInfo.user || userInfo;
//     return userObj.name || userObj.displayName || userInfo.displayName || userInfo.email?.split('@')[0] || "User";
//   };

//   const displayName = getDisplayName();
//   const isAdmin = userInfo?.role === 'admin' || userInfo?.user?.role === 'admin';

//   const navLinks = [
//     { name: 'Home', path: '/', icon: <Home className="w-4 h-4" />, gradient: 'from-blue-500 to-cyan-500' },
//     { name: 'Services', path: '/services', icon: <Briefcase className="w-4 h-4" />, gradient: 'from-purple-500 to-pink-500' },
//     { name: 'Projects', path: '/projects', icon: <FolderKanban className="w-4 h-4" />, gradient: 'from-emerald-500 to-teal-500' },
//     { name: 'Blogs', path: '/blogs', icon: <MessageSquare className="w-4 h-4" />, gradient: 'from-amber-500 to-orange-500' },
//     { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" />, gradient: 'from-rose-500 to-red-500' },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <nav className="fixed w-full z-50 top-0 bg-gray-900 border-b border-gray-800/50 shadow-2xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
          
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3 group">
//   <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden">
//     <img 
//       src="/logo.jpg" 
//       alt="Infina Tech Logo" 
//       className="w-full h-full object-cover"
//     />
//   </div>
//   <div className="flex flex-col">
//     <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent uppercase">
//       WEB CRAFT
//     </span>
//   </div>
// </Link>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex items-center space-x-2">
//             {navLinks.map((link) => (
//               <Link key={link.name} to={link.path} className={`px-6 py-3 rounded-xl flex items-center space-x-2 font-semibold text-sm transition-all ${location.pathname === link.path ? `bg-gradient-to-br ${link.gradient} text-white shadow-lg` : 'text-gray-300 hover:text-white hover:bg-gray-800/50'}`}>
//                 {link.icon} <span>{link.name}</span>
//               </Link>
//             ))}
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center space-x-4">
//             {displayName ? (
//               <div className="relative" ref={dropdownRef}>
//                 <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center space-x-3 group">
//                   <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-gray-800 group-hover:border-cyan-500 transition-all">
//                     {displayName.charAt(0).toUpperCase()}
//                   </div>
//                   <div className="hidden xl:block text-left">
//                     <p className="text-sm font-bold text-white leading-none">{displayName}</p>
//                     <p className="text-[10px] text-gray-400 mt-1 uppercase">{isAdmin ? 'Admin' : 'Member'}</p>
//                   </div>
//                   <ChevronDown className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} size={16} />
//                 </button>

//                 <AnimatePresence>
//                   {showDropdown && (
//                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-3 w-64 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
//                       <div className="p-5 border-b border-gray-800 bg-gray-800/20">
//                         <p className="text-sm font-bold text-white truncate">{displayName}</p>
//                         <p className="text-xs text-gray-500 truncate">{userInfo.email || userInfo.user?.email}</p>
//                       </div>
//                       <div className="p-2">
//                         {isAdmin && (
//                           <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 text-sm text-purple-400 hover:bg-purple-500/10 rounded-xl" onClick={() => setShowDropdown(false)}>
//                             <Shield size={16} /> Admin Panel
//                           </Link>
//                         )}
//                         <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
//                           <LogOut size={16} /> Logout
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <Link to="/login" className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2">
//                 <Zap size={16} /> Login
//               </Link>
//             )}
            
//             <button className="lg:hidden text-gray-300 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//               {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Section */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, height: 0 }} 
//             animate={{ opacity: 1, height: 'auto' }} 
//             exit={{ opacity: 0, height: 0 }} 
//             className="lg:hidden bg-gray-900 border-t border-gray-800 overflow-hidden"
//           >
//             <div className="p-4 space-y-2">
//               {navLinks.map((link) => (
//                 <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${location.pathname === link.path ? `bg-gradient-to-br ${link.gradient} text-white` : 'text-gray-300 hover:bg-gray-800'}`}>
//                   {link.icon} <span className="font-semibold">{link.name}</span>
//                 </Link>
//               ))}
//               {userInfo && (
//                 <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
//                   <LogOut size={20} /> <span className="font-semibold">Logout</span>
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;



import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, LogOut, ChevronDown, Menu, X, Home, Briefcase, 
  FolderKanban, MessageSquare, Mail, Zap, Shield 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync User from LocalStorage
  const syncUser = () => {
    try {
      const data = localStorage.getItem('user') || localStorage.getItem('userInfo');
      setUserInfo(data ? JSON.parse(data) : null);
    } catch (error) {
      setUserInfo(null);
    }
  };

  useEffect(() => {
    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    setShowDropdown(false);
    navigate('/login');
  };

  const userObj = userInfo?.user || userInfo;
  const displayName = userObj?.name || userObj?.displayName || userInfo?.email?.split('@')[0] || "User";
  const isAdmin = userObj?.role === 'admin';

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} />, color: 'text-blue-400' },
    { name: 'Services', path: '/services', icon: <Briefcase size={18} />, color: 'text-purple-400' },
    { name: 'Projects', path: '/projects', icon: <FolderKanban size={18} />, color: 'text-emerald-400' },
    { name: 'Blogs', path: '/blogs', icon: <MessageSquare size={18} />, color: 'text-amber-400' },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} />, color: 'text-rose-400' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full z-[100] top-0 bg-gray-950/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-cyan-500/50 transition-all duration-500">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white via-cyan-400 to-purple-500 bg-clip-text text-transparent uppercase">
                WEB CRAFT
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-[0.2em] uppercase">Craft Your Web</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 bg-white/5 rounded-2xl border border-white/5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-xl border border-white/10" />
                  )}
                  <span className={isActive ? link.color : 'text-current'}>{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {userInfo ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)} 
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className={`text-gray-500 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} size={14} />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.95, y: 10 }} 
                      className="absolute right-0 mt-3 w-56 bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                    >
                      <div className="px-3 py-3 mb-1 border-b border-white/5">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Account</p>
                        <p className="text-sm font-bold text-white truncate mt-1">{displayName}</p>
                      </div>
                      
                      {isAdmin && (
                        <Link to="/admin/dashboard" className="flex items-center gap-3 p-2.5 text-sm text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all" onClick={() => setShowDropdown(false)}>
                          <Shield size={16} /> Admin Panel
                        </Link>
                      )}
                      
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="relative group overflow-hidden px-6 py-2 bg-white text-black font-bold rounded-xl transition-all hover:pr-8">
                <span className="relative z-10 flex items-center gap-2 text-sm">
                  Login <Zap size={14} className="fill-current" />
                </span>
                <div className="absolute inset-0 bg-cyan-400 translate-x-[100%] group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
            )}
            
            <button className="lg:hidden p-2 text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="lg:hidden fixed inset-0 top-[72px] bg-gray-950 z-[90] p-4"
          >
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} 
                  className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-bold border transition-all ${
                    location.pathname === link.path ? 'bg-white/5 border-white/10 text-white' : 'border-transparent text-gray-500'
                  }`}>
                  <span className={location.pathname === link.path ? link.color : ''}>{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;