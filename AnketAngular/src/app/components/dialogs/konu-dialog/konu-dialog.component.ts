import { Konular } from './../../../models/Konu';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-konu-dialog',
  templateUrl: './konu-dialog.component.html',
  styleUrls: ['./konu-dialog.component.css']
})
export class KonuDialogComponent implements OnInit {

  dialogBaslik: string;
  yeniKayit: Konular;
  islem : string;
  frm : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KonuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
  ) { 
    this.islem = data.islem
    this.yeniKayit = data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik='Konu Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Konu Düzenle'
    }
    this.frm = this.FormOlustur();
  }
  

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      KonuAdi:[this.yeniKayit.KonuAdi],
    });
  }

}