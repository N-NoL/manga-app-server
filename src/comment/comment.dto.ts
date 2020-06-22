
export class CreateCommentDto {
  mangaId: number;
  comment: string;
  userId: number;
}

export class UpdateCommentDto {
  commentId: number;
  comment: string;
}