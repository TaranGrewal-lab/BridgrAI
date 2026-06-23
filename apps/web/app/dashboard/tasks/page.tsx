"use client";

import { useTasks, useUpdateTask, type Task } from "@/lib/hooks/useTasks";
import { useCurrentWedding } from "@/lib/hooks/useWedding";

const COLUMNS: { status: Task["status"]; label: string }[] = [
  { status: "TODO", label: "To Do" },
  { status: "IN_PROGRESS", label: "In Progress" },
  { status: "DONE", label: "Done" },
];

const PRIORITY_COLOR: Record<Task["priority"], string> = {
  URGENT: "bg-blush text-charcoal",
  HIGH: "bg-blush text-charcoal",
  MEDIUM: "bg-gold/20 text-charcoal",
  LOW: "bg-sage/30 text-charcoal",
};

export default function TasksPage() {
  const { data: wedding } = useCurrentWedding();
  const weddingId = wedding?.id ?? "";
  const { data: tasks, isLoading, isError } = useTasks(weddingId);
  const updateTask = useUpdateTask(weddingId);

  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Tasks</h1>
        <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">+ Add Task</button>
      </div>

      {isLoading && <p className="mt-6 text-sm text-charcoal/50">Loading tasks…</p>}
      {isError && (
        <p className="mt-6 text-sm text-charcoal/50">
          Could not reach the planning API yet — connect <code>NEXT_PUBLIC_API_URL</code> to see
          live tasks here.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLUMNS.map((col) => {
          const colTasks = tasks?.filter((t) => t.status === col.status) ?? [];
          return (
            <div key={col.status} className="rounded-2xl border border-sage/30 bg-white p-4 shadow-sm">
              <p className="mb-3 font-heading text-lg text-charcoal">{col.label}</p>
              <div className="space-y-3">
                {colTasks.map((t) => (
                  <div key={t.id} className="rounded-xl border border-sage/20 p-3">
                    <p className="text-sm font-medium text-charcoal">{t.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-charcoal/50">
                        {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No due date"}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${PRIORITY_COLOR[t.priority]}`}>
                        {t.priority}
                      </span>
                    </div>
                    {col.status !== "DONE" && (
                      <button
                        onClick={() =>
                          updateTask.mutate({
                            id: t.id,
                            data: {
                              status:
                                col.status === "TODO"
                                  ? "IN_PROGRESS"
                                  : "DONE",
                            },
                          })
                        }
                        className="mt-2 text-xs font-medium text-gold"
                      >
                        Move forward →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
