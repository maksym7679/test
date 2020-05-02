import React, { Component } from "react";
import { Remove } from "../../svg/remove";

class OrderTotal extends Component {
  removeVas = (id) => {
    this.props.removeVas(id);
  };

  render() {
    const { price, doctype, level, vasList, iso, sumPrices } = this.props;
    return (
      <>
        <div className="price-block">
          <div className="price-block-top pb-3 d-flex justify-content-between">
            <div>
              <div className="fz16 price-block-top-name pr-1">
                {doctype.label}
              </div>
              <div className="price-block-top-level">{level.label}</div>
            </div>
            <div>
              {iso}
              {price.originalPrice}
            </div>
          </div>
          {vasList.map((item) => (
            <div
              key={item.id}
              className="price-block-vas py-3 d-flex justify-content-between"
            >
              <div className="fz16 price-block-top-name">{item.name}</div>
              <div>
                {iso}
                {item.originalPrice}
                <span
                  className="ml-2 remove-vas"
                  onClick={() => this.removeVas(item.id)}
                >
                  <Remove />
                </span>
              </div>
            </div>
          ))}
          <div className="price-block-bottom d-flex justify-content-between">
            <strong>Order total</strong>
            <strong className="fz16">
              {iso}
              {sumPrices}
            </strong>
          </div>
        </div>
        <div className="discount-wrp">
          <div className="discount-link text-center mt-3">
            Have a discount code?
          </div>
        </div>
      </>
    );
  }
}

export default OrderTotal;
