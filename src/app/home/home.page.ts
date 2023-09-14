import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AlertController, IonHeader } from '@ionic/angular';

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
   animations: [ 
    // Agregar las animaciones
    trigger('vibrate', [
      state('vibrating', style({ transform: 'translateX(5px)' })),
      state('not-vibrating', style({ transform: 'translateX(0)' })),
      transition('not-vibrating => vibrating', animate('10s ease-in')),
      transition('vibrating => not-vibrating', animate('10s ease-out'))
    ])
  ]
})

export class HomePage {
  usuario: any = {
    nivelEducacional: null,
  };

  inputVibrationState: 'vibrating'| 'not-vibrating' = 'not-vibrating';
  vibrateInputs() {
    this.inputVibrationState = 'vibrating';
    setTimeout(() => {
      this.inputVibrationState = 'not-vibrating';
    }, 200)

  }

  mostrarInfoUsuario: boolean = false;

  constructor(public alertController: AlertController) {}

  async mostrarInformacion() {
    if (!this.usuario.nombre || !this.usuario.apellido) {
      const alert = await this.alertController.create({
        header: 'Información incompleta',
        message: 'Por favor, verifique que todos los campos estén completos.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    const nivelEducacional = this.usuario.nivelEducacional || 'No especificado';

    const alert = await this.alertController.create({
      header: 'Información del Usuario',
      message: `Su nombre es ${this.usuario.nombre} ${this.usuario.apellido} .`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  limpiarCampos() {
    this.usuario = {
      nivelEducacional: null,
    };
    this.vibrateInputs(); 
    
  }

  mostrarCalendario() {
    this.mostrarInfoUsuario = true;
  }
  
}
