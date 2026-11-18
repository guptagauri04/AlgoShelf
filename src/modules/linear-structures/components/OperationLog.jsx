import { Clock, History, CheckCircle2, AlertCircle, Info, Flame } from "lucide-react";

export default function OperationLog({ logs = [], principle = "LIFO" }) {
  const getBadge = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={14} className="text-[#3D5A37]" />;
      case "error":
        return <AlertCircle size={14} className="text-[#A84533]" />;
      case "warning":
        return <Flame size={14} className="text-[#C4883A]" />;
      default:
        return <Info size={14} className="text-[#6B5B4D]" />;
    }
  };

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-4 flex items-center justify-between border-b border-[#EEE5DB] pb-4">
        <div className="flex items-center gap-2">
          <History size={18} className="text-[#A1764E]" />
          <h4 className="font-display text-2xl text-[#1F1B18]">
            Operation History
          </h4>
        </div>
        <span className="rounded-full bg-[#FAF8F5] px-3 py-1 font-mono text-xs font-semibold text-[#8C837B]">
          {principle} Sequence
        </span>
      </div>

      <div className="max-h-72 overflow-y-auto space-y-2.5 pr-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between rounded-xl border border-[#EDE4D8] bg-[#FCFBF8] px-4 py-2.5 text-xs transition hover:bg-[#F7F2EB]"
          >
            <div className="flex items-center gap-2.5">
              {getBadge(log.type)}
              <span className="font-medium text-[#2E2823]">{log.text}</span>
            </div>
            <div className="flex items-center gap-1 text-[#A69C93]">
              <Clock size={12} />
              <span>{log.time}</span>
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <p className="py-6 text-center text-xs text-[#A69C93]">
            No operations executed yet. Try pushing or enqueuing elements!
          </p>
        )}
      </div>
    </div>
  );
}
