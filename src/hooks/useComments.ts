import { useState, useEffect } from 'react';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Comment } from '@/types/comment';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // コメントを取得する関数
  const fetchComments = async () => {
    try {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
      const snapshot = await getDocs(q);
      
      const commentsData: Comment[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        commentsData.push({
          id: doc.id,
          nickname: data.nickname,
          comment: data.comment,
          createdAt: data.createdAt?.toDate() || new Date(),
          isLeft: Math.random() < 0.5, // ランダムな左右配置
          likes: data.likes || 0, // いいね数
          likedBy: data.likedBy || [], // いいねしたユーザー配列
        });
      });
      setComments(commentsData);
      setLoading(false);
    } catch (error) {
      console.error('コメントの取得に失敗:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // 初回読み込み
    fetchComments();

    // 2分間隔で更新
    const interval = setInterval(fetchComments, 120000);

    // クリーンアップ
    return () => clearInterval(interval);
  }, []);

  return { comments, loading };
};
