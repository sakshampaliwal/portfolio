import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Server, Shield, Layers } from "lucide-react";

const projects = [
  {
    title: "Enterprise CI/CD Pipeline",
    description: "End-to-end Jenkins pipeline with integrated security scanning, artifact management, and automated Kubernetes deployments.",
    icon: Server,
    highlights: [
      "Multi-stage pipeline: build, test, SAST, artifact publish, container scan, K8s deploy",
      "Self-managed Kubernetes cluster via kubeadm on AWS EC2",
      "Real-time monitoring with Prometheus, Grafana, and alerting",
      "Integrated quality gates with SonarQube and Trivy vulnerability scanning",
    ],
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    technologies: ["Jenkins", "Kubernetes", "Terraform", "Prometheus", "SonarQube", "Trivy", "Nexus"],
    link: "https://github.com/sakshampaliwal/Boardgame",
  },
  {
    title: "Kubernetes Cluster from Scratch",
    description: "Production-grade K8s cluster on AWS EC2 using kubeadm with CRI-O runtime and enterprise networking.",
    icon: Layers,
    highlights: [
      "Multi-node cluster bootstrapped with kubeadm",
      "CRI-O container runtime for enhanced security",
      "Calico CNI for pod networking and network policies",
      "Metrics Server and HPA for auto-scaling workloads",
    ],
    gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
    technologies: ["Kubernetes", "kubeadm", "CRI-O", "Calico", "AWS EC2", "Helm"],
    link: "https://github.com/sakshampaliwal",
  },
  {
    title: "DevSecOps Pipeline with GitOps",
    description: "Secure CI/CD implementation for React applications with automated vulnerability detection and GitOps deployment.",
    icon: Shield,
    highlights: [
      "GitHub Actions workflow with security-first approach",
      "Multi-stage Docker builds with minimal attack surface",
      "Container scanning with Trivy before registry push",
      "Argo CD for automated GitOps deployments to Kubernetes",
    ],
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    technologies: ["GitHub Actions", "Docker", "Trivy", "ESLint", "Argo CD", "GHCR"],
    link: "https://github.com/sakshampaliwal/devsecops-pipeline",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-sm text-muted-foreground font-medium section-heading">FEATURED WORK</p>
          <h2 className="section-heading">
            Projects & <span className="gradient-text">Implementations</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Real-world infrastructure projects showcasing end-to-end DevOps implementation, 
            from CI/CD pipelines to production Kubernetes clusters.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card rounded-2xl p-6 flex flex-col group hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)]"
            >
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${project.gradient} opacity-50 rounded-t-2xl`} />
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <project.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.link}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={project.link}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground my-5">
                {project.description}
              </p>

              <ul className="space-y-2 mb-6 flex-grow">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-1 rounded-md bg-secondary text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/sakshampaliwal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-foreground hover:text-primary hover:border-primary/50 transition-all font-medium"
          >
            <Github size={18} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};
