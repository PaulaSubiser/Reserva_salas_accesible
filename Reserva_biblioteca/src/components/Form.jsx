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
            <h2 id="Login" className="heading">
                Login
            </h2>
            <div className="field">
                <Ariakit.FormLabel name={form.names.name}>Name</Ariakit.FormLabel>
                <Ariakit.FormInput
                    name={form.names.name}
                    placeholder="John Doe"
                    className="input"
                    required
                />
                <Ariakit.FormError name={form.names.name} className="error" />
            </div>
            <div className="field">
                <Ariakit.FormLabel name={form.names.password}>Password</Ariakit.FormLabel>
                <Ariakit.FormInput
                    type="password"
                    name={form.names.password}
                    placeholder="password"
                    className="input"
                    required
                />
                <Ariakit.FormError name={form.names.password} className="error" />
            </div>
            <div className="buttons">
                <Ariakit.FormReset className="button">
                    Reset
                </Ariakit.FormReset>
                <Ariakit.FormSubmit className="button">
                    Login
                </Ariakit.FormSubmit>
            </div>
        </Ariakit.Form>
    );
}
