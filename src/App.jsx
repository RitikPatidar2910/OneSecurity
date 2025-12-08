import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useSpring } from "framer-motion";
import { PopupModal } from "react-calendly"; 
import {
  Globe, Smartphone, Cloud, Server, Code, UserCheck,
  Menu, CheckCircle, Mail, Phone, MapPin,
  ArrowRight, Calendar, Lock, Activity, Target, Search, 
  Footprints, FileText, ShieldCheck, ArrowUpRight,
  Send, Cpu, ChevronDown, Award, FileJson, Quote, MessageCircle, Shield, Terminal, Database, Crosshair, Network, Layers, ChevronRight
} from "lucide-react";

// --- 1. VISUAL ENGINE ---

const useMagnetic = (sensitivity = 0.5) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + offsetWidth / 2;
    const centerY = top + offsetHeight / 2;
    setPosition({ x: (clientX - centerX) * sensitivity, y: (clientY - centerY) * sensitivity });
  }, [sensitivity]);
  const handleMouseLeave = useCallback(() => setPosition({ x: 0, y: 0 }), []);
  return { ref, position, handleMouseMove, handleMouseLeave };
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 origin-left z-[60]" style={{ scaleX }} />;
};

const CyberBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let w, h;
    let particles = [];
    const particleCount = 60;
    const connectionDistance = 150;
    let mouse = { x: null, y: null };

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    class Particle {
      constructor() {
        this.x = Math.random() * w; this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1; if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = "rgba(6, 182, 212, 0.5)"; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }
    const init = () => { particles = []; for (let i = 0; i < particleCount; i++) particles.push(new Particle()); };
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((a) => {
        a.update(); a.draw();
        particles.forEach((b) => {
          const dx = a.x - b.x; const dy = a.y - b.y; const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        });
        if (mouse.x != null) {
          const dx = a.x - mouse.x; const dy = a.y - mouse.y; const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
            ctx.strokeStyle = `rgba(147, 51, 234, ${1 - distance / 200})`;
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });
    resize(); init(); animate();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animationFrameId); };
  }, []);
  return (
    <div className="fixed inset-0 z-0 bg-[#020617]">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0f172a] to-slate-950 opacity-90"></div>
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

const GlitchText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iterations) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <span className={className}>{displayText}</span>;
};

const Preloader = ({ onComplete }) => {
  useEffect(() => { const timer = setTimeout(onComplete, 2000); return () => clearTimeout(timer); }, [onComplete]);
  return (
    <motion.div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center" exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} transition={{ duration: 0.8 }}>
      <div className="relative flex items-center justify-center w-32 h-32 mb-8">
        <motion.div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute inset-2 border-4 border-transparent border-b-blue-600 rounded-full" animate={{ rotate: -360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
        <Shield className="w-12 h-12 text-white fill-cyan-500/20 relative z-10" />
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold text-white tracking-[0.2em]">ONESECURITY</h2>
        <div className="text-xs text-cyan-400 font-mono tracking-widest animate-pulse">INITIALIZING SECURITY PROTOCOLS...</div>
      </div>
    </motion.div>
  );
};

// --- NEW: STATIC CLIENT OBJECTIVE (Replaces Marquee) ---
const ClientObjective = () => {
  return (
    <div className="w-full py-20 bg-[#020617] relative overflow-hidden border-y border-slate-800/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-cyan-950/30 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
        </div>
        <h3 className="text-2xl md:text-4xl font-bold leading-relaxed text-white drop-shadow-sm">
          "Our objective is to establish <span className="text-cyan-400">long-term client confidence</span> through <span className="text-purple-400">measurable value</span> delivered with each engagement."
        </h3>
      </motion.div>
    </div>
  );
};

const FloatingWidget = ({ onWhatsapp, onCalendar }) => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
    <motion.button onClick={onCalendar} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pointer-events-auto flex items-center gap-3 bg-blue-600/90 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-blue-900/30 text-sm backdrop-blur-md border border-blue-400/20 cursor-pointer">
      <Calendar className="w-5 h-5" /> <span>Book a Call</span>
    </motion.button>
    <motion.button onClick={onWhatsapp} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1, boxShadow: ["0 0 0 rgba(34,197,94,0)", "0 0 20px rgba(34,197,94,0.6)", "0 0 0 rgba(34,197,94,0)"] }} transition={{ x: { delay: 1.2 }, boxShadow: { duration: 2, repeat: Infinity } }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pointer-events-auto flex items-center gap-3 bg-green-600/90 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-green-900/30 text-sm backdrop-blur-md border border-green-400/20 cursor-pointer">
      <MessageCircle className="w-5 h-5 fill-current" /> <span>Get Quick Quote</span>
    </motion.button>
  </div>
);

