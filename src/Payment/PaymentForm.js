import React, { useState } from 'react';
import './PaymentForm.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


//Alert box pending on this page 






const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const Movie = location.state.formData;
  
   const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const detectCardType = number => {
    const re = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
    };

    if (re.visa.test(number)) {
      return 'Visa';
    } else if (re.mastercard.test(number)) {
      return 'MasterCard';
    } else if (re.amex.test(number)) {
      return 'American Express';
    }

    return 'Enter a valid card details The accepted cards are Visa,MasterCard and Amex';
  };

  const handleCardNumberChange = e => {
    const number = e.target.value;
    setCardNumber(number);
    setCardType(detectCardType(number));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentPayload = {
      name,
      cardNumber,
      expiry,
      cvv,
      cardType,
      Movie
    };
    console.log('Form submitted', JSON.stringify(paymentPayload));
    try {
       
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: paymentPayload,
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Payment successful:');
        showSuccessAlert(true);
        setTimeout(() => {
          showSuccessAlert(false);
          navigate('/moviehome'); // Navigate to moviehome.js
        }, 2000);
      } else {
        console.error('Payment failed:', response.statusText);
        setShowFailureAlert(true);
        setTimeout(() => {
          setShowFailureAlert(false);
          navigate('/moviehome'); // Navigate to moviehome.js
        }, 2000); 
      }
    } catch (error) {
      console.error('Error during payment:', error.message);
      setShowFailureAlert(true);
        setTimeout(() => {
          setShowFailureAlert(false);
          navigate('/moviehome'); // Navigate to moviehome.js
        }, 2000); 
    }
  };

  return (
    <div className="payment-form">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name on Card</label>
        <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
        
        <label htmlFor="cardNumber">Card Number</label>
        <input id="cardNumber" type="text" value={cardNumber} onChange={handleCardNumberChange} />
        {cardType && <div className="card-type"><span className="error-message">{`${cardType}`}</span></div>}
        
        <div className="expiry-cvv">
          <div>
            <label htmlFor="expiry">Valid Through</label>
            <input id="expiry" type="text" value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/YY" />
          </div>
          
          <div>
            <label htmlFor="cvv">CVV</label>
            <input id="cvv" type="text" value={cvv} onChange={e => setCvv(e.target.value)} />
          </div>
        </div>
        
        <button type="submit">Pay</button>
       
      </form>
      
    </div>
  );
};

export default PaymentForm;
