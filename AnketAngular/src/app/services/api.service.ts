import { AnketSoru } from './../models/AnketSoru';
import { Anket } from './../models/Anket';
import { kullanici } from './../models/Kullanici';
import { Konular } from './../models/Konu';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uyeId: number;
  apiUrl = "https://localhost:44320/api/";

  constructor(
    public http: HttpClient
  ) { }

  KonuList(){
    return this.http.get(this.apiUrl+"konu/list");
  }
  KonuAdd(konu : Konular){
    return this.http.post(this.apiUrl+"konu/add",konu);
  }
  KonuUpdate(konu : Konular){
    return this.http.put(this.apiUrl+"konu/update",konu);
  }
  KonuRemove(konuadi: string){
    return this.http.delete(this.apiUrl + "konu/delete/"+ konuadi);
  }
  KullaniciList(){
    return this.http.get(this.apiUrl+"kullanici/list");
  }
  KullaniciListByKullaniciAdi(kullaniciadi: string){
    return this.http.get(this.apiUrl+"kullanici/list/"+kullaniciadi);
  }
  KullaniciAdd(kullanici : kullanici){
    return this.http.post(this.apiUrl+"kullanici/add",kullanici);
  }
  KullaniciUpdate(kullanici : kullanici){
    return this.http.put(this.apiUrl+"kullanici/update",kullanici);
  }
  KullaniciRemove(kullaniciadi: string){
    return this.http.delete(this.apiUrl + "kullanici/delete/"+ kullaniciadi);
  }
  AnketList(){
    return this.http.get(this.apiUrl+"anket/list");
  }
  AnketAdd(anket : Anket){
    return this.http.post(this.apiUrl+"anket/add",anket);
  }
  AnketUpdate(anket : Anket){
    return this.http.put(this.apiUrl+"anket/update",anket);
  }
  AnketRemove(anketId: number){
    return this.http.delete(this.apiUrl + "anket/delete/"+anketId);
  }
  AnketByKonu(konuAdi : string){
    return this.http.get(this.apiUrl+"anket/listbykonu/"+konuAdi);
  }
  AnketById(anketId : number){
    return this.http.get(this.apiUrl+"anket/listbyid/"+anketId);
  }
  AnketByKullanici(kullaniiciAdi : string){
    return this.http.get(this.apiUrl+"anket/listbykullanici/"+kullaniiciAdi);
  }
  AnketSoruList(anketId : number){
    return this.http.get(this.apiUrl+"anketsoru/list/"+anketId);
  }
  AnketSoruAdd(anketSoru : AnketSoru){
    return this.http.post(this.apiUrl+"anketsoru/add",anketSoru);
  }
  AnketSoruUpdate(anketSoru : AnketSoru){
    return this.http.put(this.apiUrl+"anket/update",anketSoru);
  }
  AnketSoruRemove(anketSoruId: number){
    return this.http.delete(this.apiUrl + "anket/delete/"+anketSoruId);
  }
  SecilenCevapAdd(cevapIdler: number[]){
    return this.http.post(this.apiUrl+"secilencevap/add",cevapIdler)
  }
  





  AnketCozenSayisi(anketId: number){
    return this.http.get(this.apiUrl+"anketcozensayi/"+ anketId);
  }
  SecilenSecenekSayi(anketSoruId: number){
    return this.http.get(this.apiUrl+"secilenseceneksayi/"+ anketSoruId);

  }

  tokenAl(kullaniciadi: string,parola:string){
    var data="username=" + kullaniciadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl+"token",data,{headers: reqHeader});
  }
  oturumKontrol(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
  ikinciAnket(anketId: number){
    this.uyeId = JSON.parse(localStorage.getItem("uyeId"));
    console.log(this.uyeId);
    return this.http.get(this.apiUrl+"ikincianket/"+this.uyeId+"/"+anketId)
  }

  adminKontrol(){
    if(localStorage.getItem("uyeYetkileri")=='["Admin"]'){
      return true;
    }
    else{
      return false;
    }
  }
}
