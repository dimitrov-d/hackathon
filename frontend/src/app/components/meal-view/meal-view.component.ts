import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '@services/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal-view',
  templateUrl: './meal-view.component.html',
  styleUrls: ['./meal-view.component.css']
})
export class MealViewComponent implements OnInit {
  editMode = false;
  meal: any;

  constructor(private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.errorHandler.addErrorHandler(this.http.get('http://localhost:3000/meals/all'))
      .subscribe((meals: any[]) => {
        this.meal = meals.find(m => m._id === id);
        console.log(this.meal);
      });
  }

  edit() {
    this.editMode = true;
  }

  save() {
    this.editMode = false;
  }

}
