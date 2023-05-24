export const numWithCommas = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const roundPrice = (num) => Math.round(num / 100) * 100;

export const formatDate = (date) => {
  console.log("formatDate type of: ", typeof date);
  if (typeof date === "Date") {
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    return `${da}-${mo}-${ye}`;
  }
  try {
    return date.format("YYYY-MM-DD");
  } catch (err) {
    return undefined;
  }
};

export const groupByGiftCart = (giftCartList, cartDetailList) => {
  let noGiftList = cartDetailList.filter((cartDetail) => !cartDetail.giftCart);
  let giftCartListAdded = [];
  if (giftCartList.length > 0) {
    giftCartListAdded = giftCartList.map((giftCart) => ({
      ...giftCart,
      cartDetails: cartDetailList.filter(
        (cartDetail) => cartDetail.giftCart?.id == giftCart.id
      ),
    }));
  }
  return {
    noGiftList: noGiftList,
    giftCartList: giftCartListAdded,
  };
};

export const groupByGiftCartWithCartDetails = (cartDetailList) => {
  let result = {
    noGiftList: [],
    giftCartList: null,
  };
  // let giftCartListAdded = []
  cartDetailList.forEach((item) => {
    console.log("item: ", item);
    if (item?.giftCart == null) {
      result.noGiftList.push(item);
    } else {
      let isGiftCartExist = false;
      result.giftCartList = result.giftCartList.map((giftCart) => {
        if (giftCart.id == item.giftCart.id) {
          isGiftCartExist = true;
          return {
            ...giftCart,
            cartDetails:
              giftCart.cartDetails.length > 0
                ? giftCart.cartDetails.push(item)
                : [item],
          };
        }
      });
      if (!isGiftCartExist) {
        let newGiftCart = {
          ...item.giftCart,
          cartDetails: [item],
        };
        result.giftCartList.push(newGiftCart);
      }
    }
  });
  return result;
};
