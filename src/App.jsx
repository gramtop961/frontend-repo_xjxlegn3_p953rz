import { useMemo, useState } from 'react';
import Header from './components/Header';
import Metrics from './components/Metrics';
import AssetForm from './components/AssetForm';
import WorkOrderList from './components/WorkOrderList';

function App() {
  const [assets, setAssets] = useState([]);
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

  const totals = useMemo(() => {
    const openOrders = orders.filter((o) => o.status !== 'done').length;
    const overdue = orders.filter((o) => o.status !== 'done' && Math.random() < 0.2).length; // mock
    const completedThisMonth = orders.filter((o) => o.status === 'done' && new Date(o.completedAt || Date.now()).getMonth() === new Date().getMonth()).length;
    return { assets: assets.length, openOrders, overdue, completedThisMonth };
  }, [assets.length, orders]);

  const handleAddAsset = (asset) => {
    setAssets((prev) => [asset, ...prev]);
    // Also create a sample work order for the new asset
    setOrders((prev) => [
      {
        id: crypto.randomUUID(),
        title: `بازرسی اولیه - ${asset.name}`,
        description: 'بازرسی عمومی، ثبت مشخصات و اطمینان از آماده‌به‌کاری.',
        status: 'in_progress',
        priority: asset.criticality === 'high' ? 'بالا' : asset.criticality === 'low' ? 'پایین' : 'متوسط',
        assetName: asset.name,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Metrics totals={totals} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AssetForm onAdd={handleAddAsset} />
          </div>
          <div className="lg:col-span-2">
            <WorkOrderList orders={orders} />
          </div>
        </div>
        <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">دارایی‌های اخیر</h3>
          {assets.length === 0 ? (
            <p className="text-gray-600">هنوز دارایی‌ای ثبت نشده است.</p>
          ) : (
            <ul className="divide-y">
              {assets.map((a) => (
                <li key={a.id} className="py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{a.name} <span className="text-gray-500">({a.code})</span></p>
                    <p className="text-sm text-gray-600">مکان: {a.location || '—'} | اهمیت: {a.criticality}</p>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
