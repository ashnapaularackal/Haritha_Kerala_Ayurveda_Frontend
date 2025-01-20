import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationAdminComponent } from './registration-admin/registration-admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PanchakarmaTreatmentComponent } from './panchakarma-treatment/panchakarma-treatment.component';
import { AyurvedaComponent} from './ayurveda/ayurveda.component';
import { YogaComponent } from './yoga/yoga.component';
import { BillingComponent } from './billing/billing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { TreatmentPackageListComponent } from './components/treatment-package-list/treatment-package-list.component';
import { TreatmentPackageDetailComponent } from './components/treatment-package-detail/treatment-package-detail.component';
import { TreatmentPackageFormComponent } from './components/treatment-package-form/treatment-package-form.component';
import {TreatmentPackageEditComponent } from '././components/treatment-package-edit/treatment-package-edit.component';
import {TreatmentPackageUserComponent} from '././components/treatment-package-packes for-user/treatment-package-list.component';
import { WhatIsAyurvedaComponent } from './what-is-ayurveda/what-is-ayurveda.component';
import { WhyItWorksComponent } from './why-it-works/why-it-works.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { TreatmentsComponent } from './treatments/treatments.component';
import { TreatmentPackageAdminViewComponent} from './components/treatment-package-admin-view/treatment-package-admin-view.component'
const routes: Routes = [
{path: '', component: AyurvedaComponent },
// { path: 'home',component: LandingComponent},
{ path: 'about', component: AboutComponent },
{ path: 'contact', component: ContactComponent },
 { path: 'booking', component: RegistrationAdminComponent},
{path: 'panchakarma',component:PanchakarmaTreatmentComponent},
{ path: 'home', component: AyurvedaComponent },
{ path: 'yoga', component: YogaComponent  },
{ path: 'billing', component: BillingComponent},
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'treatment', component: TreatmentsComponent },
{ path: 'WhatIsAyurveda', component: WhatIsAyurvedaComponent },
{ path: 'WhyItWorks', component: WhyItWorksComponent },
{ path: 'HowItWorks', component: HowItWorksComponent },
{ path: 'user-register', component: RegistrationComponent  },


{ path: 'reset-password', component: ResetPasswordComponent },
{ path: 'update-password', component: UpdatePasswordComponent },
{ path: 'list', component: TreatmentPackageListComponent },
{ path: 'availablepackages', component: TreatmentPackageUserComponent },
  { path: 'package/:id', component: TreatmentPackageDetailComponent },
  { path: 'view/:id', component: TreatmentPackageAdminViewComponent },
  { path: 'add-package', component: TreatmentPackageFormComponent },
  { path: 'edit-package/:id', component: TreatmentPackageEditComponent },

{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),  BrowserModule,
    FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
