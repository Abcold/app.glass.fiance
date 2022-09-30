import moment from 'moment'
export function formatTime(time) {
  if(String(time) < 13) {
    time = time * 1000
  }
  if(time) {
    return moment(time).format('YYYY-MM-DD HH:mm (UTC)')
  }else{
    return '-'
  }
}

export function getOrderTimes () {
  const date = moment()
  const orderTime = date.format('YYYY-MM-DD HH:mm (UTC)')
  const startTime = date.add(1,'d').format('YYYY-MM-DD HH:mm (UTC)')
  const settlement = date.add(2, 'd').format('YYYY-MM-DD HH:mm (UTC)')
  return {
    orderTime,startTime,settlement
  }
}
