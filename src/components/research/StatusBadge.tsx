import clsx from "clsx";
import type { ProjectStatus } from "@/lib/content/types";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Proposed: "border-paper-400/40 text-paper-300",
  Planning: "border-amber-400/50 text-amber-300",
  "In Progress": "border-accent-400/60 text-accent-300",
  Validated: "border-emerald-400/50 text-emerald-300",
  Completed: "border-emerald-400/50 text-emerald-300",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        STATUS_STYLES[status],
      )}
    >
      {status}
    </span>
  );
}
