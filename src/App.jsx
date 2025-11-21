import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Globe, 
  Smartphone, 
  Cloud, 
  Server, 
  Code, 
  UserCheck, 
  Lock, 
  Activity, 
  AlertTriangle, 
  Award, 
  BookOpen,
  Menu,
  X,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";

export default function DeepVisionWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    { name: "Web Application VAPT", icon: <Globe className="w-12 h-12 text-cyan-400" />, desc: "Comprehensive vulnerability assessment for web apps." },
    { name: "Network Penetration Testing", icon: <Server className="w-12 h-12 text-purple-400" />, desc: "Identify weaknesses in your network infrastructure." },
    { name: "Mobile App Pentest", icon: <Smartphone className="w-12 h-12 text-blue-400" />, desc: "Security testing for iOS and Android applications." },
    { name: "Cloud Security Review", icon: <Cloud className="w-12 h-12 text-sky-400" />, desc: "AWS, Azure, and GCP security configuration reviews." },
    { name: "API Security Testing", icon: <Code className="w-12 h-12 text-indigo-400" />, desc: "Secure your APIs against OWASP Top 10 threats." },
    { name: "Source Code Review", icon: <BookOpen className="w-12 h-12 text-teal-400" />, desc: "Manual and automated code analysis for security flaws." },
    { name: "Red Teaming", icon: <AlertTriangle className="w-12 h-12 text-red-500" />, desc: "Simulated real-world cyber attacks to test defenses." },
    { name: "Social Engineering", icon: <UserCheck className="w-12 h-12 text-orange-400" />, desc: "Phishing simulations and employee awareness testing." },
    { name: "Security Hardening", icon: <Lock className="w-12 h-12 text-slate-400" />, desc: "System and server hardening based on CIS benchmarks." },
    { name: "SOC / SIEM Monitoring", icon: <Activity className="w-12 h-12 text-green-400" />, desc: "24/7 security monitoring and incident response." },
    { name: "Threat Intelligence", icon: <Shield className="w-12 h-12 text-yellow-400" />, desc: "Proactive threat hunting and intelligence gathering." },
    { name: "Cybersecurity Training", icon: <Award className="w-12 h-12 text-pink-400" />, desc: "Training for developers and staff on security best practices." },
  ];

  const pricing = [
    {
      title: "Starter Security Check",
      price: "50 KD",
      desc: "Mini scan + executive summary (ideal for small sites)",
      bullets: ["Basic web scan", "2-page summary", "Suggested fixes"],
      highlight: false
    },
    {
      title: "Professional VAPT",
      price: "200 KD",
      desc: "Full web & network VAPT with remediation report",
      bullets: ["Threat & risk rating", "PoC examples", "Remediation guidance"],
      highlight: true
    },
    {
      title: "Enterprise Retainer",
      price: "250 KD / mo",
      desc: "Managed security + monthly checks & priority support",
      bullets: ["Monthly scans", "On-call support", "SIEM tuning help"],
      highlight: false
    },
  ];

  const contactInfo = {
    phone: "+965-98935210",
    email: "deep@ubgkw.com",
    address: "Al Nafasi Tower, Kuwait City",
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071021] via-[#081428] to-[#0b1220] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      {/* HEADER */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto p-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 bg-[#071021]/90 backdrop-blur-md border-b border-slate-800/50"
      >
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => scrollToSection("home")}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">DeepVision Solution</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Cybersecurity & Risk Management
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {["Home", "Services", "Pricing", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-cyan-400 transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-slate-300 hover:text-white transition-colors"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 z-40 bg-[#071021] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-lg font-medium text-slate-300">
              {["Home", "Services", "Pricing", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left py-2 border-b border-slate-800 hover:text-cyan-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24">
        {/* HERO */}
        <section id="home" className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wide"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Now Available in Kuwait
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Secure Your Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Infrastructure
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              We secure modern businesses with focused penetration testing,
              cloud audits, and managed threat detection. Rapid delivery, clear
              remediation, and measurable risk reduction.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-3.5 rounded-lg font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-200"
              >
                Get a Free Check
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("services")}
                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-200 px-8 py-3.5 rounded-lg font-semibold transition-all duration-200"
              >
                View Services
              </motion.button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
            <div className="relative bg-[#0b1628] border border-slate-700/50 rounded-2xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-auto text-xs text-slate-500 font-mono">security_scan.sh</div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex gap-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-cyan-300">~</span>
                  <span className="text-slate-300">initiating deep_vision_scan...</span>
                </div>
                <div className="text-slate-400 pl-4">Target: 192.168.1.X</div>
                <div className="text-slate-400 pl-4">Ports: 80, 443, 8080</div>
                <div className="text-yellow-400 pl-4">Warning: Vulnerability detected (CVE-2023-XXXX)</div>
                <div className="text-slate-400 pl-4">Analyzing payload structure...</div>
                <div className="text-green-400 pl-4">Scan complete. Report generated.</div>
                <div className="flex gap-2 mt-4 animate-pulse">
                  <span className="text-green-400">➜</span>
                  <span className="text-cyan-300">~</span>
                  <span className="w-2 h-5 bg-slate-500"></span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 bg-[#050c1a]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Expertise</h3>
              <p className="text-slate-400 text-lg">
                We cover the full security lifecycle — from reconnaissance to
                remediation and monitoring.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((s) => (
                <motion.div
                  key={s.name}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="group bg-[#0b1628] hover:bg-[#0f1c30] p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="mb-4 p-3 bg-[#071021] rounded-lg w-fit group-hover:scale-110 transition-transform duration-300 border border-slate-800">
                    {s.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-slate-100">{s.name}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {s.desc}
                  </p>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="flex items-center gap-2 text-cyan-400 text-sm font-medium hover:gap-3 transition-all"
                  >
                    Get this service <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h3>
              <p className="text-slate-400 text-lg">
                Choose the security package that fits your business needs.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {pricing.map((plan) => (
                <motion.div 
                  key={plan.title} 
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className={`relative p-8 rounded-2xl border ${plan.highlight ? 'bg-[#0b1628] border-cyan-500 shadow-2xl shadow-cyan-900/20' : 'bg-[#071021] border-slate-800'} flex flex-col transition-all duration-300`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-slate-100 mb-2">{plan.title}</h4>
                  <div className="text-3xl font-extrabold text-white mb-4">{plan.price}</div>
                  <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle className="w-5 h-5 text-cyan-500 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection("contact")}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      plan.highlight 
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    Choose Plan
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 bg-[#050c1a]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6">About DeepVision</h3>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  DeepVision Solution is a premier cybersecurity consultancy based in Kuwait, dedicated to protecting businesses from the evolving landscape of digital threats.
                </p>
                <p>
                  Our team consists of certified ethical hackers, security researchers, and compliance experts who bring decades of combined experience to every engagement.
                </p>
                <p>
                  We believe that security shouldn't be a blocker, but an enabler of innovation. By identifying vulnerabilities before malicious actors do, we give you the confidence to grow your business securely.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-4 bg-[#0b1628] rounded-lg border border-slate-800">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">500+</div>
                  <div className="text-sm text-slate-500">Vulnerabilities Found</div>
                </div>
                <div className="p-4 bg-[#0b1628] rounded-lg border border-slate-800">
                  <div className="text-3xl font-bold text-purple-400 mb-1">100%</div>
                  <div className="text-sm text-slate-500">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-[#0b1628] p-8 rounded-2xl border border-slate-800">
                <h4 className="text-xl font-semibold mb-6">Why Choose Us?</h4>
                <div className="space-y-6">
                  {[
                    { title: "Certified Experts", desc: "OSCP, CISSP, and CEH certified professionals." },
                    { title: "Detailed Reporting", desc: "Actionable insights, not just automated scan results." },
                    { title: "Local Presence", desc: "Based in Kuwait with understanding of regional compliance." },
                    { title: "Post-Fix Verification", desc: "We re-test to ensure vulnerabilities are truly fixed." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-cyan-400 font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-200">{item.title}</h5>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h3>
                <p className="text-slate-400 mb-8">
                  Ready to secure your infrastructure? Contact us for a free consultation or to schedule a security assessment.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-[#0b1628] rounded-xl border border-slate-800">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Call Us</div>
                      <div className="font-semibold text-lg">{contactInfo.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-[#0b1628] rounded-xl border border-slate-800">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Email Us</div>
                      <div className="font-semibold text-lg">{contactInfo.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-[#0b1628] rounded-xl border border-slate-800">
                    <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Visit Us</div>
                      <div className="font-semibold text-lg">{contactInfo.address}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-[#0b1628] p-8 rounded-2xl border border-slate-800"
              >
                <h4 className="text-xl font-semibold mb-6">Send us a message</h4>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Name</label>
                      <input type="text" className="w-full bg-[#071021] border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Email</label>
                      <input type="email" className="w-full bg-[#071021] border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Subject</label>
                    <input type="text" className="w-full bg-[#071021] border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="Security Assessment Inquiry" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Message</label>
                    <textarea className="w-full bg-[#071021] border border-slate-700 rounded-lg px-4 py-3 text-slate-100 h-32 focus:outline-none focus:border-cyan-500 transition-colors resize-none" placeholder="Tell us about your security needs..."></textarea>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white py-3.5 rounded-lg font-bold shadow-lg shadow-cyan-500/25 transition-all duration-200 mt-2"
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#050c1a] border-t border-slate-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-500" />
            <span className="font-bold text-lg">DeepVision Solution</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} DeepVision Solution. All rights reserved.
          </div>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
