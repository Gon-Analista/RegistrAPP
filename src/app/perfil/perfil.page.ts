import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'perfil.page.html',
  
  styleUrls: ['perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PerfilPage implements OnInit{

  
  userInfoReceived: UserModel | undefined;
  idUserHtmlRouterLink: any;

  constructor(private router: Router) {
    this.userInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['user'];
   }

  ngOnInit() {
  }
  gotoAsis(){
    this.router.navigate(['/asistencia'])
  }
}

