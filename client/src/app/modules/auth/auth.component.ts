import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService, CommonsService } from '../../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, AfterViewInit {

  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  form: FormGroup;
  queryParams: object = {};
  @ViewChild('modal', {static: false}) modal: ElementRef;
  @ViewChild('modalMiddle', {static: false}) modalMiddle: ElementRef;
  @ViewChild('closeModalButton', {static: false}) closeModalButton: ElementRef;
  @ViewChild('privacyCheckbox', {static: false}) privacyCheckbox: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private commonsService: CommonsService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.form = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'rememberme': [true, Validators.required],
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'signup')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Iniciar sesión' : 'Registrarse';
      // add form control for username if this is the signup page
      if (this.authType === 'signup') {
        this.form.addControl('username', new FormControl());
        this.form.addControl('repeatPassword', new FormControl());
        this.form.addControl('notifications', new FormControl());
      }
    });

    this.route.queryParams.subscribe(params => {
      if (!this.commonsService.isObjectEmpty(params)) {
        this.queryParams = params;
      }
    });

  }

  ngAfterViewInit() {
    this.checkIfUserHasScrolledToBottom();
  }

  toogleModal(modal: ElementRef) {
    this.commonsService.toggleModal(modal, true);
  }

  checkIfUserHasScrolledToBottom() {
    this.modalMiddle.nativeElement.addEventListener('scroll', (e: any) => {
      if (e.srcElement.scrollHeight - e.srcElement.scrollTop <= (e.srcElement.clientHeight + 200)) {
          this.enablePrivacyButton();
          this.privacyCheckbox.nativeElement.disabled = false;
      }
    });
  }

  enablePrivacyButton() {
    this.closeModalButton.nativeElement.classList.remove('button-filled__disabled');
  }

  checkIfPrivacyChecked(e: any) {
    if (this.authType === 'signup') {
      e.preventDefault();
      if (!this.privacyCheckbox.nativeElement.checked) {
        this.commonsService.toastMessage('error', 'Debes leer todas las condiciones de privacidad', 'Condiciones');
      } else {
        this.submitForm();
      }
    }
  }

  closeModalAndEnableCheckbox() {
    if (this.closeModalButton.nativeElement.classList.contains('button-filled__disabled')) {
      this.commonsService.toastMessage('error', 'Debes leer todas las condiciones de privacidad', 'Condiciones');
    } else {
      this.toogleModal(this.modal.nativeElement);
    }
  }

  remindUserToReadPrivacyPolicy(e: any) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
      if (this.privacyCheckbox.nativeElement.disabled === true) {
        this.commonsService.toastMessage('error', 'Debes leer todas las condiciones de privacidad', 'Condiciones');
      } else {
        this.privacyCheckbox.nativeElement.checked = !this.privacyCheckbox.nativeElement.checked;
      }
    }
    // When the screen is too big, the modal does not have any scroll, because it fits the screen
    // so we need to double check
    if (this.modalMiddle.nativeElement.scrollHeight === this.modalMiddle.nativeElement.clientHeight) {
        this.enablePrivacyButton();
        this.privacyCheckbox.nativeElement.disabled = false;
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.form.value;
    this.userService
    .attemptAuth(this.authType, credentials, this.form.value.rememberme)
    .subscribe(
      data => {
        if (this.queryParams['formPath']) {
          this.router.navigateByUrl(`/certified-forms/${this.queryParams['formPath']}`);
        } else {
          this.router.navigateByUrl('/');
        }
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
