import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "DevOps Engineer",
    company: "Devkraft Technologies",
    clients: "CloudDefense.AI & Whiteswan Identity Security",
    location: "Gurugram, India",
    period: "July 2024 – Present",
    type: "Hybrid",
    highlights: [
      "Deployed & managed Kubernetes clusters across AWS, Azure, and GCP, serving enterprise security clients",
      "Architected Helm chart templates enabling consistent, environment-specific deployments across environments",
      "Implemented end-to-end MLOps pipeline for GPU-accelerated AI model training and production deployment",
      "Automated GKE node pool scaling, achieving 30% reduction in cloud infrastructure costs",
      "Configured AWS MediaLive for real-time news broadcast streaming to YouTube, Instagram, X.com",
      "Built monitoring stack with Prometheus, Grafana, and custom Python scripts for Discord cost alerts",
      "Optimized Docker images to reduce size, improving deployment speed and ECR storage efficiency",
    ],
    technologies: ["Kubernetes", "Terraform", "AWS", "GCP", "Helm", "Jenkins", "Prometheus", "Grafana"],
  },
  {
    title: "Full Stack Developer Intern",
    company: "Zversal Private Limited",
    clients: "Quodd Financial",
    location: "Mohali, India",
    period: "Jan 2024 – Jun 2024",
    type: "Onsite",
    highlights: [
      "Designed deployment automation scripts for Docker image deployments to EC2 instances",
      "Established GitHub Actions workflows for continuous integration with automated testing",
      "Developed high-performance APIs using Golang with gRPC and Fiber frameworks",
      "Built REST APIs with Spark Java, enhancing backend functionality and performance",
    ],
    technologies: ["Docker", "GitHub Actions", "Golang", "gRPC", "EC2", "Java"],
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-sm text-muted-foreground font-medium section-heading">PROFESSIONAL JOURNEY</p>
          <h2 className="section-heading">
            Experience & <span className="gradient-text">Impact</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Building and scaling infrastructure for enterprise clients, 
            from security platforms to financial data services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative glass-card animated-border rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute -left-[40px] top-16 my-10 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
              )}

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                {/* Timeline dot */}
                <div className="absolute -left-[60px] hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border border-primary/50 items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-foreground/90 font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Client: {exp.clients}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    {exp.location} • {exp.type}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
