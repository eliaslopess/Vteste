import { LoggedGuard } from './guards/logged.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',redirectTo: 'home',pathMatch: 'full' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoggedGuard] },
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'catalogo', loadChildren: './pages/catalogo/catalogo.module#CatalogoPageModule', canActivate: [AuthGuard]},
  { path: 'produto', loadChildren: './pages/produto/produto.module#ProdutoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
