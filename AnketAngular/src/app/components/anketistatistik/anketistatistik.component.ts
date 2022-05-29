import { AnketSoru } from './../../models/AnketSoru';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Anket } from 'src/app/models/Anket';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-anketistatistik',
  templateUrl: './anketistatistik.component.html',
  styleUrls: ['./anketistatistik.component.css']
})
export class AnketistatistikComponent implements OnInit {
  cozenSayisi: number;
  anketId: number;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  anket: Anket[];
  anketsoru: AnketSoru[];
  sonuc: Sonuc;
  dataSource: any;
  displayedColumns =['AnketSoruId', 'AnketId','Soru','islemler']
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
    this.AnketSoruList();
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
  AnketSoruList(){
    
  }


}
