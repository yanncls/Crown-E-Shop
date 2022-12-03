import { async } from "@firebase/util";
import { useState } from "react";

import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

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

  console.log(formFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // confirm passwords matches
    if (password !== confirmPassword) {
      console.log("vérifier que le mot de passe soit le même");
      return;
    } else {
      // verficate if createAuthUser auth a user
      createAuthUserWithEmailAndPassword(email, password);
      // create userDoc
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>S'enregister avec un mail et un mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nom</label>
        <input
          type="text"
          name="displayName"
          id=""
          required
          onChange={handleChange}
          value={displayName}
        />

        <label htmlFor="">Email</label>
        <input
          type="email"
          name="email"
          id=""
          required
          onChange={handleChange}
          value={email}
        />

        <label htmlFor="">Mot de passe</label>
        <input
          type="password"
          name="password"
          id=""
          required
          onChange={handleChange}
          value={password}
        />

        <label htmlFor="">Confirmer le mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          id=""
          required
          onChange={handleChange}
          value={confirmPassword}
        />
        <button type="submit">S'enregistrer</button>
      </form>
    </div>
  );
};

export default SignUpForm;
