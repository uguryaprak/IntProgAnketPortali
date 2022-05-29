import { AnketlistBByAdminComponent } from './components/anketlistBByAdmin/anketlistBByAdmin.component';
import { KayitolComponent } from './components/kayitol/kayitol.component';
import { IstatistikComponent } from './components/istatistik/istatistik.component';
import { AnketistatistikComponent } from './components/anketistatistik/anketistatistik.component';
import { AnketCozComponent } from './components/anketCoz/anketCoz.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AnketlistbykullaniciComponent } from './components/anketlistbykullanici/anketlistbykullanici.component';
import { LoginComponent } from './components/login/login.component';
import { AnketsoruekleComponent } from './components/anketsoruekle/anketsoruekle.component';
import { AnketsoruDialogComponent } from './components/dialogs/anketsoru-dialog/anketsoru-dialog.component';
import { AnketComponent } from './components/anket/anket.component';
import { AnketDialogComponent } from './components/dialogs/anket-dialog/anket-dialog.component';
import { KullaniciDialogComponent } from './components/dialogs/kullanici-dialog/kullanici-dialog.component';
import { kullanici } from './models/Kullanici';
import { KullaniciComponent } from './components/kullanici/kullanici.component';
import { KonuDialogComponent } from './components/dialogs/konu-dialog/konu-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { KonularComponent } from './components/konular/konular.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ApiService } from './services/api.service';
import { MyAlertService } from './services/myAlert.service';
import { SchemaMetadata } from '@angular/compiler/src/compiler';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    KonularComponent,
    KullaniciComponent,
    AnketComponent,
    AnketsoruekleComponent,
    LoginComponent,
    AnketlistbykullaniciComponent,
    ProfilComponent,
    IstatistikComponent,
    AnketCozComponent,
    AnketistatistikComponent,
    KayitolComponent,
    AnketlistBByAdminComponent,



    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KonuDialogComponent,
    KullaniciDialogComponent,
    AnketDialogComponent,
    AnketsoruDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
