import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Produit } from '../../../shared/models/produit.model';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-4">
      <h1>Gestion du Catalogue (Admin)</h1>
    </div>

    <!-- Message de retour -->
    <div *ngIf="message" class="alert">{{ message }}</div>

    <div class="flex gap-4">
      <!-- Liste des produits -->
      <div style="flex: 2;">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Nom</th>
              <th>Prix HT</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of produits">
              <td>{{ p.id_p }}</td>
              <td><img *ngIf="p.image_p" [src]="getImageUrl(p.image_p)" width="40"></td>
              <td>{{ p.designation_p }}</td>
              <td>{{ p.prix_ht | currency:'EUR' }}</td>
              <td>{{ p.stock_p }}</td>
              <td>
                <button (click)="supprimer(p.id_p)" style="background: #dc3545; padding: 4px 8px; font-size: 12px;">Suppr.</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Formulaire d'ajout -->
      <div style="flex: 1; background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h3>Ajouter un produit</h3>
        <form [formGroup]="productForm" (ngSubmit)="ajouterProduit()">
          <label>Nom du produit</label>
          <input formControlName="designation_p" type="text" required>
          
          <label>Prix HT</label>
          <input formControlName="prix_ht" type="number" step="0.01" required>
          
          <label>Type</label>
          <select formControlName="type_p">
            <option value="Matcha">Matcha</option>
            <option value="Hojicha">Hojicha</option>
            <option value="Accessoire">Accessoire</option>
          </select>
          
          <label>Stock</label>
          <input formControlName="stock_p" type="number" required>
          
          <label>Image (Upload)</label>
          <input type="file" (change)="onFileSelected($event)" accept="image/*">

          <button type="submit" [disabled]="productForm.invalid" style="width: 100%; margin-top: 10px;">Enregistrer</button>
        </form>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  productService = inject(ProductService);
  fb = inject(FormBuilder);

  produits: Produit[] = [];
  message = '';
  selectedFile: File | null = null;

  productForm = this.fb.group({
    designation_p: ['', Validators.required],
    prix_ht: [0, [Validators.required, Validators.min(0.01)]],
    type_p: ['Matcha', Validators.required],
    stock_p: [0, [Validators.required, Validators.min(0)]],
    image_p: ['']
  });

  ngOnInit() {
    this.chargerProduits();
  }

  chargerProduits() {
    this.productService.fetchProduits().subscribe(res => {
      this.produits = res.data;
    });
  }

  getImageUrl(path: string): string {
    return path.startsWith('http') ? path : `http://localhost:3000${path}`;
  }

  supprimer(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.productService.deleteProduit(id).subscribe(() => {
        this.message = 'Produit supprimé.';
        this.chargerProduits();
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  ajouterProduit() {
    if (this.selectedFile) {
      this.productService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          this.productForm.patchValue({ image_p: res.url });
          this.saveData();
        },
        error: () => this.message = "Erreur lors de l'upload de l'image"
      });
    } else {
      this.saveData();
    }
  }

  private saveData() {
    this.productService.createProduit(this.productForm.value as any).subscribe(() => {
      this.message = 'Produit ajouté avec succès !';
      this.productForm.reset({ type_p: 'Matcha', prix_ht: 0, stock_p: 0 });
      this.selectedFile = null;
      this.chargerProduits();
    });
  }
}
