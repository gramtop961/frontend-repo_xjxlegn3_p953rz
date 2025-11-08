import { useMemo } from 'react';
import { ClipboardList, Clock, CheckCircle2 } from 'lucide-react';

function Badge({ status }) {
  const map = {
    open: { text: 'باز', className: 'bg-yellow-100 text-yellow-800' },
    in_progress: { text: 'در حال انجام', className: 'bg-blue-100 text-blue-800' },
    done: { text: 'انجام شد', className: 'bg-green-100 text-green-800' },
  };
  const item = map[status] || map.open;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.className}`}>{item.text}</span>
  );
}

function WorkOrderList({ orders }) {
  const sorted = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 px-4 sm:px-6 py-4 border-b">
        <ClipboardList className="h-5 w-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">دستور کارها</h3>
      </div>
      <ul className="divide-y">
        {sorted.length === 0 && (
          <li className="p-6 text-gray-500">دستور کاری ثبت نشده است.</li>
        )}
        {sorted.map((o) => (
          <li key={o.id} className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-900">{o.title}</h4>
                  <Badge status={o.status} />
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{o.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{new Date(o.createdAt).toLocaleDateString()}</span>
                  {o.completedAt && (
                    <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4" />{new Date(o.completedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-gray-700">دارایی: <span className="font-medium">{o.assetName}</span></p>
                <p className="text-sm text-gray-700">اولویت: <span className="font-medium">{o.priority}</span></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkOrderList;
