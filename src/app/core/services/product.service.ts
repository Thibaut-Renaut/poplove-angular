import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../../shared/models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/produits';

  constructor(private http: HttpClient) {}

  fetchProduits(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createProduit(nouveauProduit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, nouveauProduit);
  }

  updateProduit(id: number | string, produit: Partial<Produit>): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }

  deleteProduit(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { observe: 'response' });
  }

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append("image", file);
    return this.http.post<{ url: string }>('http://localhost:3000/upload', formData);
  }
}
