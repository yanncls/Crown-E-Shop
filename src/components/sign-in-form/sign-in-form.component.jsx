import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useState } from "react";
import {
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { ButtonsContainer, SigninContainer } from "./sign-in-form.styles.jsx";

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
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("champs incorrects");
      return;
    }
    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);

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
    <SigninContainer>
      <h2>Vous avez déjà un compte ?</h2>
      <span>Se connecter avec votre mail et mot de passe</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          id="email-in"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Mot de passe"
          type="password"
          name="password"
          id="password-in"
          required
          onChange={handleChange}
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Se connecter</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Utiliser Google
          </Button>
        </ButtonsContainer>
      </form>
    </SigninContainer>
  );
};

export default SignInForm;
