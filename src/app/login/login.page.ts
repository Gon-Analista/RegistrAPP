import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { IUserLogin } from '../models/IUserLogin';
import { UserModel } from 'src/app/models/UserModel';
import { RouterModule } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLinkWithHref, FormsModule, RouterModule]
})
export class LoginPage implements OnInit {
  usersMap: Map<string, UserModel>;
  @ViewChild('logAnim', { read: ElementRef }) logAnim!: ElementRef;
  private animation!: Animation;

  userLoginModal: IUserLogin = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private alertController: AlertController,private animationCtrl: AnimationController) {
    this.usersMap = new Map<string, UserModel>();
    this.usersMap.set('go.ulloa', new UserModel('Gonzalo', 'Ulloa', 'go.ulloa@duocuc.cl', 'PROFESOR', 'go.ulloa', 'ulloa123'));
    this.usersMap.set('da.mallma', new UserModel('David', 'Mallma', 'da.m allma@duocuc.cl', 'ALUMNO', 'da.mallma', 'mallma123'));
    
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.logAnim.nativeElement)
      .fill('both')
      .duration(1500)
      .keyframes([
        { offset: 0,  opacity: '0' },
        { offset: 0.2, opacity: '0.1' },
        { offset: 0.4, opacity: '0.4' },
        { offset: 0.7,  opacity: '0.6' },
        { offset: 0.9,  opacity: '0.9',transform: 'scale(1.15)' },
        { offset: 1,  opacity: '1', transform: 'scale(1)' },
      ]);
    this.animation.play();
  }

  ngOnInit() {
    this.userLoginModalRestart();
  }

  gotoPerfil() {
    this.router.navigate(['/perfil'])
  }

  async userLogin(userLoginInfo: IUserLogin): Promise<void> {
    const user = this.usersMap.get(userLoginInfo.username);
    if (!userLoginInfo.username || !userLoginInfo.password) {
      // Campos en blanco, muestra la alerta
      await this.showAlert('Campos en blanco', 'Por favor, complete ambos campos.');
    } else if (user && user.password === userLoginInfo.password) {
      console.log('User Loged...', user.username, user.password);
      const userInfoSend: NavigationExtras = {
        state: {
          user,
        },
      };
      this.router.navigate(['/perfil'], userInfoSend);
    } else {
      // Usuario no encontrado o contraseña incorrecta, muestra la alerta
      await this.showAlert('Credenciales incorrectas', 'El nombre de usuario o la contraseña son incorrectos.');
    }

    this.userLoginModalRestart();
  }

  userLoginModalRestart(): void {
    this.userLoginModal.username = '';
    this.userLoginModal.password = '';
  }

  gotoRest() {
    const navigationExtras: NavigationExtras = {
      state: {
        usersMap: this.usersMap,
      },
    };
    this.router.navigate(['/restablecer'], navigationExtras);
  }

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
