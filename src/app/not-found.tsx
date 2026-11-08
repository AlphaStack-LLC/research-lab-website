import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-serif text-4xl font-semibold text-paper-50">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-prose text-paper-300">
        The page you requested does not exist. It may have been moved or
        removed.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="text-accent-300 underline decoration-accent-500/50 underline-offset-4 hover:text-accent-400"
        >
          Return to the home page
        </Link>
      </p>
    </Container>
  );
}
