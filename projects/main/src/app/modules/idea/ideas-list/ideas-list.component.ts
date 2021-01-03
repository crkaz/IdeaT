import { Component, OnInit } from '@angular/core';
import { IdeasService } from '../shared/services/ideas.service';


@Component({
  selector: 'ideat-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.css'],
})
export class IdeasListComponent implements OnInit {

  constructor(public ideas: IdeasService) {
  }

  ngOnInit(): void {
  }
}
