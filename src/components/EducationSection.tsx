import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

export const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="section-heading">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden group">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-cyan/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    B.Tech in Computer Science
                  </h3>
                  <p className="text-lg text-primary mb-3">
                    Specialization in AI and Machine Learning
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                    <span className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      Panipat Institute of Engineering and Technology
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      2020 - 2024
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                      <Award size={18} className="text-primary" />
                      <span className="font-semibold">CGPA: 8.03 / 10.0</span>
                    </div>
                    <span className="text-sm text-muted-foreground">KUK University, India</span>
                  </div>
                </div>
              </div>

              {/* Key highlights */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h4 className="text-sm font-mono text-muted-foreground mb-4">KEY FOCUS AREAS</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Machine Learning",
                    "Cloud Computing",
                    "Data Structures",
                    "Algorithms",
                    "System Design",
                    "Python",
                    "Database Management"
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
