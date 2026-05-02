const BASE = 'https://graph.instagram.com/v21.0';

export interface Post {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

export async function getPosts(limit = 18): Promise<Post[]> {
  const token = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID;
  if (!token || !userId) return [];

  try {
    const res = await fetch(
      `${BASE}/${userId}/media?fields=id,caption,media_url,media_type,permalink,timestamp&access_token=${token}&limit=${limit}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];

    const { data = [] } = await res.json();
    const posts: Post[] = [];

    for (const item of data) {
      let mediaUrl: string = item.media_url ?? '';

      // 캐러셀은 첫 번째 자식 이미지 사용
      if (item.media_type === 'CAROUSEL_ALBUM') {
        const childRes = await fetch(
          `${BASE}/${item.id}/children?fields=id,media_url,media_type&access_token=${token}`,
          { next: { revalidate: 3600 } },
        );
        if (childRes.ok) {
          const { data: children = [] } = await childRes.json();
          const firstImg = children.find((c: { media_type: string }) => c.media_type === 'IMAGE');
          if (firstImg?.media_url) mediaUrl = firstImg.media_url;
        }
      }

      if (!mediaUrl) continue;

      posts.push({
        id: item.id,
        caption: item.caption ?? '',
        mediaUrl,
        permalink: item.permalink,
        timestamp: item.timestamp,
        mediaType: item.media_type,
      });
    }

    return posts;
  } catch {
    return [];
  }
}

export function getTitle(caption: string): string {
  const line = caption.split('\n')[0] ?? '';
  return line.length > 44 ? line.slice(0, 44) + '…' : line;
}

export function formatDate(ts: string): string {
  return new Date(ts).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
