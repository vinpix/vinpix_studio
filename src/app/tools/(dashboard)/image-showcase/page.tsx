import ImageShowcase from "@/components/tools/ImageShowcase";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Image Showcase | Vinpix Studio Tools",
};

export default function ImageShowcasePage() {
  return (
    <div className="space-y-12 pb-20 w-full max-w-[1920px] mx-auto">
      <header>
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-black" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-black/40">
              Creative Lab
            </span>
          </div>
        </Reveal>
        
        <Reveal delay={0.1}>
          <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Image<br />Showcase
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl text-black/60 max-w-2xl font-medium leading-relaxed">
            A high-performance visual organizer for your creative assets. 
            Drop multiple images to experience smooth transitions and organized layouts.
          </p>
        </Reveal>
      </header>

      <section className="relative w-full">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-black/[0.02] rounded-full blur-3xl pointer-events-none" />
        
        <ImageShowcase />
      </section>

      <Reveal delay={0.4}>
        <footer className="pt-20 border-t border-black/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-30">Capabilities</h4>
              <ul className="space-y-2 text-sm font-bold uppercase tracking-tight">
                <li>Multi-file Batch Upload</li>
                <li>Real-time Image Filtering</li>
                <li>Optimized Viewport Rendering</li>
                <li>Dynamic Layout Engine</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-[10px] mb-4 opacity-30">Shortcuts</h4>
              <ul className="space-y-2 text-sm font-bold uppercase tracking-tight opacity-60">
                <li><kbd className="bg-black/5 px-1.5 py-0.5 rounded">ESC</kbd> Clear View</li>
                <li><kbd className="bg-black/5 px-1.5 py-0.5 rounded">⌘</kbd> + <kbd className="bg-black/5 px-1.5 py-0.5 rounded">V</kbd> Paste Image</li>
                <li><kbd className="bg-black/5 px-1.5 py-0.5 rounded">DEL</kbd> Remove Selected</li>
              </ul>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] font-mono opacity-20">
                VINPIX_STUDIO_V2 // IMAGE_DISPLAY_MODULE
              </p>
            </div>
          </div>
        </footer>
      </Reveal>
    </div>
  );
}
