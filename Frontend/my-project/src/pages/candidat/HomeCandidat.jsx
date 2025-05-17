import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function HomeCandidat() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.6 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(37, 99, 235, 0.3)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  // Decorative dots pattern for background
  const dots = Array.from({ length: 50 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-blue-500"
      style={{
        width: Math.random() * 6 + 2 + "px",
        height: Math.random() * 6 + 2 + "px",
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        opacity: Math.random() * 0.15
      }}
      animate={{
        y: [0, Math.random() * 20 - 10],
        opacity: [Math.random() * 0.1, Math.random() * 0.2]
      }}
      transition={{
        duration: Math.random() * 5 + 5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  ));

  return (
    <div className="relative min-h-[calc(100vh-96px)] flex flex-col justify-center items-center px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {dots}
        <motion.div
          className="absolute left-0 top-1/3 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20"
          animate={{
            x: [-20, 20],
            y: [-20, 20]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute right-0 bottom-1/3 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-10"
          animate={{
            x: [20, -20],
            y: [20, -20]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Main content with animations */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-2">
          <motion.div
            className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-tr from-blue-500 to-blue-300 mb-6 shadow-lg shadow-blue-300/30"
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.05, 1, 1.05, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity
            }}
          />
        </motion.div>

        <motion.h2 
          variants={itemVariants} 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6"
        >
          <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Bienvenue sur votre espace
          </span>
        </motion.h2>
        
        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6">
            Trouvez votre carrière idéale
          </h2>
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-600 rounded-full"
            animate={{ width: ["0%", "50%", "30%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-700 max-w-2xl text-center mb-8 leading-relaxed"
        >
          Explorez des opportunités professionnelles parfaitement alignées avec vos compétences 
          et postulez en toute simplicité à des emplois qui vous passionnent.
        </motion.p>

        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="relative"
        >
          <Link
            to="/candidat/offres"
            className="block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-lg md:text-xl font-medium transition-shadow duration-300 shadow-md"
          >
            Découvrir les offres
          </Link>
          <motion.div
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-30 blur-sm -z-10"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          <div className="flex items-center space-x-2 text-blue-700">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>+1000 offres</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-700">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span>Postulez en 1 clic</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-700">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>Suivi en temps réel</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HomeCandidat;