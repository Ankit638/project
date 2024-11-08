// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

import { AppComponent } from './app.component';
import { QueryInputComponent } from './query-input/query-input.component';

@NgModule({
  declarations: [
    AppComponent,       // Declare your main app component
    QueryInputComponent // Declare the query input component
  ],
  imports: [
    BrowserModule,
    FormsModule // Import FormsModule for ngModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
