import { Component } from '@angular/core';
import axios from 'axios';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, ThemePalette } from '@angular/material/core';
import { MatCheckboxModule}  from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipEditedEvent,MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Todo {
  name: string;
  completed: boolean;
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
  dueDate = new FormControl('');
  status = new FormControl('TO_DO');
  collaborators = new FormControl('');

  constructor(
    private dialogRef: MatDialogRef<NewTaskComponent>,
    private snackBar: MatSnackBar
    ) {}

  async createTask(): Promise<void> {
    if (this.title.invalid) {
      this.snackBar.open('You must enter a title for the task', 'Close', {
        duration: 2000,
      });
      console.log("Test");
      return;
    }

    const newTaskData = {
      title: this.title.value,
      dueDate: this.dueDate,
      status: this.status.value,
      collaborators: [],
      todos: this.todos
    };

    try {
      const response = await axios.post('http://localhost:5001/tasks/', { newTaskData });
      this.snackBar.open('Task created successfully', 'Close', {
        duration: 2000,
      });
      this.closeDialog();
    } catch (error) {
      this.snackBar.open('Failed to create task', 'Close', {
        duration: 2000,
      });
    }
  }

  // Title
  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    } else {
      return;
    }
  }

  // Todos
  todos: Todo[] = [{
    name: 'Double click me!',
    completed: false,
  }, {
    name: 'Drag me!',
    completed: false,
  }];


  removeTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add todo
    if (value) {
      this.todos.push({
        name: value,
        completed: false,
      });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  edit(todo: Todo, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove todo if it no longer has a name
    if (!value) {
      this.removeTodo(todo);
      return;
    }

    // Edit existing todo
    const index = this.todos.indexOf(todo);
    if (index >= 0) {
      this.todos[index].name = value;
    }
  }

  drop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
