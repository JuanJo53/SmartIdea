import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './modules/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserDetailsComponent } from './modules/components/dialogs/user-details/user-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreatePreguntaComponent } from './modules/components/dialog/create-pregunta/create-pregunta.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterRespuestaPipe } from './tools/filter-respuesta.pipe';
import { CountRespCorrectasPipe } from './tools/count-resp-correctas.pipe';
import { NotaFinalPipe } from './tools/nota-final.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    CreatePreguntaComponent,
    //  NotaFinalPipe,
    //  CountRespCorrectasPipe,
    // FilterRespuestaPipe,
    // CreateRespuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
