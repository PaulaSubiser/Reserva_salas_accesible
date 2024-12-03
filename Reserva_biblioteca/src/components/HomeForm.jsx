import * as Ariakit from "@ariakit/react";
import React from "react";
import { Link } from "react-router-dom";
import "../css/Form.css";
import { DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useState } from "react";

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';




export default function Form() {
    const [value_cal, setValue_cal] = useState(new Date());
    const [centro_val, setValue_centro] = useState("UPS Leganes");
    const form = Ariakit.useFormStore({ defaultValues: { calendar: value_cal, centro: centro_val } });

    
    const handleChange = (value, event) => {
        setValue_cal(value);
        form.getState().values["calendar"] = value;
      };

    const handleChange2 = (event, newValue) => {
        setValue_centro(newValue);
        form.getState().values["centro"] = newValue;
      };

    form.useSubmit(async (state) => {
        var reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
        //localStorage.clear();
        var ids = reservas.map(reserva => reserva.id);
        var id_reserva = 0;
        if (ids != ""){
            var maxId = Math.max(...ids);
            id_reserva = maxId + 1;
        }
        var reserva = {id: id_reserva, fecha: form.getState().values["calendar"], centro: form.getState().values["centro"], hora: "", sala: ""};
        reservas.push(reserva)
        alert(JSON.stringify(reservas))
        localStorage.setItem("reservas", JSON.stringify(reservas));
        const elem = document.getElementById("homeform");
        elem.style.display = "none";
        const schedule = document.getElementById("schedule");
        schedule.style.display = "grid";
    });

    return (
        <Ariakit.Form
            store={form}
            aria-labelledby="Login"
            className="wrapper"
            id="homeform"
        >
            <h2 id="Login" className="heading">
                Elige fecha y centro
            </h2>
            <div className="field">
                <Ariakit.FormLabel name={form.names.calendar}>Fecha</Ariakit.FormLabel>
                <DatePicker value={value_cal} onChange={handleChange}/>
                <Ariakit.FormError name={form.names.calendar} className="error" />
            </div>
            <div className="field">
                <Ariakit.FormLabel name={form.names.centro}>Centro</Ariakit.FormLabel>
                <Select required defaultValue="UPS Leganes" onChange={handleChange2}>
                    <Option value="UPS Leganes">UPS Leganes</Option>
                    <Option value="UC3M Getafe">UC3M Getafe</Option>
                </Select>
                <Ariakit.FormError name={form.names.password} className="error" />
            </div>
            <div className="buttons">
                <Ariakit.FormReset className="button">
                    Borrar
                </Ariakit.FormReset>
                <Ariakit.FormSubmit className="button">
                    Aceptar
                </Ariakit.FormSubmit>
            </div>
        </Ariakit.Form>
    );
}
