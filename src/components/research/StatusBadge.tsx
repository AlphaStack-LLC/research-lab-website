import clsx from "clsx";
import type { ProjectStatus } from "@/lib/content/types";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Proposed: "border-paper-400/40 text-paper-300",
  Planning: "border-amber-600/50 text-amber-700",
  "In Progress": "border-accent-400/60 text-accent-400",
  Validated: "border-emerald-600/50 text-emerald-700",
  Completed: "border-emerald-600/50 text-emerald-700",
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
