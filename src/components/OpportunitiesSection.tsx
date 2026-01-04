import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Globe, Clock, FileCheck, CheckCircle2 } from "lucide-react";

const opportunities = [
  {
    icon: Briefcase,
    title: "Full-Time Roles",
    description: "Open to full-time DevOps, Cloud, or SRE positions with innovative companies",
    highlights: ["On-site", "Hybrid", "Remote"],
  },
  {
    icon: Globe,
    title: "Remote Opportunities",
    description: "Available for remote positions across any timezone with flexible collaboration",
    highlights: ["Global Teams", "Async Work", "Flexible Hours"],
  },
  {
    icon: FileCheck,
    title: "Contract Work",
    description: "Open to contract and consulting engagements for infrastructure projects",
    highlights: ["Short-term", "Long-term", "Project-based"],
  },
  {
    icon: Clock,
    title: "Freelance Projects",
    description: "Available for freelance DevOps consulting and cloud architecture design",
    highlights: ["CI/CD Setup", "Cloud Migration", "K8s Clusters"],
  },
];

const lookingFor = [
  "Kubernetes & Container Orchestration",
  "Multi-Cloud Infrastructure (AWS, GCP, Azure)",
  "CI/CD Pipeline Design & Optimization",
  "Infrastructure as Code (Terraform)",
  "DevSecOps & Security Automation",
  "MLOps & AI/ML Infrastructure",
  "Cost Optimization & FinOps",
  "Monitoring & Observability",
];

export const OpportunitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="opportunities" className="py-24 relative" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="section-heading">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            I'm actively seeking new opportunities to build and scale cloud-native infrastructure. 
            Whether you need a full-time engineer or a consultant, I'm ready to contribute.
          </p>
        </motion.div>

        {/* Opportunity Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {opportunities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* What I can help with */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Areas of <span className="gradient-text">Expertise</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {lookingFor.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to discuss how I can help your team build reliable, scalable infrastructure?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
            >
              <Briefcase size={18} />
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
