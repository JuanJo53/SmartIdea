import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../../../models/card.model';
import { CardService } from '../../../../services/user_services/card.service';
import {DonationService} from '../../../../services/user_services/donation.service';
import {Donation} from '../../../../models/donation.model';

@Component({
  selector: 'app-paymentDonation',
  templateUrl: './paymentDonation.component.html',
  styleUrls: ['./paymentDonation.component.css'],
})
export class PaymentDonationComponent implements OnInit {
  listCard: Card[];
  donationList: Donation;
  userId: number = parseInt(localStorage.getItem('userId'));
  projectid = this.activatedRoute.snapshot.params.id;
  donationid = this.activatedRoute.snapshot.params.did;
  cardid = this.activatedRoute.snapshot.params.cid;
  donationlistid = this.activatedRoute.snapshot.params.dlid;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CardService,
    private donationListService: DonationService
  ) {}
  ngOnInit(): void {
    this.loadlist();
    console.log(this.projectid);
    console.log(this.cardid);
    console.log(this.donationlistid);
  }
  loadlist(): void {
    this.service.getAllCard(this.userId).subscribe((data) => {
      this.listCard = data;
    });
  }
  newListDonation() {
    this.donationListService
      .postnewdonation(
        this.userId,
        this.projectid,
        this.cardid,
        this.donationList
      )
      .subscribe((data) => {
        console.log(data);
        // window.alert('Pago realizado');
      });
  }
}
