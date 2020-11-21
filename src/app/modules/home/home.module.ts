import { MatCardModule } from '@angular/material/card';
import { CertificateContentComponent } from './../components/certificate-content/certificate-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from 'src/app/layout/main/main.component';
import { SideBarComponent } from 'src/app/layout/side-bar/side-bar.component';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { CardComponent } from './pages/card/card.component';
import { BillComponent } from './pages/bill/bill.component';
import { ReferencesComponent } from './pages/references/references.component';
import { MyprojectsComponent } from './pages/myprojects/myprojects.component';
import { CertificateComponent } from './pages/certificate/certificate.component';
import { CertificatesComponent } from '../components/certificates/certificates.component';
import {ReferenceByIdComponent} from "./pages/reference-by-id/reference-by-id.component";

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    MainComponent,
    SideBarComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    BillComponent,
    ReferencesComponent,
    MyprojectsComponent,
    CertificateComponent,
    CertificateContentComponent,
    CertificatesComponent,
    ReferenceByIdComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    LayoutModule,
    MatCardModule,
  ],
})
export class HomeModule {}
