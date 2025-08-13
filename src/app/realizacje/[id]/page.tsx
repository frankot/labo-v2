"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { getRealizacjaByIdAsync, type Realizacja } from "@/lib/realizacje-data";
import { ArrowLeft, MapPin, Calendar, Ruler, Wrench } from "lucide-react";
import Card from "@/app/components/ui/card";
import ImageCarousel from "./ImageCarousel";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 50 },
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

interface Props {
  params: Promise<{ id: string }>;
}

export default function RealizacjaDetailPage({ params }: Props) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Realizacja | null>(null);
  const [loading, setLoading] = useState(true);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        const projectData = await getRealizacjaByIdAsync(resolvedParams.id);
        if (!projectData) {
          notFound();
        }
        setProject(projectData);
      } catch (error) {
        console.error('Failed to load project:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white sm:mt-20 lg:mt-16">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-2xl">⏳</div>
            <p className="font-michroma text-sm text-gray-600">Loading project...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  const projectDetails = [
    {
      icon: MapPin,
      label: "Lokalizacja",
      value: project.location,
    },
    {
      icon: Calendar,
      label: "Rok realizacji",
      value: project.year.toString(),
    },
    {
      icon: Ruler,
      label: "Powierzchnia",
      value: project.area,
    },
    {
      icon: Wrench,
      label: "Zakres prac",
      value: project.scope,
    },
  ];

  const openCarousel = (idx: number) => {
    setCarouselIndex(idx);
    setCarouselOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white sm:mt-20 lg:mt-16">
      {/* Hero Image */}
      <motion.div
        className="relative h-[60vh] w-full sm:h-[70vh]"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />

        {/* Back Button */}
        <motion.div
          className="absolute top-4 left-4 z-10 sm:top-8 sm:left-24"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/realizacje"
            className="group flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 sm:px-4 sm:py-2"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1 sm:size-5"
            />
            <span className="text-xs font-medium sm:text-sm">Powrót</span>
          </Link>
        </motion.div>

        {/* Project Type - Top Center */}
        <motion.div
          className="absolute top-24 left-1/2 z-10 -translate-x-1/2 transform"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        ></motion.div>

        {/* Project Title - Center */}
        <div className="sticky inset-0 top-1/4 flex items-center justify-center">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative w-full">
              {/* Title - Center */}
              <motion.div
                className="text-left"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 70 }}
              >
                <h1 className="font-michroma mb-4 text-3xl font-bold tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  {project.title}
                </h1>
              </motion.div>

              {/* Merged Client & Type Card - Bottom Left */}
              <motion.div
                className="absolute right-0 -bottom-12 hidden w-[30%] sm:-bottom-16 md:block lg:w-[25%] xl:w-[20%]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 70 }}
              >
                <Card className="px-4 py-3 sm:px-6 sm:py-4">
                  <div className="mb-3">
                    <p className="text-left text-xs font-light tracking-wide text-stone-400 uppercase">
                      Typ
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/60"></div>
                      <p className="text-left text-sm font-medium tracking-wide text-white">
                        {project.category}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-left text-xs font-light tracking-wide text-stone-400 uppercase">
                      Klient
                    </p>
                    <p className="text-left text-base font-medium tracking-wide text-white sm:text-lg">
                      {project.client}
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Mobile Layout - Centered below title */}
              <motion.div
                className="mt-6 flex flex-col items-center gap-4 sm:mt-8 md:hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 70 }}
              >
                <Card className="w-full max-w-xs px-4 py-3 sm:px-6 sm:py-4">
                  <div className="mb-3 text-center">
                    <p className="text-xs font-light tracking-wide text-stone-400 uppercase">
                      Typ
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/60"></div>
                      <p className="text-sm font-medium tracking-wide text-white">
                        {project.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-light tracking-wide text-stone-400 uppercase">
                      Klient
                    </p>
                    <p className="text-base font-medium tracking-wide text-white sm:text-lg">
                      {project.client}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-3">
          {/* Details Card - Mobile First, Desktop Sidebar */}
          <motion.div
            className="order-1 lg:order-2 lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromBottom}
          >
            {/* Project Info */}
            <div className="lg:sticky lg:top-24">
              <Card>
                <div className="space-y-4 sm:space-y-6">
                  {projectDetails.map((detail, index) => {
                    const Icon = detail.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-lg bg-white/10 p-1.5 sm:mt-1 sm:p-2">
                          <Icon size={14} className="text-white sm:size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-stone-300 sm:text-sm">
                            {detail.label}
                          </p>
                          <p className="text-xs text-stone-400 sm:text-sm">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Services */}
                <div className="mt-6 sm:mt-8">
                  <h4 className="mb-3 text-xs font-medium text-stone-300 sm:mb-4 sm:text-sm">
                    Zakres usług
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.services.map((service, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white sm:px-3 sm:py-1"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Project Details - Description & Gallery */}
          <motion.div
            className="order-2 lg:order-1 lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromBottom}
          >
            {/* Description */}
            <div className="mb-8 sm:mb-12">
              <Card>
                <p className="text-base leading-relaxed text-stone-300 sm:text-lg">
                  {project.fullDescription}
                </p>
              </Card>
            </div>

            {/* Gallery */}
            <div className="mb-8 sm:mb-12">
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                {project.gallery?.map((image, index) => (
                  <motion.div
                    key={index}
                    className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg sm:rounded-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => openCarousel(index)}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - zdjęcie ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {carouselOpen && project.gallery && (
          <ImageCarousel
            images={project.gallery}
            initialIndex={carouselIndex}
            onClose={() => setCarouselOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
