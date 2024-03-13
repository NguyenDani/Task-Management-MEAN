import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatSidenavModule,
    SidenavComponent,
    ContentComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
