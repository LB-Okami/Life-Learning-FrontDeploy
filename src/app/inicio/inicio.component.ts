import { AuthService } from './../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string
  postagensUser: boolean = false

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()
  tituloTema: string
  temaOk: boolean = false

  idPost: number

  user: User = new User()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
    ) { }

    ngOnInit() {
      window.scroll(0,0)

      if(environment.token == '') {
        this.alertas.showAlertDanger('Sua sessão expirou!')
        this.router.navigate(['/logar'])
      }

      this.getAllTemas()
      this.getAllPostagens()
      this.findByIdUser()
    }

    getAllTemas(){
     this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
     })
    }

    findByIdTema(){
      this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
        this.tema = resp
      })
    }

    getAllPostagens(){
      this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
        this.postagensUser = false
      })
    }

    findByIdUser() {
      this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
        this.user = resp
        console.log(this.user)
      })
    }

    findAllMinhasPostagens() {
      this.postagensUser = true

      this.findByIdUser()
    }

    findAllPostagensTema() {

    }

    publicar(){
      this.tema.id = this.idTema
      this.postagem.tema = this.tema

      this.user.id = this.idUser
      this.postagem.usuario = this.user

      if(this.postagem.titulo == null || this.postagem.texto == null || this.postagem.tema == undefined){

        this.alertas.showAlertInfo('Insira um título.')
      }

      console.log(this.postagem.tema)

      this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
        this.postagem = resp
       this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
        this.postagem = new Postagem()
        this.getAllPostagens()
      },error => {
        console.log(this.postagem)
      })
    }

    findByIdPostagem(id: number) {
      this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
        this.postagem = resp
      })
    }

    deletar(id: number) {
      this.postagemService.deletePostagem(id).subscribe(() => {
        this.alertas.showAlertSuccess('Postagem apagada com sucesso!')
        this.getAllPostagens()
      })
    }

    findByTemaPostagem(){
      if(this.tituloTema == ''){
        this.getAllPostagens()
        this.temaOk = false
      } else{
        this.temaOk = true

        this.temaService.getByTituloTema(this.tituloTema).subscribe((resp: Tema[])=>{
          this.listaTemas = resp
          console.log(this.listaTemas)
        })
      }
    }

  }
