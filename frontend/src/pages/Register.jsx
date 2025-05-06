import Form from "../components/Form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Register.css";

function Register() {
  return (
    <div className="register-page">
      <Navbar />
      <main>
        
        <div className="form-container">
        <h2>Create An Account</h2>
        <p>Please Fill out the required fields.</p>
          <Form route="/api/user/register/" method="register" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;