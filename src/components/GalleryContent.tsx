"use client";

import { useState } from "react";
import { GalleryFilters } from "./GalleryFilters";
import { GalleryGrid } from "./GalleryGrid";
import type { GalleryFiltersContent, GalleryGridContent } from "@/types/content";

export function GalleryContent({ filtersContent, gridContent }: { filtersContent?: GalleryFiltersContent; gridContent?: GalleryGridContent }) {
  const [activeProductType, setActiveProductType] = useState("All");
  const [activeRoom, setActiveRoom] = useState("All");

  return (
    <>
      <GalleryFilters
        activeProductType={activeProductType}
        activeRoom={activeRoom}
        onProductTypeChange={setActiveProductType}
        onRoomChange={setActiveRoom}
        content={filtersContent}
      />
      <GalleryGrid activeProductType={activeProductType} activeRoom={activeRoom} content={gridContent} />
    </>
  );
}
