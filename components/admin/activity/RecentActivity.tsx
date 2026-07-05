const activities = [
  { time: "10 minutes ago", title: "New product created", detail: "A new seasonal item was added to the catalog." },
  { time: "Yesterday", title: "Collection updated", detail: "The Autumn edit was refreshed with a new lookbook." },
  { time: "2 days ago", title: "Admin logged in", detail: "The CMS was accessed from the admin dashboard." },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[#1F1F1F]">Recent Activity</h3>

      <div className="mt-5 space-y-4">
        {activities.map((activity) => (
          <div key={activity.title} className="flex gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#C89B3C]" />
            <div>
              <p className="text-sm font-medium text-[#1F1F1F]">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.detail}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
