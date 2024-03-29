import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Noty from "noty";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// import { UserContext } from '../../contexts/user.context';

import {
  signInWithGooglePopup,
  // createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // const { setCurrentUser } = useContext(UserContext);

  const notyUserOnSuccessfulSignIn = () => {
    new Noty({
      type: "success",
      text: `<i class="fa-solid fa-circle-check" style="margin-right: 8px"></i> Signed in successfully, Happy Shopping :)`,
      layout: "topCenter",
      theme: "sunset",
      timeout: 4000,
    }).show();
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    // const { user } = await signInWithGooglePopup();
    // createUserDocumentFromAuth(user);

    // const userDocRef = await createUserDocumentFromAuth(user);
    signInWithGooglePopup();
    navigate(`/`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      // const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      // console.log(user);
      // setCurrentUser(user);

      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();

      navigate(`/`);

      notyUserOnSuccessfulSignIn();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          new Noty({
            type: "error",
            text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> Incorrect password`,
            layout: "topCenter",
            theme: "sunset",
            timeout: 5000,
          }).show();
          break;
        case "auth/user-not-found":
          new Noty({
            type: "error",
            text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> No user found with this email`,
            layout: "topCenter",
            theme: "sunset",
            timeout: 5000,
          }).show();
          break;
        default:
          new Noty({
            type: "error",
            text: `<i class="fa-solid fa-circle-exclamation" style="margin-right: 8px"></i> ${error.message}`,
            layout: "topCenter",
            theme: "sunset",
            timeout: 5000,
          }).show();
      }
    }

    setIsProcessing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
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

        <div className="buttons-container">
          <Button type="submit" isLoading={isProcessing}>Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
