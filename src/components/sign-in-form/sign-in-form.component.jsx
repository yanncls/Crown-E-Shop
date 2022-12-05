import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("champs incorrects");
      return;
    }
    try {
      const response = await signInAuthWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("mot de passe incorrect");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
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
    <div className="sign-in-container">
      <h2>Vous avez déjà un compte ?</h2>
      <span>Se connecter avec votre mail et mot de passe</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          id="email"
          required
          onChange={handleChange}
        />
        <FormInput
          label="Mot de passe"
          type="password"
          name="password"
          id="password"
          required
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Se connecter</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Utiliser Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
