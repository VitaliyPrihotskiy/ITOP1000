import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, AutocompleteLibModule, ReactiveFormsModule, FormsModule],
  exports: [MainPageComponent],
})
export class ModulesModule {}
