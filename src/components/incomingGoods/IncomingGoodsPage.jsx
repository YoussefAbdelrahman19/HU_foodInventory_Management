// src/components/incomingGoods/IncomingGoodsPage.jsx
import React from 'react';
import IncomingGoodsForm from './IncomingGoodsForm';
import IncomingGoodsList from './IncomingGoodsList';

const IncomingGoodsPage = () => {
  // Here you would fetch the incoming goods data from your API and pass it to the list
  const incomingGoodsData = []; // This should be your fetched data

  return (
    <div>
      <h1>Incoming Goods</h1>
      {/* <IncomingGoodsForm /> */}
      <IncomingGoodsList goods={incomingGoodsData} />
    </div>
  );
};

export default IncomingGoodsPage;
