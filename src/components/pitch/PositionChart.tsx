"use client";

import React from "react";

export default function PositionChart() {
  return (
    <div className="w-full aspect-[3/2] sm:aspect-video bg-[#F0F0F0] border-2 border-black relative overflow-hidden select-none font-mono">
      {/* 1. Background Quadrants */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        {/* Top Left: Web2 / Fun */}
        <div className="border-r-2 border-b-2 border-black/10 bg-red-50/30 p-2 sm:p-4 flex justify-start items-start">
          <span className="opacity-20 text-[10px] sm:text-sm font-bold uppercase tracking-widest">
            Trad.
          </span>
        </div>
        {/* Top Right: Web3 / Fun (Winner) */}
        <div className="border-b-2 border-black/10 bg-green-50/30 p-2 sm:p-4 flex justify-end items-start">
          <span className="opacity-20 text-[10px] sm:text-sm font-bold uppercase tracking-widest text-right">
            Goal
          </span>
        </div>
        {/* Bottom Left: Web2 / Grind */}
        <div className="border-r-2 border-black/10 bg-gray-50/30 p-2 sm:p-4 flex justify-start items-end">
          <span className="opacity-20 text-[10px] sm:text-sm font-bold uppercase tracking-widest">
            Boring
          </span>
        </div>
        {/* Bottom Right: Web3 / Grind */}
        <div className="border-black/10 bg-blue-50/30 p-2 sm:p-4 flex justify-end items-end">
          <span className="opacity-20 text-[10px] sm:text-sm font-bold uppercase tracking-widest text-right">
            Finance
          </span>
        </div>
      </div>

      {/* 2. Central Axes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Y Axis Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/20 -translate-x-1/2"></div>
        {/* X Axis Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/20 -translate-y-1/2"></div>
      </div>

      {/* 3. Axis Labels (At Extremities) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top: FUN */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#F0F0F0]/90 backdrop-blur px-2 py-1 border border-black/10 rounded z-20">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">
            High Fun
          </span>
        </div>
        {/* Bottom: GRIND */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#F0F0F0]/90 backdrop-blur px-2 py-1 border border-black/10 rounded z-20">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-50">
            Grind
          </span>
        </div>
        {/* Left: WEB2 */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#F0F0F0]/90 backdrop-blur px-2 py-1 border border-black/10 rounded z-20">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-50">
            Web2
          </span>
        </div>
        {/* Right: WEB3 */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F0F0F0]/90 backdrop-blur px-2 py-1 border border-black/10 rounded z-20">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-blue-600">
            Web3
          </span>
        </div>
      </div>

      {/* 4. Competitors */}
      <div className="absolute inset-0">
        {/* Overcooked: Top Left */}
        <div className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10 w-[80px] sm:w-auto text-center">
          <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-black mb-1 shadow-sm"></div>
          <span className="font-bold text-[10px] leading-tight bg-white border border-black px-1 py-0.5 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
            Overcooked
          </span>
        </div>

        {/* Axie: Bottom Right */}
        <div className="absolute bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2 flex flex-col items-center group z-10 w-[80px] sm:w-auto text-center">
          <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-black mb-1 shadow-sm"></div>
          <span className="font-bold text-[10px] leading-tight bg-white border border-black px-1 py-0.5 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
            Axie / Pixels
          </span>
        </div>

        {/* Kitchen Together: Top Right (Winning Spot) */}
        {/* Mobile Layout (Column) / Desktop Layout (Row) handled by flex direction if needed, but absolute positioning is simpler here */}
        <div className="absolute top-[18%] right-[18%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30">
          <div className="relative mb-1">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse z-10 relative"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-400/30 rounded-full animate-ping"></div>
          </div>

          {/* Badge Container */}
          <div className="flex flex-col items-center bg-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2 w-[110px] sm:w-[140px]">
            <span className="font-black text-[10px] sm:text-sm text-white uppercase mb-1 text-center leading-none">
              Kitchen Together
            </span>
            <div className="flex gap-1 flex-wrap justify-center">
              <span className="text-[8px] sm:text-[10px] font-bold bg-green-400 text-black px-1 rounded-sm uppercase">
                Mobile
              </span>
              <span className="text-[8px] sm:text-[10px] font-bold bg-blue-400 text-black px-1 rounded-sm uppercase">
                UGC
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
