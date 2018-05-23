import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'speedUnit'
})
export class SpeedUnitPipe implements PipeTransform{
    
    transform(speed: number, UnitType: string){
        switch(UnitType){
            case "mph":
                const miles = Number(speed * 1.6);
                return miles.toFixed() + " mph";
            default:
                return Number(speed).toFixed(0) + " kph";

        }
    }
}