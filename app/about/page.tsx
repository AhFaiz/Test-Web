"use client";

import { motion } from "framer-motion";
import { Shield, Target, Award, Users } from "lucide-react";

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <motion.div 
        className="max-w-6xl mx-auto py-20 px-4"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <motion.h1 
          className="text-5xl font-bold text-gray-900 mb-6 text-center"
          variants={fadeIn}
        >
          Tentang GasKita
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto text-center leading-relaxed"
          variants={fadeIn}
        >
          Sejak 2014, GasKita telah menjadi mitra terpercaya dalam penyediaan solusi gas untuk rumah tangga dan industri di Indonesia. Kami berkomitmen untuk memberikan layanan terbaik dengan standar keamanan tertinggi.
        </motion.p>
      </motion.div>

      {/* Values Section */}
      <motion.section 
        className="py-20 px-4 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            variants={fadeIn}
          >
            Nilai-Nilai Kami
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Keamanan", desc: "Standar keamanan tertinggi dalam setiap aspek operasional" },
              { icon: Target, title: "Kualitas", desc: "Produk berkualitas premium untuk kepuasan pelanggan" },
              { icon: Award, title: "Profesional", desc: "Tim profesional yang terlatih dan berpengalaman" },
              { icon: Users, title: "Pelayanan", desc: "Layanan pelanggan 24/7 yang responsif" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={fadeIn}
              >
                <div className="mb-6 relative">
                  <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <item.icon className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section 
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Visi</h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi perusahaan distribusi gas terkemuka di Indonesia dengan standar layanan internasional dan komitmen pada keberlanjutan lingkungan.
              </p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Misi</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 mr-3 bg-blue-600 rounded-full"></span>
                  <span>Menyediakan produk gas berkualitas dengan harga kompetitif</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 mr-3 bg-blue-600 rounded-full"></span>
                  <span>Mengutamakan keselamatan dan kepuasan pelanggan</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 mr-3 bg-blue-600 rounded-full"></span>
                  <span>Mengembangkan infrastruktur distribusi yang efisien</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 mr-3 bg-blue-600 rounded-full"></span>
                  <span>Berkontribusi pada pembangunan ekonomi nasional</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}