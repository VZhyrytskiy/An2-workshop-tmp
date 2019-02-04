import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TaskModel } from './../../models/task.model';
import { TaskArrayService } from './../../services/task-array.service';

// rxjs
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskArrayService: TaskArrayService
  ) {}

  ngOnInit(): void {
    this.task = new TaskModel();

    // it is not necessary to save subscription to route.paramMap
    // it handles automatically
    this.route.paramMap
      .pipe(
        switchMap((params: Params) =>
          this.taskArrayService.getTask(+params.get('taskID'))
        )
      )
      .subscribe(task => (this.task = { ...task }), err => console.log(err));

    // this.route.paramMap.subscribe(paramMap => {
    //  const id = paramMap.get('taskID');

    //  this.taskArrayService.getTask(id)
    //  .then()
    //  .catch()
    //  or
    //  .subscribe()
    // })
  }

  onSaveTask() {
    const task = { ...this.task };

    if (task.id) {
      this.taskArrayService.updateTask(task);
    } else {
      this.taskArrayService.createTask(task);
    }

    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
