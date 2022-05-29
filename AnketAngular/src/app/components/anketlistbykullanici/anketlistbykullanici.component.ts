import { AnketSoru } from './../../models/AnketSoru';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Anket } from 'src/app/models/Anket';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { AnketDialogComponent } from '../dialogs/anket-dialog/anket-dialog.component';
import { AnketsoruDialogComponent } from '../dialogs/anketsoru-dialog/anketsoru-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-anketlistbykullanici',
  templateUrl: './anketlistbykullanici.component.html',
  styleUrls: ['./anketlistbykullanici.component.scss']
})
export class AnketlistbykullaniciComponent implements OnInit {
  dialogRef : MatDialogRef<AnketDialogComponent>;
  dialogRef1 : MatDialogRef<AnketsoruDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  anket: Anket[];
  dataSource: any;
  sorununekleneceginketinIdsi: 12;
  displayedColumns =['AnketId', 'AnketAciklama','Konu','Olusturan','islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.AnketListe();

  }
  AnketListe(){

    this.apiServis.AnketByKullanici(localStorage.getItem("uyeKullaniciAdi")).subscribe((d : Anket[])=>{
      this.anket = d;
      this.dataSource = new MatTableDataSource(this.anket);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  AnketFilter(e){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  AnketAdd(){
    var yeniKayit : Anket = new Anket();
    this.dialogRef= this.matDialog.open(AnketDialogComponent,{
      width : '300px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.AnketAdd(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.AnketListe();
          }
        });
      }
    })
  }
  IdGonderme(Ankets : Anket){
    if(JSON.parse(localStorage.getItem('anketId')) == null){
      localStorage.setItem('anketId', JSON.stringify(Ankets.AnketId))
    }
    else{
      var a = JSON.parse(localStorage.getItem('anketId'));
      a = Ankets.AnketId;
      localStorage.setItem("anketId",JSON.stringify(a));
    }
  }

  AnketSoruAdd(){
    var yeniKayit : AnketSoru = new AnketSoru();
    this.dialogRef1= this.matDialog.open(AnketsoruDialogComponent,{
      width : '300px',
      data:{
        kayit:yeniKayit,
        
        islem: 'ekle'
      }
    });
    this.dialogRef1.afterClosed().subscribe(d=>{
      console.log(d);
      if(d){
        this.apiServis.AnketSoruAdd(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.AnketListe();
          }
        });
      }
    })
  }
  AnketUpdate(kayit:Anket){
    this.dialogRef= this.matDialog.open(AnketDialogComponent,{
      width : '300px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){

        kayit.AnketAciklama = d.AnketAciklama;
        kayit.KonuId = d.KonuId;

        this.apiServis.AnketUpdate(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.AnketListe();
          }
        });
      }
    })

  }
  AnketRemove(kayit: Anket){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width : '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.AnketId + " Id'ye Sahip Anket Silinecektir Onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        
        this.apiServis.AnketRemove(kayit.AnketId).subscribe((s:Sonuc) =>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.AnketListe();
          }
        })
      }
    })
  }
}