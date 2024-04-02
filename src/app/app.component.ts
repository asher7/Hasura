import { Component, OnInit } from '@angular/core';
import { Apollo, MutationResult, QueryRef, gql } from 'apollo-angular';
import { Observable, map, of } from 'rxjs';
import {MatCardModule} from '@angular/material/card'
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm, FormBuilder, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

interface Task {
  id: number;
  title: string;
  description: string;
  user:User;
  
}

interface User{

    id: number;
    fullName: string;
  
}
interface Response {
  tasks: Task[];
}

const GET_TASKS = gql`
  query Tasks {
    tasks {
      id
      title
      description
      user_id
      user {
        id
        fullName
      }
    }
  }
`;

const ADD_TASKS = gql`
  mutation MyMutation($title: name!, $description: String!, $fullName: name!) {
    insert_tasks(objects: {
      title: $title,
      description: $description,
      user: {data: {fullName: $fullName}}
    }) {
      returning {
        id
        title
        description
        user_id
        user {
          id
          fullName
        }
      }
    }
  }
`;

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:[CommonModule,
          RouterModule,
          FormsModule,
          MatCardModule,
          MatInputModule,
          FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatButtonModule
          ]
})
export class AppComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  queryRef!:QueryRef<Response>  
  form!: FormGroup; 
  constructor(private apollo: Apollo, private fb:FormBuilder) {}
  ngOnInit(): void {
this.form=this.fb.group({
  title:new FormControl('',Validators.required),
  description:new FormControl('',Validators.required),
  fullName:new FormControl('',Validators.required)
}
)

    this.queryRef = this.apollo.watchQuery<Response>({
      query: GET_TASKS
    })
    this.tasks$=this.queryRef.valueChanges.pipe(
      map(result => result.data.tasks)
    );
  }
  titleFormControl = new FormControl('', [Validators.required]);

  onSubmit( ): void {
   console.warn("hello")
      this.apollo.mutate<{ tasks: Task[] }>({
        mutation: ADD_TASKS,
        variables:this.form.value
      }).subscribe(({ data }) => {
        console.warn('Mutation result:', data);
        // Assuming this.queryRef is properly initialized and refers to the correct query reference
        this.queryRef.refetch();
      }, (error) => {
        console.error('Mutation error:', error);
        // Handle mutation error as needed
      });
    } 
  }
  


 
