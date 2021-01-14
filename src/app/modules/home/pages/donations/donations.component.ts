import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CardService } from '../../../../services/user_services/card.service';
import { Card } from '../../../../models/card.model';
import { IProjects } from '../../../../models/projects.model';
import { ProjectsService } from '../../../../services/user_services/projects.service';
import { User} from '../../../../models/user.model';
import {UserService} from '../../../../services/user_services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import {Donation} from '../../../../models/donation.model';
import {DonationService} from '../../../../services/user_services/donation.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent implements OnInit{
  listCard: Card[];
  donation: Donation;
  listDonation: Donation[];
  project: IProjects;
  user: User;
  formUser: FormGroup;
  formDonation: FormGroup;
  edit:boolean = true;
  lettersPattern = '^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$';
  numPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

  cardid = this.activatedRoute.snapshot.params.cid;
  donationlistid = this.activatedRoute.snapshot.params.dlid;
  projectid = this.activatedRoute.snapshot.params.id;
  donationid = this.activatedRoute.snapshot.params.did;
  userId: number = parseInt(localStorage.getItem('userId'));

  constructor(
    private service: DonationService,
    private userService: UserService,
    private projectService: ProjectsService,
    private cardService: CardService,
    private donationService: DonationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private fromBuilder: FormBuilder
  ) {
    this.formDonation = this.fromBuilder.group({
      amount:['',[Validators.required,this.noWhitespaceValidator,Validators.pattern(this.numPattern) ]],
    });

    this.formUser = this.fromBuilder.group({
      name:['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator,Validators.pattern(this.lettersPattern) ]],
      surname:['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator,Validators.pattern(this.lettersPattern) ]],
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  get name(){
    return this.formUser.get('name');
  }

  get surname(){
    return this.formUser.get('surname');
  }

  get amount(){
    return this.formDonation.get('amount');
  }

  public space(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit(): void {
    this.loadpayment();
    this.loaddonation();
    this.loadlist();
}

  loaddonation(){
    const id = this.activatedRoute.snapshot.params.did;
    console.log('Donation ID:'+ id);
    this.service.getDonation(id).subscribe(
      (data)=>{
        this.donation = data;
        console.log(data);
      },
      (err) =>{
        console.log(err);
      }
    );
  }

  loadlist(){
    console.log('Project id: ' + this.projectid);
    this.service.getAllDonation(this.userId).subscribe((data) => {
      this.listDonation= data;
  });
}
  loadpayment(): void {
    this.cardService.getAllCard(this.userId).subscribe((data) => {
      this.listCard = data;
      this.router.navigate(["paymentDonation"]);
    });
  }

  saveUser():void{
    if (this.formUser.valid) {
      const cert = this.formUser.value;
      console.log(cert);
      this.createuser(cert);
    }else{
      // window.alert("Error");
    }
  }

  saveDonation():void{
    if (this.formDonation.valid) {
      const cert = this.formDonation.value;
      console.log(cert);
      this.createcard(cert);
    }else{
      // window.alert("Error");
    }
  }

  createuser(user: User): void{
   // this.userService.getUserDeatails(this.userId,user).subscribe((user) => {
     // console.log(user);
   // });
    // this.onNoClick();
  }

  createcard(card: Card): void{
    this.cardService.postnewcard(this.userId, card).subscribe((card) => {
      console.log(card);
    });
    // this.onNoClick();
  }

}
