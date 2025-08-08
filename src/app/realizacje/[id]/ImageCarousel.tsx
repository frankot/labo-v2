"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
	images: string[];
	initialIndex?: number;
	onClose: () => void;
}

export default function ImageCarousel({ images, initialIndex = 0, onClose }: Props) {
	const [index, setIndex] = useState(initialIndex);
	const overlayRef = useRef<HTMLDivElement>(null);
	const total = images.length;

	// Keyboard navigation
	useEffect(() => {
		function handler(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
			else if (e.key === "ArrowRight") setIndex(i => (i + 1) % total);
			else if (e.key === "ArrowLeft") setIndex(i => (i - 1 + total) % total);
		}
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [onClose, total]);

	// Prevent body scroll
	useEffect(() => {
		const original = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => { document.body.style.overflow = original; };
	}, []);

	// Click outside to close
		function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
			if (e.target === overlayRef.current) onClose();
		}

		// Prevent clicks on image and controls from closing modal
		function stopPropagation(e: React.MouseEvent) {
			e.stopPropagation();
		}

	return (
			<div
				ref={overlayRef}
				onClick={handleOverlayClick}
				className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
				style={{ cursor: "zoom-out" }}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					onMouseDown={stopPropagation}
					className="absolute top-6 right-6 text-white bg-black/60 rounded-full p-2 hover:bg-black/80"
					aria-label="Zamknij"
				>
					<X size={28} />
				</button>

				{/* Prev arrow */}
				{total > 1 && (
					<button
						onClick={() => setIndex(i => (i - 1 + total) % total)}
						onMouseDown={stopPropagation}
						className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-black/60 rounded-full p-2 hover:bg-black/80"
						aria-label="Poprzednie zdjęcie"
					>
						<ChevronLeft size={36} />
					</button>
				)}

				{/* Next arrow */}
				{total > 1 && (
					<button
						onClick={() => setIndex(i => (i + 1) % total)}
						onMouseDown={stopPropagation}
						className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-black/60 rounded-full p-2 hover:bg-black/80"
						aria-label="Następne zdjęcie"
					>
						<ChevronRight size={36} />
					</button>
				)}

				{/* Centered image */}
				<div className="flex items-center justify-center w-full h-full" onMouseDown={stopPropagation}>
					<Image
						src={images[index]}
						alt={`Zdjęcie ${index + 1}`}
						style={{ maxHeight: "90vh", maxWidth: "90vw", margin: "2rem", objectFit: "contain" }}
						width={1200}
						height={800}
						priority
					/>
				</div>
			</div>
	);
}
