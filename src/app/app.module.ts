import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {ScanComponent} from './scan/scan.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MainViewComponent} from './main-view/main-view.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from '@angular/material/core';
import {VisualizationComponent} from './visualization/visualization.component';
import {CategoriesComponent} from './categories/categories.component';
import {ExportFileComponent} from './export-file/export-file.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {TransactionBtnComponent} from './transaction-btn/transaction-btn.component';
import {MatButtonModule} from "@angular/material/button";
import {TransactionFormComponent} from './transaction-form/transaction-form.component';
import {CategoryCardComponent} from './category-card/category-card.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/AuthGuard';
import {TokenInterceptor} from "./services/TokenInterceptor";
import {LogoutComponent} from './logout/logout.component';
import {BalanceComponent} from './balance/balance.component';
import {CategoryFormComponent} from './category-form/category-form.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent,
    MainViewComponent,
    VisualizationComponent,
    CategoriesComponent,
    ExportFileComponent,
    TransactionBtnComponent,
    TransactionFormComponent,
    CategoryCardComponent,
    DashboardComponent,
    LoginComponent,
    LogoutComponent,
    BalanceComponent,
    CategoryFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxChartsModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    MatSlideToggleModule
  ],
  providers: [MatDatepickerModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [TransactionFormComponent]
})
export class AppModule {

}
