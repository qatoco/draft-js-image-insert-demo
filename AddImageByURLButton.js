import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import insertDataBlock from 'draft-js-buttons-plugin/lib/utils/insertDataBlock.js';
import axios from 'axios';

const token = '?token=token';
const serverURL = 'http://localhost:25478';

export default class imageButton extends Component {
  onClick = e => {
    e.preventDefault();
    ReactDOM.findDOMNode(this.refs.fileInput).click();
  };

  inputChange = async e => {
    const file = e.target.files[0];
    const params = new FormData();
    params.append('file', file);
    const response = await axios.post(`${serverURL}/upload${token}`, params, {
      headers: { 'Content-Type': `multipart/form-data; boundary=${params._boundary}` }
    });
    const imageData = { src: `${serverURL}/${response.data.path}${token}`, type: 'placeholder' };
    this.props.setEditorState(insertDataBlock(this.props.getEditorState(), imageData, 'image'));
  };

  preventBubblingUp = event => {
    event.preventDefault();
  };

  render() {
    const { theme } = this.props;
    return (
      <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp} style={{ color: 'inherit' }}>
        <button className={theme.button} onClick={this.onClick} type="button">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M18.222 6H5.778C4.8 6 4 6.6 4 7.333v9.334C4 17.4 4.8 18 5.778 18h12.444C19.2 18 20 17.4 20 16.667V7.333C20 6.6 19.2 6 18.222 6zm-4.084 4l-3 4.51L9 11.503 6 16h12l-3.862-6z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </button>

        <div className={theme.addImage}>
          <input type="file" ref="fileInput" onChange={this.inputChange} style={{ display: 'none' }} />
        </div>
      </div>
    );
  }
}
