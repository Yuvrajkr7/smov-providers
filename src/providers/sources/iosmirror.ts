import { flags } from '@/entrypoint/utils/targets';
import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { compareTitle } from '@/utils/compare';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { makeCookieHeader } from '@/utils/cookie';
import { NotFoundError } from '@/utils/errors';

const baseUrl = 'https://iosmirror.cc';
const baseUrl2 = 'https://prox-beige.vercel.app/iosmirror.cc:443';

// Function to fetch the cookie from the URL
const fetchNetflixCookie = async (): Promise<string> => {
  try {
    const response = await fetch('https://anshu78780.github.io/json/cookie.json');
    if (!response.ok) {
      throw new Error('Failed to fetch cookie');
    }
    const data = await response.json();
    return response.data.netflixCookie.cookie; // Changed line
  } catch (error) {
    throw new Error(`Error fetching Netflix cookie: ${error.message}`);
  }
};

const universalScraper = async (ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> => {
  // Fetch the Netflix cookie dynamically
  const netflixCookie = await fetchNetflixCookie();
  const cookieHeader = makeCookieHeader({ cookie: netflixCookie });

  ctx.progress(10);

  const searchRes = await ctx.proxiedFetcher('/search.php', {
    baseUrl: baseUrl2,
    query: { s: ctx.media.title },
    headers: { cookie: cookieHeader },
  });

  if (searchRes.status !== 'y' || !searchRes.searchResult) throw new NotFoundError(searchRes.error);

  async function getMeta(id: string) {
    return ctx.proxiedFetcher('/post.php', {
      baseUrl: baseUrl2,
      query: { id },
      headers: { cookie: cookieHeader },
    });
  }

  ctx.progress(30);

  let metaRes;
  let id: string | undefined;

  for (const x of searchRes.searchResult as { id: string; t: string }[]) {
    metaRes = await getMeta(x.id);
    if (
      compareTitle(x.t, ctx.media.title) &&
      (Number(metaRes.year) === ctx.media.releaseYear || metaRes.type === (ctx.media.type === 'movie' ? 'm' : 't'))
    ) {
      id = x.id;
      break;
    }
  }

  if (!id) throw new NotFoundError('No watchable item found');

  if (ctx.media.type === 'show') {
    metaRes = await getMeta(id);
    const showMedia = ctx.media;
    const seasonId = metaRes?.season.find((x: { s: string; id: string }) => Number(x.s) === showMedia.season.number)?.id;
    if (!seasonId) throw new NotFoundError('Season not available');

    const episodeRes = await ctx.proxiedFetcher('/episodes.php', {
      baseUrl: baseUrl2,
      query: { s: seasonId, series: id },
      headers: { cookie: cookieHeader },
    });

    let episodes = [...episodeRes.episodes];
    let currentPage = 2;

    while (episodeRes.nextPageShow === 1) {
      const nextPageRes = await ctx.proxiedFetcher('/episodes.php', {
        baseUrl: baseUrl2,
        query: { s: seasonId, series: id, page: currentPage.toString() },
        headers: { cookie: cookieHeader },
      });
      episodes = [...episodes, ...nextPageRes.episodes];
      episodeRes.nextPageShow = nextPageRes.nextPageShow;
      currentPage++;
    }

    const episodeId = episodes.find(
      (x: { ep: string; s: string; id: string }) => x.ep === `E${showMedia.episode.number}` && x.s === `S${showMedia.season.number}`,
    )?.id;

    if (!episodeId) throw new NotFoundError('Episode not available');
    id = episodeId;
  }

  // Ensure id is defined before using it
  if (!id) throw new NotFoundError('No valid ID found for the item.');
  const playlistRes = await ctx.proxiedFetcher('/playlist.php?', {
    baseUrl: baseUrl2,
    query: { id },
    headers: { cookie: cookieHeader },
  });

  ctx.progress(50);

  let autoFile = playlistRes[0].sources.find((source: { file: string; label: string }) => source.label === 'Auto')?.file;
  if (!autoFile) autoFile = playlistRes[0].sources.find((source: { file: string; label: string }) => source.label === 'Full HD')?.file;
  if (!autoFile) autoFile = playlistRes[0].sources[0]?.file;
  if (!autoFile) throw new Error('Failed to fetch playlist');

  const playlist = `https://prox-beige.vercel.app/m3u8-proxy?url=${encodeURIComponent(`${baseUrl}${autoFile}`)}&headers=${encodeURIComponent(JSON.stringify({ referer: baseUrl, cookie: cookieHeader }))}`;
  ctx.progress(90);

  return {
    embeds: [],
    stream: [{
      id: 'primary',
      playlist,
      type: 'hls',
      flags: [flags.CORS_ALLOWED],
      captions: [],
    }],
  };
};

export const iosmirrorScraper = makeSourcerer({
  id: 'iosmirror',
  name: 'NetMirror',
  rank: 182,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: universalScraper,
  scrapeShow: universalScraper,
});
