import { Injectable, computed, signal } from '@angular/core';

export interface CartItem {
  product: any;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart = signal<CartItem[]>([]);

  public cart = this._cart.asReadonly();
  
  public totalItems = computed(() => {
    return this._cart().reduce((sum, item) => sum + item.quantity, 0);
  });

  public cartTotal = computed(() => {
    return this._cart().reduce((sum, item) => sum + (item.product.prix_ht * item.quantity), 0);
  });

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        this._cart.set(JSON.parse(saved));
      } catch (e) {
        this._cart.set([]);
      }
    }
  }

  private saveCart(cartData: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cartData));
    this._cart.set(cartData);
  }

  addToCart(product: any) {
    const current = this._cart();
    const existing = current.find(item => item.product.id_p === product.id_p);
    
    if (existing) {
      this.saveCart(current.map(item => 
        item.product.id_p === product.id_p 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      this.saveCart([...current, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number | string) {
    this.saveCart(this._cart().filter(item => item.product.id_p !== productId));
  }

  updateQuantity(productId: number | string, quantity: number) {
    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }
    
    this.saveCart(this._cart().map(item => 
      item.product.id_p === productId 
        ? { ...item, quantity } 
        : item
    ));
  }

  clearCart() {
    this.saveCart([]);
  }
}
