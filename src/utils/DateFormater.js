import React from 'react'
import Moment from "react-moment"

const DateFormater = ({ children }) => {
  return (
    <Moment format='D MMMM YYYY' withTitle>
        {children}
    </Moment>
  )
}

export default DateFormater