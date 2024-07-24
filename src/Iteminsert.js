import React from 'react';

function Iteminsert({ onClose }) {
  return (
    <div className="Iteminsert">
      <h2>Insert Item</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Iteminsert;