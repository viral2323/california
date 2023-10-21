import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import { FormContext } from "../Form/Form";

function FormInput(props: any) {
  const { label, type = "text", name } = props;

  const formContext = useContext(FormContext);
  const { form } = formContext;
  return (
    <TextField
      id="standard-basic"
      label={label}
      type={type}
      name={name}
      variant="standard"
    />
  );
}

export default FormInput;
