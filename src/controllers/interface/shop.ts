export interface CART {
  items: [{ title?: string; price?: number; description?: string; imageUrl?: string; qty?: number }];
}

export interface PRODUCTS {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}
