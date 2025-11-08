import { useMemo, useState } from 'react';
import { CalendarDays, ClipboardList, PlusCircle } from 'lucide-react';

function PMModule() {
  const [plans, setPlans] = useState([]); // PM definitions
  const [schedule, setSchedule] = useState([]); // Generated schedule lines
  const [done, setDone] = useState([]); // Completed PMs

  const addPlan = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    setPlans((prev) => [
      { id: crypto.randomUUID(), asset: data.asset, task: data.task, period: data.period, every: Number(data.every || 1) },
      ...prev,
    ]);
    e.currentTarget.reset();
  };

  const generateSchedule = () => {
    const today = new Date();
    const lines = plans.map((p) => ({
      id: crypto.randomUUID(),
      asset: p.asset,
      task: p.task,
      dueDate: today.toISOString().slice(0, 10),
      period: `${p.every} ${p.period}`,
      status: 'due',
    }));
    setSchedule(lines);
  };

  const markDone = (id) => {
    const item = schedule.find((s) => s.id === id);
    if (!item) return;
    setDone((prev) => [{ ...item, completedAt: new Date().toISOString() }, ...prev]);
    setSchedule((prev) => prev.filter((s) => s.id !== id));
  };

  const stats = useMemo(() => ({ plans: plans.length, due: schedule.length, done: done.length }), [plans.length, schedule.length, done.length]);

  return (
    <section className="space-y-6" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">تعداد برنامه‌ها</p>
          <p className="text-2xl font-bold">{stats.plans}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">موارد سررسید</p>
          <p className="text-2xl font-bold">{stats.due}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">انجام شده</p>
          <p className="text-2xl font-bold">{stats.done}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">تعریف برنامه سرویس دوره‌ای</h3>
        </div>
        <form onSubmit={addPlan} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input name="asset" className="border rounded-lg px-3 py-2" placeholder="نام دستگاه" required />
          <input name="task" className="border rounded-lg px-3 py-2" placeholder="شرح کار" required />
          <select name="period" className="border rounded-lg px-3 py-2">
            <option value="روز">روز</option>
            <option value="هفته">هفته</option>
            <option value="ماه">ماه</option>
          </select>
          <input name="every" type="number" min="1" className="border rounded-lg px-3 py-2" placeholder="هر چند" defaultValue={1} />
          <div className="sm:col-span-4 flex justify-end">
            <button className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2"><PlusCircle className="h-5 w-5"/>افزودن برنامه</button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">تهیه برنامه روزانه</h3>
          </div>
          <button onClick={generateSchedule} className="bg-emerald-600 text-white rounded-lg px-4 py-2">تولید برنامه امروز</button>
        </div>
        {schedule.length === 0 ? (
          <p className="text-gray-600">موردی برای امروز وجود ندارد.</p>
        ) : (
          <ul className="divide-y">
            {schedule.map((s) => (
              <li key={s.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{s.asset} - {s.task}</p>
                  <p className="text-sm text-gray-500">سررسید: {s.dueDate} | تناوب: {s.period}</p>
                </div>
                <button onClick={() => markDone(s.id)} className="bg-blue-600 text-white rounded-lg px-3 py-2">انجام شد</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">ثبت انجام سرویس‌ها</h3>
        </div>
        {done.length === 0 ? (
          <p className="text-gray-600">تا کنون ثبت نشده است.</p>
        ) : (
          <ul className="divide-y">
            {done.map((d) => (
              <li key={d.id} className="py-3">
                <p className="font-medium text-gray-900">{d.asset} - {d.task}</p>
                <p className="text-sm text-gray-500">تکمیل در: {new Date(d.completedAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default PMModule;
