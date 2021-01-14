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
import { CreditCardPipe } from 'src/app/shared/credit-card.pipe';
import { EditCardComponent } from '../components/dialogs/edit-card/edit-card.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NotificationDetailsComponent } from '../components/dialogs/notification-details/notification-details.component';
import { PaymentMethodComponent } from './pages/paymentMethod/paymentMethod.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BillDetailComponent } from '../components/dialogs/bill-detail/bill-detail.component';
import {AreacreateDialogComponent} from '../components/dialogs/areacreate-dialog/areacreate-dialog.component';
import {AreaeditDialogComponent} from '../components/dialogs/areaedit-dialog/areaedit-dialog.component';
import { CreateBillComponent } from '../components/dialogs/create-bill/create-bill.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { UserInProjectComponent } from './pages/user-in-project/user-in-project.component';
import { ProjectPreviewOwnerComponent } from './pages/project-preview-owner/project-preview-owner.component';
import { SearchPipe } from './pages/search.pipe';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DonationsComponent} from './pages/donations/donations.component';
import {DonationListComponent} from './pages/donationList/donationList.component';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';
import { EvaluacionAdminComponent } from './pages/evaluacion-admin/evaluacion-admin.component';
import { CreatePreguntaComponent } from '../components/dialogs/create-pregunta/create-pregunta.component';
import { CreateRespuestaComponent } from '../components/dialogs/create-respuesta/create-respuesta.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterRespuestaPipe } from 'src/app/tools/filter-respuesta.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import { CountRespCorrectasPipe } from 'src/app/tools/count-resp-correctas.pipe';
import { NotaFinalPipe } from 'src/app/tools/nota-final.pipe';
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
    CreatePreguntaComponent,
    CreateRespuestaComponent,
    CreditCardPipe,
    EditCardComponent,
    SignupComponent,
    NotificationDetailsComponent,
    PaymentMethodComponent,
    BillDetailComponent,
    AreacreateDialogComponent,
    AreaeditDialogComponent,
    CreateBillComponent,
    UserInProjectComponent,
    ProjectPreviewOwnerComponent,
    SearchPipe,
    DonationsComponent,
    DonationListComponent,
    EvaluacionComponent,
    EvaluacionAdminComponent,
    FilterRespuestaPipe,
    CountRespCorrectasPipe,
    NotaFinalPipe
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
    MatDatepickerModule,
    MatNativeDateModule,
    ImageUploadModule.forRoot(),
    MatChipsModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTabsModule,
  ],
  entryComponents: [
    CreateCertificateComponent,
    WarningDialogComponent,
    EditSkillComponent,
    CreateProjectComponent,
    EditProjectComponent,
    CreateCardComponent,
    EditCardComponent,
    SignupComponent,
    LoginComponent,
    AreacreateDialogComponent,
    AreaeditDialogComponent,
    CreateBillComponent,
  ],
})
export class HomeModule {}
