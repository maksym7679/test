import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import OrderForm from "./OrderForm";
import OrderTotal from "./OrderTotal";
import ContactDetails from "../ContactDetails";
import OrderAdditional from "./OrderAdditional";
import ConfirmOrder from "./ConfirmOrder";

import _order from "../../data/order";

class OrderContainer extends Component {
  state = {
    orderObj: _order.common,
    currentDoctype: _order.common[0],
    iso: _order.data.currency.iso,
    price: _order.common[0].prices[0],
    step: 1,
    defaultLevel: {
      label: _order.common[0].levels[0].label,
      value: _order.common[0].levels[0].value,
    },
    doctype: null,
    level: null,
    position: null,
    vasList: [],
    vasesID: [],
    sumPrices: 0,
  };

  componentWillMount() {
    // axios fetch
    this.setState(
      () => {
        return {
          doctype: {
            label: _order.common[0].doctypeName,
            value: _order.common[0].doctypeId,
          },
          level: {
            label: _order.common[0].levels[0].label,
            value: _order.common[0].levels[0].value,
          },
          position: "",
        };
      },
      () => {
        this.calculatePrice();
      }
    );
  }

  calculatePrice = () => {
    const price1 = this.state.price.originalPrice;
    const price2 = this.state.vasList.reduce((sum, current) => {
      return sum + current.originalPrice;
    }, 0);
    const sumPrices = price1 + price2;
    this.setState({
      sumPrices,
    });
  };

  updateDoctype = (doctype) => {
    const result = {
      ...doctype,
    };
    if (JSON.stringify(result) === JSON.stringify(this.state.doctype)) return;
    this.setState(
      (state) => {
        return {
          doctype: result,
          level: state.defaultLevel,
          currentDoctype: state.orderObj.find(
            (item) => +item.doctypeId === +result.value
          ),
          vasList: [],
          vasesID: [],
        };
      },
      () => {
        this.setState(
          (state) => {
            return {
              price: this.price(state.currentDoctype, state.level.value),
            };
          },
          () => {
            this.calculatePrice();
          }
        );
      }
    );
  };

  updateLevel = (level) => {
    const result = {
      ...level,
    };
    if (JSON.stringify(result) === JSON.stringify(this.state.level)) return;
    this.setState(
      () => {
        return {
          level: result,
        };
      },
      () => {
        this.setState(
          (state) => {
            return {
              price: this.price(state.currentDoctype, state.level.value),
            };
          },
          () => {
            this.calculatePrice();
          }
        );
      }
    );
  };

  goBack = () => {
    this.setState((state) => {
      return {
        step: state.step--,
      };
    });
  };

  toNextStep = () => {
    this.setState((state) => {
      return {
        step: state.step++,
      };
    });
  };

  price = (doctype, level) => {
    return doctype.prices.find((item) => +item.level === +level);
  };

  addVas = (id) => {
    const currentVas = this.state.currentDoctype.additional.find(
      (item) => item.id === id
    );
    this.setState(
      (state) => {
        const vasList = [...state.vasList, currentVas];
        const vasesID = [...state.vasesID, currentVas.id];
        return {
          vasList,
          vasesID,
        };
      },
      () => {
        this.calculatePrice();
      }
    );
  };

  removeVas = (id) => {
    this.setState(
      (state) => {
        const vasList = state.vasList.filter((item) => item.id !== id);
        const vasesID = state.vasesID.filter((item) => item !== id);
        return {
          vasList,
          vasesID,
        };
      },
      () => {
        this.calculatePrice();
      }
    );
  };

  render() {
    const {
      currentDoctype,
      iso,
      doctype,
      level,
      position,
      price,
      step,
      vasList,
      vasesID,
      sumPrices,
    } = this.state;
    const { additional } = currentDoctype;
    return (
      <Container className="pt-5">
        <Row>
          <Col lg="8">
            {step === 1 ? (
              <>
                <OrderForm
                  currentDoctype={currentDoctype}
                  doctype={doctype}
                  level={level}
                  position={position}
                  updateDoctype={this.updateDoctype}
                  updateLevel={this.updateLevel}
                />
                <div className="additional-services-wrp">
                  <div className="additional-services-title">
                    Additional Services:
                  </div>
                  <div className="additional-services-item-wrp">
                    {additional.map((item) => (
                      <OrderAdditional
                        key={item.id}
                        item={item}
                        iso={iso}
                        addVas={this.addVas}
                        vasesID={vasesID}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <ContactDetails goBack={this.goBack} />
            )}
          </Col>
          <Col lg="4">
            <OrderTotal
              doctype={doctype}
              level={level}
              price={price}
              iso={iso}
              vasList={vasList}
              sumPrices={sumPrices}
              removeVas={this.removeVas}
            />
          </Col>
        </Row>
        {step === 1 && (
          <Row>
            <Col lg="8">
              <ConfirmOrder toNextStep={this.toNextStep} />
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default OrderContainer;
