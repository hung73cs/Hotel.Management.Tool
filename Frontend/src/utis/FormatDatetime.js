export const FormatDatetime = (datetime) => {
  const regex = /\d{4}-\d{2}-\d{1,2}/
  return datetime.match(regex)
}
