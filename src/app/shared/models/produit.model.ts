export interface Produit {
  id_p: number;
  designation_p: string;
  type_p: string;
  prix_ht: number;
  image_p?: string;
  image_s?: string;
  stock_p: number;
}
