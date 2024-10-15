// shopowner.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopownerService {
  private apiUrl = 'http://localhost:8080/shopownerservice'; // Update this with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all shopowners
  getShopowners(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Register a new shopowner
  registerShopowner(shopowner: any): Observable<any> {
    return this.http.post(this.apiUrl, shopowner);
  }

  // Update shopowner
  updateShopowner(shopowner: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${shopowner.id}`, shopowner);
  }

  // Delete shopowner
  deleteShopowner(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
