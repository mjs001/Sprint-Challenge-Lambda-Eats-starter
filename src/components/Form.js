import React, { useState, useEffect } from "react";

function Form() {
  const [post, setPost] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const formSubmit = e => {
    e.preventDefault();
    console.log("submitted");
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost([...post, res.data]);
        setFormState({
          name: "",
          size: "",
          olives: "",
          peppers: "",
          onions: "",
          beef: "",
          special: ""
        });
        console.log("success", res);
        console.log("users", users);
      })
      .catch(err => console.log(err.response));
  };

  const [formState, setFormState] = useState({
    name: "",
    size: "",
    olives: "",
    peppers: "",
    onions: "",
    beef: "",
    special: ""
  });

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Must include your name."),
    size: Yup.string(),
    olives: Yup.boolean(),
    peppers: Yup.boolean(),
    onions: Yup.boolean(),
    beef: Yup.boolean(),
    special: Yup.string()
  });

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    olives: "",
    peppers: "",
    onions: "",
    beef: "",
    special: ""
  });

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  // const validateChange = e => {
  //   Yup.reach(formSchema, e.target.name)
  //     .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
  //     .then(valid => {
  //       setErrors({
  //         ...errors,
  //         [e.target.name]: ""
  //       });
  //     })
  //     .catch(err => {
  //       setErrors({
  //         ...errors,
  //         [e.target.name]: err.errors[0]
  //       });
  //     });
  // };
  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    //   validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        <input
          type="name"
          name="name"
          placeholder="pizza name"
          value={formState.name}
          onChange={inputChange}
        />
      </label>
      <select id="size" name="size">
        <option value="small" />
        <option value="medium" />
        <option value="large" />
      </select>

      <label htmlFor="olives">
        Do you agree to the terms?
        <input
          type="checkbox"
          name="olives"
          checked={formState.olives}
          onChange={inputChange}
        />
      </label>

      <label htmlFor="peppers">
        Do you agree to the terms?
        <input
          type="checkbox"
          name="peppers"
          checked={formState.peppers}
          onChange={inputChange}
        />
      </label>

      <label htmlFor="onions">
        Do you agree to the terms?
        <input
          type="checkbox"
          name="onions"
          checked={formState.onions}
          onChange={inputChange}
        />
      </label>

      <label htmlFor="beef">
        Do you agree to the terms?
        <input
          type="checkbox"
          name="beef"
          checked={formState.beef}
          onChange={inputChange}
        />
      </label>

      <label htmlFor="special">
        <input
          type="name"
          name="special"
          placeholder="special instructions"
          value={formState.special}
          onChange={inputChange}
        />
      </label>
      <button disabled={buttonDisabled}>Submit</button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
}

export default Form;
