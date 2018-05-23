import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempUnit'
})
export class TempUnitPipe implements PipeTransform{
    transform(temp: number, unitType: string){
        if(unitType == "celsius"){
            const celsius = (temp - 32 ) * 0.526;
            return celsius;
        }else{
            return temp;
        }
    }
}