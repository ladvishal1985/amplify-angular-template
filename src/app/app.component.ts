import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';

import { Amplify } from 'aws-amplify';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import outputs from '../../amplify_outputs.json';
import { uploadData } from "aws-amplify/storage";

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule],
})
export class AppComponent {
  title = 'This angular Todo application deployed with Amplify';
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }



  onChange(event: any){
    console.log('Selected!!');
  }
  onUpload() {
    const file = document.getElementById("file") as any;
    const upload = document.getElementById("upload");
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file.files[0]);

    fileReader.onload = async (event: any) => {
      console.log("Complete File read successfully!", event.target.result);
      try {
        await uploadData({
          data: event.target.result,
          path: `picture-submissions/${file.files[0].name}`
        });
      } catch (e) {
        console.log("error", e);
      }
    };
  }

}
