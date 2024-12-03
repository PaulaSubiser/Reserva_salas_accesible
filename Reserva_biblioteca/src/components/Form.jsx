import * as Ariakit from "@ariakit/react";
import { Link } from "react-router-dom";
import "../css/Form.css";


export default function Form() {
    const form = Ariakit.useFormStore({ defaultValues: { name: "", password: "" } });

    form.useSubmit(async (state) => {
        window.location.href = "/Home";
    });

    return (
        <Ariakit.Form
            store={form}
            aria-labelledby="Login"
            className="wrapper"
        >
            <h1 id="Login" className="heading">
                Iniciar Sesión
            </h1>
            <div className="field">
                <Ariakit.FormLabel name={form.names.name}>Nombre</Ariakit.FormLabel>
                <Ariakit.FormInput
                    name={form.names.name}
                    placeholder="John Doe"
                    className="input"
                    required
                />
                <Ariakit.FormError name={form.names.name} className="error" />
            </div>
            <div className="field">
                <Ariakit.FormLabel name={form.names.password}>Contraseña</Ariakit.FormLabel>
                <Ariakit.FormInput
                    type="password"
                    name={form.names.password}
                    placeholder="Introduzca una contraseña"
                    className="input"
                    required
                />
                <Ariakit.FormError name={form.names.password} className="error" />
            </div>
            <a href="">Recordar contraseña</a>
            <div className="buttons">
                <Ariakit.FormReset className="button">
                    Reiniciar
                </Ariakit.FormReset>
                <Ariakit.FormSubmit className="button">
                    Login
                </Ariakit.FormSubmit>
            </div>
        </Ariakit.Form>
    );
}
