import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ContactForm from "./ContactForm";
import { Sequre } from "../svg/order";
import { Back } from "../svg/back";
import { Google } from "../svg/google";
import { Facebook } from "../svg/facebook";
import { Linkedin } from "../svg/linkedin";

class ContactDetails extends Component {
  goBack = () => {
    this.props.goBack();
  };
  render() {
    return (
      <>
        <Row>
          <Col>
            <div onClick={this.goBack} className="contact-label">
              <Back />
              Back to order details
            </div>
          </Col>
          <Col>
            <div className="secure-title text-right">
              <Sequre />
              <span className="ml-2">Secure Checkout</span>
            </div>
          </Col>
        </Row>
        <div className="order-title">Contact details</div>
        <div className="contact-social">Connect your social profile</div>
        <Row>
          <Col>
            <Button className="btn-google" size="lg" block variant="secondary">
              <Google />
              Google
            </Button>
          </Col>
          <Col>
            <Button
              className="btn-facebook"
              size="lg"
              block
              variant="secondary"
            >
              <Facebook />
              Facebook
            </Button>
          </Col>
          <Col>
            <Button
              className="btn-linkedin"
              size="lg"
              block
              variant="secondary"
            >
              <Linkedin />
              Linkedin
            </Button>
          </Col>
        </Row>
        <div className="contact-social text-center or mt-3">
          <span>or</span>
        </div>
        <ContactForm />
      </>
    );
  }
}

export default ContactDetails;
