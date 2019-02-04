import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, TasksRoutingModule],
  declarations: []
})
export class TasksModule {}
