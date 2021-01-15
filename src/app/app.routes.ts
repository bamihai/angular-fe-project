import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { WelcomeModule } from './welcome/welcome.module';
import { LayoutModule } from './layout/layout.module';
import { WelcomeComponent } from './welcome/welcome.component';



const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'board', component: LayoutComponent }
];

@NgModule({
    declarations: [
    ],

    imports: [
        RouterModule.forRoot(routes),
        WelcomeModule,
        LayoutModule
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
