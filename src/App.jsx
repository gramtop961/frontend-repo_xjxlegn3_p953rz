import { useMemo, useState } from 'react';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import MasterData from './components/MasterData';
import EmergencyForm from './components/EmergencyForm';
import PMModule from './components/PMModule';
import Reports from './components/Reports';

function App() {
  const [active, setActive] = useState('dashboard');

  // Demo data for dashboard widgets
  const [orders, setOrders] = useState([
    {
      id: 'wo-1',
      title: 'سرویس ماهانه کمپرسور',
      description: 'تعویض فیلتر هوا و بررسی روغن. بررسی نشتی‌ها و ثبت نتایج.',
      status: 'open',
      priority: 'بالا',
      assetName: 'کمپرسور هوای سالن 1',
      createdAt: new Date().toISOString(),
    },
  ]);

  // Emergency maintenance logs for reports
  const [emergencyLogs, setEmergencyLogs] = useState([]);

  const totals = useMemo(() => {
    const openOrders = orders.filter((o) => o.status !== 'done').length;
    const overdue = orders.filter((o) => o.status !== 'done' && Math.random() < 0.2).length; // mock
    const completedThisMonth = orders.filter(
      (o) => o.status === 'done' && new Date(o.completedAt || Date.now()).getMonth() === new Date().getMonth()
    ).length;
    return { assets: 0, openOrders, overdue, completedThisMonth };
  }, [orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      <Topbar active={active} onSelect={setActive} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-right">
        {active === 'dashboard' && <Dashboard totals={totals} orders={orders} />}
        {active === 'master' && <MasterData />}
        {active === 'emergency' && (
          <div className="space-y-6">
            <EmergencyForm onAdd={(row) => setEmergencyLogs((prev) => [row, ...prev])} />
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">سوابق ثبت‌شده</h3>
              {emergencyLogs.length === 0 ? (
                <p className="text-gray-600">موردی ثبت نشده است.</p>
              ) : (
                <ul className="divide-y">
                  {emergencyLogs.map((e) => (
                    <li key={e.id} className="py-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">برگه #{e.sheetNo}</span>
                        <span className="text-gray-500">{e.date}</span>
                      </div>
                      <div className="text-gray-700 mt-1">{e.asset} — {e.description}</div>
                      <div className="text-gray-500 mt-1">مدت: {e.durationMin} دقیقه | نفرات: {e.workers} | شیفت: {e.shift}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        {active === 'pm' && <PMModule />}
        {active === 'reports' && <Reports emergencyLogs={emergencyLogs} pmDone={[]} />}
      </main>
    </div>
  );
}

export default App;
