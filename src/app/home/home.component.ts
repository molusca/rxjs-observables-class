import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        // completing observable
        if (count === 5) {
          observer.complete();
        }

        // erroring observable
        if (count > 5) {
          observer.error(new Error("Count is greater than 5!"));
        }

        count++;
      }, 1000);
    });

    this.firstSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => {
          return data % 2 !== 0;
        }),
        map((data: number) => {
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(error);
        },
        () => {
          console.log("COMPLETED!!!");
        }
      );
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
