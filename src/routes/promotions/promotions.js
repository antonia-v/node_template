import promotionsActions from '../../actions/promotions'


exports.getPromotions = (ctx) => {

  try {
    const returnItems = [];
    let total_cart_amount = 0;

    let wrongPromotion = false
    let valueZero = false

    ctx.request.body.items.forEach((item) => {
      if (item.promotion !== "Nx$" && item.promotion !== "AyA") {
        ctx.body = {status: "NOK", error_message: "RULE DOES NOT EXIST"}
        ctx.status = 400
        wrongPromotion = true;
        return
      }
      
      if (Number(item.amount) <= 0 || Number(item.unit_base_price) <= 0) {
        ctx.body = {
          status: "NOK",
          error_message: "AMOUNT OR PRICE SHOULD BE GREATER THAN ZERO",
        };
        ctx.status = 400;
        valueZero = true;
        return
      }

      let discountItem = promotionsActions.calculatePromotion(item)
      returnItems.push(discountItem)
      total_cart_amount += discountItem.total_price;

    })

    if(wrongPromotion) return ctx
    if (valueZero) return ctx

    ctx.body = {
      status: "OK",
      cart_id: ctx.request.body.cart_id,
      total_cart_amount,
      details: returnItems
    }
    ctx.status = 200

    return ctx
  }
  catch {
    ctx.body = {
      status: "NOK",
      error_message: "INTERNAL SERVER ERROR",
    };
    ctx.status = 500

    return ctx
  }
}