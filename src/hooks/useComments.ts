import { useState, useEffect } from 'react';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Comment } from '@/types/comment';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
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
    });

    return () => unsubscribe();
  }, []);

  return { comments, loading };
};
