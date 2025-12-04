"use client";

import dynamic from "next/dynamic";
import { ComponentProps } from "react";
import type Dither from "./Dither";

const DitherDynamic = dynamic(() => import("./Dither"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-neutral-200" />,
});

export default function DitherWrapper(props: ComponentProps<typeof Dither>) {
  return <DitherDynamic {...props} />;
}
