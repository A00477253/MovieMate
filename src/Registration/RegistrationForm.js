
import React, { useState, useEffect } from 'react';
import './RegistrationForm.css'; 


const RegistrationForm = ({ onRegistration }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    province: '',
    city: '',
    zipCode: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    
    ['firstName', 'lastName'].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    const invalidCharacters = /[;:!@#$%^*+?\/<>1234567890]/;
    ['firstName', 'lastName'].forEach((field) => {
      if (invalidCharacters.test(formData[field])) {
        newErrors[field] = 'Invalid characters are not allowed';
      }
    });

    if (formData.country !== 'US' && formData.country !== 'Canada') {
      newErrors.country = 'Country must be US or Canada';
    }

    if (formData.country === 'Canada' && !isValidCanadianPostalCode(formData.zipCode)) {
      newErrors.zipCode = 'Invalid Canadian postal code';
    }
    if (formData.country === 'US' && !isValidUSZipCode(formData.zipCode)) {
      newErrors.zipCode = 'Invalid US ZIP code';
    }

    if (!isValidPhoneNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number';
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
  };

  const isValidCanadianPostalCode = (postalCode) => {
    const canadianPostalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    return canadianPostalCodeRegex.test(postalCode);
  };

  const isValidUSZipCode = (zipCode) => {
    const usZipCodeRegex = /^\d{5}(-\d{4})?$/;
    return usZipCodeRegex.test(zipCode);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();

    if (Object.keys(errors).length === 0) {
        
        const jsonData = JSON.stringify(formData);
        console.log(jsonData);
    }
  };

  return (
    <div>
      {/* <image className="registration-page-img" src={"https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg"} /> */}
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
      </div>
    <div>
      <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        >
          <option value="US">United States</option>
          <option value="Canada">Canada</option>
        </select>
        {errors.country && <span className="error-message">{errors.country}</span>}
      </div>
        

      <div>
        <label htmlFor="province">Province:</label>
        <input
          type="text"
          id="province"
          name="province"
          value={formData.province}
          onChange={handleInputChange}
        />
       
      </div>

      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
        />
        {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
      </div>

      <div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="text"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
        />
        {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="userType">User Type:</label>
        <select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
        >
          <option value="user">User</option>
          <option value="producer">Producer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>

     
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default RegistrationForm;
