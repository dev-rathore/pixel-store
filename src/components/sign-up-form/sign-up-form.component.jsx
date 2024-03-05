import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Noty from "noty";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// import { UserContext } from '../../contexts/user.context';

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const navigate = useNavigate();

  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      new Noty({
        type: "warning",
        text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> Passwords do not match`,
        layout: "topCenter",
        theme: "sunset",
        timeout: 5000,
      }).show();
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // console.log(user);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();

      navigate(`/`);

      new Noty({
        type: "success",
        text: `<i class="fa-solid fa-circle-check" style="margin-right: 8px"></i> Registered Successfully, Happy Shopping :)`,
        layout: "topCenter",
        theme: "sunset",
        timeout: 4000,
      }).show();

      // setCurrentUser(user);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        new Noty({
          type: "error",
          text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> User already exist with this email, Try login instead`,
          layout: "topCenter",
          theme: "sunset",
          timeout: 5000,
        }).show();
      } else {
        new Noty({
          type: "error",
          text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> User creation encountered an error: ${error.message}`,
          layout: "topCenter",
          theme: "sunset",
          timeout: 5000,
        }).show();
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
