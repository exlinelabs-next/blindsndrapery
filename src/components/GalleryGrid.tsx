"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import type { GalleryItem, GalleryGridContent } from "@/types/content";

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 6;

export function GalleryGrid({
  activeProductType,
  activeRoom,
  content,
}: {
  activeProductType: string;
  activeRoom: string;
  content?: GalleryGridContent;
}) {
  const { items, loadMoreLabel } = content ?? useContent("galleryPage").grid;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = items.filter(
    (item) =>
      (activeProductType === "All" || item.category === activeProductType) &&
      (activeRoom === "All" || item.room === activeRoom),
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="flex flex-col items-center gap-10 px-8 pb-14 pt-[50px] md:px-12 md:pb-16 xl:px-20 xl:pb-[100px]">
      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-4">
        {visible.map((item, i) => (
          <GalleryCard key={item.id} item={item} onOpen={() => setSelectedIndex(i)} />
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
          className="flex w-[180px] items-center justify-center rounded-lg border border-teal p-4 font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-teal transition-colors hover:bg-teal hover:text-white"
        >
          {loadMoreLabel}
        </button>
      )}
      {selectedIndex !== null && (
        <GalleryLightbox
          items={filtered}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </section>
  );
}

function GalleryCard({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger image: ${item.title}`}
      className="group relative h-[404px] cursor-zoom-in overflow-hidden rounded-[4px] text-left"
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(min-width: 1280px) 416px, 100vw"
      />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] transition-colors duration-300 group-hover:bg-[rgba(0,0,0,0.4)]" />
      <div className="absolute left-6 top-6 flex flex-col items-start gap-2">
        {item.category && (
        <div className="flex items-center justify-center rounded-[8px] bg-[rgba(0,0,0,0.33)] px-4 py-2 backdrop-blur-[43px]">
          <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-white">
            {item.category}
          </span>
        </div>
        )}
        {item.room && (
          <div className="flex items-center justify-center rounded-[8px] bg-[rgba(0,0,0,0.33)] px-4 py-2 backdrop-blur-[43px]">
            <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-white">
              {item.room}
            </span>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-[113px] items-end px-6 pb-6">
        <div
          className="absolute inset-0 blur-[2px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 6.8%, rgba(44, 40, 53, 0.84) 100%)",
          }}
        />
        <p className="relative font-heading text-[18px] font-semibold leading-[27px] tracking-[-0.0648px] text-white">
          {item.title}
        </p>
      </div>
    </button>
  );
}

function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const item = items[index];
  const hasMultiple = items.length > 1;
  const goPrev = () => onNavigate((index - 1 + items.length) % items.length);
  const goNext = () => onNavigate((index + 1) % items.length);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) onNavigate((index - 1 + items.length) % items.length);
      if (e.key === "ArrowRight" && hasMultiple) onNavigate((index + 1) % items.length);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNavigate, index, items.length, hasMultiple]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 md:p-12"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="size-6" />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-4xl flex-col items-center gap-4"
      >
        <div className="relative h-[70vh] w-full overflow-hidden rounded-lg">
          <Image
            key={item.id}
            src={item.image.src}
            alt={item.image.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          {(item.category || item.room) && (
            <div className="flex items-center gap-2">
              {item.category && (
                <span className="whitespace-nowrap rounded-[8px] bg-white/10 px-4 py-2 font-heading text-[13px] font-semibold uppercase leading-[16px] tracking-[0.56px] text-white">
                  {item.category}
                </span>
              )}
              {item.room && (
                <span className="whitespace-nowrap rounded-[8px] bg-white/10 px-4 py-2 font-heading text-[13px] font-semibold uppercase leading-[16px] tracking-[0.56px] text-white">
                  {item.room}
                </span>
              )}
            </div>
          )}
          {item.title && (
            <p className="text-center font-heading text-[22px] font-semibold leading-[32px] tracking-[-0.0792px] text-white">
              {item.title}
            </p>
          )}
          {hasMultiple && (
            <p className="text-[13px] leading-[16px] text-white/60">
              {index + 1} / {items.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
