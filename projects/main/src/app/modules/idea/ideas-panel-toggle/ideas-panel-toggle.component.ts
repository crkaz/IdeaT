import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'ideat-ideas-panel-toggle',
  templateUrl: './ideas-panel-toggle.component.html',
  styleUrls: ['./ideas-panel-toggle.component.css'],
})
export class IdeasPanelToggleComponent implements OnInit {
  @Input() matDrawerContainer: MatDrawer;

  constructor() {}

  ngOnInit(): void {}

  toggleSideNav(): void {
    this.matDrawerContainer.toggle();
  }
}
