// 1. 曜日の配列を as const で定義 (リテラル型として扱う)
const dayNames = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

// 2. dayNames からユニオン型を生成
 type DayOfWeek = typeof dayNames[number];
// ↑ "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday"

// 3. Date オブジェクトから該当する曜日を返す関数
 function getDayOfWeek(date: Date): DayOfWeek {
  // getDay() は 0 (日曜日) から 6 (土曜日) を返す
  return dayNames[date.getDay()] ?? "sunday";
}

export const getDayOfWeekStr = () => {
  return getDayOfWeek(new Date());
};
