import download from 'download'
import * as fs from 'fs'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import process from 'process';
import { links } from './links.js'


ffmpeg.setFfmpegPath(ffmpegPath.path);


async function* fetchLinks(links) {
  for(let i = 0; i < links.length; i++) {
    console.log(`LOG: Начало скачаивания: ${links[i].name}`);
    yield links[i]
  }
}

async function merge(video, audio, path, name) {
  await createDir(path);

  ffmpeg()
    .addInput(video)
    .addInput(audio)
    .addOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
    .format('mp4')
    .on('error', error => console.log(error))
    .on('end', () => console.log(`LOG: Склейка видео + аудио успешно завершена: ${name}`))
    .save(`${path}/${name}.mp4`)
}

async function createDir(path) {
  if (fs.existsSync(path)) return

  const pathList = path.split('/')

  pathList.reduce((accum, path) => {
    if (fs.existsSync(path)) return path

    const accumPath = !!accum ? `${accum}/${path}` : path

    fs.mkdir(accumPath, err => {
      if(err) throw err;
    })

    return accumPath
  }, '')
}

(async () => {
  for await (let link of fetchLinks(links)) {
    await Promise.all([
      link.video,
      link.audio,
    ].map(url => download(url, `dist/${link.name}`)))
      .then(() => {
        const [video, audio] = fs.readdirSync(`dist/${link.name}`)

        if (process.env.MERGE === 'merge') {
          merge(
            `dist/${link.name}/${video}`,
            `dist/${link.name}/${audio}`,
            `courses/${link.folder}`,
            `${link.name}`
          )
        }
      })
      .then(() => {
        console.log(`LOG: Скачивание завершено: ${link.name}`);
      })
  }
})();