"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { PlayCircleIcon } from "@/components/ui/PlayCircleIcon";
import { PauseCircleIcon } from "@/components/ui/PauseCircleIcon";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { ProcessIntroContent } from "@/types/content";

export function ProcessIntro({ content }: { content?: ProcessIntroContent }) {
  const { eyebrow, headingSegments, description, video } = content ?? useContent("processIntro");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const isVideo = video.poster.src.match(/\.(mp4|webm|mov)$/i);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="flex flex-col items-center gap-12 px-8 pt-14 pb-14 md:gap-14 md:px-12 md:pt-16 md:pb-16 xl:gap-16 xl:px-20 xl:pt-[120px] xl:pb-[100px]">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center rounded-lg border border-navy-light-hover p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
            {eyebrow}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="w-full max-w-[907px] font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
            {headingSegments.map((seg, i) => (
              <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
                {seg.text}
              </span>
            ))}
          </h2>
          <RichText paragraphs={description} className="w-full max-w-[968px] text-[16px] leading-[23px] text-black" />
        </div>
      </div>
      <div className="relative h-[435px] w-full overflow-hidden rounded-2xl md:h-[596px]">
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={video.poster.src}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full bg-navy object-cover"
            />
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause video" : "Play video"}
              className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-transform hover:scale-105"
            >
              {playing ? <PauseCircleIcon className="size-16" /> : <PlayCircleIcon className="size-16" />}
            </button>
          </>
        ) : video.poster.src ? (
          <Image src={video.poster.src} alt={video.poster.alt} fill sizes="(min-width: 1024px) 1280px, 100vw" className="object-cover" />
        ) : null}
      </div>
    </section>
  );
}
