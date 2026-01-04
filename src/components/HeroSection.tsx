import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Floating Orbs */}
      <div className="floating-orb w-[500px] h-[500px] bg-cyan/30 top-1/4 -left-64" />
      <div className="floating-orb w-[400px] h-[400px] bg-purple/20 bottom-1/4 -right-48" style={{ animationDelay: "-5s" }} />
      <div className="floating-orb w-[300px] h-[300px] bg-blue/20 top-1/2 left-1/2" style={{ animationDelay: "-10s" }} />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open to Work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          >
            Hi, I'm{" "}
            <span className="gradient-text text-glow-cyan">
              Saksham Paliwal
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground mb-6"
          >
            Cloud & DevOps Engineer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Specializing in Kubernetes, multi-cloud automation, and CI/CD pipelines. 
            Turning complex infrastructure into scalable, secure, and cost-efficient systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <a
              href="#contact"
              className="group px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl glass-card text-foreground font-medium hover:border-primary/50 transition-all duration-300 gradient-border"
            >
              View Projects
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-6"
          >
            <a
              href="https://github.com/sakshampaliwal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg glass-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/saksham-paliwal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg glass-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:sakshampaliwal11@gmail.com"
              className="p-3 rounded-lg glass-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Mail size={20} />
            </a>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              New Delhi, India
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};
