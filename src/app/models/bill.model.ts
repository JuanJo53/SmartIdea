export interface Bill {
  billId: number;
  userId: number;
  paymentPlanId: number;
  cardId: number;
  projectsId: number;
  buyDate: string;
  billingAddress: string;
  country: string;
  city: string;
  projectTitle: string;
  paymentPlanName: string;
  paymentPlanCost: number;
}
