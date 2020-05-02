import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Next } from "../../svg/next";
import { Formik, Form } from "formik";
import * as Yup from "yup";

class ConfirmOrder extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          acceptTerms: false,
        }}
        validationSchema={Yup.object().shape({
          acceptTerms: Yup.bool().oneOf([true]),
        })}
        onSubmit={(fields) => {
          this.props.toNextStep();
        }}
      >
        {(formik) => (
          <Form action="#" className="terms-wrp text-center mt-3 pt-3">
            <label className="customCheckbox">
              <input type="checkbox" {...formik.getFieldProps("acceptTerms")} />
              <span className={formik.errors.acceptTerms ? " is-invalid" : ""}>
                I accept <a href="/">terms and conditions</a>
              </span>
            </label>
            <Button
              className="mt-3"
              type="submit"
              size="lg"
              block
              variant="primary"
            >
              <Next />
              Procced
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ConfirmOrder;
