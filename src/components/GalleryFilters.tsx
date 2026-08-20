"use client";

import { useContent } from "@/hooks/useContent";

export function GalleryFilters({
  activeProductType,
  activeRoom,
  onProductTypeChange,
  onRoomChange,
}: {
  activeProductType: string;
  activeRoom: string;
  onProductTypeChange: (value: string) => void;
  onRoomChange: (value: string) => void;
}) {
  const { heading, filterGroups } = useContent("galleryPage").filters;
  const [productGroup, roomGroup] = filterGroups;

  return (
    <section className="flex flex-col gap-10 px-8 py-[50px] md:px-12 xl:px-20">
      <h2 className="font-heading text-[28px] font-semibold leading-[42px] tracking-[-0.1008px] text-black">
        {heading}
      </h2>
      <div className="flex flex-col gap-4">
        {/* By Product Type */}
        <div className="flex flex-col gap-[10px] xl:flex-row xl:items-center xl:gap-6">
          <div className="flex w-[200px] shrink-0 items-center justify-center rounded-[8px] bg-navy p-4">
            <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-white">
              {productGroup.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {productGroup.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onProductTypeChange(option)}
                className={`flex h-[40px] items-center justify-center rounded-[24px] px-4 py-3 font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] transition-colors ${
                  activeProductType === option
                    ? "bg-navy text-white"
                    : "border border-[rgba(15,30,60,0.03)] bg-[#e7e9ec] text-[rgba(15,30,60,0.74)]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {/* By Room */}
        <div className="flex flex-col gap-[10px] xl:flex-row xl:items-center xl:gap-6">
          <div className="flex w-[200px] shrink-0 items-center justify-center rounded-[8px] bg-navy p-4">
            <span className="whitespace-nowrap font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] text-white">
              {roomGroup.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {roomGroup.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onRoomChange(option)}
                className={`flex h-[40px] items-center justify-center rounded-[24px] px-4 py-3 font-heading text-[15px] font-semibold leading-[27.2px] tracking-[0.56px] transition-colors ${
                  activeRoom === option
                    ? "bg-navy text-white"
                    : "border border-[rgba(15,30,60,0.03)] bg-[#e7e9ec] text-[rgba(15,30,60,0.74)]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
