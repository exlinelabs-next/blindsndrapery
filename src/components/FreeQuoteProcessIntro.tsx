"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { PlayCircleIcon } from "@/components/ui/PlayCircleIcon";
import { PauseCircleIcon } from "@/components/ui/PauseCircleIcon";
import { useContent } from "@/hooks/useContent";
import { RichText } from "@/components/ui/RichText";
import type { FreeQuoteProcessIntroContent } from "@/types/content";

export function FreeQuoteProcessIntro({ content }: { content?: FreeQuoteProcessIntroContent }) {
  const { eyebrow, headingSegments, description, image } =
    content ?? useContent("freeQuotePage").processIntro;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const isVideo = image.src.match(/\.(mp4|webm|mov)$/i);

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
    <section className="flex flex-col gap-10 px-4 py-14 md:px-12 md:py-16 xl:flex-row xl:items-center xl:gap-10 xl:px-20 xl:py-[100px]">
      <div className="flex flex-col gap-4 xl:w-[527px] xl:shrink-0">
        <div className="flex w-fit items-center justify-center rounded-lg border border-[#dbdde2] p-2">
          <p className="whitespace-nowrap text-center font-mono text-[11px] leading-[16px] tracking-[1.1px] text-black">
            {eyebrow}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-heading text-[28px] font-semibold leading-[36px] tracking-[-0.1296px] text-navy md:text-[36px] md:leading-[44px]">
            {headingSegments.map((seg, i) => (
              <span key={i} className={seg.emphasis ? "text-teal" : undefined}>
                {seg.text}
              </span>
            ))}
          </p>
          <RichText paragraphs={description} className="text-[16px] leading-[23px] text-black" />
        </div>
      </div>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl xl:h-[486px] xl:flex-1">
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={`${image.src}#t=0.1`}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
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
        ) : image.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1279px) 100vw, 50vw"
            className="object-cover"
          />
        ) : null}
      </div>
    </section>
  );
}
