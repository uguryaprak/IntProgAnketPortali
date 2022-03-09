import { kullanici } from './../../../models/Kullanici';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kullanici-dialog',
  templateUrl: './kullanici-dialog.component.html',
  styleUrls: ['./kullanici-dialog.component.css']
})
export class KullaniciDialogComponent implements OnInit {

  dialogBaslik: string;
  yeniKayit: kullanici;
  islem : string;
  frm : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KullaniciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
  ) { 
    this.islem = data.islem
    this.yeniKayit = data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik='Kullanici Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Kullanici Düzenle'
    }
    this.frm = this.FormOlustur();
  }
  

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      KullaniciAdi:[this.yeniKayit.KullaniciAdi],
      AdSoyad:[this.yeniKayit.AdSoyad],
      Email:[this.yeniKayit.Email],
      Sifre:[this.yeniKayit.Sifre],

    });
  }

}