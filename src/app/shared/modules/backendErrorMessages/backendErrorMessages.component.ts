import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-message',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps!: any;

  public errorMessages!: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps.errors).map(
      (name: string) => {
        const messages = this.backendErrorsProps.errors[name].join(', ');

        return `${name} ${messages}`;
      },
    );
  }
}
