import React from "react";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const BillingSettings = () => {
 

  return (
    <Cards
      cvc={"123"}
      expiry={"**/**"}
      focused={"expiry"}
      name={"John Doe"}
      number={"5100 **** **** 3332"}
      preview={false}
    />
  );
};
 
export default BillingSettings;
