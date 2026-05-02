import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { SuccessContent } from "@/components/SuccessContent";

const RequestSuccess = async ({ searchParams, params }: SearchParamProps) => {
  const { userId } = await params;
  const { appointmentId } = await searchParams;

  const appointment = await getAppointment(appointmentId as string);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician,
  );

  return (
    <SuccessContent
      userId={userId}
      doctorImage={doctor?.image ?? "/assets/images/dr-green.png"}
      doctorName={doctor?.name ?? ""}
      appointmentDateTime={formatDateTime(appointment.schedule).dateTime}
    />
  );
};

export default RequestSuccess;
