import './loading.css'
import React from 'react'
class Loading extends React.Component {  
    render() {
      return (
        <center>
            <div>
              {(
                <div className="dotwrapper" style={{position:"absolute", top: '50%', left: '50%'}}>
                  <p className="loading">Loading</p>
                  <div className="dot0" />
                  <div className="dot1" />
                  <div className="dot2" />
                </div>
              )}
            </div>
        </center>
      );
    }
  }
  
  export default Loading