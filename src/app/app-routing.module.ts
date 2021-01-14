import { SignupComponent } from './modules/home/pages/signup/signup.component';
import { CertificateContentComponent } from './modules/components/certificate-content/certificate-content.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './modules/home/home.component';
import { BillComponent } from './modules/home/pages/bill/bill.component';
import { CardComponent } from './modules/home/pages/card/card.component';
import { CertificateComponent } from './modules/home/pages/certificate/certificate.component';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { MyprojectsComponent } from './modules/home/pages/myprojects/myprojects.component';
import { ReferencesComponent } from './modules/home/pages/references/references.component';
import { ReferenceByIdComponent } from './modules/home/pages/reference-by-id/reference-by-id.component';
import { FeedComponent } from './modules/home/pages/feed/feed.component';
import { UserComponent } from './modules/home/pages/user/user.component';
import { PaymentPlanComponent } from './modules/home/pages/paymentPlan/paymentPlan.component';
import { PaymentPlanBuyComponent } from './modules/home/pages/paymentPlanBuy/paymentPlanBuy.component';
import { OrderReviewComponent } from './modules/home/pages/orderReview/orderReview.component';
import { UserrequesteComponent } from './modules/home/pages/userrequeste/userrequeste.component';
import { PaymentMethodComponent } from './modules/home/pages/paymentMethod/paymentMethod.component';
import {ProjectPreviewOwnerComponent} from "./modules/home/pages/project-preview-owner/project-preview-owner.component";
import {UserInProjectComponent} from "./modules/home/pages/user-in-project/user-in-project.component";
import {DonationsComponent} from './modules/home/pages/donations/donations.component';
import {DonationListComponent} from './modules/home/pages/donationList/donationList.component';
import {PaymentDonationComponent} from './modules/home/pages/paymentDonation/paymentDonation.component';
import { EvaluacionAdminComponent } from './modules/home/pages/evaluacion-admin/evaluacion-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/feed',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'user',
    component: MainComponent,
    children: [
      {
        path: 'administrar-evaluacion/:id',
        component: EvaluacionAdminComponent,
      },
      {
        path: 'myprojects',
        component: MyprojectsComponent,
      },
      {
        path: 'feed',
        component: FeedComponent,
      },
      {
        path: 'certificate',
        component: CertificateComponent,
      },
      {
        path: 'certificate/:id',
        component: CertificateContentComponent,
      },
      {
        path: 'cards',
        component: CardComponent,
      },
      {
        path: 'card/:id',
        component: CardComponent,
      },
      {
        path: 'bill',
        component: BillComponent,
      },
      {
        path: 'references',
        component: ReferencesComponent,
      },
      {
        path: 'referencesbyId/:id',
        component: ReferenceByIdComponent,
      },
      {
        path: 'projectsOwner/:id',
        component: ProjectPreviewOwnerComponent,
      },
      {
        path: 'profile',
        component: UserComponent,
      },
      {
        path: 'donationList',
        component: DonationListComponent,
      },
      {
        path: 'project',
        children: [
          {
            path: ':id',
            component: PaymentPlanComponent,
          },
          {
            path: ':id/paymentPlanBuy/:pid',
            component: PaymentPlanBuyComponent,
          },
          {
            path: ':id/paymentPlanBuy/:pid/paymentMethod',
            component: PaymentMethodComponent,
          },
          {
            path: ':id/paymentPlanBuy/:pid/orderReview/:cid',
            component: OrderReviewComponent,
          },
          {
            path: 'users/:idproject',
            component: UserInProjectComponent,
          },

         /* {
            path: ':id',
            component: DonationsComponent,
          },
          {
           path: ':id/paymentDonation/:did',
           component: PaymentDonationComponent,
          },
          {
            path: ':id/paymentDonation/:did/donationList/:cid',
            component: DonationListComponent,
          },*/
        ],
      },
      {
        path: 'userRequest/:id',
        component: UserrequesteComponent,
      },
      {
        path:'donations',
        component: DonationsComponent,
      },
      {
        path:'paymentDonation',
        component: PaymentDonationComponent,
      },
      {
        path: 'DonationListComponent',
        component: DonationListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
