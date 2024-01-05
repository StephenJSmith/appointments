import React from "react";
import {
  initializeReactContainer,
  render,
  element,
  click,
} from "./reactTestExtensions";
import { App } from "../src/App";
import {
  AppointmentsDayViewLoader
} from "../src/AppointmentsDayViewLoader";
import { CustomerForm } from "../src/CustomerForm";
import { blankCustomer } from "./builders/customer";

jest.mock("../src/AppointmentsDayViewLoader", () => ({
  AppointmentsDayViewLoader: jest.fn(() => (
    <div id="AppointmentsDayViewLoader" />
  )),
}));

jest.mock("../src/CustomerForm", () => ({
  CustomerForm: jest.fn(() => (
    <div id="CustomerForm" />
  )),
}));

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("initially shows the AppointmentDayViewLoader", () => {
    render(<App />);
    expect(AppointmentsDayViewLoader).toBeRendered();
  });

  it("has a menu bar", () => {
    render(<App />);
    expect(element("menu")).not.toBeNull();
  });

  it("has a button to initiate add customer and appointment action", () => {
    render(<App />);
    const firstButton = element(
      "menu > li > button:first-of-type"
    );
    expect(firstButton).toContainText(
      "Add customer and appointment"
    );
  });

  const beginAddingCustomerAndAppointment = () =>
    click(element("menu > li > button:first-of-type"));

  it("displays the CustomerForm when button is clicked", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(element("#CustomerForm")).not.toBeNull();
  });

  it("passes a blank original customer object to CustomerForm", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(CustomerForm).toBeRenderedWithProps(
      expect.objectContaining({
        original: blankCustomer
      })
    );
  });

  it("hides the AppointmentsDayViewLoader when button is clicked", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(
      element("#AppointmentsDayViewLoader")
    ).toBeNull();
  });

  it("hides the button bar when CustomerForm is being displayed", async () => {
      render(<App />);
      beginAddingCustomerAndAppointment();
      expect(element("menu")).toBeNull();
    });
});