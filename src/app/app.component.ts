import { } from 'aws-amplify/storage';

import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { getUrl, uploadData } from "aws-amplify/storage";

import { Amplify } from 'aws-amplify';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule],
})
export class AppComponent {
  url = ''
  title = 'This angular Todo application deployed with Amplify';
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
    this.getProfilePic().then();
  }



  onChange(event: any) {
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


  async getProfilePic() {
    const linkToStorageFile = await getUrl({
      path: "picture-submissions/profile-pic.jpg",
      // Alternatively, path: ({identityId}) => `album/{identityId}/1.jpg`
      options: {
        validateObjectExistence: false,  // defaults to false
        expiresIn: 20, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
        useAccelerateEndpoint: true // Whether to use accelerate endpoint.
      },
    });
    this.url = linkToStorageFile.url.toString()
    console.log('signed URL: ', linkToStorageFile.url);
    console.log('URL expires at: ', linkToStorageFile.expiresAt);
  }


}
