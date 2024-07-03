import moment from 'moment'

export const formatTimestamp = (timestamp) => {
  const now = moment()
  const postTime = moment(timestamp)

  const diffSeconds = now.diff(postTime, 'seconds')
  const diffMinutes = now.diff(postTime, 'minutes')
  const diffHours = now.diff(postTime, 'hours')

  if (diffSeconds < 2) {
    return `${diffSeconds} sec ago`
  } else if (diffSeconds < 60) {
    return `${diffSeconds} secs ago`
  } else if (diffMinutes < 2) {
    return `${diffMinutes} min ago`
  } else if (diffMinutes < 60) {
    return `${diffMinutes} mins ago`
  } else if (diffHours < 2) {
    return `${diffHours} hour ago`
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`
  } else {
    return postTime.format('D MMMM YYYY')
  }
}
