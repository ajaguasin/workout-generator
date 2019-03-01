import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

class ExerciseForm extends Component {
  putDataToDB = values => {
    axios.post("http://localhost:8000/api/putData", {
      name: values.exercise,
      bodyPart: values.bodyPart
    });
  };

  validate = values => {
    let errors = {};
    if (!values.exercise) {
      errors.exercise = "Required";
    }
    if (!values.reps) {
      errors.reps = "Required";
    }
    if (!values.sets) {
      errors.sets = "Required";
    }

    return errors;
  };
  render() {
    return (
      <Formik
        initialValues={{
          exercise: "",
          sets: "",
          reps: "",
          weight: ""
        }}
        validate={this.validate}
        onSubmit={(values, actions) => {
          this.putDataToDB(values);
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="exercise" placeholder="Exercise Name" />
            <ErrorMessage name="exercise" component="div" />
            <Field type="number" name="sets" min="1" max="10" />
            <ErrorMessage name="sets" component="div" />
            <Field type="number" name="reps" min="1" max="20" />
            <ErrorMessage name="reps" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ExerciseForm;
