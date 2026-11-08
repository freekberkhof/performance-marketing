import { Footer } from "@/components/footer";
import { Logo } from "@/components/logo";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export type LegalDocument =
  | "privacyverklaring"
  | "algemene-voorwaarden"
  | "verwerkersovereenkomst"
  | "support"
  | "account-verwijderen";

// De teksten staan als Markdown in /legal, zodat ze zonder code te wijzigen zijn.
async function readLegalDocument(name: LegalDocument): Promise<string> {
  return readFile(path.join(process.cwd(), "legal", `${name}.md`), "utf8");
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-[2rem] leading-[1.15] font-[450] tracking-[-0.01em] text-balance sm:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-14 scroll-mt-24 font-serif text-2xl leading-tight font-[450] sm:text-[1.75rem]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-base font-semibold tracking-tight">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-muted-foreground mt-4 text-[0.9375rem] leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-muted-foreground mt-4 list-decimal space-y-2 pl-5 text-[0.9375rem] leading-relaxed">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-white"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-brand mt-6 border-l-2 pl-4">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="border-border mt-6 overflow-x-auto border">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-border bg-muted border-b px-4 py-3 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-border text-muted-foreground border-b px-4 py-3 align-top leading-relaxed">
      {children}
    </td>
  ),
  hr: () => <hr className="border-border my-14" />,
};

export async function LegalPage({
  document,
}: {
  document: LegalDocument;
}): Promise<ReactNode> {
  const content = await readLegalDocument(document);

  return (
    <>
      <header className="border-border/50 border-b">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center px-5 sm:px-8 lg:px-10">
          <Logo href="/" />
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-3xl px-5 py-16 outline-none sm:px-8 sm:py-24"
      >
        <article>
          <Markdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
          </Markdown>
        </article>
      </main>
      <Footer />
    </>
  );
}
