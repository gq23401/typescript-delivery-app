// Constants for delivery fee calculation
const BASE_FEE = 2;
const CART_THRESHOLD = 10;
const CART_FREE_THRESHOLD = 100;
const ITEM_THRESHOLD = 4;
const ITEM_FEE = 0.5;
const BULK_FEE = 1.2;
const DISTANCE_THRESHOLD = 1000;
const DISTANCE_INCREMENT = 500;
const MAX_DELIVERY_FEE = 15;

/**
 * Calculate surcharge based on cart value and item count
 */
export const getSurCharge = (cartValue: number, cartCount: number): number => {
  if (cartValue >= CART_FREE_THRESHOLD) {
    return 0;
  }

  if (cartValue < CART_THRESHOLD && cartCount === ITEM_THRESHOLD) {
    return BASE_FEE;
  }

  if (cartValue < CART_THRESHOLD) {
    const surcharge = (CART_THRESHOLD - cartValue);
    return BASE_FEE + surcharge;
  }

  return BASE_FEE;
};

/**
 * Calculate additional fees based on item count
 */
export const cartQuantity = (cartCount: number, feeFunc: number): number => {
  const itemsOverThreshold = cartCount - ITEM_THRESHOLD;

  if (itemsOverThreshold === 0) {
    return feeFunc;
  }

  if (itemsOverThreshold >= 1) {
    return itemsOverThreshold * ITEM_FEE;
  }

  if (itemsOverThreshold >= 1 && cartCount > 12) {
    return (itemsOverThreshold * ITEM_FEE) + BULK_FEE;
  }

  return 0;
};

/**
 * Calculate total delivery fee based on distance, cart value, and cart quantity
 */
export function splitDist(
  distance: number,
  cartValue: number,
  cartCount: number
): number {
  let newDistance_Value: number;
  const nextBaseFee = getSurCharge(cartValue, cartCount);
  const nextCartCount = cartQuantity(cartCount, getSurCharge(cartValue, cartCount));

  if (distance === DISTANCE_THRESHOLD || distance < DISTANCE_THRESHOLD) {
    return nextBaseFee + nextCartCount;
  } else if (distance > DISTANCE_THRESHOLD && cartValue !== 100) {
    const extraDistance = distance - DISTANCE_THRESHOLD;
    const extraDistanceCount: number[] = [];

    for (let i = 0; i < extraDistance; i += DISTANCE_INCREMENT) {
      extraDistanceCount.push(i);
    }

    newDistance_Value = extraDistanceCount.length + nextBaseFee;
  } else if (cartValue >= CART_FREE_THRESHOLD) {
    return 0;
  }

  if (newDistance_Value! > MAX_DELIVERY_FEE) {
    return MAX_DELIVERY_FEE;
  } else if (newDistance_Value! > 0 && cartValue >= CART_FREE_THRESHOLD) {
    return 0;
  } else {
    return newDistance_Value!;
  }
}
