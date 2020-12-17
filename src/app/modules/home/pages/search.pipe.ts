import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const projects of value) {
      if (projects.projectTitle.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(projects);
      };
    };
    return resultPosts;

  }

}
