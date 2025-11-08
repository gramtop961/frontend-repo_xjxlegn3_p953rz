import { Wrench, Settings, Building2 } from 'lucide-react';

function Header() {
  return (
    <header className="w-full bg-white/70 backdrop-blur border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Wrench className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">سامانه نگهداری و تعمیرات</h1>
            <p className="text-xs text-gray-500">Computerized Maintenance Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Building2 className="h-5 w-5" />
            <span className="hidden sm:inline">دارایی‌ها</span>
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5" />
            <span className="hidden sm:inline">تنظیمات</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
