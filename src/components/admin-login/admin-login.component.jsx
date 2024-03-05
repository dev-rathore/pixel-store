import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Noty from "noty";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./admin-login.styles.scss";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const AdminLogin = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
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
          new Noty({
            type: "error",
            text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> Wrong credentials`,
            layout: "topCenter",
            theme: "sunset",
            timeout: 5000,
          }).show();
          break;
        case "auth/user-not-found":
          new Noty({
            type: "error",
            text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> Wrong credentials`,
            layout: "topCenter",
            theme: "sunset",
            timeout: 5000,
          }).show();
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
        <form onSubmit={handleSubmit}>
          <FormInput
            autoComplete="off"
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
