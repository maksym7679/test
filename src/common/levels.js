import _order from "../data/order";

export const levels = _order.data.levels;

export const levelsOptions = levels.map((e) => ({
  label: e.name,
  value: e.id,
}));
