import { Sonuc } from './../../models/Sonuc';
import { FormControl, FormGroup } from '@angular/forms';
import { AnketSecenekler } from './../../models/AnketSecenekler';
import { AnketSoru } from './../../models/AnketSoru';
import { Anket } from './../../models/Anket';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-anketCoz',
  templateUrl: './anketCoz.component.html',
  styleUrls: ['./anketCoz.component.scss']
})
export class AnketCozComponent implements OnInit {
  AnketBilgi : Anket;
  AnketAciklama : string;
  AnketKonu : string;
  sc: string;
  anketSorular : AnketSoru[];
  anketIdloc : number;
  frm : FormGroup;
  frmControl: FormControl;
  gecClass : GeciciKlas[] = [];
  helehele : GeciciKlas[] = [];
  sadecedegerler : number[] = [];
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.anketIdloc =JSON.parse(localStorage.getItem('anketCozId'));
    this.AnketBul(this.anketIdloc);
    this.AnketSoruList(this.anketIdloc);
    console.log(this.anketIdloc)
  }
  AnketBul(anketId: number){
    this.apiServis.AnketById(anketId).subscribe((d : Anket)=>{
      this.AnketBilgi = d;
      this.AnketAciklama = d.AnketAciklama;
      this.AnketKonu = d.konuBilgi.KonuAdi;
    })
  }
  AnketSoruList(anketId: number){
    this.apiServis.AnketSoruList(anketId).subscribe((d : AnketSoru[])=>{
      this.anketSorular = d;
      console.log(this.anketSorular);
    })
  }
  onItemChange(value) {
    const gecici1 = new GeciciKlas();
    gecici1.name = value.source.name;
    gecici1.value = value.value;
    this.gecClass.push(gecici1);
    console.log(this.gecClass);
    console.log(value.source.name);
    console.log(value.value);
    console.log(value);
    console.log(this.helehele);
  }
  Kaydet(){
  for(let i = this.gecClass.length -1 ; i>= 0; i--){
    if(this.helehele.findIndex(({ name }) => name === this.gecClass[i].name ) >= 0){
      this.helehele[this.helehele.findIndex((({ name }) => name === this.gecClass[i].name ))].value == this.gecClass[i].value;
    }
    else{
      this.helehele.push(this.gecClass[i]);
      this.sadecedegerler.push(this.gecClass[i].value);
    }
  }
   console.log(this.sadecedegerler);
  this.sadecedegerler.push(JSON.parse(localStorage.getItem('uyeId')));
  this.apiServis.SecilenCevapAdd(this.sadecedegerler).subscribe((s:Sonuc)=>{
    this.alert.AlertUygula(s);
    if(s.islem){
      location.href="/anket"
    }
  })

  }

}
export class GeciciKlas{
  name : string;
  value: number;
}
