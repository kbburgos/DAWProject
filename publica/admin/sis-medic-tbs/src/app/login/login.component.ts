import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/loginUtils/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./../../assets/css/main.css",
    "./../../assets/css/style-home.css",
    "./../../assets/css/util.css",
    "./../../assets/fonts/iconic/css/material-design-iconic-font.min.css",
    "./../../assets/vendor/bootstrap/css/bootstrap.min.css",
    "./../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
    "./../../assets/vendor/animate/animate.css",
    "./../../assets/vendor/css-hamburgers/hamburgers.min.css",
    "./../../assets/vendor/animsition/css/animsition.min.css",
    "./../../assets/vendor/select2/select2.min.css",
    "./../../assets/vendor/daterangepicker/daterangepicker.css"
  ]
})
export class LoginComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) {}
  log = "";
  isvisible = false;
  loginUserData = {
    username: "",
    pass: ""
  };
  ngOnInit() {}

  login(user: string, pass: string) {
    //generar token por medio del password
    if (user === "" || pass === "") {
      this._router.navigate(["/"]);
      this.isvisible = true;
      this.log = "Debe ingresar credenciales validas";
    } else {
      console.log(user);
      this.loginUserData.username = user;
      this.loginUserData.pass = pass;
      this._auth.loginUser(this.loginUserData).subscribe(
        data => {
          localStorage.setItem("login", JSON.stringify(data.body));
          console.log(data.body);
          this._router.navigate(["/home"]);
        },
        err => {
          console.log(err);
          console.log(err.status);
          console.log(err.error);
          this._router.navigate(["/"]);
          this.isvisible = true;
          this.log = err.error.log;
        }
      );
    }
  }
}
