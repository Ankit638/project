// src/app/query-input/query-input.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-query-input',
  templateUrl: './query-input.component.html',
  styleUrls: ['./query-input.component.css']
})
export class QueryInputComponent {
  query: string = ''; // This will hold the user input

  onSubmit() {
    // Handle the form submission logic here
    console.log('Search Query:', this.query);
  }
}
