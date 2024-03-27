import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, FloatLabelType } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, ThemePalette } from '@angular/material/core';
import { MatCheckboxModule}  from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipEditedEvent,MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  //subtasks?: Task[];
}

@Component({
  selector: 'app-new-task',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    CdkDrag,
    CdkDropList
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  title = new FormControl('', [Validators.required]);
  status = new FormControl('TO_DO' as FloatLabelType);
  todo = new FormControl('');

  // Title
  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    }

    return this.title.hasError('email') ? 'Not a valid email' : '';
  }

  // Tasks
  tasks: Task[] = [{
    name: 'Double click me!',
    completed: false,
    color: 'primary',
  }, {
    name: 'Drag me!',
    completed: false,
    color: 'primary',
  }, {
    name: 'Testing how long I can get this string to go and to test if the chip will push the upper chip to the previous row',
    completed: false,
    color: 'primary',
  }];


  removeTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our task
    if (value) {
      this.tasks.push({
        name: value,
        completed: false,
        color: 'primary'
      });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  edit(task: Task, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove task if it no longer has a name
    if (!value) {
      this.removeTask(task);
      return;
    }

    // Edit existing task
    const index = this.tasks.indexOf(task);
    if (index >= 0) {
      this.tasks[index].name = value;
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

}