// --- 2. INNER COMPONENTS ---

const HackingTerminal = () => {
  const [lines, setLines] = useState([{ text: "Initializing OneSecurity Protocol v2.4...", color: "text-slate-400" }]);
  const hasStarted = useRef(false);
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const sequence = [
      { text: "Target Scope: Enterprise Infrastructure", color: "text-cyan-400" },
      { text: "Loading offensive modules...", color: "text-slate-500" },
      { text: "Executing passive reconnaissance...", color: "text-slate-400" },
      { text: "Scanning exposed services [Ports 80, 443, 3389]...", color: "text-yellow-400" },
      { text: "[!] CRITICAL VULNERABILITY: Unauthenticated RCE detected", color: "text-red-500 font-bold animate-pulse" },
      { text: "Simulating exploit chain...", color: "text-blue-400" },
      { text: "Access Established. Escalating privileges...", color: "text-slate-300" },
      { text: "Generating remediation report...", color: "text-green-400" },
      { text: "System Hardening Initiated.", color: "text-green-400 font-bold" },
    ];
    let delay = 0;
    sequence.forEach((line) => {
      delay += Math.random() * 800 + 500;
      setTimeout(() => setLines((prev) => [...prev.slice(-7), line]), delay);
    });
  }, []);
  return (
    <div className="relative bg-[#0b1628] border border-white/10 rounded-xl p-6 shadow-2xl font-mono text-sm overflow-hidden h-80 flex flex-col justify-between backdrop-blur-md">
      <div className="flex items-center gap-2 mb-2 border-b border-slate-800/80 pb-3">
        <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div></div>
        <div className="ml-auto text-xs text-slate-500 flex items-center gap-1"><Lock className="w-3 h-3" /> /bin/bash - root</div>
      </div>
      <div className="space-y-2 flex-1 flex flex-col justify-end">
        {lines.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className={`font-mono break-words ${line.color}`}>
            <span className="opacity-50 mr-2 text-cyan-600">$</span>{line.text}
          </motion.div>
        ))}
        <div className="w-2 h-4 bg-cyan-400 animate-pulse mt-1"></div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 drop-shadow-sm">{title}</motion.h2>
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"></motion.div>
    {subtitle && <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-slate-400 max-w-2xl mx-auto text-lg">{subtitle}</motion.p>}
  </div>
);

