import { Skull } from "lucide-react";
import Link from "next/link";

export default function WikiNotFound() {
  return (
    <div className="ldw-rise mx-auto max-w-xl py-16 text-center">
      <Skull aria-hidden="true" size={40} className="mx-auto mb-3 text-(--ldw-accent-dim)" />
      <p className="ldw-label text-lg text-(--ldw-accent-dim)">ERROR 404</p>
      <h1 className="ldw-display my-3 text-4xl text-(--ldw-accent)">A dead end</h1>
      <p className="mb-6 text-(--ldw-text)/85">
        That page does not exist on the Last Dungeon wiki. It may have been moved, or this
        corridor was never dug.
      </p>
      <Link
        href="/wiki"
        className="inline-block rounded border border-(--ldw-torch) bg-(--ldw-torch) px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-transparent hover:text-(--ldw-accent)"
      >
        Back to the wiki
      </Link>
    </div>
  );
}
