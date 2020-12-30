import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/Button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const angularMaterialModules = [
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [...angularMaterialModules],
})
export class UiModule {}
