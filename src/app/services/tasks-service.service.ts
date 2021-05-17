import { Injectable } from '@angular/core';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  Tasks:Task[] = [];
  constructor() { 

    this.Tasks = [
  
    ];
  }

  getTasks(){
    return this.Tasks;
  }

  addTask(task:Task){
     const found = this.Tasks.find(x => x.name == task.name);
     if(!found)
     {
      this.Tasks.push({name: task.name, stage : 0});
      return true;
     }
     return false;
  }

  deleteTask(name:string){
    this.Tasks = this.Tasks.filter(x=> x.name != name);
    return this.Tasks;
  }

  forwardTask(name:string){
    const tasks = this.Tasks.filter(x => x.name == name);
    for(var task of tasks)
    {
      if(task.stage < 3){
        task.stage++;
      }
    }
  }

  backTask(name:string){
    const tasks = this.Tasks.filter(x => x.name == name);
    for(var task of tasks)
    {
      if(task.stage > 0){
        task.stage--;
      }
    }
  }


}
