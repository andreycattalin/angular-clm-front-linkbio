import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateBioComponent } from './create-bio/create-bio.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "create-bio", component: CreateBioComponent, canActivate: [AuthGuard] },
  { path: "edit-bio/:id", component: CreateBioComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
