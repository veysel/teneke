import { Component } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';
import { MenuItemModel } from './models/menu.item.model';
import { MenuModel } from './models/menu.model';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public LoginPage: boolean = true;
  public PasswordConfirmText: string = "";
  public CurrentTimeText: string = "";

  public MainList: Array<MenuModel> = new Array<MenuModel>();
  public ContentList: Array<MenuItemModel> = new Array<MenuItemModel>();

  constructor(
    private toastr: ToastrService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.CurrentTimeText = moment().format("DD.MM.YYYY hh:mm");
    this.PasswordConfirmText = moment().format("YYYYMMDDhhmm");
  }

  public login(code: string) {
    if (code.length < 1) {
      this.toastr.error("zahmet olmaz ise kod gir");
      return;
    }

    if (code == this.PasswordConfirmText) {
      this.LoginPage = false;

      this.appService.GetConfig().subscribe(response => {
        this.MainList = response as Array<MenuModel>;
      });

    } else {
      this.toastr.error("hatalı kod");
    }
  }

  public logout() {
    this.LoginPage = true;
  }

  public GoToContent(index: number) {
    this.ContentList = this.MainList[index].list;

    $('.ui.accordion').accordion();
  }

  public ClearContent() {
    this.ContentList = new Array<MenuItemModel>();
  }

  public CopyValue(text: string) {
    var textarea = null;

    try {
      textarea = document.createElement("textarea");
      textarea.style.height = "0px";
      textarea.style.left = "-100px";
      textarea.style.opacity = "0";
      textarea.style.position = "fixed";
      textarea.style.top = "-100px";
      textarea.style.width = "0px";
      document.body.appendChild(textarea);

      textarea.value = text;
      textarea.select();

      document.execCommand("copy");
      this.toastr.info("veri kopyalandı");
    }
    finally {
      if (textarea && textarea.parentNode) {
        textarea.parentNode.removeChild(textarea);
      }
    }
  }

  public update() {
    this.ClearContent();
    this.MainList = new Array<MenuModel>();

    this.appService.GetConfig().subscribe(response => {
      this.MainList = response as Array<MenuModel>;
      this.toastr.success("yenileme başarılı");
    });
  }
}