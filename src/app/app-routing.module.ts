import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { SobreComponent } from './sobre/sobre.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemaComponent } from './tema/tema.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },

  {path:'home', component: HomeComponent},
  {path:'cadastro', component: CadastrarComponent},
  {path:'logar', component: EntrarComponent},
  {path:'sobre', component: SobreComponent},
  {path:'rodape', component: RodapeComponent},
  {path:'menu', component: MenuComponent},
  {path:'inicio', component: InicioComponent},
  {path:'tema', component: TemaComponent },
  {path:'tema-edit/:id', component: TemaEditComponent},
  {path:'tema-delete/:id', component: TemaDeleteComponent},
  {path: 'postagem-edit/:id', component: PostagemEditComponent},

  {path: 'user-edit/:id', component: UserEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
