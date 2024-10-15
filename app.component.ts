// app.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShopownerService } from './shopowner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopowner-module';

  shopownerDetails: any = [];
  shopownerToUpdate: any = {
    id: "",
    shopName: "",
    ownerName: "",
    email: "",
    address: ""
  };

  isEditing: boolean = false; // Flag to differentiate between register and edit mode

  constructor(private shopownerService: ShopownerService) {
    this.getShopownerDetails(); // Fetch initial data
  }

  // Method to register a new shopowner or update an existing one
  register(registerForm: NgForm) {
    if (this.isEditing) {
      // Update shopowner
      this.shopownerService.updateShopowner(this.shopownerToUpdate).subscribe(
        (resp) => {
          console.log('Update Response:', resp);
          this.getShopownerDetails(); // Refresh the list
          this.resetForm(registerForm); // Reset form after update
        },
        (err) => {
          console.error('Update Error:', err);
        }
      );
    } else {
      // Register new shopowner
      this.shopownerService.registerShopowner(registerForm.value).subscribe(
        (resp) => {
          console.log('Register Response:', resp);
          this.getShopownerDetails(); // Refresh the list
          registerForm.reset(); // Reset form after registration
        },
        (err) => {
          console.error('Register Error:', err);
        }
      );
    }
  }

  // Method to get all shopowners
  getShopownerDetails() {
    this.shopownerService.getShopowners().subscribe(
      (resp) => {
        console.log(resp);
        this.shopownerDetails = resp;
      },
      (err) => {
        console.error('Error fetching shopowners:', err);
      }
    );
  }

  // Method to delete a shopowner
  deleteShopowner(shopowner: any) {
    this.shopownerService.deleteShopowner(shopowner.id).subscribe(
      (resp) => {
        console.log('Delete Response:', resp);
        this.getShopownerDetails(); // Refresh the list after deletion
      },
      (err) => {
        console.error('Delete Error:', err);
      }
    );
  }

  // Method to set shopowner for editing
  edit(shopowner: any) {
    this.isEditing = true;
    this.shopownerToUpdate = { ...shopowner }; // Copy selected shopowner to update form
  }

  // Method to reset the form
  resetForm(registerForm: NgForm) {
    registerForm.resetForm(); // Reset the form controls
    this.isEditing = false; // Switch back to register mode
    this.shopownerToUpdate = {
      id: "",
      shopName: "",
      ownerName: "",
      email: "",
      address: ""
    };
  }
}