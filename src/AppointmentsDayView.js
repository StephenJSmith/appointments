import React, { useState } from 'react';

export const Appointment = ({customer: appointment}) => (
  <>
  <table>
    <tr>
      <th>Today's appointment at {appointmentTimeOfDay(appointment.startsAt)}</th>
    </tr>
    <tr>
      <td>Customer</td>
      <td>{appointment.firstName} {appointment.lastName}</td>
    </tr>
    <tr>
      <td>Phone number</td>
      <td>{appointment.phoneNumber}</td>
    </tr>
    <tr>
      <td>Stylist</td>
      <td>{appointment.stylist}</td>
    </tr>
    <tr>
      <td>Service</td>
      <td>{appointment.service}</td>
    </tr>
    <tr>
      <td>Notes</td>
      <td>{appointment.notes}</td>
    </tr>
</table>
</>
);

export const AppointmentsDayView = ({appointments}) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
  <div id='appointmentsDayView'>
    <ol>
      {appointments.map((appointment, i) => (
        <li key={appointment.startsAt}>
          <button 
            className={i === selectedAppointment
              ? 'toggled'
              : ''
            }
            type='button'
            onClick={() => setSelectedAppointment(i)}
          >
          {appointmentTimeOfDay(appointment.startsAt)}
          </button>
        </li>
      ))}
      {appointments.length === 0 ? (
      <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment { ...appointments[selectedAppointment] } />
      )}
    </ol>
  </div>
);}

const appointmentTimeOfDay = (startsAt) => {
  const [h, m] = new Date(startsAt)
    .toTimeString()
    .split(':');

    return `${h}:${m}`;
}
