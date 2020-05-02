import React, { Component } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

class OrderAdditional extends Component {
  addVas = (id) => {
    this.props.addVas(id);
  };

  render() {
    const { item, iso, vasesID } = this.props;
    return (
      <div
        key={item.id}
        className="additional-services-item d-flex justify-content-between"
      >
        <div className="additional-services-item-name d-flex align-items-center">
          {item.name}
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="right">Tooltip</Tooltip>}
          >
            <span className="additional-services-item-icon">?</span>
          </OverlayTrigger>
        </div>
        <div className="additional-services-item-price-wrp">
          <div className="d-flex ml-auto">
            <div className="additional-services-item-price">
              <div className="additional-services-item-price-current text-right">
                {iso}
                {item.discountPrice}
              </div>
              <div className="additional-services-item-price-old">
                <span className="mr-1">
                  {iso}
                  {item.originalPrice}
                </span>
                Save {iso}
                {item.originalPrice - item.discountPrice}
              </div>
            </div>
            {vasesID.indexOf(item.id) !== -1 ? (
              ""
            ) : (
              <div>
                <Button variant="primary" onClick={() => this.addVas(item.id)}>
                  Add to order
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default OrderAdditional;
