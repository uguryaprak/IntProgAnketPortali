import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
  ) { }

  ngOnInit() {
  }
  OturumAc(KullaniciAdi: string, parola: string){
    this.apiServis.tokenAl(KullaniciAdi,parola).subscribe((d: any)=>{
      console.log(d );
      localStorage.setItem("token",d.access_token);
      localStorage.setItem("uyeId",d.uyeId);
      localStorage.setItem("uyeKullaniciAdi",d.uyeKullaniciAdi);
      localStorage.setItem("uyeYetkileri",d.uyeYetkileri);
      location.href="/";
    },err=>{
      var s:Sonuc = new Sonuc();
      s.islem=false;
      s.mesaj="Kullanıcı Adı Veya Parola Geçersiz";
      this.alert.AlertUygula(s);
    })
  }
}
