import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Idea } from '../../../../shared/models/idea';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  readonly LOREM_DESC: string[] = [
    'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua.',
    'Sed non nisl porttitor, maximus libero in, aliquam leo. Pellentesque at gravida tortor, ut fermentum metus. Fusce ultricies, turpis quis posuere volutpat, nunc tellus posuere augue, at congue elit eros ac orci.',
    'Praesent at nibh nisi. Integer lorem dui, tristique eu mollis ac, maximus id justo. Proin viverra risus vitae hendrerit consectetur. Cras ullamcorper tincidunt quam nec scelerisque.',
    'Mauris venenatis ac elit eu semper. Aliquam vestibulum diam non urna venenatis pharetra.',
    'Hello this is my idea :)'];
  ideas: any[] = [];
  activeIdea: any;
  drawnObjects: any[] = [];
  stickies: any[] = [];
  private subject = new Subject<any>();

  constructor() {
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

  get ActiveIdea(): any { return this.activeIdea; }
  setActiveIdea(idea: any): void {
    this.activeIdea = idea;
    !this.activeIdea.drawnObjects ? this.activeIdea.drawnObjects = [] : null;
    !this.activeIdea.stickies ? this.activeIdea.stickies = [] : null;
    this.drawnObjects = this.activeIdea.drawnObjects;
    this.stickies = this.activeIdea.stickies;
  }

  saveCanvas(): void {
    this.activeIdea ? this.activeIdea.drawnObjects = this.drawnObjects : null;
    this.activeIdea ? this.activeIdea.stickies = this.stickies : null;
  }
}
