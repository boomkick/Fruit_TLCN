export const numWithCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

export const roundPrice = (num) => Math.round(num/100)*100