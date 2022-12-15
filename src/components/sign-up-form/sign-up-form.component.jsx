import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignupContainer } from "./sign-up-form.styles.jsx";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// set default object fields
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  // set destructuring object for using values
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // confirm passwords matches
    if (password !== confirmPassword) {
      alert("le mot de passe ne correspond pas");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email déjà utilisé");
      } else {
        console.log("user error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignupContainer>
      <h2>Vous n'avez pas de compte ?</h2>
      <span>S'enregister avec un mail et un mot de passe</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nom"
          type="text"
          name="displayName"
          id="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          id="email"
          required
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Mot de passe"
          type="password"
          name="password"
          id="password"
          required
          onChange={handleChange}
          value={password}
          minLength="6"
        />

        <FormInput
          label="Confirmer le mot de passe"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
          minLength="6"
        />
        <Button type="submit">S'enregistrer</Button>
      </form>
    </SignupContainer>
  );
};

export default SignUpForm;
