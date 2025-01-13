import React, { useState } from 'react';

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async() => {
    try {
      setIsProcessing(true);
      setErrorMessage('');

      // Set up the data required by PhonePe (this should be from your backend or a mock for testing)
      const paymentData = {
        orderId: '12345',
        amount: 100, // Amount to be paid in paise (100 paise = 1 INR)
        merchantId: 'merchant_id' // Your merchant ID
        // Add other necessary details here based on PhonePe's API documentation
      };

      // Initialize PhonePe Payment
      const phonepe = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay`; // Access the SDK from window (PhonePe script loaded)
      phonepe.pay(paymentData)
        .then((response) => {
          if (response.success) {
            setPaymentSuccess(true);
            alert('Payment Successful!');
          } else {
            setErrorMessage(response.errorMessage || 'Payment failed. Please try again.');
          }
        })
        .catch((error) => {
          setErrorMessage(error.message || 'An unexpected error occurred.');
        });
    } catch (error) {
      setErrorMessage('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">PhonePe Payment</h2>
        <p className="text-center text-gray-600 mb-4">Complete your purchase by clicking the button below.</p>

        <div className="flex flex-col items-center">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-lg text-white font-semibold text-lg focus:outline-none ${isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
          {paymentSuccess && <p className="text-green-500 text-center mt-4">Payment Successful!</p>}
        </div>
      </div>
    </div>
  );
};

export default Payment;
