import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { AdminContent } from "@/components/AdminContent";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="min-h-screen w-full bg-[var(--dark-200)]">
      <AdminContent
        scheduledCount={appointments.scheduledCount}
        pendingCount={appointments.pendingCount}
        cancelledCount={appointments.cancelledCount}
        appointments={appointments.documents}
      />
    </div>
  );
};

export default AdminPage;
