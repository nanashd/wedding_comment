'use client';

import Wall from '@/components/Wall';
import CommentForm from '@/components/CommentForm';

export default function PostPage() {
  return (
    <Wall>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-[var(--ink)] mb-4">
          お祝いのメッセージを投稿
        </h2>
        <p className="text-lg text-[var(--muted)] font-sans">
          新郎新婦への温かいお言葉をお聞かせください
        </p>
      </div>
      <CommentForm />
    </Wall>
  );
}
