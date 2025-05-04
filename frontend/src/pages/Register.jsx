import Form from "../components/Form"
import Navbar from "../components/Navbar";
import "../styles/Register.css";

function Register() {
    return (
        <>
            <Navbar />
            <Form route="/api/user/register/" method="register" />
        </>

    );
}

export default Register