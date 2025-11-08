import { Wrench, AlertTriangle, Clock3, CheckCircle2 } from 'lucide-react';

function Stat({ icon: Icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-white ${accent}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function Metrics({ totals }) {
  const { assets = 0, openOrders = 0, overdue = 0, mttr = 0, completedThisMonth = 0 } = totals || {};
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat icon={Wrench} label="تعداد دارایی‌ها" value={assets} accent="bg-blue-600" />
      <Stat icon={Clock3} label="دستور کارهای باز" value={openOrders} accent="bg-amber-500" />
      <Stat icon={AlertTriangle} label="عقب‌افتاده" value={overdue} accent="bg-red-500" />
      <Stat icon={CheckCircle2} label="تکمیل این ماه" value={completedThisMonth} accent="bg-emerald-600" />
    </section>
  );
}

export default Metrics;
