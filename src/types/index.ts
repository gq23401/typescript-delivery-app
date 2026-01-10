// Form input values (can be strings from inputs)
export interface FormInputs {
  cartValue: string | null;
  distance: string | null;
  cartQuantity: string | null;
}

// Delivery calculation parameters
export interface DeliveryParams {
  distance: number;
  cartValue: number;
  cartQuantity: number;
}
