import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { Card } from '../../../../models/card.model';
import { CardService } from '../../../../services/user_services/card.service';
import { CreateCardComponent } from '../../../components/dialogs/create-card/create-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditCardComponent } from '../../../components/dialogs/edit-card/edit-card.component';
import { WarningDialogComponent } from '../../../components/dialogs/warning-dialog/warning-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  listCard: Card[];
  displayedColumns: string[] = ['Nombre', 'Numero', 'Expiracion', 'id_card'];
  form: FormGroup;
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private fromBuilder: FormBuilder,
    private cardService: CardService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  edit = false;
  destroyed = false;
  ngOnInit(): void {
    this.loadlist();
  }
  ngOnDestroy(): void {
    this.destroyed = true;
    console.log('Component destroyed');
  }
  cancel() {
    this.edit = false;
  }
  loadlist() {
    this.cardService.getAllCard(this.userId).subscribe((data) => {
      this.listCard = data;
    });
  }
  createCard(): void {
    const dialogRef = this.dialog.open(CreateCardComponent, {
      width: '500px',
      data: {
        status: 1,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  editcard(card: Card): void {
    console.log('CARDS:' + card.cvc);
    const dialogRef = this.dialog.open(EditCardComponent, {
      width: '500px',
      data: {
        cardId: card.cardId,
        cardName: card.cardName,
        cardNumber: card.cardNumber,
        expirationYear: card.expirationYear,
        expirationMonth: card.expirationMonth,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  deleteCard(id: number): void {
    var iduser = parseInt(localStorage.getItem('userId'));
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '500px',
      data: {
        message: '¿Esta seguro que desea eliminar el certificado?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.cardService.deleteCard(this.userId, id).subscribe((rta) => {
          console.log(rta);
        });
        console.log('Deleted');
      }
      this.ngOnDestroy();
    });
  }
}
