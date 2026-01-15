import React from 'react'

const Loader = () => {
    return (
      <div style={{
        display: "flex",
        justifyContent:"center",
        width:'200px',
        height:'150px',
        border: '10px solid grey',
        borderRadius: '50%',
        borderTopColor: 'red',
        animation: 'spin 1s linear infinite',
        "@keyframes spin": {
          from:{transform: 'rotate(0deg)'},
          to:{transform: 'rotate(360deg)'}
        }
      }}>

      </div>
    );
  };

export default Loader