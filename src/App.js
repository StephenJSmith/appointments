import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import {
  AppointmentsDayViewLoader
} from "./AppointmentsDayViewLoader";
import { CustomerForm } from './CustomerForm';

export const App = () => {
  const [view, setView] = useState("dayView");
  const transitionToAddCustomer = useCallback(
    () => setView("addCustomer"),
    []
  );

  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  return view === "addCustomer" 
  ? (<CustomerForm  original={blankCustomer} /> )
  : (
    <>
      <menu>
        <li>
          <button
            type="button"
            onClick={transitionToAddCustomer}
          >
            Add customer and appointment
          </button>
        </li>
      </menu>
        <AppointmentsDayViewLoader />      
    </>
  )
};