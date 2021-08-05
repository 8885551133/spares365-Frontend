// import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountApi } from '../../../../../api/base';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { mustMatchValidator } from '../../../../../functions/validators/must-match';

import { NgForm, NgModel } from '@angular/forms';
// import { RegistrationService } from './registration.service';
// import { User } from './user';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { Addproduct } from './addproduct';
import { AddProductService } from './addproduct.service';

import { UploadFileService } from '../../../../../services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from 'projects/storefront/src/app/services/common.service';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  loginForm: FormGroup;
  loginInProgress = false;

  addListingForm: FormGroup;
  registerInProgress = false;

  selectedFiles: FileList;

  @ViewChild('imageInput')
  imageInputVariable: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private account: AccountApi,
    private toastr: ToastrService,
    private _router: Router,
    private _service: AddProductService,
    private uploadService: UploadFileService,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    
    this.addListingForm = this.fb.group({
      productName: ['', [Validators.required, Validators.maxLength(255)]],
      productPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.maxLength(255)]],
      productQuantity: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0),Validators.maxLength(255)]],
      productDescription: ['', [Validators.required]],
      modelnumber: ['', [Validators.required, Validators.maxLength(255)]],
      productCategory: ['', [Validators.required,Validators.maxLength(255)]],
      year: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max((new Date()).getFullYear())]],
      // specificationSpeed: ['', Validators.required],
      // specificationPowersource: ['', Validators.required],
      // specificationVoltage: ['', Validators.required],
      // specificationBatteryCapacity: ['', Validators.required],
      // specificationMaterial: ['', Validators.required],
      // specificationEngineType: ['', Validators.required],
      
      productImage: ['', [Validators.required]],
    },
  );
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addproduct: Addproduct = new Addproduct();

  Msg: any;
  addListing(): void {
    this._service.addproductFromRemote(this.addproduct).subscribe(
      data => {
        console.log("Response Received");
        //this.Msg = "Product Added Successfully.";
        this.showMessage();
      },
      error => {
        console.log("Exception Occured");
        //this.Msg = "Error 500 can't add.";
        this.toastr.error("Error 500. Can't connect to server.");
      }
    );
  }

  showMessage() {
    this.toastr.success("Product Added Successfully.");
  }

  selectFile(event) {
    if(event.target.files.length > 0) 
    {
      this.selectedFiles = event.target.files;
      var file = this.selectedFiles[0];
      var filesize = ((file.size/1024)/1024).toFixed(4);
      //console.log(parseFloat(filesize));
      if(parseFloat(filesize) > 10)
      {
        this.selectedFiles = null;
        this.imageInputVariable.nativeElement.value = "";
        this.toastr.error("Image size must be less than 10 mb.");
        this.addproduct.image = "";
      }

      if (this.selectedFiles && file) {
          var reader = new FileReader();
          reader.onload =this._handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
      }
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.addproduct.image = 'data:image/jpeg;base64,' + btoa(binaryString);
  }  

}