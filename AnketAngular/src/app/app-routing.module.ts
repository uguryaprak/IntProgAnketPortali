import { AnketlistBByAdminComponent } from './components/anketlistBByAdmin/anketlistBByAdmin.component';
import { KayitolComponent } from './components/kayitol/kayitol.component';
import { IstatistikComponent } from './components/istatistik/istatistik.component';
import { AnketistatistikComponent } from './components/anketistatistik/anketistatistik.component';
import { AnketCozComponent } from './components/anketCoz/anketCoz.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AnketlistbykullaniciComponent } from './components/anketlistbykullanici/anketlistbykullanici.component';
import { LoginComponent } from './components/login/login.component';
import { AnketsoruekleComponent } from './components/anketsoruekle/anketsoruekle.component';
import { AnketComponent } from './components/anket/anket.component';
import { KullaniciComponent } from './components/kullanici/kullanici.component';
import { KonularComponent } from './components/konular/konular.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  {path: "konular", component: KonularComponent},
  {path: "kullanici", component: KullaniciComponent},
  {path: "anket", component: AnketComponent},
  {path: "anketsoruekle", component: AnketsoruekleComponent},
  {path: "login", component: LoginComponent},
  {path: "kayitol", component: KayitolComponent},
  {path: "anketbykullanici", component: AnketlistbykullaniciComponent},
  {path: "profil", component: ProfilComponent},
  {path: "anketkullan", component: AnketCozComponent},
  //{path: "anketistatistik/:anketId", component: AnketistatistikComponent}
  {path: "anketistatistik/:anketId", component: IstatistikComponent},
  {path: "anketbyadmin", component: AnketlistBByAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
