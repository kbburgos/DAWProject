import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterExam'
})
export class FilterExamPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg.length ==="") return value;
    const resultFilt = [];
    for(let exam of value){
      if(exam.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || exam.ci.indexOf(arg)>-1){
        resultFilt.push(exam);
      }
      
    }
    return resultFilt;
  }

}
