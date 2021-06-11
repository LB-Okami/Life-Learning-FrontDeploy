import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem {
    public id: number
    public texto: string
    public titulo: string
    public link: string
    public tag: string
    public date: Date
    public usuario: User
    public tema: Tema


}
