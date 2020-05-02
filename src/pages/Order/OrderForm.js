import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Select from "react-select";

import Dropzone from "./Dropzone";
import { Sequre } from "../../svg/order";
import doctypesOption from "../../common/doctypes";

class OrderForm extends Component {
  handleDoctype = (selected) => {
    this.props.updateDoctype(selected);
  };

  handleLevel = (selected) => {
    this.props.updateLevel(selected);
  };

  render() {
    const { doctype, level, position } = this.props;
    const { levels } = this.props.currentDoctype;

    return (
      <>
        <Row>
          <Col>
            <div className="order-title">Order details</div>
          </Col>
          <Col>
            <div className="secure-title text-right">
              <Sequre />
              <span className="ml-2">Secure Checkout</span>
            </div>
          </Col>
        </Row>
        <Form className="mt-3">
          <Form.Group>
            <Form.Label>Select service:</Form.Label>
            <Select
              options={doctypesOption}
              value={doctype}
              isSearchable={false}
              onChange={this.handleDoctype}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#1aaecb",
                },
              })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Level:</Form.Label>
            <Select
              options={levels}
              value={level}
              isSearchable={false}
              onChange={this.handleLevel}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Target Position:</Form.Label>
            <div>{position}</div>
            <Form.Control
              // value={position}
              // onChange={this.handleChange}
              placeholder="For example, Sales manager, Designer etc."
            />
          </Form.Group>
        </Form>
        <Dropzone />
      </>
    );
  }
}

export default OrderForm;
