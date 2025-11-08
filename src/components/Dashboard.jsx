import Metrics from './Metrics';
import WorkOrderList from './WorkOrderList';

function Dashboard({ totals, orders }) {
  return (
    <section className="space-y-6" dir="rtl">
      <Metrics totals={totals} />
      <WorkOrderList orders={orders} />
    </section>
  );
}

export default Dashboard;
