import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public email: string;
  public products: any;

  constructor(private dataService: DataService) { }
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit(): void {
  }

  validateEmail(){
    this.dataService.getEmailValidation(this.email).pipe(takeUntil(this.destroy$))
    .subscribe((res: HttpResponse<any>) => {
      this.products = res.body;
      console.table(this.products);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
