import { useMemo } from 'react';
import { BarChart3 } from 'lucide-react';

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Reports({ emergencyLogs = [], pmDone = [] }) {
  // Very rough mock metrics based on provided arrays
  const metrics = useMemo(() => {
    const failures = emergencyLogs.length;
    const totalDowntimeMin = emergencyLogs.reduce((acc, e) => acc + Number(e.durationMin || 0), 0);
    const mttr = failures ? Math.round(totalDowntimeMin / failures) : 0; // minutes
    const mtbf = failures ? Math.round((30 * 24 * 60) / failures) : 0; // fake month minutes / failures

    // Pareto mock: top assets by frequency
    const counts = {};
    emergencyLogs.forEach((e) => { counts[e.asset] = (counts[e.asset] || 0) + 1; });
    const pareto = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return { failures, totalDowntimeMin, mttr, mtbf, pareto };
  }, [emergencyLogs]);

  return (
    <section className="space-y-6" dir="rtl">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-bold">گزارشات مدیریتی</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="MTTR (میانگین زمان تعمیر)">
          <p className="text-3xl font-bold">{metrics.mttr} دقیقه</p>
        </Card>
        <Card title="MTBF (میانگین زمان بین خرابی‌ها)">
          <p className="text-3xl font-bold">{metrics.mtbf} دقیقه</p>
        </Card>
        <Card title="تعداد خرابی‌ها">
          <p className="text-3xl font-bold">{metrics.failures}</p>
        </Card>
        <Card title="جمع زمان خواب دستگاه‌ها">
          <p className="text-3xl font-bold">{metrics.totalDowntimeMin} دقیقه</p>
        </Card>
      </div>

      <Card title="پارتو خرابی دستگاه‌ها (Top 5)">
        {metrics.pareto.length === 0 ? (
          <p className="text-gray-600">داده‌ای برای نمایش وجود ندارد.</p>
        ) : (
          <ul className="space-y-2">
            {metrics.pareto.map(([asset, count]) => (
              <li key={asset} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{asset || 'نامشخص'}</span>
                <span className="font-semibold">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="سرویس‌های انجام شده اخیر">
        {pmDone.length === 0 ? (
          <p className="text-gray-600">موردی ثبت نشده است.</p>
        ) : (
          <ul className="divide-y">
            {pmDone.map((d) => (
              <li key={d.id} className="py-2 text-sm">
                <span className="font-medium">{d.asset} - {d.task}</span>
                <span className="text-gray-500"> — {new Date(d.completedAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
}

export default Reports;
