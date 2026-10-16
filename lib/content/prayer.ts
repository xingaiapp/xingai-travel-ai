import type { Locale } from "@/lib/i18n/types"

type L = Record<Locale, string>

const t = (en: string, zh: string, ko: string, es: string): L => ({ en, zh, ko, es })

/**
 * Faith Through Travel prayer page (/prayer).
 *
 * Playlist ids, first videos and counts were verified against the live
 * @xingaitravel channel playlists on 2026-10-16:
 * - My Lord, Holy: PLWOzZDBAqYuY, 20 videos, first LjFRkfgBtxM
 * - With You Tonight: PLNX4iFXo0DJY, 4 videos, first yCI0Wv3n7gQ
 * Counts are display copy only — the embeds always play the live playlist.
 */
export interface PrayerPlaylist {
  id: string
  url: string
  firstVideoId: string
  firstVideoTitle: string
  heading: string
  body: L
  countLabel: L
}

export const prayerCopy = {
  eyebrow: t("Faith Through Travel", "信仰之旅", "믿음의 여행", "Fe a través del viaje"),
  title: t(
    "Where Your Soul Comes Home",
    "讓心靈回家的禱告",
    "영혼이 집으로 돌아오는 곳",
    "Donde tu alma vuelve a casa"
  ),
  lead: t(
    "Every place in these films is somewhere Xing has really stood. If your heart needs a place to land, travel there through these views — rest your eyes on the beauty, and let your heart be cleansed.",
    "這裡的每一個地方，都是星哥親自去過的真實地點。如果你的心靈需要一個落腳的地方，就藉著這些美景旅行到那裡——眼睛歇在美景裡，心也得著潔淨。",
    "이 영상 속 모든 장소는 Xing이 직접 서 있었던 실제 장소입니다. 마음 둘 곳이 필요하다면 이 풍경을 따라 그곳으로 여행해 보세요. 아름다움 속에서 눈을 쉬게 하고, 마음이 맑아지기를 바랍니다.",
    "Cada lugar de estas películas es un sitio donde Xing estuvo de verdad. Si tu corazón necesita un lugar donde posarse, viaja hasta allí a través de estas vistas: descansa la mirada en la belleza y deja que tu corazón se limpie."
  ),
  openPlaylist: t(
    "Open the full playlist on YouTube",
    "在 YouTube 打開完整播放清單",
    "YouTube에서 전체 재생목록 열기",
    "Abrir la lista completa en YouTube"
  ),
  subscribeHeading: t(
    "New prayers every week",
    "每週都有新的禱告片",
    "매주 새로운 기도 영상이 올라옵니다",
    "Nuevas oraciones cada semana"
  ),
  subscribeBody: t(
    "Morning prayers, daytime journeys and a gentle prayer to end the day — subscribe to XingAI Travel on YouTube and travel with us.",
    "早晨的禱告、白天的旅程、睡前的陪伴——在 YouTube 訂閱 XingAI Travel，跟我們一起走。",
    "아침의 기도, 낮의 여행, 하루를 마치는 부드러운 기도까지 — YouTube에서 XingAI Travel을 구독하고 함께 여행하세요.",
    "Oraciones de la mañana, viajes de día y una oración suave para cerrar el día: suscríbete a XingAI Travel en YouTube y viaja con nosotros."
  ),
  subscribeCta: t("Subscribe on YouTube", "在 YouTube 訂閱", "YouTube에서 구독", "Suscribirse en YouTube"),
}

export const prayerPlaylists: PrayerPlaylist[] = [
  {
    id: "PLWOzZDBAqYuY",
    url: "https://www.youtube.com/playlist?list=PLWOzZDBAqYuY",
    firstVideoId: "LjFRkfgBtxM",
    firstVideoTitle: "The Power of God at Niagara Falls 🌊🙏",
    heading: "My Lord, Holy 🙏 Places That Made Me Pray",
    body: t(
      "Waterfalls, harbours, sunrises — places so beautiful that standing there, all Xing could say was: My Lord, holy. Filmed on the spot, with the worship songs his church family sings together.",
      "瀑布、海港、日出——有些地方美到站在那裡，心裡只剩一句：主啊，祢是聖潔的。全部實地實拍，配上教會家人一起唱的敬拜歌。",
      "폭포, 항구, 일출 — 그 자리에 서면 '주님, 거룩하시니이다'라는 말밖에 나오지 않는 곳들. 현장에서 직접 촬영하고, 교회 가족이 함께 부르는 찬양을 담았습니다.",
      "Cascadas, puertos, amaneceres: lugares tan hermosos que, al estar allí, Xing solo pudo decir: Señor mío, santo eres. Filmado en el lugar, con los cantos de adoración que canta su familia de iglesia."
    ),
    countLabel: t("20 short films", "20 支短片", "짧은 영상 20편", "20 cortos"),
  },
  {
    id: "PLNX4iFXo0DJY",
    url: "https://www.youtube.com/playlist?list=PLNX4iFXo0DJY",
    firstVideoId: "yCI0Wv3n7gQ",
    firstVideoTitle: "A Prayer For You Who Can't Sleep 🌙🙏",
    heading: "With You Tonight 🌙 Prayers For Sleepless Nights",
    body: t(
      "For the nights when sleep will not come: gentle prayers over night seas, harbour lights and quiet stars. He never sleeps — so you can rest.",
      "寫給睡不著的夜：夜海、燈火、靜星之下的輕聲禱告。祂從不打盹——所以你可以安心休息。",
      "잠이 오지 않는 밤을 위해 준비했습니다. 밤바다와 항구의 불빛, 고요한 별빛 아래에서 드리는 부드러운 기도. 그분은 주무시지 않으니, 당신은 편히 쉴 수 있습니다.",
      "Para las noches en que el sueño no llega: oraciones suaves sobre mares nocturnos, luces del puerto y estrellas tranquilas. Él nunca duerme, así que tú puedes descansar."
    ),
    countLabel: t("4 short films", "4 支短片", "짧은 영상 4편", "4 cortos"),
  },
]