const ServiceCard = ({ service, scrollToSection }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);
    const width = rect.width;
    const height = rect.height;
    const rx = (y / height - 0.5) * -10; 
    const ry = (x / width - 0.5) * 10;
    setRotation({ x: rx, y: ry });
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div 
      ref={divRef}
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y, scale: opacity === 1 ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      style={{ perspective: 1000 }}
      className="relative rounded-2xl border border-slate-800 bg-[#0b1628]/40 backdrop-blur-md overflow-hidden group"
    >
      <div className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100" style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6,182,212,0.4), transparent 40%)` }} />
      <div className="absolute inset-[1px] rounded-2xl bg-[#0b1628]/90 z-0"></div>
      <div className="pointer-events-none absolute inset-0 z-0 transition duration-300" style={{ opacity, background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(6,182,212,0.1), transparent 40%)` }} />
      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className={`absolute -top-10 -right-10 w-32 h-32 ${service.glowColor} rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-all duration-500`}></div>
        <div className={`mb-6 p-3 rounded-xl w-fit ${service.bgColor} ${service.textColor} border ${service.borderColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-cyan-900/20`}>{service.icon}</div>
        <h4 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">{service.name}</h4>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow group-hover:text-slate-200 transition-colors">{service.desc}</p>
        <button onClick={() => scrollToSection("contact")} className={`flex items-center gap-2 ${service.textColor} text-sm font-bold mt-auto group-hover:gap-4 transition-all`}>Request Details <ArrowRight className="w-4 h-4" /></button>
      </div>
    </motion.div>
  );
};

const ReportTeaser = ({ scrollToSection }) => {
  return (
    <div className="relative group cursor-pointer" onClick={() => scrollToSection("contact")}>
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-[#0b1628] border border-white/10 p-8 rounded-lg flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-48 h-60 bg-white rounded shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300 hidden md:block">
          <div className="absolute inset-0 bg-slate-100 flex flex-col p-4">
            <div className="h-4 w-24 bg-slate-300 mb-4 rounded"></div>
            <div className="space-y-2"><div className="h-2 w-full bg-slate-200 rounded"></div><div className="h-2 w-full bg-slate-200 rounded"></div></div>
            <div className="mt-8 h-20 w-full bg-red-100 rounded border border-red-200 flex items-center justify-center"><span className="text-red-800 text-xs font-bold uppercase">Critical Risk</span></div>
          </div>
          <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/10 flex items-center justify-center"><div className="bg-slate-900/90 p-3 rounded-full text-cyan-400 border border-cyan-500/50 shadow-lg"><Lock className="w-6 h-6" /></div></div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-md">See What You're Paying For</h4>
          <p className="text-slate-400 mb-6">Don't guess the quality. Download a sample of our <strong>Enterprise-Grade Penetration Test Report</strong>.</p>
          <button className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-6 py-3 rounded-full font-bold transition-all flex items-center justify-center md:justify-start gap-2 mx-auto md:mx-0 w-full md:w-auto"><FileJson className="w-5 h-5" /> Request Sample PDF</button>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const reviews = [
    { text: "OneSecurity found a critical payment gateway flaw that 3 other vendors missed. Truly elite hackers.", author: "......................." },
    { text: "The remediation report was so clear our junior developers fixed the issues in 24 hours. Highly recommended.", author: "......................." },
    { text: "Professional, discreet, and devastatingly effective. They hacked us before the bad guys could.", author: "......................." }
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => { const timer = setInterval(() => setIndex(prev => (prev + 1) % reviews.length), 5000); return () => clearInterval(timer); }, [reviews.length]);
  return (
    <div className="bg-[#0b1628]/50 p-8 rounded-2xl border border-white/10 text-center relative overflow-hidden backdrop-blur-sm">
      <Quote className="absolute top-4 left-4 w-12 h-12 text-slate-700 opacity-50" />
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="relative z-10">
          <p className="text-xl md:text-2xl text-slate-300 font-light italic mb-6">"{reviews[index].text}"</p>
          <p className="text-cyan-400 font-bold uppercase tracking-wider text-sm">{reviews[index].author}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CyberInput = ({ label, name, type = "text", value, onChange, required = false }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative group">
      <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused || value ? '-top-6 text-xs text-cyan-400' : 'top-3 text-sm text-slate-500'}`}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea name={name} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} className="w-full bg-transparent border-b border-slate-700 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors resize-none h-32" />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} className="w-full bg-transparent border-b border-slate-700 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" />
      )}
      <div className={`absolute bottom-0 left-0 h-[1px] bg-cyan-500 transition-all duration-500 ${focused ? 'w-full' : 'w-0'}`}></div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left hover:text-cyan-400 transition-colors">
        <span className="text-lg font-medium text-slate-200">{question}</span><ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : "text-slate-500"}`} />
      </button>
      <AnimatePresence>{isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="pb-6 text-slate-400 leading-relaxed">{answer}</p></motion.div>)}</AnimatePresence>
    </div>
  );
};

const Counter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (isInView) {
      let start = 0; const end = parseInt(value.substring(0, 3)); const duration = 2000; const increment = end / (duration / 16);
      const timer = setInterval(() => { start += increment; if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(Math.floor(start)); } }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  return (<div ref={ref} className="text-center"><div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">{count}{value.includes("+") ? "+" : "%"}</div><div className="text-sm text-cyan-400 font-medium tracking-wider uppercase">{label}</div></div>);
};

// --- 3. NEW: FLOW CONNECTOR (THE VISIBLE ARROW) ---
const FlowConnector = ({ vertical = false }) => {
  return (
    <div className={`flex items-center justify-center opacity-70 ${vertical ? 'py-4 rotate-90 lg:rotate-0' : 'px-2'}`}>
      <motion.div 
        className="relative"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg width="80" height="20" viewBox="0 0 80 20" className="w-16 md:w-24 overflow-visible">
          {/* Main Dashed Line */}
          <line x1="0" y1="10" x2="70" y2="10" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Moving Dash Animation */}
          <motion.line 
            x1="0" y1="10" x2="70" y2="10" 
            stroke="#06b6d4" 
            strokeWidth="2" 
            strokeDasharray="4 8"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -200 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
          
          {/* Arrow Head */}
          <path d="M70 5 L78 10 L70 15" fill="none" stroke="#06b6d4" strokeWidth="2" />
        </svg>
      </motion.div>
    </div>
  );
};

// --- NEW: METHODOLOGY HOVER CARD (FIXED Z-INDEX) ---
const MethodologyCard = ({ phase }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative flex flex-col items-center text-center group cursor-pointer w-full md:w-48 transition-all duration-300 ${isHovered ? 'z-50' : 'z-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-16 h-16 rounded-full bg-[#0b1628] border-2 transition-all duration-300 flex items-center justify-center mb-4 relative ${isHovered ? 'border-cyan-400 scale-110 shadow-[0_0_20px_rgba(6,182,212,0.6)]' : 'border-cyan-500/50'}`}>
        {React.cloneElement(phase.icon, { className: `w-8 h-8 transition-colors duration-300 ${isHovered ? 'text-cyan-300' : 'text-cyan-400'}` })}
        {/* Mobile Arrow (Points Down) */}
        <div className="absolute -bottom-8 lg:hidden animate-bounce text-cyan-500/50"><ChevronDown className="w-6 h-6" /></div>
      </div>
      <h4 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{phase.title}</h4>
      <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors h-10">{phase.desc}</p>

      {/* HOLO-INFO CARD */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[280px] md:w-[320px] bg-[#050c1a]/95 border border-cyan-500/40 rounded-xl p-5 shadow-2xl z-50 backdrop-blur-xl"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#050c1a] border-t border-l border-cyan-500/40 transform rotate-45"></div>
            <h5 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Phase Details
            </h5>
            <p className="text-slate-300 text-sm leading-relaxed mb-4 text-left">{phase.details}</p>
            <div className="border-t border-slate-800 pt-3 text-left">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Tools We Use:</span>
              <div className="flex flex-wrap gap-2">
                {phase.tools.map(tool => (
                  <span key={tool} className="px-2 py-1 bg-cyan-900/30 border border-cyan-500/20 rounded text-[10px] text-cyan-300 font-mono">{tool}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 4. MAIN APP ---

export default function OneSecuritySolutionWebsite() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState({ submitting: false, succeeded: false, errors: [] });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const magneticConsultation = useMagnetic(0.2);
  const magneticServices = useMagnetic(0.2);

  const heroSlides = [
    { id: 1, headlineFirst: "We Hack You", headlineSecond: "Before They Do.", gradient: "from-cyan-400 via-blue-500 to-purple-600", subtext: "Uncover hidden vulnerabilities with elite, manual penetration testing. We move beyond automated scanning to simulate real-world attacks." },
    { id: 2, headlineFirst: "Secure Your", headlineSecond: "Digital Workspace.", gradient: "from-green-400 via-emerald-500 to-teal-600", subtext: "Protect your remote assets, cloud infrastructure, and endpoints from ransomware and data breaches with our comprehensive security audits." },
    { id: 3, headlineFirst: "Compliance Without", headlineSecond: "Complexity.", gradient: "from-orange-400 via-amber-500 to-red-500", subtext: "Meet industry standards (ISO, PCI-DSS, SAMA) effortlessly. We provide detailed reports and remediation guidance to ensure you pass every audit." },
    { id: 4, headlineFirst: "Fortify Your", headlineSecond: "Financial Assets.", gradient: "from-yellow-400 via-amber-500 to-orange-600", subtext: "Bank-grade security testing designed for FinTech and Banking sectors. We ensure transaction security and data integrity." },
  ];

  const services = [
    { name: "Web Application VAPT", icon: <Globe />, textColor: "text-cyan-400", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/20", hoverColor: "group-hover:bg-cyan-500/20", glowColor: "bg-cyan-500/5", desc: "We test against OWASP Top 10 and business logic flaws. Output includes developer-ready remediation steps and risk scoring." },
    { name: "Network Penetration Testing", icon: <Server />, textColor: "text-purple-400", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/20", hoverColor: "group-hover:bg-purple-500/20", glowColor: "bg-purple-500/5", desc: "Identifying unpatched services, weak encryption, and open entry points in your internal/external infrastructure." },
    { name: "Mobile App Security", icon: <Smartphone />, textColor: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/20", hoverColor: "group-hover:bg-blue-500/20", glowColor: "bg-blue-500/5", desc: "Deep-dive analysis of iOS & Android apps checking for insecure storage, API leaks, and reverse engineering risks." },
    { name: "Cloud Config Review", icon: <Cloud />, textColor: "text-sky-400", bgColor: "bg-sky-500/10", borderColor: "border-sky-500/20", hoverColor: "group-hover:bg-sky-500/20", glowColor: "bg-sky-500/5", desc: "Analyzing your cloud tenant against benchmarks to detect weak access controls and risky sharing permissions." },
    { name: "API Security Testing", icon: <Code />, textColor: "text-indigo-400", bgColor: "bg-indigo-500/10", borderColor: "border-indigo-500/20", hoverColor: "group-hover:bg-indigo-500/20", glowColor: "bg-indigo-500/5", desc: "Rigorous testing of REST/GraphQL APIs for broken object level authorization (BOLA) and injection attacks." },
    { name: "Social Engineering", icon: <UserCheck />, textColor: "text-orange-400", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/20", hoverColor: "group-hover:bg-orange-500/20", glowColor: "bg-orange-500/5", desc: "Realistic phishing campaigns to identify employee vulnerability and improve organizational awareness." },
  ];

  const faqs = [
    { question: "Will penetration testing disrupt my business operations?", answer: "No. We prioritize non-disruptive testing methods. For critical production environments, we carefully schedule scans and exploitation attempts during off-peak hours to ensure zero downtime." },
    { question: "How long does a typical assessment take?", answer: "A standard web application or network test typically takes 5-10 business days, depending on the scope and complexity. We provide a preliminary timeline after the initial scoping call." },
    { question: "Do you provide a re-test after we fix the issues?", answer: "Yes! All our Professional and Enterprise packages include a complimentary re-test within 30 days to verify that your team has successfully remediated the identified vulnerabilities." },
    { question: "What standards do you follow?", answer: "We adhere to industry-standard methodologies including OWASP Top 10 for web/API, PTES, and NIST guidelines to ensure compliance with ISO 27001, PCI-DSS, and SAMA." },
    { question: "Do you sign an NDA before starting?", answer: "Absolutely. Confidentiality is our top priority. We sign a strict Non-Disclosure Agreement (NDA) before any information is exchanged to ensure your data and intellectual property remain 100% secure." },
    { question: "What happens if you find a critical vulnerability during the test?", answer: "We notify you immediately. We do not wait for the final report. If we find a high-risk flaw (like an SQL Injection or RCE), we trigger an immediate alert so your team can patch it right away." },
    { question: "What is the difference between Black Box, White Box, and Grey Box testing?", answer: "Black Box simulates a real-world attack with no prior knowledge. White Box is a full audit with complete system access (source code/credentials). Grey Box is a hybrid approach (partial access), offering the best balance of depth and speed. We recommend Grey Box for most clients." },
    { question: "How is the pricing determined?", answer: "Pricing depends on the scope: number of IP addresses, web pages, user roles, and complexity of the logic. We don't believe in 'one size fits all.' Contact us for a custom quote tailored to your specific infrastructure." }
  ];

  const pentestPhases = [
    { 
      title: "1. Reconnaissance", 
      icon: <Search />, 
      desc: "Passive intelligence gathering.",
      details: "We simulate a real adversary by mapping your digital footprint using advanced OSINT techniques. We identify subdomains, leaked credentials, and exposed assets without triggering alerts.",
      tools: ["Maltego", "Shodan", "TheHarvester", "Recon-ng"]
    },
    { 
      title: "2. Enumeration", 
      icon: <Target />, 
      desc: "Active scanning & fingerprinting.",
      details: "We perform deep-dive fingerprinting of services to identify version-specific vulnerabilities, misconfigurations, and weak entry points in your attack surface.",
      tools: ["Nmap", "Nessus", "Nikto", "OpenVAS"]
    },
    { 
      title: "3. Exploitation", 
      icon: <Crosshair />, 
      desc: "Controlled intrusion attempts.",
      details: "We execute surgical strikes using custom payloads to exploit identified flaws (e.g., RCE, SQLi). This proves the real-world business impact of the vulnerability.",
      tools: ["Metasploit", "Burp Suite", "SQLMap", "Hydra"]
    },
    { 
      title: "4. Post-Exploitation", 
      icon: <Network />, 
      desc: "Lateral movement & pivoting.",
      details: "Simulating an APT (Advanced Persistent Threat), we pivot through your network, escalate privileges, and identify high-value targets ('Crown Jewels') to demonstrate the full kill chain.",
      tools: ["Mimikatz", "BloodHound", "Empire", "Cobalt Strike"]
    },
    { 
      title: "5. Reporting", 
      icon: <FileText />, 
      desc: "Strategic risk assessment.",
      details: "We translate technical findings into actionable business intelligence. Our report includes executive summaries, CVSS risk scoring, and evidence-backed remediation steps.",
      tools: ["Dradis", "Custom Scripts", "CVSS Calculator"]
    },
    { 
      title: "6. Remediation", 
      icon: <ShieldCheck />, 
      desc: "Hardening & re-verification.",
      details: "We don't just break it; we help fix it. We provide developer-ready patches and conduct a comprehensive re-test to ensure the security gap is permanently closed.",
      tools: ["Patch Verification", "Regression Testing"]
    },
  ];

  const pricing = [
    { title: "Starter VA Check", price: "Contact for Quote", desc: "Ideal for small sites needing a security baseline.", bullets: ["Automated Vulnerability Scan", "Executive Summary Report", "High-level Fix Suggestions"], highlight: false },
    { title: "Professional Pentest", price: "Contact for Quote", desc: "Comprehensive manual testing for compliance & real risk reduction.", bullets: ["Full Manual Exploitation", "Proof-of-Concept Evidence", "Detailed Remediation Guide", "One Free Re-test"], highlight: true },
    { title: "Enterprise Retainer", price: "Contact for Quote", desc: "Continuous security partnership throughout the year.", bullets: ["Quarterly/Half-yearly Tests", "Priority On-call Support", "Continuous Asset Monitoring"], highlight: false },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus({ submitting: true, succeeded: false, errors: [] });
    try {
      const response = await fetch("https://formspree.io/f/xanzpzrg", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (response.ok) {
        setStatus({ submitting: false, succeeded: true, errors: [] });
        const waNumber = "96598935210";
        const waMessage = `*New Security Inquiry*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
        window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else { setStatus({ submitting: false, succeeded: false, errors: ["Submission failed"] }); }
    } catch (error) { setStatus({ submitting: false, succeeded: false, errors: ["Network error"] }); }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }
  };
  
  const handleWhatsappClick = () => {
    const message = encodeURIComponent("Hello, I would like to request a quote for your security services.");
    window.open(`https://wa.me/96598935210?text=${message}`, "_blank");
  };

  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

  return (
    <>
      <AnimatePresence>{loading && <Preloader onComplete={() => setLoading(false)} />}</AnimatePresence>
      {!loading && (
        <div className="min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-x-hidden">
          
          <ScrollProgress />
          <CyberBackground />

          {/* NAVIGATION */}
          <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="max-w-7xl mx-auto p-4 md:p-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 bg-[#050c1a]/80 backdrop-blur-xl border-b border-slate-800/50 supports-[backdrop-filter]:bg-[#050c1a]/60">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection("home")}>
              <div className="relative p-0.5 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg"><img src="/icon.png" alt="Logo" className="w-10 h-10 rounded-lg relative z-10 bg-[#050c1a] p-1" /></div>
              <div><h1 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors leading-none">OneSecuritySolution</h1><p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5 group-hover:text-slate-300 transition-colors">Your Security is Our Service</p></div>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              {["Home", "Services", "Fundamentals", "Pricing", "Contact"].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-white transition-colors relative group py-2">
                  {item}<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-300 hover:text-white"><Menu /></button>
          </motion.header>

          <main className="relative z-10">
            {/* HERO */}
            <section id="home" className="pt-32 pb-10 md:pt-40 md:pb-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
                <motion.div variants={fadeInUp} animate={{ borderColor: ["rgba(6,182,212,0.3)", "rgba(6,182,212,1)", "rgba(6,182,212,0.3)"], boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 15px rgba(6,182,212,0.5)", "0 0 0px rgba(6,182,212,0)"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-cyan-500/30">
                  <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>NOW AVAILABLE IN KUWAIT 
                </motion.div>
                <div className="min-h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentSlide} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 1.05 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                        <GlitchText text={heroSlides[currentSlide].headlineFirst} className="block" />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${heroSlides[currentSlide].gradient}`}>
                           {heroSlides[currentSlide].headlineSecond}
                        </span>
                      </h2>
                      <p className="text-lg text-slate-400 max-w-xl leading-relaxed">{heroSlides[currentSlide].subtext}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex gap-2">{heroSlides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-cyan-400' : 'bg-slate-700 hover:bg-slate-500'}`} />)}</div>
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                  <motion.button ref={magneticConsultation.ref} onMouseMove={magneticConsultation.handleMouseMove} onMouseLeave={magneticConsultation.handleMouseLeave} animate={{ x: magneticConsultation.position.x, y: magneticConsultation.position.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} onClick={() => setCalendarOpen(true)} className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg transition-all scale-100 active:scale-95">Schedule Free Consultation</motion.button>
                  <motion.button ref={magneticServices.ref} onMouseMove={magneticServices.handleMouseMove} onMouseLeave={magneticServices.handleMouseLeave} animate={{ x: magneticServices.position.x, y: magneticServices.position.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} onClick={() => scrollToSection("services")} className="bg-[#0b1628]/80 border border-slate-700 hover:border-cyan-500/50 text-slate-200 px-8 py-4 rounded-lg font-semibold hover:bg-[#0f1c30] transition-all">View Our Services</motion.button>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block relative group"><div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div><HackingTerminal /></motion.div>
            </section>

            {/* STATIC CLIENT OBJECTIVE (Replaces Marquee) */}
            <ClientObjective />

            {/* FUNDAMENTALS (Original VA vs PT) */}
            <section id="fundamentals" className="py-24 bg-[#030812]/50">
              <div className="max-w-7xl mx-auto px-6">
                 <SectionTitle title="Understanding the Core" subtitle="Clients often confuse Vulnerability Assessment with Penetration Testing. Here is the difference." />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                   <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>
                   
                   {/* VA CARD */}
                   <motion.div initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} viewport={{once:true}} className="bg-[#0b1628]/60 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-yellow-500/30 transition-all">
                     <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 mb-6"><Activity /></div>
                     <h3 className="text-2xl font-bold mb-4">Vulnerability Assessment (VA)</h3>
                     <p className="text-slate-400 mb-6">A broad, automated scan to find *what* weaknesses exist on the surface.</p>
                     <ul className="space-y-4 text-sm text-slate-300">
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-yellow-500" /> <span><strong>Goal:</strong> List all potential vulnerabilities.</span></li>
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-yellow-500" /> <span><strong>Method:</strong> Automated Scanning Tools.</span></li>
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-yellow-500" /> <span><strong>Depth:</strong> Surface-level (Breadth over depth).</span></li>
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-yellow-500" /> <span><strong>Result:</strong> High false positives (Requires verification).</span></li>
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-yellow-500" /> <span><strong>Cost:</strong> Lower cost, faster execution.</span></li>
                     </ul>
                   </motion.div>

                   {/* PT CARD */}
                   <motion.div initial={{opacity:0, x:30}} whileInView={{opacity:1, x:0}} viewport={{once:true}} className="bg-[#0b1628]/60 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all relative overflow-hidden">
                     <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full"></div>
                     <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 mb-6"><Target /></div>
                     <h3 className="text-2xl font-bold mb-4">Penetration Testing (PT)</h3>
                     <p className="text-slate-400 mb-6">A goal-oriented, manual simulation of a real attack to test *if* flaws can be exploited.</p>
                     <ul className="space-y-4 text-sm text-slate-300">
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400" /> <span><strong>Goal:</strong> Validate real-world business risk.</span></li>
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400" /> <span><strong>Method:</strong> Manual Human Ethical Hacking.</span></li>
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400" /> <span><strong>Depth:</strong> Deep-dive into business logic.</span></li>
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400" /> <span><strong>Result:</strong> Zero false positives (Verified Exploits).</span></li>
                       <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-cyan-400" /> <span><strong>Cost:</strong> Higher value, expert-driven.</span></li>
                     </ul>
                   </motion.div>
                 </div>
              </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="py-24"><div className="max-w-7xl mx-auto px-6"><SectionTitle title="Offensive Security Services" subtitle="We go beyond standard checklists." /><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((s, i) => (<ServiceCard key={s.name} service={{ ...s, icon: React.cloneElement(s.icon, { className: "w-8 h-8" }) }} scrollToSection={scrollToSection} />))}</div></div></section>

            {/* ABOUT & REPORTING */}
            <section id="about" className="py-24 bg-[#030812]/50 relative">
              <div className="max-w-7xl mx-auto px-6">
                <SectionTitle title="Our Methodology" subtitle="Rigorous, industry-standard approach." />
                
                {/* VISUAL METHODOLOGY FLOW */}
                <div className="mb-24 flex flex-col lg:flex-row flex-wrap justify-center gap-y-12 gap-x-2 items-center relative z-10">
                  {pentestPhases.map((phase, i) => (
                    <React.Fragment key={i}>
                      <MethodologyCard phase={phase} />
                      {/* Insert Arrow between cards (except the very last one) */}
                      {i < pentestPhases.length - 1 && (
                        <FlowConnector vertical={window.innerWidth < 1024} /> 
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                  <ReportTeaser scrollToSection={scrollToSection} />
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 drop-shadow-md">What Our Clients Say</h3>
                      <Testimonials />
                    </div>
                    <div className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-8">
                      <Counter value="500+" label="Vulnerabilities" />
                      <Counter value="100%" label="Success Rate" />
                      <Counter value="50+" label="Projects" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-10">
                  <p className="text-center text-slate-500 mb-6 uppercase tracking-widest text-sm font-bold">Standards & Certifications We Follow</p>
                  <div className="flex flex-wrap justify-center gap-4 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {["OWASP Top 10", "ISO 27001", "PCI-DSS", "MITRE ATT&CK", "NIST", ].map((cert) => (<div key={cert} className="flex items-center gap-2 border border-slate-700 rounded-full px-4 py-2 bg-slate-900/50"><Award className="w-4 h-4 text-cyan-500" /> <span className="font-bold text-slate-300">{cert}</span></div>))}
                  </div>
                </div>
              </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="py-24"><div className="max-w-7xl mx-auto px-6"><SectionTitle title="Transparent Pricing" subtitle="Tailored security packages." /><div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">{pricing.map((plan, i) => (<div key={plan.title} className={`relative p-8 rounded-2xl border flex flex-col transition-all duration-300 ${plan.highlight ? 'bg-[#0b1628] border-cyan-500 shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] md:scale-105 z-10' : 'bg-[#0b1628]/40 border-white/10'}`}>{plan.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">Most Popular</div>}<h4 className="text-xl font-bold mb-2">{plan.title}</h4><div className="text-2xl lg:text-3xl font-bold text-white mb-4">{plan.price}</div><p className="text-slate-400 text-sm mb-6">{plan.desc}</p><ul className="space-y-4 mb-8 flex-1">{plan.bullets.map((bullet) => (<li key={bullet} className="flex items-start gap-3 text-sm text-slate-300"><CheckCircle className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-cyan-400' : 'text-slate-500'}`} /> {bullet}</li>))}</ul><button onClick={() => scrollToSection("contact")} className={`w-full py-3 rounded-lg font-bold transition-all ${plan.highlight ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}>Get Started</button></div>))}</div></div></section>

            {/* FAQ */}
            <section className="py-24 bg-[#030812]/50"><div className="max-w-3xl mx-auto px-6"><SectionTitle title="Frequently Asked Questions" subtitle="Common questions about our process." /><div className="space-y-2">{faqs.map((faq, i) => (<FAQItem key={i} question={faq.question} answer={faq.answer} />))}</div></div></section>

            {/* CONTACT */}
            <section id="contact" className="py-24 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"><svg width="100%" height="100%"><pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor" className="text-cyan-500" /></pattern><rect width="100%" height="100%" fill="url(#dot-pattern)" /></svg></div>
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h3 className="text-4xl font-bold mb-6">Let's Secure Your Infrastructure</h3>
                  <p className="text-slate-400 mb-10 text-lg leading-relaxed">Ready to find your weak points before attackers do? Contact us for a free consultation.</p>
                  <div className="space-y-6">
                    <a href="tel:+919636357382" className="flex items-center gap-6 p-6 bg-[#0b1628]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all group"><div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-all group-hover:scale-110"><Phone className="w-6 h-6" /></div><div><div className="text-xs text-cyan-400 uppercase font-bold tracking-wider mb-1">Call Us Directly</div><div className="text-xl font-semibold text-white">+91-9636357382</div></div></a>
                    <a href="mailto:contact@onesecuritysolution.com" className="flex items-center gap-6 p-6 bg-[#0b1628]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all group"><div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-all group-hover:scale-110"><Mail className="w-6 h-6" /></div><div><div className="text-xs text-purple-400 uppercase font-bold tracking-wider mb-1">Send an Email</div><div className="text-xl font-semibold text-white">contact@onesecuritysolution.com</div></div></a>
                    <div className="flex items-center gap-6 p-6 bg-[#0b1628]/80 backdrop-blur-sm rounded-xl border border-slate-700/50"><div className="w-14 h-14 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400"><MapPin className="w-6 h-6" /></div><div><div className="text-xs text-pink-400 uppercase font-bold tracking-wider mb-1">Global Presence</div><div className="text-xl font-semibold text-white">Kuwait & Bangalore, India</div></div></div>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#0b1628]/90 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl relative">
                  <div className="absolute top-0 right-0 p-4 opacity-20"><Cpu className="w-24 h-24 text-cyan-500" /></div>
                  <h4 className="text-2xl font-bold mb-2 relative z-10 text-white">Initialize Communication</h4>
                  <p className="text-slate-400 mb-8 text-sm">Secure Channel Encrypted</p>
                  <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CyberInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
                      <CyberInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <CyberInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    <CyberInput label="Subject" name="subject" value={formData.subject} onChange={handleChange} required />
                    <CyberInput label="Message" name="message" type="textarea" value={formData.message} onChange={handleChange} required />
                    <AnimatePresence>
                        {status.succeeded && <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Message sent! Opening WhatsApp...</motion.div>}
                        {status.errors.length > 0 && <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">Something went wrong. Try again.</motion.div>}
                    </AnimatePresence>
                    <button disabled={status.submitting} className={`w-full group bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 ${status.submitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}>
                      {status.submitting ? "Transmitting..." : <>Send Message <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                  </form>
                </motion.div>
              </div>
            </section>
          </main>

          <footer className="bg-[#030812] border-t border-slate-800/50 py-12 relative z-10"><div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6"><div className="flex items-center gap-3"><div className="p-1 bg-gradient-to-br from-cyan-800 to-purple-800 rounded-lg"><img src="/icon.png" alt="Logo" className="w-8 h-8 rounded bg-[#050c1a] p-0.5" /></div><span className="font-bold text-xl text-slate-200">OneSecuritySolution</span></div><div className="text-slate-500 text-sm">© {new Date().getFullYear()} OneSecuritySolution. All rights reserved.</div><div className="flex gap-8 text-slate-400 font-medium"><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></div></div></footer>

          <FloatingWidget onWhatsapp={handleWhatsappClick} onCalendar={() => setCalendarOpen(true)} />
          <PopupModal url="https://calendly.com/hackerdeep36/30min" onModalClose={() => setCalendarOpen(false)} open={calendarOpen} rootElement={document.getElementById("root")} />
        </div>
      )}
    </>
  );
}