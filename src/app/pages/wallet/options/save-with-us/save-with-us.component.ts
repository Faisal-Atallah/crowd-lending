import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaveWithUsForm } from './save-with-us.types';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wallet-save-with-us-dialog',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './save-with-us.component.html',
  styleUrls: ['./save-with-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletSaveWithUsDialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() onCloseDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  saveWithUsForm: FormGroup<SaveWithUsForm>;

  constructor(private _formBuilder: FormBuilder) {
  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._createSaveWithUsForm();
  }

  /**
   * Create Save With Us Form
   */
  private _createSaveWithUsForm(): void {
    this.saveWithUsForm = this._formBuilder.group({
      amount: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      pin: ['', Validators.required]
    });
  }

  /**
  * Hide Dialog
  */
  closeDialog(): void {
    this.visible = false;
    this.onCloseDialog.emit(false);
  }
}
