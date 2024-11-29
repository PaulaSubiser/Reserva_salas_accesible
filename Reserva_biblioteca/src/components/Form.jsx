import * as Ariakit from "@ariakit/react";
import { Link } from "react-router-dom";
import "../css/Form.css";


export default function Form() {
    const form = Ariakit.useFormStore({ defaultValues: { name: "", email: "" } });

    form.useSubmit(async (state) => {
        window.location.href = "/Home";
    });

    return (
        <Ariakit.Form
            store={form}
            aria-labelledby="Login"
            className="wrapper"
            style={{margin:" 30vh 30vw"}}
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
                <Ariakit.FormLabel name={form.names.email}>Email</Ariakit.FormLabel>
                <Ariakit.FormInput
                    type="text"
                    name={form.names.email}
                    placeholder="johndoe@example.com"
                    className="input"
                    required
                />
                <Ariakit.FormError name={form.names.email} className="error" />
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
