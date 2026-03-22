"use client";

import { useEffect, useRef, useState } from "react";

const frameUrls: string[] = [];

// Helper to pad number
const pad = (num: number, size: number) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

// Generate frame URLs
for (let i = 1; i <= 166; i++) {
  frameUrls.push(`/asserts/Vid1/ezgif-frame-${pad(i, 3)}.jpg`);
}
for (let i = 1; i <= 40; i++) {
  frameUrls.push(`/asserts/vid2/ezgif-frame-${pad(i, 3)}.jpg`);
}
for (let i = 1; i <= 86; i++) {
  frameUrls.push(`/asserts/Vid3/ezgif-frame-${pad(i, 3)}.jpg`);
}
for (let i = 1; i <= 111; i++) {
  frameUrls.push(`/asserts/Vid4/ezgif-frame-${pad(i, 3)}.jpg`);
}

export default function ScrollytellingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    // Preload images
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    frameUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        // Draw first frame immediately when it's loaded
        if (index === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            drawFrame(img, ctx, canvasRef.current);
          }
        }
      };
      images.push(img);
    });

    imagesRef.current = images;

    // Handle Resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame
        const currentFrameIndex = getCurrentFrameIndex();
        const currentImg = imagesRef.current[currentFrameIndex];
        if (currentImg && currentImg.complete) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            drawFrame(currentImg, ctx, canvasRef.current);
          }
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCurrentFrameIndex = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    const fraction = scrollY / maxScroll;
    const index = Math.min(
      frameUrls.length - 1,
      Math.max(0, Math.floor(fraction * frameUrls.length))
    );
    return index;
  };

  const drawFrame = (img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight;
    let offsetX = 0;
    let offsetY = 0;

    // We want the image to cover the canvas fully and center it (object-fit: cover)
    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dark pure black default background as requested
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const idx = getCurrentFrameIndex();
      const img = imagesRef.current[idx];

      if (img && img.complete && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          drawFrame(img, ctx, canvasRef.current);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-[#050815] opacity-30 mix-blend-screen pointer-events-none" />
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      
      {/* Loading overlay for premium feel before frames are ready */}
      {loadedCount < frameUrls.length * 0.1 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050505] transition-opacity duration-1000">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-t-2 border-[#D4AF37] border-solid rounded-full animate-spin mb-4" />
            <span className="text-white/60 tracking-widest uppercase text-xs">
              Loading Experience
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
