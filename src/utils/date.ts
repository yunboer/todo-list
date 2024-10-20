export function getYMD() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以需要+1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getShowDate(date: string) {
  const [year, month, day] = date.split("-");
  const thisYear = new Date().getFullYear();
  if (thisYear === Number(year)) {
    return `${month}月${day}日`;
  } else {
    return `${year}年${month}月${day}日`;
  }
}

export function isToday(date: string) {
  return date === getYMD();
}
export function isTomorow(date: string) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以需要+1
  const day = String(tomorrow.getDate()).padStart(2, "0");
  return date === `${year}-${month}-${day}`;
}
export function isLast7Days(date: string) {
  const today = new Date();
  const todayTime = today.getTime();
  const dateObj = new Date(date);
  const dateObjTime = dateObj.getTime();
  return todayTime - dateObjTime <= 7 * 24 * 60 * 60 * 1000;
}
