import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, AutocompleteLibModule],
  exports: [MainPageComponent],
})
export class ModulesModule {}
