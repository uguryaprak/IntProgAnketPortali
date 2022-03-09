import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { kullanici } from 'src/app/models/Kullanici';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KullaniciDialogComponent } from '../dialogs/kullanici-dialog/kullanici-dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  dialogRef : MatDialogRef<KullaniciDialogComponent>;
  kullanici: kullanici;
  dataSource: any;
  KullaniciAdi : string;
  AdSoyad : string;
  email : string;
  sifre : string;
  admin : string;
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.KullaniciListe();

  }
  KullaniciListe(){

    this.apiServis.KullaniciListByKullaniciAdi(localStorage.getItem("uyeKullaniciAdi")).subscribe((d : kullanici)=>{
      this.kullanici = d;
      this.KullaniciAdi = this.kullanici.KullaniciAdi;
      this.AdSoyad = this.kullanici.AdSoyad;
      this.email = this.kullanici.Email;
      this.sifre = this.kullanici.Sifre;
      this.admin = localStorage.getItem("uyeYetkileri");
    })
  }
  KullaniciUpdate(){
    this.dialogRef= this.matDialog.open(KullaniciDialogComponent,{
      width : '400px',
      data:{
        kayit:this.kullanici,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){

        this.kullanici.KullaniciAdi = d.KullaniciAdi;
        this.kullanici.AdSoyad = d.AdSoyad;
        this.kullanici.Email = d.Email;
        this.kullanici.Sifre= d.Sifre;

        this.apiServis.KullaniciUpdate(this.kullanici).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KullaniciListe();
          }
        });
      }
    })

  }
}