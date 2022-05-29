import { AnketSecenekler } from './../../../models/AnketSecenekler';
import { AnketSoru } from './../../../models/AnketSoru';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Konular } from 'src/app/models/Konu';
import { kullanici } from 'src/app/models/Kullanici';
import { ApiService } from 'src/app/services/api.service';
import { AnketDialogComponent } from '../anket-dialog/anket-dialog.component';

@Component({
  selector: 'app-anketsoru-dialog',
  templateUrl: './anketsoru-dialog.component.html',
  styleUrls: ['./anketsoru-dialog.component.css']
})
export class AnketsoruDialogComponent implements OnInit {

  dialogBaslik: string;
  yeniKayit: AnketSoru;
  islem : string;
  frm : FormGroup;
  secA : string;
  secB : string;
  secCa : string;
  secD : string;
  asd: AnketSecenekler;
  dizi : AnketSecenekler[];


  addSorusFrom: FormGroup;



  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    public dialogRef: MatDialogRef<AnketsoruDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
    public apiservis: ApiService,
  ) { 
   
    this.islem = data.islem
    this.yeniKayit = data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik='Soru Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Soru Düzenle'
    }
   // this.frm = this.FormOlustur();
  }
  
  

  ngOnInit() {

    

  }
  FormOlustur(){
  
    let agents : AnketSecenekler[] = [];
    const diziler = new AnketSecenekler();
    diziler.AnketSecenekYazi ="this.secA";
    const diziler1 = new AnketSecenekler();
    diziler1.AnketSecenekYazi ="this.secB";
    const diziler2 = new AnketSecenekler();
    diziler2.AnketSecenekYazi ="this.secCa";
    const diziler3 = new AnketSecenekler();
    diziler3.AnketSecenekYazi ="this.secD";
    agents.push(diziler,diziler1,diziler2,diziler3);
    this.dizi = agents;
    return  this.frmBuild.group({
      AnketId:[this.yeniKayit.AnketId],
      Soru: [this.yeniKayit.Soru],
      anketsorus: [agents]
    })
  }
  kaydet(secA : string, secB: string, secC: string, secD: string){
    this.secA = secA;
    this.secB = secB ;
    this.secCa = secC;
    this.secD = secD
    let agents : AnketSecenekler[] = [];
    const diziler = new AnketSecenekler();
    diziler.AnketSecenekYazi =this.secA;
    const diziler1 = new AnketSecenekler();
    diziler1.AnketSecenekYazi =this.secB;
    const diziler2 = new AnketSecenekler();
    diziler2.AnketSecenekYazi =this.secCa;
    const diziler3 = new AnketSecenekler();
    diziler3.AnketSecenekYazi =this.secD;
    agents.push(diziler,diziler1,diziler2,diziler3);
    this.dizi = agents;
    this.frmBuild.group({
      AnketId:[this.yeniKayit.AnketId],
      Soru: [this.yeniKayit.Soru],
      anketsorus: [agents]
    })
    console.log(this.dizi);
    this.dialogRef.close(this.frm.value);

  }
  

}