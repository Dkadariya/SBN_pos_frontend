import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventMgmtComponent } from './invent-mgmt/invent-mgmt.component';
import { Routes, RouterModule } from '@angular/router';
import { InventoryService } from './services/inventory.service';
import { ListInventComponent } from './list-invent/list-invent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path: 'inventory', component: InventMgmtComponent},
  {path: 'sale', component: ListInventComponent},
  {path: '#', redirectTo: 'sale', pathMatch: 'full'},
  {path: '', redirectTo: 'sale', pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    InventMgmtComponent,
    ListInventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
