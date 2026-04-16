import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Produit } from '../../shared/models/produit.model';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-4">
      <h1>Collection PopLove</h1>
      <p>Nos boissons botaniques</p>
    </div>

    <div *ngIf="error" class="alert">{{ error }}</div>

    <div class="products-grid">
      <div *ngFor="let p of produits" class="product-card">
        <img [src]="getImageUrl(p.image_p)" [alt]="p.designation_p">
        <div class="mt-4">
          <small>{{ p.type_p }}</small>
          <h3>{{ p.designation_p }}</h3>
          <div class="flex justify-between items-center mt-4">
            <strong>{{ p.prix_ht | currency:'EUR':'symbol' }}</strong>
            <button 
              [disabled]="p.stock_p <= 0" 
              (click)="addToCart(p)">
              {{ p.stock_p > 0 ? '+ Panier' : 'Épuisé' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class VitrineComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  
  produits: Produit[] = [];
  error = '';

  ngOnInit() {
    this.productService.fetchProduits().subscribe({
      next: (res) => {
        this.produits = res.data;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des produits.';
      }
    });
  }

  getImageUrl(path: string | undefined): string {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:3000${path}`;
  }

  addToCart(p: Produit) {
    this.cartService.addToCart(p);
  }
}
