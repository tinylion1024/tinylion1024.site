export function byNewestDate<T extends { date: string }>(left: T, right: T) {
  return right.date.localeCompare(left.date);
}
