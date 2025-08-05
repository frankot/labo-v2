"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { realizacje } from "@/lib/realizacje-data";
import StickyHeader from "@/app/components/ui/sticky-header";
import Card from "@/app/components/ui/card";
import { FadeInView } from "@/app/anim/components";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 15,
    },
  },
};

export default function RealizacjePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div
        className="relative h-[50vh] w-full sm:h-[60vh]"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 15,
          duration: 0.8,
        }}
      >
        <Image
          src="/scene.jpg"
          alt="Nasze realizacje"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      </motion.div>

      {/* Main Content */}
      <div className="relative">
        <StickyHeader
          className="top-0 z-10 -mt-24 text-3xl sm:-mt-32 sm:text-4xl md:text-[5rem] lg:text-[7rem] xl:text-[10rem]"
          title="REALIZACJE"
          delay={0.2}
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
          >
            {realizacje.map((project) => (
              <FadeInView key={project.id}>
                <motion.div variants={itemVariants} className="group h-full">
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
              </FadeInView>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
