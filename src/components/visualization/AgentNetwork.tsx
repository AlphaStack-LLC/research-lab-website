interface AgentNode {
  id: string;
  x: number;
  y: number;
  recovering?: boolean;
  delay?: string;
}

const NODES: AgentNode[] = [
  { id: "coordinator", x: 300, y: 90 },
  { id: "agent-a", x: 120, y: 190 },
  { id: "agent-b", x: 300, y: 250 },
  { id: "agent-c", x: 480, y: 190 },
  { id: "memory", x: 210, y: 330 },
  { id: "verifier", x: 390, y: 330, recovering: true },
];

const EDGES: [string, string][] = [
  ["coordinator", "agent-a"],
  ["coordinator", "agent-b"],
  ["coordinator", "agent-c"],
  ["agent-a", "memory"],
  ["agent-b", "memory"],
  ["agent-b", "verifier"],
  ["agent-c", "verifier"],
  ["memory", "verifier"],
];

function nodeById(id: string): AgentNode {
  const node = NODES.find((candidate) => candidate.id === id);
  if (!node) {
    throw new Error(`Unknown agent node: ${id}`);
  }
  return node;
}

/**
 * Lightweight SVG visualization of a distributed agent network:
 * nodes (agents, shared memory, a verifier), communication edges with
 * animated message pulses, and one node cycling through fault recovery.
 * All motion is CSS-driven and disabled under prefers-reduced-motion.
 */
export function AgentNetwork() {
  return (
    <svg
      viewBox="0 0 600 400"
      role="img"
      aria-labelledby="agent-network-title agent-network-desc"
      className="h-auto w-full"
    >
      <title id="agent-network-title">
        Distributed agent network diagram
      </title>
      <desc id="agent-network-desc">
        A coordinating agent exchanges messages with three worker agents, a
        shared memory node, and a verification node that periodically drops
        out and rejoins, illustrating fault recovery.
      </desc>

      {EDGES.map(([fromId, toId]) => {
        const from = nodeById(fromId);
        const to = nodeById(toId);
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#31476f"
            strokeWidth="1.5"
            className="agent-edge"
          />
        );
      })}

      {NODES.map((node, index) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r="16"
            fill="#101a2e"
            stroke={node.recovering ? "#38bdf8" : "#0ea5e9"}
            strokeWidth="2"
            className={
              node.recovering ? "agent-node--recovering" : "agent-node"
            }
            style={
              node.recovering
                ? undefined
                : { animationDelay: `${index * 0.6}s` }
            }
          />
          <circle cx={node.x} cy={node.y} r="5" fill="#38bdf8" />
        </g>
      ))}
    </svg>
  );
}
