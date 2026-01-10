import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { BsCalendarDay } from 'react-icons/bs';
import { splitDist } from './utilityFunctions';
import { FormInputs } from './types';
import './App.css';

const App: React.FC = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    cartValue: null,
    distance: null,
    cartQuantity: null,
  });
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [timeStamp] = useState<string>(new Date().toDateString());

  const handleInputChange = (field: keyof FormInputs) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setFormInputs(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const getDelivery = (): void => {
    // Parse and validate inputs
    const distance = formInputs.distance ? parseFloat(formInputs.distance) : null;
    const cartValue = formInputs.cartValue ? parseFloat(formInputs.cartValue) : null;
    const cartQuantity = formInputs.cartQuantity ? parseInt(formInputs.cartQuantity, 10) : null;

    // Check if all inputs are valid numbers
    if (!distance || !cartValue || !cartQuantity) {
      return;
    }

    const checkDate = new Date().getDay();
    const checkHours = new Date().getHours();

    if (
      distance &&
      cartValue &&
      cartQuantity &&
      checkDate === 5 &&
      checkHours === 15
    ) {
      setDeliveryFee(splitDist(distance, cartValue, cartQuantity) * 1.2);
    } else if (
      distance &&
      cartValue &&
      cartQuantity &&
      checkDate === 5 &&
      checkHours === 16
    ) {
      setDeliveryFee(splitDist(distance, cartValue, cartQuantity) * 1.2);
    } else if (
      distance &&
      cartValue &&
      cartQuantity &&
      checkDate === 5 &&
      checkHours === 17
    ) {
      setDeliveryFee(splitDist(distance, cartValue, cartQuantity) * 1.2);
    } else if (
      distance &&
      cartValue &&
      cartQuantity &&
      checkDate === 5 &&
      checkHours === 18
    ) {
      setDeliveryFee(splitDist(distance, cartValue, cartQuantity) * 1.2);
    } else if (
      distance &&
      cartValue &&
      cartQuantity &&
      checkDate === 5 &&
      checkHours === 19
    ) {
      setDeliveryFee(splitDist(distance, cartValue, cartQuantity) * 1.2);
    } else if (
      distance &&
      cartValue &&
      cartQuantity &&
      checkDate !== 5 &&
      checkHours >= 0
    ) {
      setDeliveryFee(splitDist(distance, cartValue, cartQuantity));
    } else if (cartValue >= 100) {
      setDeliveryFee(0);
    }
  };

  return (
    <>
      <motion.div
        className="delivery-fee-app"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Delivery Fee Calculator
        </motion.h2>

        <motion.div
          className="input-wrapper"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="cartValue">Cart Value:</label>
          <input
            id="cartValue"
            type="number"
            value={formInputs.cartValue || ''}
            onChange={handleInputChange('cartValue')}
          />
          <span>€</span>
        </motion.div>

        <motion.div
          className="input-wrapper"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label htmlFor="distance">Delivery Distance:</label>
          <input
            id="distance"
            type="number"
            value={formInputs.distance || ''}
            onChange={handleInputChange('distance')}
          />
          <span>m</span>
        </motion.div>

        <motion.div
          className="input-wrapper"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label htmlFor="cartQuantity">Cart items:</label>
          <input
            id="cartQuantity"
            type="number"
            value={formInputs.cartQuantity || ''}
            onChange={handleInputChange('cartQuantity')}
          />
        </motion.div>

        <motion.div
          className="input-wrapper"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label htmlFor="timeStamp">Time:</label>
          <input id="timeStamp" value={timeStamp} disabled />
          <span>
            <BsCalendarDay />
          </span>
        </motion.div>

        <motion.button
          onClick={() => {
            getDelivery();
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(123, 97, 255, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Calculate Delivery price
        </motion.button>
      </motion.div>

      <motion.div
        className="output"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        key={deliveryFee}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Total Delivery fee is € {deliveryFee !== null ? deliveryFee.toFixed(2) : '—'}
        </motion.p>
      </motion.div>
    </>
  );
};

export default App;
