import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "../css/success.css";


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
    axios.delete(process.env.REACT_APP_API_BASE_URL + uri);
    props.notifyParent();
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg delete" viewBox="0 0 16 16" color="#cc0000" onClick={onClick}>
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  )
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

const FileUploader = ({onFileSelect}) => {
  const fileInput = useRef(null)
  const handleFileInput = (e) => {
      onFileSelect(e.target.files[0])
  }

  return (
      <div className="file-uploader">
          <input type="file" onChange={handleFileInput} />
      </div>
  )
}

export {Back, Delete, Popup, Success, FileUploader};
