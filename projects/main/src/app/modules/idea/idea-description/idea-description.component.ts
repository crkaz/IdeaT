import { Component, OnInit } from '@angular/core';
import { IdeasService } from '../shared/services/ideas.service';

@Component({
  selector: 'ideat-idea-description',
  templateUrl: './idea-description.component.html',
  styleUrls: ['./idea-description.component.css']
})
export class IdeaDescriptionComponent implements OnInit {

  constructor(public ideas: IdeasService) {
  }

  ngOnInit(): void {
  }

}
