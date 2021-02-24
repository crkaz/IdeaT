import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Idea } from '../../../../shared/models/idea';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  ideas: Idea[] = [];
  activeIdea: Idea;
  drawnObjects: any[] = [];
  private subject = new Subject<any>();

  constructor() {
    this.testIdeas(10);
    this.activeIdea = this.ideas[0];
  }

  sendMessage(message: string): void {
    this.subject.next({ text: message });
  }

  clearMessages(): void {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  get ActiveIdea(): Idea { return this.activeIdea; }
  setActiveIdea(idea: Idea): void {
    this.activeIdea = idea;
    !this.activeIdea.canvas ? this.activeIdea.canvas = [] : null;
    this.drawnObjects = this.activeIdea.canvas;
  }

  testIdeas(n: number): void {
    for (let i = 0; i < n; i += 1) {
      const idea: Idea = {
        id: i.toString(),
        author: 'test',
        creationDate: Date.now(),
        description: 'Test-generated example of a an idea object #' + i.toString(),
        comments: [],
        tags: [],
        vpc: null,
        canvas: []
      };

      this.ideas.push(idea);
    }
  }

  saveCanvas(): void {
    this.activeIdea.canvas = this.drawnObjects;
  }
}
