

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
