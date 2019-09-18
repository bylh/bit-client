import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OverlayModule, OverlayContainer, FullscreenOverlayContainer} from '@angular/cdk/overlay';

import {
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatExpansionModule,
  MatMenuModule,
  MatCardModule,
  MatTabsModule,
  MatDividerModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatTableModule,
  MatDialogModule,
  MatListModule,
  MatCheckboxModule,
  MatRadioModule,
  MatOptionModule,
  MatSelectModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatChipsModule,
  MatProgressBarModule
} from '@angular/material';

// ant
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import {SafePipe, ArraySpreadPipe} from './pipe';
import {PageDirective} from './page.directive';
import {BylhSearchComponent} from './widgets/bylh-search/bylh-search.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

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
    MatDividerModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressBarModule,
    // ant
    NgZorroAntdModule,
    HttpClientModule
  ],
  declarations: [
    SafePipe,
    ArraySpreadPipe,
    PageDirective,
    BylhSearchComponent,
  ],

  exports: [
    // pipe
    SafePipe,
    ArraySpreadPipe,
    PageDirective,

    FormsModule,
    ReactiveFormsModule,

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
    MatDividerModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressBarModule,

    // ant
    NgZorroAntdModule,
    HttpClientModule,

    // CDK
    ScrollDispatchModule,
    DragDropModule,
    OverlayModule,

    // widgets
    BylhSearchComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000, verticalPosition: 'top'},},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true}},
    {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
    { provide: NZ_I18N, useValue: zh_CN }
  ]
})
export class AppSharedModule {
}
