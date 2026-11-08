---
slug: fault-tolerant-agent-coordination
title: Fault-Tolerant Agent Coordination
summary: >-
  How multi-agent workflows can detect, isolate, and recover from agent
  failures — crashes, hangs, and confident-but-wrong outputs — without human
  intervention or silent corruption of results.
---

## Problem Statement

A single failed agent in a multi-step workflow can silently corrupt every
downstream result. Classical fault tolerance distinguishes crash failures
from Byzantine failures; LLM agents introduce a third, harder category —
semantic failure, where an agent responds promptly and fluently but
incorrectly. Detection and recovery strategies for this category are
largely open research.

## Current Technical Challenges

- Semantic failures have no reliable heartbeat equivalent: the system
  cannot easily tell a wrong answer from a right one.
- Retry policies designed for transient infrastructure faults can amplify
  cost and error when the fault is in the model output itself.
- Checkpointing agent state (including in-flight reasoning and partial
  tool results) is underspecified in current frameworks.
- Recovery strategies must bound blast radius without requiring full
  workflow restarts.

## Research Questions

- Which failure detectors (timeouts, cross-agent critique, execution
  verification) catch which failure classes, and with what false-positive
  rates?
- How should workflows be checkpointed so that recovery replays the
  minimal necessary subcomputation?
- What quorum and redundancy patterns are cost-effective for detecting
  semantic faults in different risk tiers?

## Proposed Approaches

- Classify failures explicitly (crash, timeout, semantic, Byzantine) and
  attach a detection and recovery strategy to each class.
- Use durable execution logs so that any agent step can be replayed,
  audited, or reassigned to a different agent.
- Apply redundancy selectively: independent re-execution or critic agents
  for high-stakes steps, single execution for low-stakes ones.

## Evaluation Methodology

We inject faults of each class into benchmark workflows at controlled rates
and measure detection coverage and latency, recovery success rate, wasted
compute from unnecessary retries, and end-to-end workflow correctness
compared to a fault-free baseline.

## Potential Applications

- Unattended back-office automation with strict correctness requirements.
- Agent systems operating in regulated industries where silent errors are
  unacceptable.
- Long-running research and analysis pipelines that must survive
  infrastructure and model failures.
