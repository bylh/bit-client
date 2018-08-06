import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule, MatGridListModule, MatFormFieldModule, MatIconModule,
  MatToolbarModule, MatExpansionModule, MatMenuModule, MatCardModule, MatTabsModule, MatDividerModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule
  ]
})
export class AppMaterialModule { }
