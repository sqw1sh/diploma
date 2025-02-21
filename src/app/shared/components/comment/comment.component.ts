import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CommentType } from 'src/app/types/comment.type';
import { CommentService } from '../../services/comment.service';
import { ActionType } from 'src/app/types/action.type';
import { DefaultResponseType } from 'src/app/types/default-response.type';
import { ActionsType } from 'src/app/types/actions.type';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentType;
  public actionsType = ActionType;
  public action: ActionType | null = null;

  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.processActions();
  }

  public applyAction(action: ActionType): void {
    if (this.authService.isLogged) {
      this.commentService
        .applyActionForComment(action, this.comment.id)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            throw new Error(data.message);
          }

          if (this.action === null) {
            if (action === ActionType.like) {
              this.comment.likesCount++;
            } else if (action === ActionType.dislike) {
              this.comment.dislikesCount++;
            }
          }

          if (this.action && action !== ActionType.violate) {
            if (action === ActionType.like) {
              if (this.action === action) {
                this.comment.likesCount--;
                this.action = null;
              } else {
                this.comment.dislikesCount--;
                this.comment.likesCount++;
              }
            } else if (action === ActionType.dislike) {
              if (this.action === action) {
                this.comment.dislikesCount--;
                this.action = null;
              } else {
                this.comment.likesCount--;
                this.comment.dislikesCount++;
              }
            }
          }

          this.processActions();
        });
    }
  }

  public processActions(): void {
    if (this.authService.isLogged) {
      this.commentService
        .getActionsForComment(this.comment.id)
        .subscribe((data: ActionsType[]) => {
          if (data[0]) {
            if (data[0].action == 'like') {
              this.action = ActionType.like;
            } else if (data[0].action === 'dislike') {
              this.action = ActionType.dislike;
            } else if (data[0].action === 'violate') {
              this.action = ActionType.violate;
            }
          }
        });
    }
  }
}
