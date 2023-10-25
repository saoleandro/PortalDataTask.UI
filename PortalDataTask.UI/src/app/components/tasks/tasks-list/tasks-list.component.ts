import { Component, OnInit } from '@angular/core';
import { DataTask } from 'src/app/models/dataTask.model';
import { DataTasksService } from 'src/app/services/dataTask/data-tasks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  dataTasks: DataTask[] = [];
  private ngDataTasksUnsubscribe = new Subject();

  //toast errors
  toastMessage: string = "";
  toastStyle: string = "bg-danger";
  toastVisible: boolean = false;

    //modal
    dataTaskId?: number = 0;
    activeModal: boolean = false;
    titleModal: string = '';
    descriptionModal: string = '';

  loading: boolean = false;

  displays = [{ status: "0", text: "Inativo", color: "red" }, 
            { status: "1", text: "Ativo", color: "green" }, 
            { status: "2", text: "Pendente", color: "orange" }];
            
 
  constructor(private dataTaskService : DataTasksService,
              private router: Router,
              private authService: AuthService) { 
                
                if (!this.authService.isLogged()) {
                  this.router.navigate(['/login']);
                } 
              }

  ngOnInit(): void {
    this.getAllDataTasks();      
  }
  
  goDetail(id: any){
    if(id == undefined)
      this.router.navigateByUrl(`/task/`);
    else
      this.router.navigateByUrl(`/task/${id}`);
  }

  getAllDataTasks()
  {
    this.loading = true;
    this.dataTaskService.getAllDataTasks()
    .pipe(takeUntil(this.ngDataTasksUnsubscribe))
    .subscribe(data => {
      this.dataTasks = data.map((dataTask) => {
        return {
          ...dataTask
        }
      });

      window.setTimeout(() => {
        this.loading = false;
    }, 3000);
    },
    err => {
      this.toastStyle = "bg-danger";
        this.toastMessage = err.error != undefined ? err.error.message : err.message;
        this.toastVisible = true;

        window.setTimeout(() => {
          this.toastMessage = '';
          this.toastVisible = false;
          this.toastStyle = "";
      }, 3000);

    });
}


openModalActive(dataTask: DataTask){
  this.activeModal = true;
  this.titleModal = 'Remover tarefa';
  this.descriptionModal = 'Tem certeza que deseja remover  "' + dataTask.description + '" ?';
  this.dataTaskId = dataTask.id;
}

closeActiveModal(){
  this.activeModal = false;
}

confirmActiveModal(){
  this.loading = true;
  this.dataTaskService.deleteTaskById(this.dataTaskId)
  .pipe(takeUntil(this.ngDataTasksUnsubscribe))
  .subscribe(() => {
    this.loading = false;
    this.activeModal = false;

    this.toastMessage =  'Tarefa removida com sucesso';
    this.toastVisible = true;
    this.toastStyle = "bg-success";

window.setTimeout(() => {
        this.toastMessage = '';
        this.toastVisible = false;
        this.toastStyle = "";
        this.loading = false;
        this.getAllDataTasks();
      }, 3000);
  },
  err => {
      this.loading = false;
      this.toastStyle = "bg-danger";
      this.toastMessage = err.error != undefined ? err.error[0].message : err.message;
      this.toastVisible = true;

      this.activeModal = false;
     
        window.setTimeout(() => {
            this.loading = false;
            this.toastMessage = '';
            this.toastVisible = false;
            this.toastStyle = "";
        }, 3000);
  });
}

getDisplay(status: number) {
  return this.displays.filter(item => item.status === status.toString())[0].text
}

getColor(status: number) {
  return this.displays.filter(item => item.status === status.toString())[0].color
}

  ngOnDestroy(){
      this.ngDataTasksUnsubscribe.complete();
  }

}
