import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, TrendingUp, Cpu } from "lucide-react";
import { NumberTicker } from "./ui/number-ticker";

const highlights = [
  {
    icon: Zap,
    title: "Automation First",
    description: "Obsessed with eliminating toil through intelligent automation",
  },
  {
    icon: Shield,
    title: "Security Integrated",
    description: "DevSecOps mindset with vulnerability scanning at every stage",
  },
  {
    icon: TrendingUp,
    title: "Cost Optimizer",
    description: "Achieved 30% cloud cost reduction through smart scaling",
  },
  {
    icon: Cpu,
    title: "Cloud Native",
    description: "Deep expertise across AWS, GCP, and Azure ecosystems",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="section-heading">
            Why teams <span className="gradient-text">Trust me?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="skill-card group cursor-default animated-border hover:bg-card/80 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <NumberTicker className="text-4xl font-bold gradient-text mb-2" value={2} extra="+" />
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <NumberTicker className="text-4xl font-bold gradient-text mb-2" value={30} extra="%" />
              <div className="text-muted-foreground">Cost Reduction Achieved</div>
            </div>
            <div>
              <NumberTicker className="text-4xl font-bold gradient-text mb-2" value={3} delay={1}/>
              <div className="text-muted-foreground">Cloud Platforms Mastered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
