import { useState } from 'react';
import { Users, Factory, Cog, PlusCircle } from 'lucide-react';

function Section({ title, description, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function MasterData() {
  const [assets, setAssets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [people, setPeople] = useState([]);

  const addAsset = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    setAssets((prev) => [{ id: crypto.randomUUID(), ...data }, ...prev]);
    e.currentTarget.reset();
  };

  const addDept = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    setDepartments((prev) => [{ id: crypto.randomUUID(), ...data }, ...prev]);
    e.currentTarget.reset();
  };

  const addPerson = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    setPeople((prev) => [{ id: crypto.randomUUID(), ...data }, ...prev]);
    e.currentTarget.reset();
  };

  return (
    <section className="space-y-6" dir="rtl">
      <Section title="دستگاه و تجهیزات" description="ثبت نام، مشخصات فنی و قطعات">
        <form onSubmit={addAsset} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input name="name" className="border rounded-lg px-3 py-2" placeholder="نام دستگاه" required />
          <input name="code" className="border rounded-lg px-3 py-2" placeholder="کد" required />
          <input name="spec" className="border rounded-lg px-3 py-2" placeholder="مشخصات فنی" />
          <button className="bg-blue-600 text-white rounded-lg px-4 py-2 inline-flex items-center justify-center gap-2"><PlusCircle className="h-5 w-5"/>افزودن</button>
        </form>
        <ul className="mt-3 divide-y">
          {assets.map(a => (
            <li key={a.id} className="py-2 text-sm text-gray-700 flex items-center justify-between">
              <span className="flex items-center gap-2"><Cog className="h-4 w-4"/> {a.name} <span className="text-gray-500">({a.code})</span></span>
              <span className="text-gray-500">{a.spec}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="واحدها" description="واحدهای تولیدی، کنترل کیفیت و فنی">
        <form onSubmit={addDept} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input name="name" className="border rounded-lg px-3 py-2" placeholder="نام واحد" required />
          <input name="type" className="border rounded-lg px-3 py-2" placeholder="نوع (تولیدی/کیفی/فنی)" />
          <button className="bg-blue-600 text-white rounded-lg px-4 py-2 inline-flex items-center justify-center gap-2"><Factory className="h-5 w-5"/>افزودن</button>
        </form>
        <ul className="mt-3 divide-y">
          {departments.map(d => (
            <li key={d.id} className="py-2 text-sm text-gray-700 flex items-center justify-between">
              <span className="flex items-center gap-2"><Factory className="h-4 w-4"/> {d.name}</span>
              <span className="text-gray-500">{d.type}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="پرسنل" description="ثبت اطلاعات نفرات کارخانه">
        <form onSubmit={addPerson} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input name="fullName" className="border rounded-lg px-3 py-2" placeholder="نام و نام‌خانوادگی" required />
          <input name="role" className="border rounded-lg px-3 py-2" placeholder="سمت" />
          <input name="shift" className="border rounded-lg px-3 py-2" placeholder="شیفت" />
          <button className="bg-blue-600 text-white rounded-lg px-4 py-2 inline-flex items-center justify-center gap-2"><Users className="h-5 w-5"/>افزودن</button>
        </form>
        <ul className="mt-3 divide-y">
          {people.map(p => (
            <li key={p.id} className="py-2 text-sm text-gray-700 flex items-center justify-between">
              <span className="flex items-center gap-2"><Users className="h-4 w-4"/> {p.fullName}</span>
              <span className="text-gray-500">{p.role} {p.shift && `- شیفت ${p.shift}`}</span>
            </li>
          ))}
        </ul>
      </Section>
    </section>
  );
}

export default MasterData;
