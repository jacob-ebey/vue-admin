import moment from 'moment'

export const formatDateAndTime = (value) => {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
}
