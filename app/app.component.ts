import { Component } from '@angular/core';



@Component({
    selector: 'my-app',
    template: ` <div class="container">
                    <div class="row">
                        <div class="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                            <weather-widget></weather-widget>
                        </div>
                    </div>
                </div>
                `,
    styles: [ `.container{ padding-top:.5rem;}` ]
}) 
export class AppComponent { }