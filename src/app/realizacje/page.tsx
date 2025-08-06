"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { realizacje } from "@/lib/realizacje-data";
import HeaderDetails from "@/app/components/ui/header-details";
import Card from "@/app/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function RealizacjePage() {
  return (
    <div className="mt-20 min-h-screen">
      {/* Main Content */}
      <div className="relative">
        <HeaderDetails
          title="NASZE REALIZACJE"
          subtitle="Kreatywne projekty scenograficzne"
          backgroundImage="/scene.jpg"
          description={[
            "Poznaj nasze najnowsze realizacje scenograficzne, które łączą innowacyjne technologie z kreatywnym designem. Każdy projekt to unikalne wyzwanie, które realizujemy z pasją i precyzją.",
            "Od scenografii teatralnych po wystawy muzealne - nasze projekty wyróżniają się wysoką jakością wykonania i dbałością o każdy detal.",
          ]}
          onLoad={true}
        />

        <motion.div
          className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {realizacje.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group h-full"
              >
                <Link
                  href={`/realizacje/${project.id}`}
                  className="block h-full"
                >
                  <Card className="h-full overflow-hidden p-0">
                    {/* Project Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm sm:px-3 sm:py-1">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-4 sm:p-6">
                      <h3 className="font-michroma mb-2 line-clamp-2 text-base font-semibold tracking-tight text-white sm:text-lg">
                        {project.title}
                      </h3>
                      <p className="mb-3 text-xs text-stone-300 sm:text-sm">
                        {project.client} • {project.year}
                      </p>
                      <p className="line-clamp-3 text-xs leading-relaxed text-stone-400 sm:text-sm">
                        {project.description}
                      </p>

                      {/* Services Tags */}
                      <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-2">
                        {project.services.slice(0, 3).map((service, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-stone-300 sm:px-2 sm:py-1"
                          >
                            {service}
                          </span>
                        ))}
                        {project.services.length > 3 && (
                          <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-stone-300 sm:px-2 sm:py-1">
                            +{project.services.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
