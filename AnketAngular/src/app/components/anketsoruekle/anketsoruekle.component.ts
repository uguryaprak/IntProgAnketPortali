import { AnketSecenekler } from './../../models/AnketSecenekler';
import { AnketSoru } from './../../models/AnketSoru';
import { Anket } from './../../models/Anket';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Konular } from 'src/app/models/Konu';
import { ApiService } from 'src/app/services/api.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-anketsoruekle',
  templateUrl: './anketsoruekle.component.html',
  styleUrls: ['./anketsoruekle.component.css']
})
export class AnketsoruekleComponent implements OnInit {
  Anket : Anket[];
  @ViewChild('soru') soru; // accessing the reference element
  @ViewChild('secA') secA; // accessing the reference element
  @ViewChild('secB') secB; // accessing the reference element
  @ViewChild('secC') secC; // accessing the reference element
  @ViewChild('secD') secD; // accessing the reference element

  handleClear(){
      // clearing the value
    this.soru.nativeElement.value = ' ';
    this.secA.nativeElement.value = ' ';
    this.secB.nativeElement.value = ' ';
    this.secC.nativeElement.value = ' ';
    this.secD.nativeElement.value = ' ';
  }
  AnketID : number;
  AnketSorular : AnketSoru;
  constructor(
    public frmBuild: FormBuilder,
    public apiservis: ApiService,
    public alert : MyAlertService

  ) { }

  ngOnInit() {
    this.AnketListele();
  }
  AnketListele(){
    this.apiservis.AnketList().subscribe((d : Anket[])=>{
      this.Anket = d;
    });
  }
  AnketSec(anketId: number){
    this.AnketID = anketId;
  }
  Kaydet(soru: string, a : string,b : string,c : string,d : string){
    var anketIds = JSON.parse(localStorage.getItem('anketId'));
    this.AnketSorular = new AnketSoru();
    this.AnketSorular.Soru = soru;
    this.AnketSorular.AnketId = anketIds;
    let anketsec : AnketSecenekler[] = [];
    const diziler = new AnketSecenekler();
    diziler.AnketSecenekYazi =a;
    const diziler1 = new AnketSecenekler();
    diziler1.AnketSecenekYazi =b;
    const diziler2 = new AnketSecenekler();
    diziler2.AnketSecenekYazi =c;
    const diziler3 = new AnketSecenekler();
    diziler3.AnketSecenekYazi =d;
    anketsec.push(diziler,diziler1,diziler2,diziler3);
    console.log(anketsec , this.AnketSorular)
    this.AnketSorular.anketsorus = anketsec;
    this.apiservis.AnketSoruAdd(this.AnketSorular).subscribe((s:Sonuc)=>{
      this.alert.AlertUygula(s);
      console.log(s);
    });

  }
}
