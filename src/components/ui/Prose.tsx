import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h2: (props) => (
    <h2
      className="mt-10 font-serif text-2xl font-semibold text-paper-50"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-xl font-semibold text-paper-100" {...props} />
  ),
  p: (props) => (
    <p className="mt-4 leading-relaxed text-paper-200" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-paper-200" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-paper-200" {...props} />
  ),
  a: (props) => (
    <a
      className="text-accent-300 underline decoration-accent-500/50 underline-offset-4 hover:text-accent-400"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-paper-50" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-ink-800 px-1.5 py-0.5 text-sm text-accent-300"
      {...props}
    />
  ),
};

export function Prose({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-prose", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
