import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpFormComponent } from './components/emp-form/emp-form.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmpDisplayComponent } from './components/emp-display/emp-display.component';
import { EmpServiceService } from './emp-service.service';
import { HttpClientModule } from '@angular/common/http'
import {MatTableModule} from '@angular/material/table'

const routes: Routes = [
  {path: 'add-employee', component: EmpFormComponent},
  {path: 'edit-employee/:id', component: EmpFormComponent},
  {path: 'display-employee', component: EmpDisplayComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    EmpFormComponent,
    HeaderComponent,
    EmpDisplayComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,HttpClientModule,
    MatCardModule,MatButtonModule,MatRadioModule,MatFormFieldModule,MatTableModule,
    ReactiveFormsModule
  ],
  providers: [EmpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
