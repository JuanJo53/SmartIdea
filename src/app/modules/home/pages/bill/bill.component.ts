import { Component, OnInit } from '@angular/core';
import { BillService } from '../../../../services/user_services/bill.service';
import { Bill } from '../../../../models/bill.model';
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
  constructor(private service: BillService) {}
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist() {
    this.service.getAllBill().subscribe((data) => {
      console.log(data);
      this.listBill = data;
    });
  }
}
