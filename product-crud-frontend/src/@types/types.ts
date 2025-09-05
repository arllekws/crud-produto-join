export interface Product {
  id: number;
  name: string;
  price: number;      
  quantity: number;
  description?: string;
}

export interface ProductInput {
  name: string;
  price: number;
  quantity: number;
  description?: string;
}
