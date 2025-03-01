import { Embed, Sourcerer } from '@/providers/base';
import { doodScraper } from '@/providers/embeds/dood';
import { droploadScraper } from '@/providers/embeds/dropload';
import { febboxHlsScraper } from '@/providers/embeds/febbox/hls';
import { febboxMp4Scraper } from '@/providers/embeds/febbox/mp4';
import { filelionsScraper } from '@/providers/embeds/filelions';
import { mixdropScraper } from '@/providers/embeds/mixdrop';
import { mp4uploadScraper } from '@/providers/embeds/mp4upload';
import { streambucketScraper } from '@/providers/embeds/streambucket';
import { streamsbScraper } from '@/providers/embeds/streamsb';
import { streamwishScraper } from '@/providers/embeds/streamwish';
import { turbovidScraper } from '@/providers/embeds/turbovid';
import { upcloudScraper } from '@/providers/embeds/upcloud';
import { upstreamScraper } from '@/providers/embeds/upstream';
import { vidsrcembedScraper } from '@/providers/embeds/vidsrc';
import { vTubeScraper } from '@/providers/embeds/vtube';
import { astraScraper, novaScraper, orionScraper } from '@/providers/embeds/whvx';
import { autoembedScraper } from '@/providers/sources/autoembed';
import { bombtheirishScraper } from '@/providers/sources/bombtheirish';
import { catflixScraper } from '@/providers/sources/catflix';
import { ee3Scraper } from '@/providers/sources/ee3';
import { flixhqScraper } from '@/providers/sources/flixhq/index';
import { fsharetvScraper } from '@/providers/sources/fsharetv';
import { goMoviesScraper } from '@/providers/sources/gomovies/index';
import { insertunitScraper } from '@/providers/sources/insertunit';
import { kissAsianScraper } from '@/providers/sources/kissasian/index';
import { lookmovieScraper } from '@/providers/sources/lookmovie';
import { mp4hydraScraper } from '@/providers/sources/mp4hydra';
import { nsbxScraper } from '@/providers/sources/nsbx';
import { redStarScraper } from '@/providers/sources/redstar';
import { remotestreamScraper } from '@/providers/sources/remotestream';
import { showboxScraper } from '@/providers/sources/showbox/index';
import { TASFScraper } from '@/providers/sources/theyallsayflix';
import { tugaflixScraper } from '@/providers/sources/tugaflix';
import { vidsrcScraper } from '@/providers/sources/vidsrc/index';
import { vidsrcsuScraper } from '@/providers/sources/vidsrcsu';
import { whvxScraper } from '@/providers/sources/whvx';
import { zoechipScraper } from '@/providers/sources/zoechip';

import {
  autoembedBengaliScraper,
  autoembedEnglishScraper,
  autoembedHindiScraper,
  autoembedTamilScraper,
  autoembedTeluguScraper,
} from './embeds/autoembed';
import { bflixScraper } from './embeds/bflix';
import { closeLoadScraper } from './embeds/closeload';
import { fileMoonScraper } from './embeds/filemoon';
import { fileMoonMp4Scraper } from './embeds/filemoon/mp4';
import { hydraxScraper } from './embeds/hydrax';
import { mp4hydraServer1Scraper, mp4hydraServer2Scraper } from './embeds/mp4hydra';
import { alphaScraper, deltaScraper } from './embeds/nsbx';
import { playm4uNMScraper } from './embeds/playm4u/nm';
import { ridooScraper } from './embeds/ridoo';
import { smashyStreamOScraper } from './embeds/smashystream/opstream';
import { smashyStreamFScraper } from './embeds/smashystream/video1';
import { streamtapeScraper } from './embeds/streamtape';
import { streamvidScraper } from './embeds/streamvid';
import { vidCloudScraper } from './embeds/vidcloud';
import { vidplayScraper } from './embeds/vidplay';
import {
  VidsrcsuServer10Scraper,
  VidsrcsuServer11Scraper,
  VidsrcsuServer12Scraper,
  VidsrcsuServer1Scraper,
  VidsrcsuServer20Scraper,
  VidsrcsuServer2Scraper,
  VidsrcsuServer3Scraper,
  VidsrcsuServer4Scraper,
  VidsrcsuServer5Scraper,
  VidsrcsuServer6Scraper,
  VidsrcsuServer7Scraper,
  VidsrcsuServer8Scraper,
  VidsrcsuServer9Scraper,
} from './embeds/vidsrcsu';
import { viperScraper } from './embeds/viper';
import { voeScraper } from './embeds/voe';
import { warezcdnembedHlsScraper } from './embeds/warezcdn/hls';
import { warezcdnembedMp4Scraper } from './embeds/warezcdn/mp4';
import { warezPlayerScraper } from './embeds/warezcdn/warezplayer';
import { webtor1080Scraper, webtor480Scraper, webtor4kScraper, webtor720Scraper } from './embeds/webtor';
import { wootlyScraper } from './embeds/wootly';
import { embedsuScraper } from './sources/embedsu';
import { FedAPIScraper } from './sources/fedapi';
import { FedAPIDBScraper } from './sources/fedapidb';
import { goojaraScraper } from './sources/goojara';
import { hdRezkaScraper } from './sources/hdrezka';
import { iosmirrorScraper } from './sources/iosmirror';
import { iosmirrorPVScraper } from './sources/iosmirrorpv';
import { m4uScraper } from './sources/m4ufree';
import { nepuScraper } from './sources/nepu';
import { nitesScraper } from './sources/nites';
import { primewireScraper } from './sources/primewire';
import { ridooMoviesScraper } from './sources/ridomovies';
import { slidemoviesScraper } from './sources/slidemovies';
import { smashyStreamScraper } from './sources/smashystream';
import { soaperTvScraper } from './sources/soapertv';
import { uiraliveScraper } from './sources/uiralive';
import { vidlinkScraper } from './sources/vidlink';
import { vidSrcToScraper } from './sources/vidsrcto';
import { warezcdnScraper } from './sources/warezcdn';
import { webtorScraper } from './sources/webtor';

