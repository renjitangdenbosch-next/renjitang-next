import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-2xl text-stone-800 dark:text-stone-100">
        Pagina niet gevonden
      </p>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        Deze inhoud bestaat niet (meer) op renjitang.nl.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-stone-800 px-6 py-2 text-sm text-white dark:bg-amber-800"
      >
        Naar home
      </Link>
    </div>
  );
}
