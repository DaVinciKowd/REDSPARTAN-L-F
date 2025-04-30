import Form from "../components/Form"
import Navbar from "../components/Navbar";

function Register() {
    return (
        <>
            <Navbar />
            <Form route="/api/user/register/" method="register" />
        </>

    );
}

export default Register