export function gatherAllSources(): Array<Sourcerer> {
  // all sources are gathered here
  return [
    catflixScraper,
    flixhqScraper,
    remotestreamScraper,
    kissAsianScraper,
    showboxScraper,
    goMoviesScraper,
    zoechipScraper,
    vidsrcScraper,
    lookmovieScraper,
    nsbxScraper,
    smashyStreamScraper,
    ridooMoviesScraper,
    vidSrcToScraper,
    nepuScraper,
    goojaraScraper,
    hdRezkaScraper,
    m4uScraper,
    primewireScraper,
    warezcdnScraper,
    insertunitScraper,
    nitesScraper,
    soaperTvScraper,
    autoembedScraper,
    tugaflixScraper,
    ee3Scraper,
    whvxScraper,
    fsharetvScraper,
    redStarScraper,
    bombtheirishScraper,
    vidsrcsuScraper,
    TASFScraper,
    mp4hydraScraper,
    webtorScraper,
    embedsuScraper,
    vidlinkScraper,
    FedAPIScraper,
    FedAPIDBScraper,
    slidemoviesScraper,
    iosmirrorScraper,
    iosmirrorPVScraper,
    uiraliveScraper,
  ];
}

export function gatherAllEmbeds(): Array<Embed> {
  // all embeds are gathered here
  return [
    upcloudScraper,
    vidCloudScraper,
    mp4uploadScraper,
    streamsbScraper,
    upstreamScraper,
    febboxMp4Scraper,
    febboxHlsScraper,
    mixdropScraper,
    vidsrcembedScraper,
    streambucketScraper,
    smashyStreamFScraper,
    smashyStreamOScraper,
    ridooScraper,
    closeLoadScraper,
    fileMoonScraper,
    fileMoonMp4Scraper,
    deltaScraper,
    alphaScraper,
    vidplayScraper,
    wootlyScraper,
    doodScraper,
    streamvidScraper,
    voeScraper,
    streamtapeScraper,
    droploadScraper,
    filelionsScraper,
    vTubeScraper,
    warezcdnembedHlsScraper,
    warezcdnembedMp4Scraper,
    warezPlayerScraper,
    bflixScraper,
    playm4uNMScraper,
    hydraxScraper,
    autoembedEnglishScraper,
    autoembedHindiScraper,
    autoembedBengaliScraper,
    autoembedTamilScraper,
    autoembedTeluguScraper,
    turbovidScraper,
    novaScraper,
    astraScraper,
    orionScraper,
    streamwishScraper,
    mp4hydraServer1Scraper,
    mp4hydraServer2Scraper,
    VidsrcsuServer1Scraper,
    VidsrcsuServer2Scraper,
    VidsrcsuServer3Scraper,
    VidsrcsuServer4Scraper,
    VidsrcsuServer5Scraper,
    VidsrcsuServer6Scraper,
    VidsrcsuServer7Scraper,
    VidsrcsuServer8Scraper,
    VidsrcsuServer9Scraper,
    VidsrcsuServer10Scraper,
    VidsrcsuServer11Scraper,
    VidsrcsuServer12Scraper,
    VidsrcsuServer20Scraper,
    webtor4kScraper,
    webtor1080Scraper,
    webtor720Scraper,
    webtor480Scraper,
    viperScraper,
  ];
}
