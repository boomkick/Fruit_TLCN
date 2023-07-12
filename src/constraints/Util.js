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

export const formatDateTime = (date) => {
  date = new Date(date);
  
  // Lấy ngày, tháng, năm
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  
  // Lấy giờ, phút, giây
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  
  // Chuyển đổi sang chuỗi và thêm số 0 nếu cần thiết
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const formatDateTimeShort = (date) => {
  date = new Date(date);
  
  // Lấy ngày, tháng, năm
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  
  // Lấy giờ, phút, giây
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  // Chuyển đổi sang chuỗi và thêm số 0 nếu cần thiết
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatDateText = (date) => {
  date = new Date(date);
  
  // Lấy ngày, tháng, năm
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  
  // Chuyển đổi sang chuỗi và thêm số 0 nếu cần thiết
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}/${month}/${year}`;
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
    giftCartList: [],
  };
  cartDetailList.forEach((item) => {
    if (item?.giftCart == null) {
      result.noGiftList.push(item);
    } else {
      let isGiftCartExist = false;
      result.giftCartList.forEach((giftCart) => {
        if (giftCart.id == item.giftCart.id) {
          isGiftCartExist = true;
          giftCart.cartDetails.push(item);
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
