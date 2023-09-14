import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController,  IonHeader, Animation, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private currentColor: 'primary' | 'danger' = 'primary'; // Coloca esta línea aquí

  @ViewChild(IonHeader) header!: IonHeader; // Referencia a la barra de herramientas
  @ViewChild('limpiarBtn', { read: ElementRef }) limpiarBtn!: ElementRef;

  formulariologin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private animationCtrl: AnimationController 
  ) {
    this.formulariologin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'contraseña': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(8)])
    });
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formulariologin.value;

    if (!f.nombre || !f.contraseña) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Se debe llenar todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    if (f.contraseña.length >= 3 && f.contraseña.length <= 8) {
      var usuarioString = localStorage.getItem('usuario');
      
      if (usuarioString !== null) {
        var usuario = JSON.parse(usuarioString);
        
        if (usuario.nombre === f.nombre && usuario.contraseña === f.contraseña) {
          console.log('Ingresado');
          localStorage.setItem('ingresado', 'true');
          this.router.navigate(['/home']);
        } else {
          const alert = await this.alertController.create({
            header: 'Usuario invalido',
            message: 'El nombre de usuario y/o Contraseña son incorrectos',
            buttons: ['Aceptar'],
          });
          await alert.present();
        }
        
      }
   
    } else {
      const alert = await this.alertController.create({
        header: 'Contraseña incorrecta',
        message: 'La contraseña debe tener entre 3 y 8 caracteres.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }

  async limpiar() {
    this.formulariologin.reset();
    this.cambiarColorToolbar();
  }
  async cambiarColorToolbar() {

    const toolbar = document.querySelector('ion-toolbar'); // Selecciona la barra de herramientas
    if (toolbar) {
      toolbar.classList.remove('color-change-animation', 'primary-toolbar', 'danger-toolbar');
      await new Promise(resolve => setTimeout(resolve, 10)); // Pequeña pausa

      this.currentColor = this.currentColor === 'primary' ? 'danger' : 'primary';

      toolbar.classList.add('color-change-animation', `${this.currentColor}-toolbar`);
      }
    }
    
      }
    

