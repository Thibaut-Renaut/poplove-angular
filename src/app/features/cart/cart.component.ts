import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-4">
      <h1>Mon Panier</h1>
    </div>

    <div *ngIf="cartService.cart().length === 0" class="alert">
      Votre panier est vide.
    </div>

    <div *ngIf="cartService.cart().length > 0">
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix U.</th>
            <th>Quantité</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of cartService.cart()">
            <td>
              <strong>{{ item.product.designation_p }}</strong><br>
              <small>{{ item.product.type_p }}</small>
            </td>
            <td>{{ item.product.prix_ht | currency:'EUR' }}</td>
            <td>
              <div class="flex items-center gap-4">
                <button (click)="updateQty(item.product.id_p, item.quantity - 1)">-</button>
                <span>{{ item.quantity }}</span>
                <button (click)="updateQty(item.product.id_p, item.quantity + 1)">+</button>
              </div>
            </td>
            <td>{{ item.product.prix_ht * item.quantity | currency:'EUR' }}</td>
            <td>
              <button (click)="cartService.removeFromCart(item.product.id_p)" style="background: #dc3545">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-4 flex justify-between items-center" style="padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px;">
        <h2>Total : {{ cartService.cartTotal() | currency:'EUR' }}</h2>
        <button style="font-size: 1.2rem; padding: 12px 24px;">Payer</button>
      </div>
    </div>
  `
})
export class CartComponent {
  cartService = inject(CartService);

  updateQty(id: number | string, newQty: number) {
    this.cartService.updateQuantity(id, newQty);
  }
}
