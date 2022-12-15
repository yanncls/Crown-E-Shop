import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group className="group">
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.lenght}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
