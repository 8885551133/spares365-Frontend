import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistrationService } from '../page-login/registration.service';
import { User } from '../page-login/user';

import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  user: User;
  message:string;
  errorMessage:string;
  resetForm:FormGroup;
  toaster: any;

  constructor(
    private fb: FormBuilder,
    private _service: RegistrationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = new User();

    this.route.queryParams
    .filter(params => params.token)
    .subscribe(params => {
      this.user.resetPasswordToken = params.token;
    }
  );
  }

 resetPassword()
  {
    //this.user.resetPasswordToken = this.formResetPasswordToken;
    //console.log(this.user.resetPasswordToken);

    this._service.resetPassword(this.user).subscribe(
      data => {
        console.log("Response Received");
        console.log(data);
        //this.loginMsg = "Login Successful.";
        //this.showMessage("Login Successful.");
        // this.toaster.success("Enter valid email address");
        this.message = "Password Reset Successful.";
        
      },
      error => {
        console.log("Exception Occured:"+error.error.text);
        //this.errorMessage("Wrong username or password."); //"Error 500. Can't Login."
        this.errorMessage = JSON.stringify(error.error);//"Wrong username or password.";
      },
    );
  }

}
