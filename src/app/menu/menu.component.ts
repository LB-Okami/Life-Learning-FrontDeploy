import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  user: User = new User
  id = environment.id

  constructor(
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

  }


  sair() {
    this.router.navigate(['/logar'])

    environment.token = ''
    environment.nome = ''
    environment.id = 0
    environment.foto = ''
  }


  deslogar() {
    this.alertas.showAlertDanger('Sua sessão expirou, faça o login novamente')

    this.router.navigate(['/sobre'])
    environment.token = ''
    environment.nome = ''
    environment.id = 0
    environment.foto = ''
  }

}


