import { useState } from 'react';
import { Menu, X, Wrench, Home, Database, AlertTriangle, ShieldCheck, BarChart3 } from 'lucide-react';

function Topbar({ active, onSelect }) {
  const [open, setOpen] = useState(false);

  const items = [
    { key: 'dashboard', label: 'داشبورد', icon: Home },
    { key: 'master', label: 'اطلاعات پایه', icon: Database },
    { key: 'emergency', label: 'تعمیرات اضطراری', icon: AlertTriangle },
    { key: 'pm', label: 'نگهداری پیشگیرانه', icon: ShieldCheck },
    { key: 'reports', label: 'گزارشات', icon: BarChart3 },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-30" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Wrench className="h-6 w-6" />
          </div>
          <div className="text-right">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">سامانه نگهداری و تعمیرات</h1>
            <p className="text-xs text-gray-500">CMMS</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="باز کردن منو"
        >
          <Menu className="h-6 w-6" />
          <span className="hidden sm:inline">منو</span>
        </button>
      </div>

      {/* Right Drawer */}
      {open && (
        <div className="fixed inset-0 z-40" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl border-s border-gray-200 flex flex-col" dir="rtl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">منوی اصلی</span>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="بستن">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-2 space-y-1 overflow-y-auto">
              {items.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => { onSelect?.(key); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-right transition-colors ${active === key ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </span>
                </button>
              ))}
            </nav>
            <div className="mt-auto p-4 text-xs text-gray-500 border-t">© 2025 کارخانه نمونه</div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Topbar;
