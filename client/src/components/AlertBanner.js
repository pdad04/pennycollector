import React from 'react'
import {IoCloseOutline, IoCloseCircleOutline} from "react-icons/io5"
import "./AlertBanner.css";

function AlertBanner(props) {
  const {type, message} = props.alert;
  const closeAlert = props.close;
  console.log(type, message)
  return (
      <div className={`alert ${type ? type : ""}`}>
        <h3>{message}</h3>
        <div onClick={closeAlert}><IoCloseOutline /></div>
      </div>
  )
}

export default AlertBanner