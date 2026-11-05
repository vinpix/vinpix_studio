import Link from "next/link";

export default function WikiNotFound() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <p className="fzw-term text-2xl text-(--fzw-accent-dim)">ERROR 404</p>
      <h1 className="fzw-pixel my-3 text-2xl text-(--fzw-accent)">Lost in the Backrooms</h1>
      <p className="mb-6 text-(--fzw-text)/85">
        That page does not exist on the Floor Zero wiki. It may have been moved, or you
        noclipped somewhere you should not have.
      </p>
      <Link
        href="/wiki"
        className="inline-block rounded border border-(--fzw-accent) bg-(--fzw-accent) px-4 py-2 text-sm font-medium text-black hover:bg-transparent hover:text-(--fzw-accent)"
      >
        Back to the wiki
      </Link>
    </div>
  );
}
