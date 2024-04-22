const promotion_rules = [
  {
    rule: "Nx$",
    discount_percentage: 20,
    n: 4,
  },
  {
    rule: "AyA",
    discount_percentage: 15,
    n: 1,
  },
];

exports.calculatePromotion = (item) => {
  let promotion_applied = false
  let total_price = item.amount * item.unit_base_price;

  promotion_rules.forEach((rule) => {
    if (item.promotion === rule.rule) {
      let promotionsN = Math.floor(item.amount/rule.n);
      total_price = promotionsN*rule.n*(1-rule.discount_percentage/100)*item.unit_base_price
      total_price += (item.amount-promotionsN*rule.n)*item.unit_base_price

      if (promotionsN > 0 ) promotion_applied = true;
    }
  })

  return {
    item_id: item.item_id,
    amount: item.amount,
    total_price,
    promotion_applied
  };
};
