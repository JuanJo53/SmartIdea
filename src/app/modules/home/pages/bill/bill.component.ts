import { element } from 'protractor';
import { BillDetailComponent } from './../../../components/dialogs/bill-detail/bill-detail.component';
import { Component, OnInit } from '@angular/core';
import { BillService } from '../../../../services/user_services/bill.service';
import { Bill } from '../../../../models/bill.model';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  listBill: Bill[];
  displayedColumns: string[] = [
    'Fecha',
    'Proyecto',
    'Plan',
    'Total',
    'id_card',
  ];
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(private service: BillService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist() {
    this.service.getAllBill(this.userId).subscribe((data) => {
      this.listBill = data;
    });
  }
  openDetailDialog(element): void {
    const dialogRef = this.dialog.open(BillDetailComponent, {
      width: '500px',
      data: {
        billId: element.billId,
        paymentPlanId: element.paymentPlanId,
        projectsId: element.projectsId,
        cardId: element.cardId,
        buyDate: element.buyDate,
        billingAddress: element.billingAddress,
        country: element.country,
        city: element.city,
        projectTitle: element.projectTitle,
        paymentPlanName: element.paymentPlanName,
        paymentPlanCost: element.paymentPlanCost,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
