import { NgModule,LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';

import { MatTableModule} from '@angular/material/table';

import { MatExpansionModule } from '@angular/material/expansion';

import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatCardModule } from '@angular/material/card';

import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import { LandingComponent } from './landing/landing.component';
import {DatePipe} from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationChatbotComponent } from './registration-chatbot/registration-chatbot.component';
import { RegistrationAdminComponent } from './registration-admin/registration-admin.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PanchakarmaTreatmentComponent } from './panchakarma-treatment/panchakarma-treatment.component';
import { AyurvedaComponent} from './ayurveda/ayurveda.component';
import { YogaComponent } from './yoga/yoga.component';
import { MatRadioModule } from '@angular/material/radio';
import { BillingComponent } from './billing/billing.component';
import { MatDatetimepickerModule} from '@mat-datetimepicker/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TreatmentPackageListComponent } from './components/treatment-package-list/treatment-package-list.component';
import { TreatmentPackageDetailComponent } from './components/treatment-package-detail/treatment-package-detail.component';
import { TreatmentPackageFormComponent } from './components/treatment-package-form/treatment-package-form.component';
import { TreatmentPackageEditComponent } from '././components/treatment-package-edit/treatment-package-edit.component';
import {TreatmentPackageUserComponent} from '././components/treatment-package-packes for-user/treatment-package-list.component';
import { WhatIsAyurvedaComponent } from './what-is-ayurveda/what-is-ayurveda.component';
import { WhyItWorksComponent } from './why-it-works/why-it-works.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { TreatmentsComponent } from './treatments/treatments.component';
//import { AuthInterceptor } from './auth.interceptor';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TreatmentPackageAdminViewComponent} from './components/treatment-package-admin-view/treatment-package-admin-view.component'
const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];
@NgModule({
  declarations: [
    AppComponent,
   LandingComponent,
    RegistrationComponent,
    PanchakarmaTreatmentComponent,
    AyurvedaComponent,
    BillingComponent ,
    YogaComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    TreatmentPackageListComponent,
    TreatmentPackageDetailComponent,
    TreatmentPackageFormComponent,
    TreatmentPackageEditComponent,
    TreatmentPackageUserComponent,
    TreatmentPackageAdminViewComponent,
    WhatIsAyurvedaComponent,
    WhyItWorksComponent,
    ContactComponent,
    HowItWorksComponent,
    RegistrationAdminComponent,
    TreatmentsComponent,
    RegistrationChatbotComponent
  ],
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule ,
    CommonModule,
   MatPaginatorModule,
   MatSortModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDatetimepickerModule,
    NgxMaterialTimepickerModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,


    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('authToken');
        }
      }
    })
  ],
  providers: [
    DatePipe,
    AuthGuard,
    // AuthService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
