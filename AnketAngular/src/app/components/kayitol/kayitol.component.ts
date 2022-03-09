import { Sonuc } from './../../models/Sonuc';
import { kullanici } from './../../models/Kullanici';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-kayitol',
  templateUrl: './kayitol.component.html',
  styleUrls: ['./kayitol.component.scss']
})
export class KayitolComponent implements OnInit {
uye: kullanici;
Sonuc : Sonuc;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
  ) { }

  ngOnInit() {
  }
  KayitOl(KullaniciAdi: string, parola: string, adSoyad:string,email : string){
    console.log(KullaniciAdi,parola,adSoyad,email)
    this.uye = new kullanici();
    this.uye.AdSoyad= "adSoyad";
    this.uye.KullaniciAdi= KullaniciAdi;
    this.uye.Sifre = parola;
    this.uye.Email = email;
    this.apiServis.KullaniciAdd(this.uye).subscribe((d: Sonuc)=>{
      this.Sonuc = d;
      this.alert.AlertUygula(this.Sonuc);
    })
    setTimeout(()=> "asdad",1000)
    location.href="/login"
  }
}
