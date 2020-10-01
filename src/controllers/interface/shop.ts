export interface CART {
  items: [
    { _id?: string; title: string; price: number; description: string; imageUrl: string; qty: number }?
  ];
}

export interface PRODUCTS {
  _id?: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}
