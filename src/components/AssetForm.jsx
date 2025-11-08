import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

function AssetForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', code: '', location: '', criticality: 'medium' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.code) return;
    onAdd?.({ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    setForm({ name: '', code: '', location: '', criticality: 'medium' });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">افزودن دارایی</h3>
          <p className="text-sm text-gray-500">مشخصات دارایی جدید را وارد کنید</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">نام</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="مثال: پمپ آب 1" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">کد</label>
          <input name="code" value={form.code} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="مثال: P-101" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">مکان</label>
          <input name="location" value={form.location} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="مثال: سالن تولید" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">اهمیت</label>
          <select name="criticality" value={form.criticality} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="low">کم</option>
            <option value="medium">متوسط</option>
            <option value="high">زیاد</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button type="submit" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <PlusCircle className="h-5 w-5" />
          افزودن
        </button>
      </div>
    </form>
  );
}

export default AssetForm;
