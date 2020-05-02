import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Next } from "../svg/next";

class ContactForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{ fullName: "", email: "" }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                id="fullName"
                {...formik.getFieldProps("fullName")}
                className={
                  formik.errors.fullName && formik.touched.fullName
                    ? "form-control-error"
                    : ""
                }
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="error">{formik.errors.fullName}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                id="email"
                {...formik.getFieldProps("email")}
                className={
                  formik.errors.email && formik.touched.email
                    ? "form-control-error"
                    : ""
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            <div className="text-center">
              <Button className="px-5 mt-3" size="lg" type="submit">
                Procced to patment
                <Next />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ContactForm;
