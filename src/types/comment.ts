export interface Comment {
  id: string;
  nickname: string;
  comment: string;
  createdAt: Date;
  isLeft?: boolean; // 吹き出しの左右配置フラグ
  likes?: number; // いいね数（表示用）
}
