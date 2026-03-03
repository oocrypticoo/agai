import type { JobStatus, LedgerEvent, Role } from "./types";

export function getStatusColors(status: JobStatus): {
  bg: string;
  text: string;
  dot: string;
} {
  switch (status) {
    case "Open":
      return {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        dot: "bg-blue-400",
      };
    case "Assigned":
      return {
        bg: "bg-yellow-500/10",
        text: "text-yellow-400",
        dot: "bg-yellow-400",
      };
    case "CompletionRequested":
      return {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        dot: "bg-purple-400",
      };
    case "Settled":
      return {
        bg: "bg-green-500/10",
        text: "text-green-400",
        dot: "bg-green-400",
      };
    case "Disputed":
      return {
        bg: "bg-red-500/10",
        text: "text-red-400",
        dot: "bg-red-400",
      };
    case "Expired":
      return {
        bg: "bg-gray-500/10",
        text: "text-gray-400",
        dot: "bg-gray-400",
      };
  }
}

export function formatStatus(status: JobStatus): string {
  if (status === "CompletionRequested") return "Completion Requested";
  return status;
}

export function buildLedgerTimeline(
  jobId: number,
  status: JobStatus,
  createdAt: string
): LedgerEvent[] {
  const events: LedgerEvent[] = [
    {
      timestamp: createdAt,
      action: "JobCreated",
      actor: "Employer",
      role: "employer",
      detail: `Job #${jobId} created and escrow funded`,
    },
  ];

  if (status === "Open") return events;

  events.push({
    timestamp: new Date(
      new Date(createdAt).getTime() + 86400000
    ).toISOString(),
    action: "AgentAssigned",
    actor: "Agent",
    role: "agent",
    detail: "Agent accepted assignment",
  });

  if (status === "Assigned") return events;

  events.push({
    timestamp: new Date(
      new Date(createdAt).getTime() + 86400000 * 3
    ).toISOString(),
    action: "CompletionRequested",
    actor: "Agent",
    role: "agent",
    detail: "Agent submitted result and requested completion",
  });

  if (status === "CompletionRequested") return events;

  if (status === "Settled") {
    events.push({
      timestamp: new Date(
        new Date(createdAt).getTime() + 86400000 * 5
      ).toISOString(),
      action: "JobSettled",
      actor: "Employer",
      role: "employer",
      detail: "Employer approved and escrow released",
    });
    return events;
  }

  if (status === "Disputed") {
    events.push({
      timestamp: new Date(
        new Date(createdAt).getTime() + 86400000 * 4
      ).toISOString(),
      action: "DisputeRaised",
      actor: "Employer",
      role: "employer",
      detail: "Employer raised dispute — arbiter review pending",
    });
    return events;
  }

  if (status === "Expired") {
    events.push({
      timestamp: new Date(
        new Date(createdAt).getTime() + 86400000 * 30
      ).toISOString(),
      action: "JobExpired",
      actor: "System",
      role: "admin",
      detail: "Job expired — review period elapsed with no action",
    });
    return events;
  }

  return events;
}

export function getAvailableActions(
  status: JobStatus,
  role: Role
): { label: string; disabled: boolean; reason: string }[] {
  const actions: { label: string; disabled: boolean; reason: string }[] = [];

  if (status === "Open" && role === "agent") {
    actions.push({
      label: "Accept Job",
      disabled: true,
      reason: "Demo mode — wallet required",
    });
  }
  if (status === "Assigned" && role === "agent") {
    actions.push({
      label: "Submit Result",
      disabled: true,
      reason: "Demo mode — wallet required",
    });
  }
  if (status === "CompletionRequested" && role === "employer") {
    actions.push(
      {
        label: "Approve & Settle",
        disabled: true,
        reason: "Demo mode — wallet required",
      },
      {
        label: "Raise Dispute",
        disabled: true,
        reason: "Demo mode — wallet required",
      }
    );
  }
  if (status === "Disputed" && role === "arbiter") {
    actions.push({
      label: "Resolve Dispute",
      disabled: true,
      reason: "Demo mode — wallet required",
    });
  }

  if (actions.length === 0) {
    actions.push({
      label: "No actions available",
      disabled: true,
      reason: role === "visitor" ? "Demo mode — read only" : `No actions for ${status} status`,
    });
  }

  return actions;
}
