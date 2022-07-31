import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "../css/success.css";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const Back = (props) => {
  return (
    <Link to={props.to} className="back-button">
      <svg id="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16" color="#2c2a2a">
        <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
      </svg>
      Tilbake
    </Link>
  );
}

const Delete = (props) => {
  const onClick = () => {
    let uri = `admin/${props.section}/delete/${props.id}`;
    axios.delete(process.env.REACT_APP_API_BASE_URL + uri, {headers: {"Authorization": `Bearer ${cookies.get("TOKEN")}`}});
    props.notifyParent();
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg delete" viewBox="0 0 16 16" color="#cc0000" onClick={onClick}>
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  )
}

const DeleteInternal = ({deleteInternal, element}) => {
  const handleDelete = (e) => {
    deleteInternal(e, element);
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg delete" viewBox="0 0 16 16" color="#cc0000" onClick={handleDelete}>
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  );
}

const Popup = (props) => {
  return (
    <div className="popup-box" onClick={props.onClick}>
      <div className="box">
        {props.content}
      </div>
    </div>
  );
}

const Success = () => {
  return (
    <div className="success-checkmark">
      <div className="check-icon">
        <span className="icon-line line-tip"></span>
        <span className="icon-line line-long"></span>
        <div className="icon-circle"></div>
        <div className="icon-fix"></div>
      </div>
    </div>
  );
}

// TODO: long filenames, file size
const FileUploader = ({onFileSelect}) => {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  const handleFileInput = (e) => {
    let file = e.target.files[0];
    let path = e.target.value;
    if (allowedExtensions.exec(path)) {
      onFileSelect(file);
    } else {
      e.target.value = null;
    }
  }

  return (
      <div className="file-uploader">
          <input
            id="file-input"
            type="file"
            className="form-input file-select"
            onChange={handleFileInput}
          />
      </div>
  )
}

// generic add button
const AddButton = (props) => {
  return (
    <button className="form-add-button" onClick={props.handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" color="#ffffff" className="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </button>
  )
}

// search bar
const SearchBar = ({handleChange}) => {
  return (
    <input type="text" id="search-bar" className="search-bar form-input w-100" placeholder="Search..." onChange={handleChange} />
  )
}

export {Back, Delete, DeleteInternal, Popup, Success, FileUploader, AddButton, SearchBar};
