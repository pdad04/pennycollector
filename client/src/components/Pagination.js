import React, {useEffect, useState} from 'react'
import "./Pagination.css";
import {IoCaretDownOutline, IoCaretUpOutline} from "react-icons/io5";

const Pagination = ({totalItems, incrementPagination}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const items = [];


  useEffect(() => {
    const paginationElement = document.querySelector(".pagination__container");
    
    paginationElement.addEventListener("click",toggleDropDown);

    return () => {
      paginationElement.removeEventListener("click", toggleDropDown);
    } 
  },[pageNumber, isDropdownVisible]);

  const toggleDropDown = () => {
    isDropdownVisible ? setIsDropdownVisible(false) : setIsDropdownVisible(true);
    const paginationDropdown = document.querySelector(".pagination__dropdown")
    paginationDropdown.classList.toggle("pagination__dropdown-down");
    paginationDropdown.scrollTo(0,0);
  }

  const dropDownItemClicked = (e) => {
    setIsDropdownVisible(false);
    setPageNumber(e.target.textContent);
    incrementPagination(parseInt(e.target.textContent));
  }

  for(let i = 1; i <= Math.ceil(totalItems/20); i++){
    items.push(<li className="pagination__item">{i}</li> )
  }

  return (
    <div className="pagination">
      <div className="pagination__text">Page:&nbsp;&nbsp;</div>
      <div className="pagination__container">
        <div className="pagination__first">{pageNumber}<span className="pagination__first-after">{isDropdownVisible ? <IoCaretUpOutline /> : <IoCaretDownOutline />}</span></div>
        <ul className="pagination__dropdown" onClick={dropDownItemClicked}>{items}</ul>
      </div>
      <div className="pagination__text">&nbsp;&nbsp;of {Math.ceil(totalItems/20)}</div>
    </div>
  )
}

export default Pagination