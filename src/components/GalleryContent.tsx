"use client";

import { useState } from "react";
import { GalleryFilters } from "./GalleryFilters";
import { GalleryGrid } from "./GalleryGrid";

export function GalleryContent() {
  const [activeProductType, setActiveProductType] = useState("All");
  const [activeRoom, setActiveRoom] = useState("All");

  return (
    <>
      <GalleryFilters
        activeProductType={activeProductType}
        activeRoom={activeRoom}
        onProductTypeChange={setActiveProductType}
        onRoomChange={setActiveRoom}
      />
      <GalleryGrid activeProductType={activeProductType} />
    </>
  );
}
