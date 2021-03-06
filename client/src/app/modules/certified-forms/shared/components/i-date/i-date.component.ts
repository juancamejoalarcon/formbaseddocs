import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  StepsService
} from '../../services';

@Component({
  selector: 'app-i-date',
  templateUrl: './i-date.component.html'
})
export class IDateComponent implements OnInit {

  @Input() step: any;
  @Input() inputInvalid: any;
  @Output() emitIndication: EventEmitter<any> = new EventEmitter();

  constructor(
    private stepModelService: StepsService
  ) { }

  ngOnInit() {
  }

  showIndication() {
    this.emitIndication.emit();
  }

  onInput(value: any, wordToReplace: any) {
    this.stepModelService.input(value, wordToReplace, true, true);
  }

}
