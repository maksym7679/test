import _order from "../data/order";

const doctypes = _order.common;

const doctypesOptions = doctypes.map((e) => ({
  label: e.doctypeName,
  value: e.doctypeId,
}));

export default doctypesOptions;
