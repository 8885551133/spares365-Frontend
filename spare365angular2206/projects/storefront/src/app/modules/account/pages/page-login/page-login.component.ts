import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountApi } from '../../../../api/base';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { mustMatchValidator } from '../../../../functions/validators/must-match';

import { NgForm, NgModel } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { UserinfoService } from './userinfo.service';

import { User } from './user';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  loginForm: FormGroup;
  loginInProgress = false;
  registerForm: FormGroup;
  registerInProgress = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private account: AccountApi,
    private toastr: ToastrService,
    private _service: RegistrationService,
    public userInfoService: UserinfoService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['red-parts@example.com', [Validators.required, Validators.pattern("^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,3}$"), Validators.maxLength(255)]],
      password: ['123456', [Validators.required, Validators.maxLength(255)]],
      remember: [false],
    });

    this.registerForm = this.fb.group({
        firstName: ['user', [Validators.required, Validators.minLength(4), Validators.pattern("[A-Za-z]+"), Validators.maxLength(255)]],
        lastName: ['user', [Validators.required, Validators.minLength(4), Validators.pattern("[A-Za-z]+"), Validators.maxLength(255)]],
        // phone: ['9999999999', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]], //^([0|+[0-9]{1,5})?([7-9][0-9]{9})$
        email: ['user@example.com', [Validators.required, Validators.pattern("^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,3}$"), Validators.maxLength(255)]],
        password: ['123456', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"), Validators.maxLength(255)]],
        confirmPassword: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"), Validators.maxLength(255)]],
        otp: ['000000', [Validators.required, Validators.maxLength(255)]],
      }, { validators: [mustMatchValidator('password', 'confirmPassword'), Validators.required] }
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  user: User = new User();
  msg: string = '';
  otp: number;
  loginUser: User = new User();
  loginMsg: string = '';
  test: User = new User();
  otpToValidate: number;
  bShowOTP: boolean = false;
  registeredUser: User = new User();


  login(): void {
    if(this.loginUser.email == 'admin' && this.loginUser.password == 'admin')
    {
      this._router.navigateByUrl('/site/add-listing');
      /*
        this.account.signIn("red-parts@example.com","123456"); 
        this.loginInProgress = true;
        this.account.signIn(
          "red-parts@example.com",
          "123456",
        ).pipe(
        finalize(() => this.loginInProgress = false),takeUntil(this.destroy$),).subscribe(
          () => this._router.navigateByUrl('/account/dashboard'),
          error => {
            if (error instanceof HttpErrorResponse) {
              this.loginForm.setErrors({
                server: `ERROR_API_${error.error.message}`,});
              } else {
                alert(error);
              }
            },
            );
      */
            return;
    }
    this._service.loginUserFromRemote(this.loginUser).subscribe(
      data => {
        console.log("Response Received");
        if(data.Status == "1")
        {
          this._router.navigate(['']); //.navigate(['/account/dashboard']);
          //this.loginMsg = "Login Successful.";
          this.showMessage(data.Message);
          this.userInfoService.user = this.loginUser;
          this.userInfoService.updateUser();
          this.test = data;
        }
        else
        {
          this.errorMessage(data.Message); 
        }
        
        //this.handleResponse(data);
        //this.account.signIn(this.loginUser.email,this.loginUser.password); 
/*
        this.loginInProgress = true;
        this.account.signIn(
          this.loginUser.email,
          this.loginUser.password,
        ).pipe(
        finalize(() => this.loginInProgress = false),takeUntil(this.destroy$),).subscribe(
          () => this._router.navigateByUrl('/account/dashboard'),
          error => {
            if (error instanceof HttpErrorResponse) {
              this.loginForm.setErrors({
                server: `ERROR_API_${error.error.message}`,});
              } else {
                alert(error);
              }
            },
            );
*/
      },
      error => {
        console.log("Exception Occured:"+error.error.text);
        //console.log(this.test);
        this.errorMessage("Wrong username or password."); //"Error 500. Can't Login."
        //this.loginMsg = "Wrong username or password.";
      }
    );
    /*
    this.loginForm.markAllAsTouched();
    if (this.loginInProgress || this.loginForm.invalid) {
    return;
    }
    this.loginInProgress = true;
    this.account.signIn(
    this.loginForm.value.email,
    this.loginForm.value.password,
    ).pipe(
    finalize(() => this.loginInProgress = false),
            takeUntil(this.destroy$),
                        ).subscribe(
                                    () => this.router.navigateByUrl('/account/dashboard'),
                                                    error => {
                                                                        if (error instanceof HttpErrorResponse) {
                                                                                                this.loginForm.setErrors({
                                                                                                                            server: `ERROR_API_${error.error.message}`,
                                                                                                                                                    });
                                                                                                                                                                        } else {
                                                                                                                                                                                                alert(error);
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                );*/
                                                                                                                                                                                                                                          
  }
  
  handleResponse(data): void
  {
    sessionStorage.setItem('loggedUser', data.firstName);
  }

  test2: string = 'test';

  validateOTP(): void {
    this._service.validateOTP(this.user).subscribe(
      data => {
        this.bShowOTP = true;
        console.log("Response Received" + data);
        //this.registeredUser = data;
        //this._router.navigate(['/registration']);
        this.otpToValidate = data;
        //this.msg = "Registration Successful.";
      },
      error => {
        console.log(error.error.text);
        this.bShowOTP = false;
        //this.msg = error.error.text;

        if(error.error.text != "Email already exists.")
        {
          //this.msg = "Error 500. Can't send OTP.";
          this.errorMessage("Error 500. Can't send OTP.");
        }
        else{
          this.errorMessage("Email already registered.");
        }
        // this.msg = "Error 500. Can't send OTP.";
      }
    );
    /*
        this._service.registerUserFromRemote(this.user).subscribe(
                data => {
                          console.log("Response Received");
                                    this.registeredUser = data;
                                              //this._router.navigate(['/registration']);
                                                        this.bShowOTP = true;
                                                                  //this.msg = "Registration Successful.";
                                                                          },
                                                                                  error => {
                                                                                            console.log("Exception Occured");
                                                                                                      this.msg = "Error 500. Can't Register.";
                                                                                                              }
                                                                                                                    );
                                                                                                                        */
                                                                                                                            // this.registerForm.markAllAsTouched();
    // if (this.registerInProgress || this.registerForm.invalid) {
        //     return;
            // }
    // this.registerInProgress = true;
    // this.account.signUp(
        //     this.registerForm.value.email,
            //     this.registerForm.value.password,
                // ).pipe(
                    //     finalize(() => this.registerInProgress = false),
                        //     takeUntil(this.destroy$),
                            // ).subscribe(
                                //     () => this.router.navigateByUrl('/account/dashboard'),
                                    //     error => {
                                        //         if (error instanceof HttpErrorResponse) {
                                            //             this.registerForm.setErrors({
                                                //                 server: `ERROR_API_${error.error.message}`,
                                                    //             });
                                                        //         } else {
                                                            //             alert(error);
                                                                //         }
                                                                    //     },
                                                                        // );
                                                                          }
  showMessage(text:string) {
    this.toastr.toastrConfig.positionClass = "toast-bottom-right";
    this.toastr.success(text);
  }
  errorMessage(text:string) {
    this.toastr.toastrConfig.positionClass = "toast-bottom-right";
    this.toastr.error(text);
  }
  warningMessage(text:string) {
    this.toastr.toastrConfig.positionClass = "toast-bottom-right";
    this.toastr.warning(text);
  }
  otpMsg: String = '';
  tempp: string = 'a';

  @ViewChild('logintextbox') loginElement: ElementRef;

  register(): void {
    if (this.otpToValidate == this.otp) {
      this._service.registerUserFromRemote(this.user).subscribe(
        data => {
          console.log("Response Received.");
          //console.log(this.otp + "" + this.otpToValidate);
          //this.registeredUser = data;
          //this._router.navigate(['/registration']);
          this.bShowOTP = true;
          //  alert("Registration Successful");
          this.showMessage("Registration Successful");
          //  this.otpMsg = "Registration Successful.";
          Swal.fire({
            title: 'Registration Sucessful',
            text: 'Please Login',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.value) {
              // For more information about handling dismissals please visit
              // https://sweetalert2.github.io/#handling-dismissals
              setTimeout(()=>{ // this will make the execution after the above boolean has changed
                this.loginElement.nativeElement.focus();
              },500);  
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
          })
        },
        error => {
          console.log("Exception Occured");
          //this.msg = "Error 500. Can't Register.";
          this.warningMessage("Error 500. Can't Register.");
        }
      );
    }
    else {
      //  this.otpMsg = "You entered incorrect OTP.";
      // alert("you have entered incorrect otp")
      this.errorMessage("You entered incorrect OTP.");
      console.log(this.otp + "" + this.otpToValidate);
    }
  }
}