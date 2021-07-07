import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";

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
    name: Yup.string().min(2, "must be atleast 2 characters long"),
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

  //   useEffect(() => {
  //     formSchema.isValid(formState).then(valid => {
  //       setButtonDisabled(!valid);
  //     });
  //   }, [formState]);

  const validateChange = e => {
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };
  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
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
        {errors.name.length > 2 ? <p className="error">{errors.name}</p> : null}
      </label>
      <select id="size" name="size">
        <option value="small" name="small" placeholder="small">
          small
        </option>
        <option value="medium" name="medium" placeholder="medium">
          medium
        </option>
        <option value="large">large</option>
        value={formState.size}
        onChange={inputChange}
      </select>

      <label htmlFor="olives">
        olives
        <input
          type="checkbox"
          name="olives"
          checked={formState.olives}
          onChange={inputChange}
        />
      </label>

      <label htmlFor="peppers">
        peppers
        <input
          type="checkbox"
          name="peppers"
          checked={formState.peppers}
          onChange={inputChange}
        />
      </label>

      <label htmlFor="onions">
        onions
        <input
          type="checkbox"
          name="onions"
          checked={formState.onions}
          onChange={inputChange}
        />
      </label>

      <label htmlFor="beef">
        beef
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
      <button>Submit</button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
}

export default Form;
