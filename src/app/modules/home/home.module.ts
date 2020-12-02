import { CreateCertificateComponent } from './../components/dialogs/create-certificate/create-certificate.component';
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
import { ReferenceByIdComponent } from './pages/reference-by-id/reference-by-id.component';
import { FeedComponent } from './pages/feed/feed.component';
import { UserComponent } from './pages/user/user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WarningDialogComponent } from '../components/dialogs/warning-dialog/warning-dialog.component';
import { CreateSkillComponent } from '../components/dialogs/create-skill/create-skill.component';
import { EditSkillComponent } from '../components/dialogs/edit-skill/edit-skill.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { ImageUploadModule } from 'angular2-image-upload';
import { CreateProjectComponent } from '../components/dialogs/create-project/create-project.component';
import { EditProjectComponent } from '../components/dialogs/edit-project/edit-project.component';
import { UserrequesteComponent } from './pages/userrequeste/userrequeste.component';
import { PaymentPlanBuyComponent } from './pages/paymentPlanBuy/paymentPlanBuy.component';
import { PaymentPlanComponent } from './pages/paymentPlan/paymentPlan.component';
import { OrderReviewComponent } from './pages/orderReview/orderReview.component';
import { MatTableModule } from '@angular/material/table';
import { CreateCardComponent } from '../components/dialogs/create-card/create-card.component';

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
    FeedComponent,
    EditProjectComponent,
    UserComponent,
    CreateCertificateComponent,
    WarningDialogComponent,
    CreateSkillComponent,
    EditSkillComponent,
    CreateProjectComponent,
    UserrequesteComponent,
    PaymentPlanBuyComponent,
    PaymentPlanComponent,
    OrderReviewComponent,
    CreateCardComponent,
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
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatTableModule,
    ImageUploadModule.forRoot(),
  ],
  entryComponents: [
    CreateCertificateComponent,
    WarningDialogComponent,
    EditSkillComponent,
    CreateProjectComponent,
    EditProjectComponent,
    CreateCardComponent,
  ],
})
export class HomeModule {}
