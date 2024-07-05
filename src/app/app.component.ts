import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { getUrl, uploadData } from "aws-amplify/storage";

import { Amplify } from 'aws-amplify';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { getCurrentUser } from 'aws-amplify/auth';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule],
})
export class AppComponent implements AfterViewInit {
  loginId = ''
  url = ''
  title = 'This angular Todo application deployed with Amplify';
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }

  ngAfterViewInit(): void {
    this.getProfilePic().then();
  }

  onChange(event: any) {
    this.loginId = this.authenticator.user.signInDetails?.loginId as string;
    this.onUpload();
    console.log('Selected!!');
  }
  onUpload() {
    const file = document.getElementById("getFile") as any;
    const upload = document.getElementById("upload");
    const fileReader = new FileReader();
    // fileReader.readAsArrayBuffer(file.files[0]);
    fileReader.readAsArrayBuffer(this.getFileWithnewName(this.loginId));


    fileReader.onload = async (event: any) => {
      console.log("Complete File read successfully!", event.target.result);
      try {
        await uploadData({
          data: event.target.result,
          path: `picture-submissions/${this.loginId}.jpg`
        });
        await this.getProfilePic();
      } catch (e) {
        console.log("error", e);
      }
    };
  }


  async getProfilePic() {
    await this.sleep(5000);
    this.loginId = this.authenticator.user.signInDetails?.loginId as string;
    const linkToStorageFile = await getUrl({
      path: `picture-submissions/${this.loginId}.jpg`,
      // Alternatively, path: ({identityId}) => `album / { identityId } / 1.jpg`
      options: {
        validateObjectExistence: false,  // defaults to false
        expiresIn: 900, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
        useAccelerateEndpoint: false // Whether to use accelerate endpoint.
      },
    });
    this.url = linkToStorageFile.url.href;
    console.log('signed URL: ', linkToStorageFile.url);
    console.log('URL expires at: ', linkToStorageFile.expiresAt);
  }

  getFileWithnewName(name: string) {
    const element = document.getElementById('getFile') as any;
    const file = element.files[0];
    const blob = file.slice(0, file.size, 'image/jpg');
    const newFile = new File([blob], `${name}.jpg`, { type: 'image/jpg' });
    return newFile;
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
