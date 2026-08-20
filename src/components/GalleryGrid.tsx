"use client";

import { useState } from "react";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import type { GalleryItem } from "@/types/content";

const INITIAL_COUNT = 12;
const LOAD_MORE_COUNT = 6;

export function GalleryGrid({
  activeProductType,
}: {
  activeProductType: string;
}) {
  const { items, loadMoreLabel } = useContent("galleryPage").grid;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filtered =
    activeProductType === "All"
      ? items
      : items.filter((item) => item.category === activeProductType);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="flex flex-col items-center gap-10 px-8 pb-14 pt-[50px] md:px-12 md:pb-16 xl:px-20 xl:pb-[100px]">
      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-4">
        {visible.map((item, i) => (
          <GalleryCard key={`${item.category}-${i}`} item={item} />
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
    </section>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="relative h-[404px] overflow-hidden rounded-[4px]">
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        className="object-cover"
        sizes="(min-width: 1280px) 416px, 100vw"
      />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
      <div className="absolute left-6 top-6">
        <div className="flex items-center justify-center rounded-[8px] bg-[rgba(0,0,0,0.33)] px-4 py-2 backdrop-blur-[43px]">
          <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-white">
            {item.category}
          </span>
        </div>
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
    </div>
  );
}
