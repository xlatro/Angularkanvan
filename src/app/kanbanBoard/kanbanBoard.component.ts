import {Component, OnInit} from '@angular/core';
import {Task} from '../models/Task';
import { TasksServiceService } from '../services/tasks-service.service';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
 
  name:string = "";
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  constructor(private tasksService:TasksServiceService){

  }


  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = this.tasksService.getTasks();
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
      this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  onCreate(){
    if(this.name != "")
    {
      const task:Task = new Task();
      task.name = this.name;
      task.stage = 0;
      if(!this.tasksService.addTask(task))
      {
        alert("task already exist!");
      }
      this.configureTasksForRendering();
      this.name = "";
    }
  }

   onDelete(name:string){
     this.tasks = this.tasksService.deleteTask(name);
     this.configureTasksForRendering();
   }

   onForward(name:string){
     this.tasksService.forwardTask(name);
     this.configureTasksForRendering();
   }

   onBack(name:string){
    this.tasksService.backTask(name);
    this.configureTasksForRendering();
  }

  }

/* interface Task {
  name: string;
  stage: number;
} */