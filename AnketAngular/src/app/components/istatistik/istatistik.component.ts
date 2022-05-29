import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Anket } from 'src/app/models/Anket';
import { AnketSoru } from 'src/app/models/AnketSoru';
import { IstatistikSecenekler } from 'src/app/models/IstatistikSecenekler';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-istatistik',
  templateUrl: './istatistik.component.html',
  styleUrls: ['./istatistik.component.scss']
})
export class IstatistikComponent implements OnInit {
  cozenSayisi: number;
  anketId: number;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  anket: Anket[];
  anketsoru: AnketSoru[];
  sonuc: Sonuc;
  asayi:number;
  aSecenek:string;
  bsayi:number;
  bSecenek:string;
  csayi:number;
  cSecenek:string;
  dsayi:number;
  dSecenek:string;
  dataSource: any;
  Goster: boolean = false;
  displayedColumns =['Soru','islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public route : ActivatedRoute,
    public alert : MyAlertService
  ) { }

  ngOnInit() {
    this.AnketCozenSayisi();
  }
  AnketCozenSayisi(){
    this.route.params.subscribe(p=>{
        this.anketId = p['anketId'];
        console.log(this.anketId);
        this.apiServis.AnketCozenSayisi(this.anketId).subscribe((d : number) =>{
          this.cozenSayisi = d;
        })
    });
    this.apiServis.AnketSoruList(this.anketId).subscribe((d: AnketSoru[])=>{
      this.anketsoru = d;
      this.dataSource = new MatTableDataSource(this.anketsoru);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
   
  }
  SecilenSecenekSayi(AnketSoruId: number){
    this.Goster = true;
    this.apiServis.SecilenSecenekSayi(AnketSoruId).subscribe((d: IstatistikSecenekler[])=>{
      this.asayi = d[0].secilmeSayisi;
      this.aSecenek = d[0].secenek;
      this.bsayi = d[1].secilmeSayisi;
      this.bSecenek = d[1].secenek;
      this.csayi = d[2].secilmeSayisi;
      this.cSecenek = d[2].secenek;
      this.dsayi = d[3].secilmeSayisi;
      this.dSecenek = d[3].secenek;
    })
  }


}
