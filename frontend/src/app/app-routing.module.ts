import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { OrderComponent } from './user/order/order.component';
import { ReviewComponent } from './user/review/review.component';
import { HistoryComponent } from './user/history/history.component';
import { UserfaqComponent } from './user/userfaq/userfaq.component';
import { UseraboutComponent } from './user/userabout/userabout.component';
import { UsercontactComponent } from './user/usercontact/usercontact.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './user/cart/cart.component';
import { PaymentComponent } from './user/payment/payment.component';
import { HomeOrderComponent } from './order/order.component';
import { HomecartComponent } from './homecart/homecart.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminDriversComponent } from './admin/admin-drivers/admin-drivers.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminReviewsComponent } from './admin/admin-reviews/admin-reviews.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path: "", component: HomeComponent },
  {path: "about", component: AboutComponent },
  {path: "faq", component: FaqComponent },
  {path: "order", component: HomeOrderComponent },
  {path: "contact", component: ContactComponent },
  {path: "auth", component: AuthComponent },
  {path: "cart", component: HomecartComponent },
  {path: "user", component: DashboardComponent, canActivate: [AuthGuard] },
  {path: "user/profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {path: "user/order", component: OrderComponent, canActivate: [AuthGuard] },
  {path: "user/review", component: ReviewComponent, canActivate: [AuthGuard] },
  {path: "user/faq", component: UserfaqComponent, canActivate: [AuthGuard] },
  {path: "user/about", component: UseraboutComponent, canActivate: [AuthGuard] },
  {path: "user/contact", component: UsercontactComponent, canActivate: [AuthGuard] },
  {path: "user/history", component: HistoryComponent, canActivate: [AuthGuard] },
  {path: "user/cart", component: CartComponent, canActivate: [AuthGuard] },
  {path: "user/checkout/payment", component: PaymentComponent, canActivate: [AuthGuard] },
  {path: "admin", component: AdminDashboardComponent, canActivate: [AuthGuard] },
  {path: "admin/manage/orders", component: AdminOrdersComponent, canActivate: [AuthGuard] },
  {path: "admin/manage/reviews", component: AdminReviewsComponent, canActivate: [AuthGuard] },
  {path: "admin/manage/drivers", component: AdminDriversComponent, canActivate: [AuthGuard] },
  {path: "admin/manage/cars", component: AdminCarsComponent, canActivate: [AuthGuard] },
  {path: "admin/manage/users", component: AdminUsersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
