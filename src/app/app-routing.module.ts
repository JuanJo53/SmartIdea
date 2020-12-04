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
        path: 'profile',
        component: UserComponent,
      },
      {
        path: 'paymentPlan/:id',
        component: PaymentPlanComponent,
      },
      {
        path: 'project/:id',
        component: PaymentPlanComponent,
        children: [
          {
            path: 'paymentMethod/:id',
            component: PaymentMethodComponent,
          },
          {
            path: 'paymentPlanBuy',
            component: PaymentPlanBuyComponent,
          },
          {
            path: 'paymentPlanBuy/:id',
            component: PaymentPlanBuyComponent,
          },
        ],
      },

      {
        path: 'orderReview',
        component: OrderReviewComponent,
      },
      {
        path: 'orderReview/:id',
        component: OrderReviewComponent,
      },
      {
        path: 'userRequest/:id',
        component: UserrequesteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
