import { getEmotionImage } from "./get-emotion-image";

export const getFormattedDate = (targetDate) => {
  // 날짜 => YYYY-MM-DD
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if(month < 10) {
    month = `0${month}`;
  }
  if(date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`
}
export const emotionList = [
  {
    id: 1,
    name: "완전 좋음",
    img: getEmotionImage(1),
  },
  {
    id: 2,
    name: "좋음",
    img: getEmotionImage(2),
  },
  {
    id: 3,
    name: "그럭저럭",
    img: getEmotionImage(3),
  },
  {
    id: 4,
    name: "나쁨",
    img: getEmotionImage(4),
  },
  {
    id: 5,
    name: "끔찍함",
    img: getEmotionImage(5),
  },
]
export const getMonthRangeByDate = (date) => {
  const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const endTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();
  return {beginTimeStamp, endTimeStamp}
}