import { useState } from 'react';
import { AlertTriangle, PlusCircle } from 'lucide-react';

function EmergencyForm({ onAdd }) {
  const [form, setForm] = useState({
    sheetNo: '',
    date: '',
    dept: '',
    startTime: '',
    endTime: '',
    durationMin: '',
    workers: 1,
    description: '',
    shift: '',
    asset: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const calcDuration = () => {
    if (!form.startTime || !form.endTime) return '';
    const [sh, sm] = form.startTime.split(':').map(Number);
    const [eh, em] = form.endTime.split(':').map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    const diff = end - start;
    return diff >= 0 ? diff : 24 * 60 + diff; // across midnight
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, durationMin: calcDuration() || form.durationMin, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    onAdd?.(payload);
    setForm({ sheetNo: '', date: '', dept: '', startTime: '', endTime: '', durationMin: '', workers: 1, description: '', shift: '', asset: '' });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm" dir="rtl">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <h3 className="text-lg font-semibold text-gray-900">ثبت تعمیرات اضطراری</h3>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input name="sheetNo" value={form.sheetNo} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="شماره برگه" required />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="تاریخ" required />
        <input name="dept" value={form.dept} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="واحد فنی/تولیدی/کیفی" />
        <input name="startTime" type="time" value={form.startTime} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="ساعت شروع" />
        <input name="endTime" type="time" value={form.endTime} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="ساعت پایان" />
        <input name="durationMin" value={form.durationMin || calcDuration()} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="مدت (دقیقه)" />
        <input name="workers" type="number" min="1" value={form.workers} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="تعداد نفرات" />
        <select name="shift" value={form.shift} onChange={handleChange} className="border rounded-lg px-3 py-2">
          <option value="">شیفت</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <input name="asset" value={form.asset} onChange={handleChange} className="border rounded-lg px-3 py-2" placeholder="قطعه/دستگاه" />
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="sm:col-span-3 border rounded-lg px-3 py-2" placeholder="شرح تعمیر" />
        <div className="sm:col-span-3 flex justify-end">
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2"><PlusCircle className="h-5 w-5"/>ثبت</button>
        </div>
      </form>
    </div>
  );
}

export default EmergencyForm;
