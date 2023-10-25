import { Component, OnInit } from '@angular/core';
import { DataTask } from 'src/app/models/dataTask.model';
import { Status } from 'src/app/models/statusmodel';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { takeUntil } from 'rxjs/operators';
import { DataTasksService } from 'src/app/services/dataTask/data-tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { DateValidator } from '../../shared/custom';
import { Subject } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-data-task',
  templateUrl: './add-data-task.component.html',
  styleUrls: ['./add-data-task.component.css']  
})
export class AddDataTaskComponent implements OnInit {

  dataForm: FormGroup;

  //toast
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastStyle: string = '';


  statusList: Status[] = [];
  private ngCategoriesUnsubscribe = new Subject();
  private ngDataTaskUnsubscribe = new Subject();

   dataTask: DataTask = {
    id: undefined,
    description: undefined,
    validateDate: '',
    status: 0
  }    

  titulo: string = '';
  loading: boolean = false;

  constructor(private categoriesService: CategoriesService,
              private dataTaskService: DataTasksService, 
              private router: Router,
              private activeRoute: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService) { 
                
                if (!this.authService.isLogged()) {
                  this.router.navigate(['/login']);
                }

                this.dataForm = this.fb.group({
                  date: ['', Validators.compose([Validators.required, DateValidator.dateValidator])]
                });

              }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        
        if(id){
          this.titulo = "Alterar uma tarefa";
          this.getDataTask(id);
        }
        else{
          this.titulo = "Adicionar uma tarefa";
          this.clear();
        }
    }
  });

    this.clear();
    this.loading = true;
    this.categoriesService.getAllStatus()
    .pipe(takeUntil(this.ngCategoriesUnsubscribe))
    .subscribe((data) => {
      this.loading = false;
      this.statusList = data
      .map((status) => {
        return {
          ...status
        }
      })
    });
  }
  
  getDataTask(id: any){
      this.dataTaskService.getDataTasksById(id)
      .pipe(takeUntil(this.ngDataTaskUnsubscribe))
      .subscribe((data) => {
        this.loading = false;
        data.validateDate =  formatDate(data.validateDate!, 'yyyy-MM-dd', 'en-US')
        this.dataTask = data;
      },
      err => {
        this.loading = false;
        this.toastStyle = "bg-danger";
        this.toastMessage = err.error != undefined ? err.error[0].message : err.message;
        this.toastVisible = true;

        window.setTimeout(() => {
          this.toastMessage = '';
          this.toastVisible = false;
          this.toastStyle = "";
        }, 3000);

        window.setTimeout(() => {
          this.loading = false;
        }, 3000);
      });
  }

  save() {
    this.loading = true;
    
    if(!moment(this.dataTask.validateDate, 'YYYY-MM-DD', true).isValid()){
      this.loading = false;
      this.toastStyle = "bg-danger";
      this.toastMessage = 'Data de validade inválida!';
      this.toastVisible = true;

      window.setTimeout(() => {
        this.toastMessage = '';
        this.toastVisible = false;
        this.toastStyle = "";
        this.loading = false;
      }, 3000);
      return;
    }

    this.dataTaskService.save(this.dataTask)
    .subscribe(data => {

      this.toastMessage =  'Tarefa salvo com sucesso';
          this.toastVisible = true;
          this.toastStyle = "bg-success";

      window.setTimeout(() => {
        this.toastMessage = '';
        this.toastVisible = false;
        this.toastStyle = "";
        this.loading = false;
        this.router.navigate(['/tasks']);
      }, 3000);
    },
    err => {
      this.loading = false;
      this.toastStyle = "bg-danger";
      this.toastMessage = err.error != undefined ? err.error[0].message : err.message;
      this.toastVisible = true;

      window.setTimeout(() => {
        this.toastMessage = '';
        this.toastVisible = false;
        this.toastStyle = "";
      }, 3000);
    });    
  }

  clear(){
    this.dataTask.id  = undefined;
    this.dataTask.description = undefined;
    this.dataTask.validateDate = '';
    this.dataTask.status = 0;
  }

  ngOnDestroy(){
    this.ngCategoriesUnsubscribe.complete();
    this.ngDataTaskUnsubscribe.complete();
  }
  

  getStatus(status: Event){
    
    this.dataTask.status = parseInt((status.target as HTMLInputElement).value);
    console.log((status.target as HTMLInputElement).value);
  }
}

