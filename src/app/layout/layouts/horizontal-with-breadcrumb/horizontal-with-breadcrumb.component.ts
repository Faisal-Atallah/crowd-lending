import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../common/navbar';
import { ContentComponent } from '../common/content';
import { FooterComponent } from '../common/footer';
import { BreadcrumbComponent } from '../common/breadcrumb';

@Component({
  selector: 'app-horizontal-with-breadcrumb',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ContentComponent, FooterComponent, BreadcrumbComponent],
  templateUrl: './horizontal-with-breadcrumb.component.html',
  styleUrls: ['./horizontal-with-breadcrumb.component.scss']
})
export class HorizontalWithBreadcrumbComponent {

}
