import { Component, OnInit } from '@angular/core';
import { IdeasService } from '../shared/services/ideas.service';

const N_IDEAS = 5;
const LOREM_DESC: string[] = [
  'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua.',
  'Sed non nisl porttitor, maximus libero in, aliquam leo. Pellentesque at gravida tortor, ut fermentum metus. Fusce ultricies, turpis quis posuere volutpat, nunc tellus posuere augue, at congue elit eros ac orci.',
  'Praesent at nibh nisi. Integer lorem dui, tristique eu mollis ac, maximus id justo. Proin viverra risus vitae hendrerit consectetur. Cras ullamcorper tincidunt quam nec scelerisque.',
  'Mauris venenatis ac elit eu semper. Aliquam vestibulum diam non urna venenatis pharetra.',
  'Hello this is my idea :)'];
const AUTHOR = 'Zak Catherall';
const DATE = new Date().toLocaleDateString();

@Component({
  selector: 'ideat-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.css'],
})
export class IdeasListComponent implements OnInit {
  ideas: any[] = [];
  selectedIdea: any = null;

  constructor(public ideaService: IdeasService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < N_IDEAS; i += 1) {
      const idea = {
        id: i,
        title: 'Idea ' + i,
        description: LOREM_DESC[i],
        author: AUTHOR,
        date: DATE,
        votes: Math.floor(Math.random() * 10),
        selected: false
      };
      this.ideas.push(idea);
    }
    this.sortIdeasDescendingVotes();
  }

  vote(idea, upOrDown): void {
    if (upOrDown === 'up') {
      idea.votes += 1;
    } else {
      idea.votes -= 1;
    }
    this.sortIdeasDescendingVotes();
  }

  sortIdeasDescendingVotes(): void {
    this.ideas.sort((a, b) => (a.votes < b.votes ? 1 : -1));
  }

  selectIdea(idea: any): void {
    this.selectedIdea === idea
      ? (this.selectedIdea = null)
      : (this.selectedIdea = idea);

    this.ideaService.saveCanvas();
    this.ideaService.setActiveIdea(idea);
    this.ideaService.sendMessage('Message from Home Component to App Component!');
  }
}
