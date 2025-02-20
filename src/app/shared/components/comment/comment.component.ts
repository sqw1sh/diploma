import { Component, Input, OnInit } from '@angular/core';
import { CommentType } from 'src/app/types/comment.type';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentType;

  constructor() {}

  ngOnInit(): void {}
}
