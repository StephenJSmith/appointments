import React from "react";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import { 
  initializeReactContainer, 
  render, 
  click,
  element,
  elements,
  textOf,
  typesOf, 
} from "./reactTestExtensions";

describe("Appointment", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(document.body).toContainText(
      "Ashley"
    );
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };

    render(<Appointment customer={customer} />);

    expect(document.body).toContainText(
      "Jordan"
    );
  });
});

describe('AppointmentsDayView', () => {
  const today = new Date();
  const twoAppointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' }
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' }
    },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

  const secondButton = () => elements('button')[1];

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(
     element('div#appointmentsDayView')
    ).not.toBeNull();
  });

  it('renders an ol element to display appointments', () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(element('ol')).not.toBeNull();
  })

  it('renders an li for each appointment', () => {
    render(
      <AppointmentsDayView appointments={twoAppointments} />
    );

    const listChildren =elements('ol > li');

    expect(listChildren).toHaveLength(2);
  }); it("renders the time of each appointment", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );

    expect(textOf(elements('li'))).toEqual(['12:00', '13:00']);
  });

  it('initially shows a message saying that there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.body).toContainText('There are no appointments scheduled for today.');
  });

  it('selects the first appointment by default', () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );

    expect(document.body).toContainText('Ashley');
  });

  it("has a button element in each li", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
    expect(typesOf(elements('li > *'))).toEqual([
      'button',
      'button'
    ]);
  });

  it("renders another appointment when selected", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
    click(secondButton());
    expect(document.body).toContainText(
      "Jordan"
    );
  });

  it('adds toggled class to button when selected', () => {
    render(
      <AppointmentsDayView appointments={twoAppointments} />
    );

    click(secondButton());

    expect(secondButton()).toHaveClass('toggled');
  });

  it('does not add toggled class if button is not selected', () => {
    render(
      <AppointmentsDayView appointments={twoAppointments} />
    );

    expect(secondButton()).not.toHaveClass('toggled');
  });
});