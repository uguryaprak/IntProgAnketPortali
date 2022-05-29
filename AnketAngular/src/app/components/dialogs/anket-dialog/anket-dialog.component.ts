import { kullanici } from './../../../models/Kullanici';
import { ApiService } from 'src/app/services/api.service';
import { Anket } from './../../../models/Anket';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KullaniciDialogComponent } from '../kullanici-dialog/kullanici-dialog.component';
import { Konular } from 'src/app/models/Konu';

@Component({
  selector: 'app-anket-dialog',
  templateUrl: './anket-dialog.component.html',
  styleUrls: ['./anket-dialog.component.css']
})
export class AnketDialogComponent implements OnInit {

  dialogBaslik: string;
  yeniKayit: Anket;
  konuId : number;
  konu : Konular[];
  kullaniciId : number;
  kullanici : kullanici[];
  islem : string;
  frm : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AnketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
    public apiservis: ApiService,
  ) { 
    this.islem = data.islem
    this.yeniKayit = data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik='Anket Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Anket Düzenle'
    }
    this.frm = this.FormOlustur();
  }
  

  ngOnInit() {
    this.KonuListele();

  }
  FormOlustur(){
    return this.frmBuild.group({
      AnketAciklama:[this.yeniKayit.AnketAciklama],
      KonuId: [this.konuId],
      OlusturanKullanici:[localStorage.getItem("uyeId")],
    });
  }
  KonuListele(){
    this.apiservis.KonuList().subscribe((d : Konular[])=>{
      this.konu = d;
    });
  }
  KonuSec(konuId: number){
    this.konuId = konuId;
  }
//GEÇİCİ
  
  

}