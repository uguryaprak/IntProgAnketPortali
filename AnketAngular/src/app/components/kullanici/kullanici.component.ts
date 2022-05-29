import { KullaniciDialogComponent } from './../dialogs/kullanici-dialog/kullanici-dialog.component';
import { kullanici } from './../../models/Kullanici';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KonuDialogComponent } from '../dialogs/konu-dialog/konu-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Konular } from 'src/app/models/Konu';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-kullanici',
  templateUrl: './kullanici.component.html',
  styleUrls: ['./kullanici.component.css']
})
export class KullaniciComponent implements OnInit {
  dialogRef : MatDialogRef<KullaniciDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  kullanici: kullanici[];
  dataSource: any;
  displayedColumns =['KullaniciAdi','AdSoyad','Email','Sifre','islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.KullaniciListe();

  }
  KullaniciListe(){

    this.apiServis.KullaniciList().subscribe((d : kullanici[])=>{
      this.kullanici = d;
      this.dataSource = new MatTableDataSource(this.kullanici);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  KullaniciFilter(e){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  KullaniciAdd(){
    var yeniKayit : kullanici = new kullanici();
    this.dialogRef= this.matDialog.open(KullaniciDialogComponent,{
      width : '400px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.KullaniciAdd(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KullaniciListe();
          }
        });
      }
    })
  }
  KullaniciUpdate(kayit:kullanici){
    this.dialogRef= this.matDialog.open(KullaniciDialogComponent,{
      width : '400px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){

        kayit.KullaniciAdi = d.KullaniciAdi;
        kayit.AdSoyad = d.AdSoyad;
        kayit.Email = d.Email;
        kayit.Sifre= d.Sifre;

        this.apiServis.KullaniciUpdate(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KullaniciListe();
          }
        });
      }
    })

  }
  KullaniciRemove(kayit: kullanici){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width : '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.KullaniciAdi + " Kullanıcı Adlı Üye Silinecektir Onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        
        this.apiServis.KullaniciRemove(kayit.KullaniciAdi).subscribe((s:Sonuc) =>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KullaniciListe();
          }
        })
      }
    })
  }
}