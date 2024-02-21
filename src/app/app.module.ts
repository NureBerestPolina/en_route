import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ODataModule } from 'angular-odata';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { BlockedComponent } from './components/common/blocked/blocked.component';
import { HomeComponent } from './components/public/home/home.component';
import { environment } from '../environments/environment';
import { AppClientListComponent } from './components/public/app-client-list/app-client-list.component';

registerLocaleData(localeUk);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    BlockedComponent,
    HomeComponent,
    AppClientListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    RadioButtonModule,
    FieldsetModule,
    InputNumberModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule,
    StyleClassModule,
    ButtonModule,
    ODataModule.forRoot({
      config: {
        serviceRootUrl: `${environment.apiBaseUrl}/odata/`
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
