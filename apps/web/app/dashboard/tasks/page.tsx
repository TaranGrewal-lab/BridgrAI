const COLUMNS = [
  {
    status: "To Do",
    tasks: [
      { title: "Book Reception Décor", due: "30 Nov 2027", priority: "High" },
      { title: "Finalise Menu", due: "31 Nov 2027", priority: "High" },
    ],
  },
  {
    status: "In Progress",
    tasks: [
      { title: "Confirm DJ", due: "28 Nov 2027", priority: "Medium" },
      { title: "Send Invitations", due: "10 Nov 2027", priority: "Medium" },
      { title: "RSVP Follow Up", due: "30 Nov 2027", priority: "Low" },
    ],
  },
  {
    status: "Done",
    tasks: [
      { title: "Book Gurdwara", due: "1 Oct 2027", priority: "High" },
      { title: "Order Choora Set", due: "5 Oct 2027", priority: "Medium" },
    ],
  },
];

const PRIORITY_COLOR: Record<string, string> = {
  High: "bg-blush text-charcoal",
  Medium: "bg-gold/20 text-charcoal",
  Low: "bg-sage/30 text-charcoal",
};

export default function TasksPage() {
  return (
    <main className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl text-charcoal">Tasks</h1>
        <button className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-ivory">+ Add Task</button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col.status} className="rounded-2xl border border-sage/30 bg-white p-4 shadow-sm">
            <p className="mb-3 font-heading text-lg text-charcoal">{col.status}</p>
            <div className="space-y-3">
              {col.tasks.map((t) => (
                <div key={t.title} className="rounded-xl border border-sage/20 p-3">
                  <p className="text-sm font-medium text-charcoal">{t.title}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-charcoal/50">{t.due}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${PRIORITY_COLOR[t.priority]}`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
