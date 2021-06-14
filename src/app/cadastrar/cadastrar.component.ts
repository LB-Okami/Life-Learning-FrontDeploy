import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { environment } from './../../environments/environment.prod';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas não conferem!')
    }else{
      if(this.user.foto == null || this.user.foto == '') {
        this.user.foto = 'https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png'
        console.log(this.user.foto)
      }
      this.authService.cadastrar(this.user).subscribe((resp:User)=>{
        this.user= resp
        this.router.navigate(['/logar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
        console.log(this.user.foto)
      }, erro => {
        if(erro.status == 400) {
          this.alertas.showAlertDanger('Usuário já cadastrado!')
        }
      })
    }
  }
}
