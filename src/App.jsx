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

export default function OneSecuritySolutionWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState({
    submitting: false,
    succeeded: false,
    errors: []
  });

  const [hoveredNav, setHoveredNav] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, succeeded: false, errors: [] });

    try {
      const response = await fetch("https://formspree.io/f/xanzpzrg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ submitting: false, succeeded: true, errors: [] });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        setStatus({ submitting: false, succeeded: false, errors: data.errors || ["Submission failed"] });
      }
    } catch (error) {
      setStatus({ submitting: false, succeeded: false, errors: ["Network error"] });
    }
  };

  const services = [
    { name: "Web Application VAPT", icon: <Globe className="w-12 h-12 text-cyan-400" />, desc: "We protect your business by simulating real-world cyberattacks on your web applications to uncover critical security vulnerabilities such as data leaks, broken authentication, and business logic errors—before hackers can exploit them. Our process goes beyond basic automated scanning to include deep manual analysis, resulting in a clear, actionable remediation roadmap. We provide your team with verified proof of every flaw, priority scoring based on risk, and precise code-level instructions, ensuring you have exactly what you need to fix issues rapidly and fortify your digital defense." },
    { name: "Network Penetration Testing", icon: <Server className="w-12 h-12 text-purple-400" />, desc: "We fortify your organization’s backbone by conducting rigorous security assessments on your internal and external network infrastructure, identifying hidden risks such as unpatched servers, weak encryption, and open entry points that attackers target. Our experts simulate real-world intrusion attempts to validate these weaknesses, delivering a comprehensive report that provides your IT team with prioritized remediation steps and precise technical solutions to close security gaps, prevent unauthorized access, and ensure your critical systems remain resilient against compromise." },
    { name: "Mobile App Pentest", icon: <Smartphone className="w-12 h-12 text-blue-400" />, desc: "We secure your mobile ecosystem by performing deep-dive security assessments on both iOS and Android applications, meticulously testing for vulnerabilities like insecure data storage, weak encryption, and unauthorized API access. By analyzing your app’s code and simulating real-world attacks on user devices, we uncover critical flaws that could lead to data theft or account takeovers. We then provide a detailed remediation guide with specific code fixes and configuration changes, enabling your developers to harden your app against reverse engineering and ensure safe, secure mobile experiences for your users." },
    { name: "M365 Security Assessment", icon: <Cloud className="w-12 h-12 text-sky-400" />, desc: "We harden your corporate collaboration environment by conducting a comprehensive configuration review of your Microsoft 365 tenant, identifying critical security gaps in Exchange, SharePoint, Teams, and Entra ID that leave you vulnerable to Business Email Compromise and data leakage. Our experts analyze your specific settings against industry benchmarks to detect weak access controls and risky sharing permissions, delivering a prioritized remediation roadmap that allows your IT team to immediately implement strict identity protection policies and close entry points for attackers." },
    { name: "API Security Testing", icon: <Code className="w-12 h-12 text-indigo-400" />, desc: "We protect the core of your application architecture by performing rigorous security testing on your REST and GraphQL APIs to identify critical vulnerabilities such as Broken Object Level Authorization (BOLA), injection attacks, and business logic flaws that standard scanners often miss. Our experts simulate sophisticated attacks to uncover unauthorized access points and data leakage risks, delivering a precise, developer-friendly remediation guide that enables your team to fix security gaps at the code level and ensure your backend integrations are immune to exploitation." },
    { name: "Source Code Review", icon: <BookOpen className="w-12 h-12 text-teal-400" />, desc: "We strengthen your software security from the inside out by conducting a deep-dive analysis of your source code, combining automated scanning with expert manual review to identify critical flaws like hardcoded credentials, injection vulnerabilities, and insecure logic. Our process catches vulnerabilities early in the development lifecycle to minimize cost and risk, providing your engineers with precise remediation guidance and secure coding best practices to eliminate threats before your application ever goes live." },
    { name: "Social Engineering Awareness Training", icon: <UserCheck className="w-12 h-12 text-orange-400" />, desc: "We transform your workforce into your strongest line of defense by conducting realistic phishing simulations and social engineering campaigns to identify employees susceptible to manipulation and fraud. Our approach goes beyond generic training by testing your team with up-to-date attack scenarios, delivering detailed risk metrics and targeted educational content that empowers your staff to recognize threats, thereby drastically reducing the risk of ransomware and data breaches caused by human error." },

  ];

  const pricing = [
    {
      title: "Starter Security Check (Vulnerability Assessment)",
      price: "500-1000 KWD",
      desc: "Assest Scan + executive summary (Ideal for small sites)",
      bullets: ["Vulnerability Assessment", "summary of findings", "Suggested fixes"],
      highlight: false
    },
    {
      title: "Professional VA & PT",
      price: "For Price Contact Us",
      desc: "Detailed Web & Network VAPT with remediation report (Ideal for Medium & Large sites)",
      bullets: ["Complete VAPT", "PoC examples", "Remediation guidance"],
      highlight: true
    },
    {
      title: "Enterprise Retainer",
      price: "For Price Contact Us",
      desc: "Detailed Web & Network VAPT with remediation report + Quarterly & Half yearly checks & priority support",
      bullets: ["Quarterly & Half yearly test", "On-call support", "Post Remediation Retest"],
      highlight: false
    },
  ];

  const contactInfo = {
    phone: "+91-9636357382",
    email: "contact@onesecuritysolution.com",
    address: "Panathur, Bangalore",
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
          <img src="/icon.png" alt="ONE Security Solution Logo" className="w-12 h-12 rounded-lg object-contain bg-white/10 p-0.5" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">One Security Solution</h1>
            <p className="text-[12px] text-slate-400 uppercase tracking-wider font-semibold">
              Your Security is Our Service
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {["Home", "Services", "Pricing", "About", "Contact"].map((item) => (
            <div 
              key={item} 
              className="relative py-4"
              onMouseEnter={() => setHoveredNav(item)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <button
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-cyan-400 transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {/* Dropdown for Services */}
              <AnimatePresence>
                {item === "Services" && hoveredNav === "Services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-72 p-2 bg-[#0b1628]/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl flex flex-col gap-1 z-50"
                  >
                    {services.map((s) => (
                      <div 
                        key={s.name} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group/item" 
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection("services");
                          setHoveredNav(null);
                        }}
                      >
                        <div className="p-2 rounded-md bg-cyan-500/10 text-cyan-400 group-hover/item:bg-cyan-500 group-hover/item:text-white transition-colors">
                          {React.cloneElement(s.icon, { className: "w-5 h-5" })}
                        </div>
                        <span className="text-slate-200 font-medium text-sm group-hover/item:text-white">{s.name}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wide"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              We will Available soon in Kuwait
            </motion.div>
            <h2 className="text-2xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Discover, Exploit & Remediate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Stay Secure
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              We help modern businesses uncover hidden vulnerabilities, assess real-world risks, and implement actionable fixes. With focused penetration testing, comprehensive cloud audits, and managed threat detection, we deliver rapid results, clear remediation, and measurable risk reduction—so your business can innovate confidently and securely.
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
                  <span className="text-cyan-500">Enumerations to exploit...</span>
                </div>
                <div className="text-slate-400 pl-4">Nmap -sV -sS -A 192.168.1.X .....</div>
                <div className="text-slate-400 pl-4">Discovered Services: 80 (http), 443(https), 22(ssh)....</div>
                <div className="text-yellow-400 pl-4">Warning: Vulnerable SSH version detected on port 22</div>
                <div className="text-red-400 pl-4"> Metasploit Module...use auxiliary/scanner/ssh/ssh_enumusers...</div>
                <div className="text-slate-400 pl-4">Set Rhost 192.168.1.X </div>
                <div className="text-slate-400 pl-4">Set Rport 22 </div>
                <div className="text-slate-400 pl-4">Exploit </div>
                <div className="text-green-400 pl-4">Found ssh usernames internal-admin,sec-admin.... </div>
                <div className="flex gap-2 mt-4 animate-pulse">
                  <span className="text-green-500">➜</span>
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
                We deliver comprehensive penetration testing services, covering every phase from reconnaissance and attack surface mapping to exploitation, remediation support, and continuous security validation.
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
                  className="group bg-[#0b1628] hover:bg-[#0f1c30] p-6 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="mb-4 p-3 bg-[#071021] rounded-lg w-fit group-hover:scale-110 transition-transform duration-300 border border-slate-800">
                    {React.cloneElement(s.icon, { className: "w-12 h-12 text-cyan-400" })}
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-slate-100">{s.name}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {s.desc}
                  </p>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="flex items-center gap-2 text-cyan-400 text-sm font-medium hover:gap-3 transition-all mt-auto"
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
                  <div className="text-3xl font-bold text-white mb-4">{plan.price}</div>
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
                    Contact Us
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
              <h3 className="text-3xl md:text-4xl font-bold mb-6">About One Security Solution</h3>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  OneSecuritySolution is Kuwait’s premier cybersecurity consultancy specializing in penetration testing, vulnerability assessments, and security advisory services. In today’s rapidly evolving digital landscape, cyber threats are becoming more sophisticated, and businesses face constant risks from attackers seeking to exploit system weaknesses.
                </p>
                <p>
                  Our team consists of certified ethical hackers, security researchers, and compliance experts who bring decades of combined experience to every engagement.
                </p>
                <p>
                  We deliver more than reports, We provide strategic insights that translate technical findings into real business value. With OneSecuritySolution, penetration testing becomes an investment in your business’s security, resilience, and future success.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-4 bg-[#0b1628] rounded-lg border border-slate-800">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">1000+</div>
                  <div className="text-sm text-slate-500">Our Experts Have Discovered 1000+ Vulnerabilities Across Multiple Clients</div>
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
                    { title: "Certified Experts", desc: "We bring elite technical talent. Our engineers are OSCP and CEH certified, ensuring deep offensive knowledge and industry-standard testing for your organization." },
                    { title: "Detailed Reporting", desc: "We move beyond automated noise to deliver manually validated, actionable reports. You get clear, evidence-backed insights and precise fixes that your team can implement immediately to resolve risks." },
                    { title: "Local Presence", desc: "We are a Kuwait-based team dedicated to aligning your defenses with regional standards." },
                    { title: "Post-Fix Verification", desc: "We double-check your defense. Once you patch, we re-test to guarantee the vulnerability is completely resolved." }
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
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#071021] border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#071021] border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" 
                        placeholder="john@company.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#071021] border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" 
                      placeholder="Security Assessment Inquiry" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#071021] border border-slate-700 rounded-lg px-4 py-3 text-slate-100 h-32 focus:outline-none focus:border-cyan-500 transition-colors resize-none" 
                      placeholder="Tell us about your security needs..."
                    ></textarea>
                  </div>

                  {status.succeeded && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Message sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}

                  {status.errors.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Something went wrong. Please try again later.
                    </motion.div>
                  )}

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status.submitting}
                    className={`w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white py-3.5 rounded-lg font-bold shadow-lg shadow-cyan-500/25 transition-all duration-200 mt-2 flex items-center justify-center gap-2 ${status.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {status.submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
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
            <img src="/icon.png" alt="OneSecuritySolution Logo" className="w-8 h-8 rounded object-contain bg-white/10 p-0.5" />

            <span className="font-bold text-lg">OneSecuritySolution</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} OneSecuritySolution. All rights reserved.
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