export const profile = {
  firstName: "Saksham",
  lastName: "Paliwal",
  role: "Cloud & DevOps Engineer",
  location: "New Delhi, India",
  email: "sakshampaliwal11@gmail.com",
  github: "https://github.com/sakshampaliwal",
  linkedin: "https://linkedin.com/in/saksham-paliwal",
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: 2, suffix: "+", label: "Years in production" },
  { value: 30, suffix: "%", label: "Cloud cost cut" },
  { value: 3, suffix: "", label: "Clouds: AWS · GCP · Azure" },
];

export const experiences = [
  {
    title: "DevOps Engineer",
    company: "Devkraft Technologies",
    clients: "CloudDefense.AI & Whiteswan Identity Security",
    location: "Gurugram, India · Hybrid",
    period: "Jul 2024 — Present",
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
    location: "Mohali, India · Onsite",
    period: "Jan 2024 — Jun 2024",
    highlights: [
      "Designed deployment automation scripts for Docker image deployments to EC2 instances",
      "Established GitHub Actions workflows for continuous integration with automated testing",
      "Developed high-performance APIs using Golang with gRPC and Fiber frameworks",
      "Built REST APIs with Spark Java, enhancing backend functionality and performance",
    ],
    technologies: ["Docker", "GitHub Actions", "Golang", "gRPC", "EC2", "Java"],
  },
];

export const projects = [
  {
    title: "Enterprise CI/CD Pipeline",
    description:
      "End-to-end Jenkins pipeline with integrated security scanning, artifact management, and automated Kubernetes deployments.",
    highlights: [
      "Multi-stage pipeline: build, test, SAST, artifact publish, container scan, K8s deploy",
      "Self-managed Kubernetes cluster via kubeadm on AWS EC2",
      "Real-time monitoring with Prometheus, Grafana, and alerting",
      "Integrated quality gates with SonarQube and Trivy vulnerability scanning",
    ],
    technologies: ["Jenkins", "Kubernetes", "Terraform", "Prometheus", "SonarQube", "Trivy", "Nexus"],
    link: "https://github.com/sakshampaliwal/Boardgame",
    hue: 205,
  },
  {
    title: "Kubernetes Cluster from Scratch",
    description: "Production-grade K8s cluster on AWS EC2 using kubeadm with CRI-O runtime and enterprise networking.",
    highlights: [
      "Multi-node cluster bootstrapped with kubeadm",
      "CRI-O container runtime for enhanced security",
      "Calico CNI for pod networking and network policies",
      "Metrics Server and HPA for auto-scaling workloads",
    ],
    technologies: ["Kubernetes", "kubeadm", "CRI-O", "Calico", "AWS EC2", "Helm"],
    link: "https://github.com/sakshampaliwal",
    hue: 22,
  },
  {
    title: "DevSecOps Pipeline with GitOps",
    description:
      "Secure CI/CD implementation for React applications with automated vulnerability detection and GitOps deployment.",
    highlights: [
      "GitHub Actions workflow with security-first approach",
      "Multi-stage Docker builds with minimal attack surface",
      "Container scanning with Trivy before registry push",
      "Argo CD for automated GitOps deployments to Kubernetes",
    ],
    technologies: ["GitHub Actions", "Docker", "Trivy", "ESLint", "Argo CD", "GHCR"],
    link: "https://github.com/sakshampaliwal/devsecops-pipeline",
    hue: 150,
  },
];

export const skillGroups = [
  { title: "Cloud", items: ["AWS", "Google Cloud", "Azure"] },
  { title: "Containers", items: ["Docker", "Kubernetes", "EKS", "AKS", "GKE", "Helm", "CRI-O", "Calico"] },
  { title: "CI/CD", items: ["Jenkins", "GitHub Actions", "Bitbucket Pipelines", "CircleCI", "Argo CD", "CodeDeploy"] },
  { title: "IaC & Scripting", items: ["Terraform", "CloudFormation", "Bash", "Python"] },
  { title: "Observability", items: ["Prometheus", "Grafana", "Loki", "CloudWatch", "Metrics Server"] },
  { title: "Security", items: ["Trivy", "SonarQube", "Kyverno", "OWASP ZAP", "Semgrep", "Checkov", "GitLeaks"] },
  { title: "MLOps", items: ["MLflow", "Kubeflow", "DVC", "Dagster", "SageMaker"] },
  { title: "Languages & Data", items: ["Java", "Golang", "Python", "PostgreSQL", "MySQL"] },
  { title: "Servers & OS", items: ["Nginx", "Apache", "Linux", "Ubuntu", "Git", "GitHub", "Bitbucket"] },
];

export const education = {
  degree: "B.Tech in Computer Science",
  focus: "Specialization in AI and Machine Learning",
  school: "Panipat Institute of Engineering and Technology",
  university: "KUK University, India",
  years: "2020 — 2024",
  cgpa: "8.03 / 10.0",
};

export const openTo = ["Full-time", "Remote", "Contract", "Freelance"];
