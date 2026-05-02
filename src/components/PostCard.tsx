'use client';

import Image from 'next/image';
import { Post, getTitle, formatDate } from '@/lib/instagram';

export interface PostMeta {
  folder: string;
  topic: string;
  source_title: string;
  source_url: string;
  angle: string;
  fact_confirmed: number;
  fact_disputed: number;
  fact_unverifiable: number;
  generation_seconds: number;
  permalink: string;
  posted_at: string;
}

export default function PostCard({ post, meta }: { post: Post; meta?: PostMeta }) {
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {/* 이미지 영역 */}
      <div className="relative overflow-hidden bg-[#101010]" style={{ aspectRatio: '4/5' }}>
        <Image
          src={post.mediaUrl}
          alt={getTitle(post.caption)}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />

        {/* 호버 오버레이 */}
        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
          {meta ? (
            <>
              {meta.source_title && (
                <div>
                  <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-0.5">Source</p>
                  <p className="text-[11px] font-mono text-zinc-400 leading-tight line-clamp-2">
                    {meta.source_title}
                  </p>
                </div>
              )}
              {meta.angle && (
                <div>
                  <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mb-0.5">Angle</p>
                  <p className="text-[11px] font-mono text-zinc-400 leading-tight line-clamp-1">
                    {meta.angle}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-3 pt-1 border-t border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-600">
                  팩트체크 ✓{meta.fact_confirmed}
                  {meta.fact_disputed > 0 && <span className="text-red-600"> ✗{meta.fact_disputed}</span>}
                </span>
                <span className="text-[10px] font-mono text-zinc-700">
                  {meta.generation_seconds}s
                </span>
                <span className="ml-auto text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                  보기 ↗
                </span>
              </div>
            </>
          ) : (
            <span className="text-[11px] font-mono text-zinc-300 tracking-widest uppercase">
              Instagram에서 보기 ↗
            </span>
          )}
        </div>
      </div>

      {/* 메타 */}
      <div className="pt-3 pb-7">
        <p className="text-[11px] font-mono text-zinc-600 mb-1.5">
          {formatDate(post.timestamp)}
        </p>
        <p className="text-sm text-zinc-300 leading-snug group-hover:text-zinc-100 transition-colors duration-200">
          {getTitle(post.caption)}
        </p>
      </div>
    </a>
  );
}
