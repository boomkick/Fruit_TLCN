export const numWithCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

export const roundPrice = (num) => Math.round(num/100)*100

export const formatDate = (date) => {
    console.log("formatDate type of: ", typeof date);
    if (typeof date === "Date"){
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${da}-${mo}-${ye}`
    }
    try {
        return (date.format("YYYY-MM-DD"))
      }
      catch(err) {
        return undefined
      }
}