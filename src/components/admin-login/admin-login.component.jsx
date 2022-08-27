import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./admin-login.styles.scss";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
  error: "",
};

const AdminLogin = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, error } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();

      navigate("/admin/dashboard");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setFormFields({ ...formFields, error: "Wrong credentials" });
          break;
        case "auth/user-not-found":
          setFormFields({ ...formFields, error: "Wrong Details" });
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        {error === "" ? (
          <p></p>
        ) : (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />

          <Button type="submit" buttonType="inverted">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
