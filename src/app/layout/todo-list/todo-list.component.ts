import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DragDropModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class TodoListComponent {

  filters: any = ["Alta", "Baja", "Media", "Todo"];
  tasksInProgress: any = [];
  tasksDone: any = [];
  tasksTodo: any = [
    { id: '1', nombreTarea: 'Task 1', area: 'Backend', descripcion: 'Description 1', responsable: 'Responsable 1', fechaEntrega: '2024-12-10', prioridad: 'Alta' },
  ];
  tasksInProgressMemory: any = [];
  tasksDoneMemory: any = [];
  tasksTodoMemory: any = [...this.tasksTodo];
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  drop(event: CdkDragDrop<any[]>) {
    console.log('Drop event triggered:', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.tasksTodo = [...this.tasksTodo];
    this.tasksInProgress = [...this.tasksInProgress];
    this.tasksDone = [...this.tasksDone];

    this.tasksTodoMemory = [...this.tasksTodo];
    this.tasksInProgressMemory = [...this.tasksInProgress];
    this.tasksDoneMemory = [...this.tasksDone];

    this.snackBar.open('Tarea actualizada.', '', {
      duration: 5000,
      panelClass: ['snack-success']
    });
  }
  deleteTask(task: any, column: string) {
    if (column === 'todo') {
      this.tasksTodo = this.tasksTodo.filter((t: any) => t !== task);
    } else if (column === 'inprogress') {
      this.tasksInProgress = this.tasksInProgress.filter((t: any) => t !== task);
    } else if (column === 'done') {
      this.tasksDone = this.tasksDone.filter((t: any) => t !== task);
    }
    this.snackBar.open('Tarea eliminada.', '', {
      duration: 5000,
      panelClass: ['snack-success']
    });
  }
  openAddTaskDialog(row?: any, readonly: boolean = false): void {
    let data: any = { ...row, readonly };
    const dialogRef = this.dialog.open(TaskModalComponent, {
      maxWidth: '80vw',
      data
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.snackBar.open(result.update ? 'Tarea actulizada.' : 'Tarea agregada.', '', {
          duration: 5000,
          panelClass: ['snack-success']
        });
        if (!result.update) {
          const uniqueId = uuidv4();
          this.tasksTodo.push({ ...result, id: uniqueId });
          this.tasksTodoMemory = [...this.tasksTodo];
        }
        else {
          let newArray: any = [];
          this.tasksTodo.forEach((element: any) => {
            let newElement = { ...element };
            if (element.id == result.id) {
              newElement = result;
            }
            newArray.push(newElement);
          });
          this.tasksTodo = [...newArray];
        }
      }
    });
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'Alta':
        return 'red';
      case 'Media':
        return 'orange';
      case 'Baja':
        return 'green';
      default:
        return 'grey';
    }
  }

  changeSelection(e: any): void {
    if (e.value == 'Todo') {
      this.tasksTodo = [...this.tasksTodoMemory];
      this.tasksInProgress = [...this.tasksInProgressMemory];
      this.tasksDone = [...this.tasksDoneMemory];
    }
    else {
      this.tasksTodo = this.tasksTodoMemory.filter((x: any) => x.prioridad == e.value);
      this.tasksInProgress = this.tasksInProgressMemory.filter((x: any) => x.prioridad == e.value);
      this.tasksDone = this.tasksDoneMemory.filter((x: any) => x.prioridad == e.value);
    }
  }
}


@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class TaskModalComponent {
  responsables = ['Responsable 1', 'Responsable 2', 'Responsable 3'];
  taskForm!: FormGroup<any>;
  isNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      responsable: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      prioridad: ['', Validators.required],
      nombreTarea: ['', [Validators.required, Validators.maxLength(100)]],
      area: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]]
    });
    if (data.id) {
      this.taskForm.patchValue({ ...data });
      this.isNew = false;
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close({ ...this.taskForm.value, update: !this.isNew, id: this.data.id });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}