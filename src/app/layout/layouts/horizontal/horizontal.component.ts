import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../common/navbar';
import { ContentComponent } from '../common/content';
import { FooterComponent } from '../common/footer';

@Component({
  selector: 'app-horizontal-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ContentComponent, FooterComponent],
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalLayoutComponent {

}
