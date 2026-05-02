import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { AdminContent } from "@/components/AdminContent";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <AdminContent
      scheduledCount={appointments.scheduledCount}
      pendingCount={appointments.pendingCount}
      cancelledCount={appointments.cancelledCount}
      appointments={appointments.documents}
    />
  );
};

export default AdminPage;
