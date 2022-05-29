import { Sonuc } from './../../models/Sonuc';
import { Observable } from 'rxjs';
import { Konular } from './../../models/Konu';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KonuDialogComponent } from '../dialogs/konu-dialog/konu-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-konular',
  templateUrl: './konular.component.html',
  styleUrls: ['./konular.component.css']
})
export class KonularComponent implements OnInit {
  dialogRef : MatDialogRef<KonuDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  konular: Konular[];
  a : Konular[];
  dataSource: any;
  displayedColumns =['KonuId', 'KonuAdi','islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.KonuListe();

  }
  KonuListe(){

    this.apiServis.KonuList().subscribe((d : Konular[])=>{
      this.konular = d;
      this.dataSource = new MatTableDataSource(this.konular);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  KonuFilter(e){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  KonuAdd(){
    var yeniKayit : Konular = new Konular();
    this.dialogRef= this.matDialog.open(KonuDialogComponent,{
      width : '400px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.KonuAdd(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KonuListe();
          }
        });
      }
    })
  }
  KonuUpdate(kayit:Konular){
    this.dialogRef= this.matDialog.open(KonuDialogComponent,{
      width : '400px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){

        kayit.KonuAdi = d.KonuAdi;

        this.apiServis.KonuUpdate(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KonuListe();
          }
        });
      }
    })

  }
  KonuRemove(kayit: Konular){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width : '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.KonuAdi + " İsimli Konu Silinecektir Onaylıyor musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        
        this.apiServis.KonuRemove(kayit.KonuAdi).subscribe((s:Sonuc) =>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KonuListe();
          }
        })
      }
    })
  }
}
