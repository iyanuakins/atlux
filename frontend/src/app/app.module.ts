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
import { HomeOrderComponent } from './order/order.component';
import { HistoryComponent } from './user/history/history.component';
import { ReviewComponent } from './user/review/review.component';
import { CartComponent } from './user/cart/cart.component';
import { SidebarComponent } from './user/sidebar/sidebar.component';
import { NavbarComponent } from './user/navbar/navbar.component';
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
import { HomeModalComponent } from './modal/modal.component';
import { HomeService } from './services/home.service';
import { PaymentComponent } from './user/payment/payment.component';
import { HomecartComponent } from './homecart/homecart.component';
import { CartbtnComponent } from './cartbtn/cartbtn.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminDriversComponent } from './admin/admin-drivers/admin-drivers.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminReviewsComponent } from './admin/admin-reviews/admin-reviews.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AdminService } from './services/admin.service';

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
    HomeOrderComponent,
    HistoryComponent,
    ReviewComponent,
    CartComponent,
    SidebarComponent,
    NavbarComponent,
    UserfaqComponent,
    UsercontactComponent,
    UseraboutComponent,
    UserfooterComponent,
    ModalComponent,
    PaymentComponent,
    HomeModalComponent,
    HomecartComponent,
    CartbtnComponent,
    AdminCarsComponent,
    AdminOrdersComponent,
    AdminDriversComponent,
    AdminUsersComponent,
    AdminReviewsComponent,
    AdminDashboardComponent,
    AdminNavbarComponent
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
    HomeService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
