import { formatDistanceToNow } from "date-fns"

const getTimeStamp = (date: Date): string => {
    const distance = formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: false,
    })
    return distance;
    }
export default getTimeStamp;