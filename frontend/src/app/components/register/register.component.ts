import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: FormGroup;
  @ViewChild(IonSlides) slides: IonSlides;
  diets: any[];
  allergens: any[];
  user: any = {};

  constructor(private fb: FormBuilder,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    public toastController: ToastController,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      name: [null, Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
    setTimeout(() => {
      this.http.get('http://localhost:3000/meals/diets').subscribe((diets: any[]) => this.diets = diets);
      this.http.get('http://localhost:3000/meals/allergens').subscribe((allergens: any[]) => this.allergens = allergens);
      this.slides.lockSwipes(true);
    });
  }

  async register() {
    this.errorHandler.addErrorHandler(
      this.http.post('http://localhost:3000/auth/register', {
        ...this.credentials.value
      }))
      .subscribe(() => {
        this.notificationService.showToast('User saved successfully.');
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.user = { ...this.credentials.value };
      });
  }

  selectDiet(idx) {
    for (let i = 0; i < this.diets.length; i++) {
      this.diets[i].selected = i === idx;
    }
    this.slides.slideNext();
    this.user.diet = this.diets[idx];
  }

  selectAllergen(idx) {
    this.allergens[idx].selected = !this.allergens[idx].selected;
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get name() {
    return this.credentials.get('name');
  }

  signIn() {
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.user.allergens = this.allergens.filter(allergen => allergen.selected);
    this.router.navigate(['/tabs/plan']);
    localStorage.setItem('currentUser', JSON.stringify(this.user));
  }

}
