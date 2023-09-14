import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Agregar tus importaciones aquí
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, // Agrega el módulo FormsModule aquí
    ReactiveFormsModule, // Agrega el módulo ReactiveFormsModule aquí
    HttpClientModule, // Agrega el módulo HttpClientModule aquí
    MatDatepickerModule, // Agrega el módulo MatDatepickerModule aquí
    MatFormFieldModule, // Agrega el módulo MatFormFieldModule aquí
    MatNativeDateModule, // Agrega el módulo MatNativeDateModule aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}