import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-24 text-center md:px-12 xl:px-20">
      <p className="font-mono text-[11px] leading-[16px] tracking-[1.1px] text-teal">404</p>
      <h1 className="font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.1296px] text-navy">
        Page not found
      </h1>
      <p className="max-w-md text-base leading-[23px] text-navy/55">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <Button href="/">Back to Home</Button>
    </main>
  );
}
