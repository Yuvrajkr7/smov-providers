/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

import { Caption } from '../captions';

// Thanks Nemo for this API, and Custom for hosting!
const BASE_URL = 'https://fed-api.pstream.org/cache';

// this is so fucking useless
const languageMap: Record<string, string> = {
  English: 'en',
  Spanish: 'es',
  French: 'fr',
  German: 'de',
  Italian: 'it',
  Portuguese: 'pt',
  Arabic: 'ar',
  Russian: 'ru',
  Japanese: 'ja',
  Korean: 'ko',
  Chinese: 'zh',
  Hindi: 'hi',
  Turkish: 'tr',
  Dutch: 'nl',
  Polish: 'pl',
  Swedish: 'sv',
  Indonesian: 'id',
  Thai: 'th',
  Vietnamese: 'vi',
};

interface StreamData {
  streams: Record<string, string>;
  subtitles: Record<string, Array<{ name: string; url: string }>>;
  error?: string;
}

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const apiUrl =
    ctx.media.type === 'movie'
      ? `${BASE_URL}/${ctx.media.imdbId}`
      : `${BASE_URL}/${ctx.media.imdbId}/${ctx.media.season.number}/${ctx.media.episode.number}`;

  const data = await ctx.fetcher<StreamData>(apiUrl);

  if (data?.error) {
    throw new NotFoundError('No stream found');
  }
  if (!data) throw new NotFoundError('No response from API');
  ctx.progress(50);

  const streams = Object.entries(data.streams).reduce((acc: Record<string, string>, [quality, url]) => {
    let qualityKey: number;
    if (quality === '4K') {
      qualityKey = 2160;
    } else if (quality === 'ORG') {
      return acc;
    } else {
      qualityKey = parseInt(quality.replace('P', ''), 10);
    }
    if (Number.isNaN(qualityKey) || acc[qualityKey]) return acc;
    acc[qualityKey] = url;
    return acc;
  }, {});

  const captions: Caption[] = [];
  for (const [langKey, subs] of Object.entries(data.subtitles)) {
    // Extract language name from key ("english_subtitles" -> "English")
    const languageKeyPart = langKey.split('_')[0];
    const languageName = languageKeyPart.charAt(0).toUpperCase() + languageKeyPart.slice(1);
    const languageCode = languageMap[languageName]?.toLowerCase() ?? 'unknown';

    for (const sub of subs) {
      const url = sub.url;
      const isVtt = url.toLowerCase().endsWith('.vtt');
      captions.push({
        type: isVtt ? 'vtt' : 'srt',
        id: url,
        url,
        language: languageCode,
        hasCorsRestrictions: false,
      });
    }
  }

  ctx.progress(90);

  return {
    embeds: [],
    stream: [
      {
        id: 'primary',
        captions,
        qualities: {
          ...(streams[2160] && {
            '4k': {
              type: 'mp4',
              url: streams[2160],
            },
          }),
          ...(streams[1080] && {
            1080: {
              type: 'mp4',
              url: streams[1080],
            },
          }),
          ...(streams[720] && {
            720: {
              type: 'mp4',
              url: streams[720],
            },
          }),
          ...(streams[480] && {
            480: {
              type: 'mp4',
              url: streams[480],
            },
          }),
          ...(streams[360] && {
            360: {
              type: 'mp4',
              url: streams[360],
            },
          }),
        },
        type: 'file',
        flags: [flags.CORS_ALLOWED],
      },
    ],
  };
}

export const FedAPIDBScraper = makeSourcerer({
  id: 'fedapidb',
  name: 'FED DB (Beta)',
  rank: 259,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
