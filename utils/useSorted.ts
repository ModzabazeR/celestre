import { useState } from 'react'
import { dbItem } from '../typings'


const useSorted = () => {
    const [isReversed, setIsReversed] = useState(false)
    const [isSortedByDate, setIsSortedByDate] = useState(true)
  
    const sortedByDate = (a: dbItem, b: dbItem) => {
      if (isReversed) {
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
      }
      else {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      }
    }
  
    const sortedByDuration = (a: dbItem, b: dbItem) => {
      // duration format: mm:ss
      const a_duration = a.duration.split(':').map(Number)
      const b_duration = b.duration.split(':').map(Number)
  
      if (isReversed) {
        return a_duration[0] * 60 + a_duration[1] - (b_duration[0] * 60 + b_duration[1])
      }
      else {
        return b_duration[0] * 60 + b_duration[1] - (a_duration[0] * 60 + a_duration[1])
      }
    }

    return {
        isReversed,
        isSortedByDate,
        setIsReversed,
        setIsSortedByDate,
        sortedByDate,
        sortedByDuration
    }
}

export default useSorted