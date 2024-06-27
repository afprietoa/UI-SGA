import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/app/core/models/resource.model';
import { ResourceService } from 'src/app/core/services/resource.service';



@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html'
})
export class ScrollComponent implements OnInit {

  resources: Resource[] = [];

  constructor(
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.resourceService.getResources().subscribe({
      next:(data) => {
      this.resources = data;
    },error:(error)=>{
      console.log(error)
    }
  })
  }

}
