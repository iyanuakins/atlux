import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './slider/slider.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { OrderComponent } from './user/order/order.component';
import { HistoryComponent } from './user/history/history.component';
import { ReviewComponent } from './user/review/review.component';
import { CartComponent } from './user/cart/cart.component';
import { SidebarComponent } from './user/sidebar/sidebar.component';
import { NavbarComponent } from './user/navbar/navbar.component';
import { ViewComponent } from './user/view/view.component';
import { UserfaqComponent } from './user/userfaq/userfaq.component';
import { UsercontactComponent } from './user/usercontact/usercontact.component';
import { UseraboutComponent } from './user/userabout/userabout.component';
import { UserfooterComponent } from './user/userfooter/userfooter.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserService } from './services/user.service';
import { ModalComponent } from './user/modal/modal.component';
import { HomeService } from './services/home.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    FaqComponent,
    FooterComponent,
    AuthComponent,
    SliderComponent,
    DashboardComponent,
    ProfileComponent,
    OrderComponent,
    HistoryComponent,
    ReviewComponent,
    CartComponent,
    SidebarComponent,
    NavbarComponent,
    ViewComponent,
    UserfaqComponent,
    UsercontactComponent,
    UseraboutComponent,
    UserfooterComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    UserService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }