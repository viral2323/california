import React, { useState } from "react";
import Button from "@mui/material/Button";
export const FormContext = React.createContext({
  form: {},
});

function Form(props: any) {
  const { children, submit = () => {}, initialValues } = props;
  const [form, setForm] = useState(initialValues);

  const handleFormChange = (event: any): any => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <form>
        <FormContext.Provider
          value={{
            form,
            // handleFormChange
          }}
        >
          {children}
        </FormContext.Provider>

        <Button variant="contained" onClick={() => submit(form)}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default Form;
