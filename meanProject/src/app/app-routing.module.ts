import { NgModule } from '@angular/core';
import {RouterModule,Routes } from '@angular/router';
import { MatToolbarModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule,MatButtonModule,MatCardModule,MatTableModule,MatDividerModule,MatSnackBarModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';


const routes:Routes = [
  {path: 'create',component:CreateComponent},
  {path: 'edit/:id',component:EditComponent},
  {path: 'list',component:ListComponent},
  {path: '',redirectTo:'list',pathMatch:'full'}
  ];
@NgModule({
  declarations: [
  
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [RouterModule.forRoot(routes),
    
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
