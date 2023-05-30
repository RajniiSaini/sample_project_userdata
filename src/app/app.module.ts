import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/dialog/confirm-dialog/confirm-dialog.component';
import { SelectComponent } from './components/select/select.component';
import { JwtHttpInterceptor } from './jwt-http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    MainComponent,
    ConfirmDialogComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
