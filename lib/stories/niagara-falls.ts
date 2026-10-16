import type { StoryEpisode, StorySeason, StoryText } from "@/lib/stories/types"

// My Niagara Falls — the destination season for the falls: the place itself,
// told through the four Niagara shorts already published on @xingaitravel.
// The prayer from this same shore lives in My Lord, Holy (EP01) — this season
// stays on the place: where we stood, what it looked like, what it costs you.
//
// Source / gate notes (see docs/stories/README.md):
// - Every embedded film is confirmed Public (oEmbed re-checked 2026-10-16):
//   -FzIBdK7eEI, toHq-jrLP1g, LjFRkfgBtxM, c-S1kFGD0c0.
// - NEVER embed i0L4xjulORs ("Niagara Falls Up Close", denoised) — published
//   2026-10-10, deleted 2026-10-11 on Xing's order. Gone, and it stays gone.
// - NEVER use the held "D" clip (Thankful, boat deck) — it failed the face
//   gate (clear stranger's face) and was never made or published.
// - The unpublished 60s silent A/B/C cuts are also off-limits here.
// - Covers are stills from Xing's own published Niagara footage, run through
//   scripts/process-story-photos.mjs (EXIF stripped) — same as My Lord, Holy.
//   There are no standalone Niagara photos in the library yet, so episodes
//   carry no photo blocks: text + the films themselves, nothing dressed up.

function tx(en: string, zh: string, ko: string, es: string): StoryText {
  return { en, zh, ko, es }
}

function shot(
  episode: string,
  name: string,
  width: number,
  height: number,
  alt: StoryText,
  caption?: StoryText,
): StoryEpisode["cover"] {
  return {
    src: `/stories/niagara-falls/${episode}/${name}`,
    width,
    height,
    alt,
    ...(caption ? { caption } : {}),
    shot: name,
  }
}

const ep01Cover = shot(
  "01",
  "horseshoe-mist-up-close",
  720,
  1280,
  tx(
    "Horseshoe Falls crest pouring into sunlit mist above churning water, seen from the boat",
    "從船上看馬蹄瀑布：瀑頂瀉入陽光照亮的水霧，下方是翻湧的水面",
    "배에서 본 말굽폭포 — 햇빛 받은 물안개 속으로 떨어지는 폭포 상단과 소용돌이치는 수면",
    "La cresta de la Herradura cayendo en niebla iluminada por el sol sobre aguas revueltas, vista desde el barco",
  ),
  tx(
    "The Horseshoe in sunlit mist — the series opener.",
    "陽光裡的馬蹄瀑布水霧——系列開場。",
    "햇빛 속 말굽폭포 물안개 — 시리즈 오프닝.",
    "La Herradura en niebla iluminada — la apertura de la serie.",
  ),
)

const ep01: StoryEpisode = {
  number: 1,
  slug: "01-sailing-into-the-mist",
  status: "published",
  publishedAt: "2026-10-16",
  title: tx(
    "Sailing Into the Mist",
    "駛進水霧裡",
    "물안개 속으로 항해",
    "Navegando hacia la niebla",
  ),
  dek: tx(
    "The boat turns into the Horseshoe basin and the shore disappears. This is the Niagara short our viewers pushed past a thousand — the falls at arm's length, original roar left in.",
    "船轉進馬蹄瀑布的盆地，岸邊就消失了。這是我們頻道觀眾推過千次播放的尼亞加拉短片——瀑布近在咫尺，原始的轟鳴聲原樣保留。",
    "배가 말굽폭포 분지로 들어서면 해안은 사라진다. 우리 채널 시청자가 천 회를 넘긴 나이아가라 짧은 영상 — 팔 닿을 거리의 폭포, 원래의 굉음을 그대로 남겼다.",
    "El barco entra en la cuenca de la Herradura y la orilla desaparece. Este es el corto del Niágara que nuestros espectadores empujaron más allá de las mil vistas — las cataratas al alcance de la mano, con el rugido original.",
  ),
  cover: ep01Cover,
  blocks: [
    {
      type: "text",
      body: tx(
        "Some waterfalls you look at. The Horseshoe you sail into. The boat leaves the dock, the American Falls slide past, and then the green wall of the Horseshoe fills the whole frame — crest above, white water below, and the mist coming up to meet you.",
        "有些瀑布是用來看的，馬蹄瀑布是用船駛進去的。船離開碼頭，美國瀑布從旁邊滑過，然後馬蹄瀑布的綠色水牆佔滿整個畫面——上面是瀑頂，下面是白浪，水霧迎面升起來。",
        "어떤 폭포는 바라보고, 말굽폭포는 배로 들어간다. 배가 부두를 떠나면 아메리칸 폭포가 옆을 지나고, 곧 말굽폭포의 녹색 물벽이 화면을 채운다 — 위는 폭포 상단, 아래는 흰 물결, 물안개가 맞이하러 올라온다.",
        "Algunas cataratas se miran. En la Herradura se navega. El barco deja el muelle, las americanas pasan al lado, y el muro verde de la Herradura llena el encuadre — cresta arriba, agua blanca abajo, y la niebla subiendo a recibirte.",
      ),
    },
    { type: "heading", body: tx("01 — The roar is the soundtrack", "01 · 轟鳴就是配樂", "01 · 굉음이 사운드트랙", "01 — El rugido es la banda sonora") },
    {
      type: "text",
      body: tx(
        "We kept this film raw on purpose: original sound, no added music, no narration. The place recorded its own soundtrack long before we showed up — all we did was not talk over it.",
        "這支片我們故意保留原樣：原始聲音，不加音樂，沒有旁白。這個地方早在我們來之前就錄好了自己的配樂——我們要做的只是不要蓋過它說話。",
        "이 영상은 일부러 날것으로 남겼다: 원래 소리, 음악 없음, 내레이션 없음. 이 장소는 우리가 오기 훨씬 전부터 자기 사운드트랙을 녹음해 왔다 — 우리는 그 위에서 떠들지 않았을 뿐이다.",
        "Dejamos esta película cruda a propósito: sonido original, sin música añadida, sin narración. El lugar grabó su propia banda sonora mucho antes de que llegáramos — solo hicimos falta no hablar encima.",
      ),
    },
    {
      type: "youtube",
      youtubeId: "-FzIBdK7eEI",
      title: tx(
        "Thank You, God, For This View — the original short",
        "《Thank You, God, For This View》——原片",
        "《Thank You, God, For This View》 — 원본 짧은 영상",
        "«Thank You, God, For This View» — el corto original",
      ),
    },
    { type: "heading", body: tx("02 — What the camera can't hold", "02 · 鏡頭裝不下的部分", "02 · 카메라가 담지 못하는 것", "02 — Lo que la cámara no guarda") },
    {
      type: "text",
      body: tx(
        "The glow in the mist is sunlight on white water — we checked frame by frame; there is no rainbow hiding in this clip. What the camera flattens is everything else: the push of air off the basin, the soaked deck under your shoes, and how loud your own laugh sounds out there.",
        "水霧裡的光是陽光照在白色水花上——我們逐幀核實過，這支片裡沒有藏著彩虹。鏡頭壓平的是其他一切：盆地推過來的風、鞋底下濕透的甲板，還有你在那裡笑出聲時有多響。",
        "물안개 속 빛은 흰 물보라에 닿은 햇빛이다 — 프레임마다 확인했다; 이 클립에 무지개는 숨어 있지 않다. 카메라가 평평하게 만드는 건 나머지 전부다: 분지에서 밀려오는 바람, 신발 아래 젖은 갑판, 거기서 웃는 자기 웃음소리가 얼마나 큰지.",
        "El brillo en la niebla es sol sobre agua blanca — lo revisamos cuadro a cuadro; no hay arcoíris escondido en este clip. Lo que la cámara aplana es todo lo demás: el empuje del aire de la cuenca, la cubierta empapada bajo los zapatos, y lo fuerte que suena tu propia risa ahí fuera.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After sailing into the mist — notes for a first Niagara boat ride.",
        "駛進水霧之後，給第一次坐尼亞加拉遊船的人。",
        "물안개 속으로 항해한 뒤 — 첫 나이아가라 유람선 탑승자에게.",
        "Después de navegar hacia la niebla — notas para un primer paseo en barco en el Niágara.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. The basin is the one view of Niagara that promenade photos cannot prepare you for.",
            "值得。瀑布盆地是尼亞加拉唯一一個岸邊照片沒法讓你做好心理準備的景色。",
            "갈 만하다. 분지는 산책로 사진으로는 대비할 수 없는 나이아가라의 유일한 풍경이다.",
            "Merece la pena. La cuenca es la única vista del Niágara para la que las fotos del paseo no te preparan.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "Anyone who wants the falls at full volume. If you only have time for one paid extra on a first trip, make it this one.",
            "想把瀑布開到最大音量的人。第一次來只夠時間加一個付費項目，就選這個。",
            "폭포를 최대 음량으로 원하는 사람. 첫 여행에 유료 옵션을 하나만 고른다면 이거다.",
            "Quien quiera las cataratas a todo volumen. Si solo hay tiempo para un extra pagado en el primer viaje, que sea este.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "The boat ticket is the one paid item in this episode (Oct 2026). The mist, the noise, and the soaking are included whether you want them or not.",
            "這一集唯一的付費項目是船票（2026-10）。水霧、轟鳴和全身濕透，不管你要不要，都包含在內。",
            "이 편의 유일한 유료 항목은 배 티켓이다(2026-10). 물안개, 굉음, 흠뻑 젖기는 원하든 아니든 포함이다.",
            "El billete del barco es el único gasto de este episodio (oct 2026). La niebla, el ruido y la empapada están incluidos quieras o no.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Go when the sun is up — light inside the mist is half the show, and it is gone on a grey day.",
            "挑太陽出來的時候去——水霧裡的光是這場秀的一半，陰天就沒有了。",
            "해가 있을 때 가라 — 물안개 속 빛이 이 쇼의 절반이고, 흐린 날엔 사라진다.",
            "Ve cuando haya sol — la luz dentro de la niebla es la mitad del espectáculo, y en un día gris desaparece.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "You will get wet. The poncho covers your clothes; your shoes and your camera lens are on their own.",
            "你一定會濕。雨衣罩得住衣服；鞋子和鏡頭只能自求多福。",
            "반드시 젖는다. 판초는 옷을 가려 주지만, 신발과 카메라 렌즈는 각자 알아서다.",
            "Te vas a mojar. El poncho cubre la ropa; los zapatos y el lente de la cámara van por su cuenta.",
          ),
        },
      ],
    },
  ],
}

const ep02: StoryEpisode = {
  number: 2,
  slug: "02-niagara-from-above",
  status: "published",
  publishedAt: "2026-10-16",
  title: tx(
    "Niagara From Above",
    "從高處看尼亞加拉",
    "위에서 본 나이아가라",
    "El Niágara desde arriba",
  ),
  dek: tx(
    "From a tower on the Canadian side, the whole gorge fits in one frame — the American Falls in front, the river bending away, and the boats down below looking like toys.",
    "從加拿大一側的高塔上，整個峽谷裝進一個畫面——美國瀑布在前，河水彎向遠方，下面的船小得像玩具。",
    "캐나다 쪽 타워에서 협곡 전체가 한 프레임에 들어온다 — 앞에는 아메리칸 폭포, 강은 멀리 굽어지고, 아래 배들은 장난감 같다.",
    "Desde una torre del lado canadiense, todo el desfiladero cabe en un encuadre — las cataratas americanas delante, el río curvándose lejos, y los barcos de abajo como juguetes.",
  ),
  cover: shot(
    "02",
    "american-falls-from-above",
    1080,
    1920,
    tx(
      "American Falls panorama from a tower on the Canadian side, a tour boat below and the parkway in the foreground",
      "從加拿大一側高塔俯瞰美國瀑布全景，下方是遊船，前景是公園大道",
      "캐나다 쪽 타워에서 내려다본 아메리칸 폭포 전경, 아래 유람선과 앞쪽 공원 도로",
      "Panorama de las cataratas americanas desde una torre del lado canadiense, barco turístico abajo y la avenida del parque en primer plano",
    ),
    tx(
      "The American Falls from the tower — parkway below, river beyond.",
      "從高塔看美國瀑布——下面是公園大道，遠處是河。",
      "타워에서 본 아메리칸 폭포 — 아래는 공원 도로, 멀리는 강.",
      "Las americanas desde la torre — la avenida abajo, el río más allá.",
    ),
  ),
  blocks: [
    {
      type: "text",
      body: tx(
        "Down on the water, the falls are all force and noise. From above, they finally explain themselves: the river arrives wide and calm, splits around the islands, and drops — American Falls on one side, the Horseshoe curving away on the other. This is the map of the whole trip, drawn in water.",
        "在水面上，瀑布只有力量和轟鳴。從高處看，它們終於把自己講清楚了：河水平靜地寬寬流來，繞過島嶼分開，然後落下——一邊是美國瀑布，另一邊是彎走的馬蹄瀑布。這是整趟旅行的地圖，用水畫的。",
        "물 위에서는 폭포가 힘과 소음뿐이다. 위에서 보면 비로소 설명이 된다: 강은 넓고 잔잔하게 도착해 섬들을 감싸 갈라지고, 떨어진다 — 한쪽은 아메리칸 폭포, 다른 쪽은 굽어 나가는 말굽폭포. 여행 전체의 지도, 물로 그렸다.",
        "Sobre el agua, las cataratas son solo fuerza y ruido. Desde arriba por fin se explican: el río llega ancho y calmo, se parte alrededor de las islas y cae — las americanas a un lado, la Herradura curvándose al otro. Es el mapa de todo el viaje, dibujado en agua.",
      ),
    },
    { type: "heading", body: tx("01 — The map you can stand on", "01 · 可以站上去的地圖", "01 · 발 딛고 서는 지도", "01 — El mapa sobre el que te paras") },
    {
      type: "text",
      body: tx(
        "Watch the red boat cross under the American Falls — that is episode 1 and 3, happening live, small enough to hold in one look. If the boat episodes are the falls at full volume, this one is the volume knob seen from across the room.",
        "看那艘紅船從美國瀑布下面穿過——那就是第 1 集和第 3 集，正在現場發生，小到一眼能裝下。如果說坐船的幾集是把瀑布開到最大音量，這一集就是從房間另一頭看那個音量旋鈕。",
        "빨간 배가 아메리칸 폭포 아래를 건너는 걸 보라 — 1편과 3편이 실시간으로, 한눈에 들어올 만큼 작게 벌어지고 있다. 배 편이 폭포를 최대 음량으로 튼 것이라면, 이 편은 방 건너편에서 보는 볼륨 노브다.",
        "Mira el barco rojo cruzar bajo las americanas — son los episodios 1 y 3 ocurriendo en vivo, tan pequeños que caben en una mirada. Si los del barco son las cataratas a todo volumen, este es el botón de volumen visto desde el otro lado de la sala.",
      ),
    },
    {
      type: "youtube",
      youtubeId: "toHq-jrLP1g",
      title: tx(
        "Niagara From Above — the original short",
        "《Niagara From Above》——原片",
        "《Niagara From Above》 — 원본 짧은 영상",
        "«Niagara From Above» — el corto original",
      ),
    },
    {
      type: "quote",
      body: tx(
        "\"Some views you have to earn. This one, you just have to look up.\" — the closing line of the film above.",
        "「有些景色要費力才看得到。這一處，你只要抬頭。」——上面那支片的結尾句。",
        "\"어떤 풍경은 애써야 보이고, 이곳은 그저 올려다보면 된다.\" — 위 영화의 마지막 문장.",
        "\"Algunas vistas hay que ganárselas. Esta, solo hay que mirar hacia arriba.\" — la frase de cierre de la película de arriba.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After the falls from above — notes for a first tower visit.",
        "從高處看完瀑布，給第一次上塔的人。",
        "위에서 폭포를 본 뒤 — 첫 타워 방문자에게.",
        "Después de las cataratas desde arriba — notas para una primera visita a la torre.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it for the geography alone. After this view, every other angle of the falls has somewhere to sit in your head.",
            "光為了看懂地形就值得。看過這一景，瀑布的其他每個角度在你腦子裡都有地方安放了。",
            "지형을 이해하는 것만으로 갈 만하다. 이 풍경 뒤로는 폭포의 다른 모든 각도가 머릿속에 자리를 잡는다.",
            "Merece la pena solo por la geografía. Después de esta vista, cada otro ángulo de las cataratas tiene dónde sentarse en tu cabeza.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "Planners, photographers, and anyone who likes to see the whole board before making a move.",
            "愛規劃的人、拍照的人，還有那種下手之前想先看清全盤的人。",
            "계획형 인간, 사진 찍는 사람, 움직이기 전에 판 전체를 보고 싶은 사람.",
            "Planificadores, fotógrafos y quien quiera ver todo el tablero antes de mover.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "The tower deck is a paid ticket (Oct 2026). The same river-and-falls layout is free from the promenade below — you just read it in chapters instead of all at once.",
            "塔上觀景台要買票（2026-10）。同樣的河與瀑布格局，從下面的步道看是免費的——只是要分章讀，不能一頁看完。",
            "타워 전망대는 유료 티켓이다(2026-10). 같은 강과 폭포의 배치는 아래 산책로에서 공짜다 — 한 번에가 아니라 장별로 읽을 뿐이다.",
            "La plataforma de la torre es un billete pagado (oct 2026). El mismo conjunto de río y cataratas es gratis desde el paseo de abajo — solo lo lees por capítulos en vez de todo a la vez.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "Clear mornings are best. Haze eats the far shore first, and by midday the light flattens the water.",
            "晴朗的早晨最好。霧氣先吃遠岸，中午的光會把水面壓平。",
            "맑은 아침이 최고다. 연무는 먼 해안부터 먹고, 한낮 빛은 수면을 평평하게 만든다.",
            "Las mañanas despejadas son las mejores. La bruma se come primero la orilla lejana, y al mediodía la luz aplana el agua.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Glass and railings get between you and the shot, and on windy days the mist plume can hide the Horseshoe entirely.",
            "玻璃和欄杆會擋在你和畫面之間；風大的日子，水霧柱能把馬蹄瀑布整個藏起來。",
            "유리와 난간이 렌즈와 풍경 사이에 끼고, 바람 부는 날엔 물안개 기둥이 말굽폭포를 통째로 가릴 수 있다.",
            "El cristal y las barandillas se meten entre tú y la foto, y en días de viento la columna de niebla puede esconder la Herradura entera.",
          ),
        },
      ],
    },
  ],
}

const ep03: StoryEpisode = {
  number: 3,
  slug: "03-the-horseshoe-up-close",
  status: "published",
  publishedAt: "2026-10-16",
  title: tx(
    "The Horseshoe, Up Close",
    "近看馬蹄瀑布",
    "말굽폭포, 가까이에서",
    "La Herradura, de cerca",
  ),
  dek: tx(
    "Red ponchos, raised hands, and a grey-green wall of water that does not stop coming. One of our first Niagara films — the bow pointed straight at the Horseshoe.",
    "紅雨衣、舉起的手，和一面不停壓過來的灰綠色水牆。我們最早的尼亞加拉影片之一——船頭正對馬蹄瀑布。",
    "빨간 판초, 치켜든 손, 그리고 멈추지 않고 밀려오는 회녹색 물벽. 우리의 초기 나이아가라 영상 중 하나 — 뱃머리가 말굽폭포를 정면으로 향한다.",
    "Ponchos rojos, manos alzadas y un muro gris verdoso de agua que no deja de venir. Una de nuestras primeras películas del Niágara — la proa apuntando directo a la Herradura.",
  ),
  cover: shot(
    "03",
    "horseshoe-from-the-boat",
    720,
    1280,
    tx(
      "The Horseshoe Falls as a grey-green wall of water and mist, seen from the boat's bow",
      "從船頭看馬蹄瀑布：灰綠色的水牆與水霧",
      "뱃머리에서 본 말굽폭포 — 회녹색 물벽과 물안개",
      "La Herradura como un muro gris verdoso de agua y niebla, vista desde la proa del barco",
    ),
    tx(
      "From the bow — the Horseshoe wall through the spray.",
      "從船頭看——水霧中的馬蹄瀑布水牆。",
      "뱃머리에서 — 물보라 속 말굽폭포 물벽.",
      "Desde la proa — el muro de la Herradura entre el rocío.",
    ),
  ),
  blocks: [
    {
      type: "text",
      body: tx(
        "Episode 1 sailed into the basin. This is the same water from the bow rail: the Horseshoe as one continuous wall, the mist rolling off it in weather of its own, and a deck full of red ponchos with their hands in the air. Nobody on that boat was checking their phone.",
        "第 1 集是駛進盆地。這一集是同一片水，從船頭欄杆邊看出去：馬蹄瀑布是一整面連續的水牆，水霧從牆上滾下來，自成一片天氣；甲板上全是紅雨衣，手都舉在空中。那艘船上沒有人在看手機。",
        "1편은 분지로 항해했다. 이 편은 같은 물을 뱃머리 난간에서 본다: 말굽폭포는 하나의 연속된 물벽, 그 위로 물안개가 자체 날씨처럼 굴러 나오고, 갑판은 빨간 판초들이 손을 들고 있다. 그 배에서 폰을 보는 사람은 없었다.",
        "El episodio 1 navegó hacia la cuenca. Este es la misma agua desde la barandilla de proa: la Herradura como un muro continuo, la niebla rodando sobre él con clima propio, y una cubierta de ponchos rojos con las manos en el aire. Nadie en ese barco miraba el teléfono.",
      ),
    },
    { type: "heading", body: tx("01 — The bow points at the water", "01 · 船頭對著水牆", "01 · 뱃머리는 물벽을 향한다", "01 — La proa apunta al agua") },
    {
      type: "text",
      body: tx(
        "The falls do not pause — not for the weather, not for the crowds, not for the camera. Up close, that is the whole impression: one motion, repeated at full power, older than every building in sight and in no hurry at all.",
        "瀑布不會停——不為天氣停，不為人群停，不為鏡頭停。近看之下，全部的印象就是這個：一個動作，以全功率重複，比視線裡每一棟建築都老，卻一點也不趕。",
        "폭포는 멈추지 않는다 — 날씨 때문에도, 인파 때문에도, 카메라 때문에도. 가까이에서 받는 인상은 전부 이것이다: 하나의 동작, 전출력으로 반복, 눈에 보이는 모든 건물보다 오래됐는데 전혀 서두르지 않는다.",
        "Las cataratas no pausan — ni por el clima, ni por la multitud, ni por la cámara. De cerca, esa es toda la impresión: un solo movimiento, repetido a plena potencia, más viejo que cada edificio a la vista y sin ninguna prisa.",
      ),
    },
    {
      type: "youtube",
      youtubeId: "LjFRkfgBtxM",
      title: tx(
        "The Power of God at Niagara Falls — the original short",
        "《The Power of God at Niagara Falls》——原片",
        "《The Power of God at Niagara Falls》 — 원본 짧은 영상",
        "«The Power of God at Niagara Falls» — el corto original",
      ),
    },
    { type: "heading", body: tx("02 — Loud, then louder", "02 · 先是響，然後更響", "02 · 크고, 더 크고", "02 — Fuerte, y luego más fuerte") },
    {
      type: "text",
      body: tx(
        "There is a point on the approach where the sound stops being something you hear and becomes something the deck does under your feet. The film can only point at that moment. If you go, that is the moment to put the camera down.",
        "靠近的路上有一個點，聲音不再是你聽到的東西，而是甲板在你腳下做的事。這支片只能指向那一刻。如果你去，到那一刻，就把相機放下。",
        "접근하는 길 어딘가에 소리가 '듣는 것'에서 '갑판이 발밑에서 하는 일'로 바뀌는 지점이 있다. 영상은 그 순간을 가리킬 뿐이다. 가게 되면, 그 순간엔 카메라를 내려놓아라.",
        "Hay un punto en la aproximación donde el sonido deja de ser algo que oyes y pasa a ser algo que la cubierta hace bajo tus pies. La película solo puede apuntar a ese momento. Si vas, ese es el momento de bajar la cámara.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After the Horseshoe up close — notes for the bow rail.",
        "近看完馬蹄瀑布，給要站船頭的人。",
        "말굽폭포를 가까이 본 뒤 — 뱃머리 난간에 설 사람에게.",
        "Después de la Herradura de cerca — notas para la barandilla de proa.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. Up close is where the Horseshoe stops being a postcard and starts being weather.",
            "值得。近看，是馬蹄瀑布從明信片變成一片天氣的地方。",
            "갈 만하다. 가까이 가야 말굽폭포가 엽서가 아닌 날씨가 된다.",
            "Merece la pena. De cerca es donde la Herradura deja de ser una postal y se vuelve clima.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "Anyone who has only ever seen the falls from behind a railing on land.",
            "只在陸地上隔著欄杆看過瀑布的人。",
            "육지 난간 뒤에서만 폭포를 본 사람.",
            "Quien solo haya visto las cataratas desde detrás de una barandilla en tierra.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "Same boat ticket as episode 1 (Oct 2026) — the close pass is part of the same ride, not an upgrade you buy twice.",
            "和第 1 集同一張船票（2026-10）——近距離駛過是同一趟行程的一部分，不用買第二次的升級。",
            "1편과 같은 배 티켓이다(2026-10) — 근접 통과는 같은 탑승의 일부, 두 번 사는 업그레이드가 아니다.",
            "El mismo billete del episodio 1 (oct 2026) — el paso cercano es parte del mismo paseo, no una mejora que se compra dos veces.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "The closest pass comes mid-ride. Have the camera ready before the mist thickens — after that, the lens is a windshield in rain.",
            "最近的距離出現在行程中段。水霧變濃之前先把相機準備好——之後鏡頭就是雨裡的擋風玻璃。",
            "가장 가까운 통과는 탑승 중반에 온다. 물안개가 짙어지기 전에 카메라를 준비해라 — 그 뒤 렌즈는 비 속 앞유리다.",
            "El paso más cercano llega a mitad del paseo. Ten la cámara lista antes de que la niebla espese — después, el lente es un parabrisas bajo la lluvia.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Spray coats the lens in seconds. Shoot, wipe, shoot — or put the phone away and just get soaked on purpose.",
            "水花幾秒就糊滿鏡頭。拍、擦、再拍——或者把手機收起來，專心濕透。",
            "물보라가 몇 초 만에 렌즈를 덮는다. 찍고, 닦고, 찍어라 — 아니면 폰을 치우고 일부러 흠뻑 젖어라.",
            "El rocío cubre el lente en segundos. Dispara, limpia, dispara — o guarda el teléfono y empápate a propósito.",
          ),
        },
      ],
    },
  ],
}

const ep04: StoryEpisode = {
  number: 4,
  slug: "04-standing-at-the-foot",
  status: "published",
  publishedAt: "2026-10-16",
  title: tx(
    "Standing at the Foot of the Falls",
    "站在瀑布腳下",
    "폭포 아래에 서서",
    "De pie al pie de las cataratas",
  ),
  dek: tx(
    "The last stop is not a viewpoint. It is a boat deck inside the spray, where the falls stop being something you watch and become something you stand in.",
    "最後一站不是觀景點。是水霧裡的一塊船甲板——在那裡，瀑布不再是你看的東西，而是你站在裡面的東西。",
    "마지막 정류장은 전망대가 아니다. 물보라 속 배 갑판 — 폭포가 '보는 것'이 아니라 '그 안에 서는 것'이 되는 곳.",
    "La última parada no es un mirador. Es una cubierta dentro del rocío, donde las cataratas dejan de ser algo que miras y se vuelven algo en lo que estás de pie.",
  ),
  cover: shot(
    "04",
    "at-the-foot-of-the-falls",
    720,
    1280,
    tx(
      "At the foot of the falls from the boat deck — the crest lost in spray, the boat's rail and mast at the frame's edge",
      "在瀑布腳下的船甲板上看：水霧中的瀑頂，畫面邊緣是船欄與桅杆",
      "폭포 아래 선상 갑판에서 — 물보라에 가린 폭포 상단, 프레임 가장자리의 난간과 마스트",
      "Al pie de las cataratas desde la cubierta — la cresta perdida en el rocío, la barandilla y el mástil del barco al borde del encuadre",
    ),
    tx(
      "On deck at the foot of the falls — spray on the lens.",
      "在瀑布腳下的甲板上——鏡頭上全是水花。",
      "폭포 아래 갑판에서 — 렌즈 위의 물보라.",
      "En cubierta al pie de las cataratas — rocío en el lente.",
    ),
  ),
  blocks: [
    {
      type: "text",
      body: tx(
        "Every season needs an ending, and this trip's ending is a deck. The boat holds at the foot of the falls, the spray comes over the rail in sheets, and the crest above you keeps disappearing into its own weather. Water on the lens is not a flaw in this film. Water on the lens is the film.",
        "每個故事集都需要一個結尾，這趟旅行的結尾是一塊甲板。船停在瀑布腳下，水花成片地越過欄杆，你頭頂的瀑頂不斷消失在它自己的天氣裡。這支片裡鏡頭上的水不是瑕疵。鏡頭上的水，就是這支片本身。",
        "모든 시즌에는 끝이 필요하고, 이 여행의 끝은 갑판이다. 배는 폭포 아래 머물고, 물보라는 난간 너머로 장막처럼 넘어오며, 머리 위 폭포 상단은 자기 날씨 속으로 계속 사라진다. 이 영상에서 렌즈 위의 물은 흠이 아니다. 렌즈 위의 물이 곧 이 영상이다.",
        "Cada temporada necesita un final, y el final de este viaje es una cubierta. El barco se sostiene al pie de las cataratas, el rocío pasa sobre la barandilla en láminas, y la cresta sobre ti sigue desapareciendo en su propio clima. El agua en el lente no es un defecto de esta película. El agua en el lente es la película.",
      ),
    },
    { type: "heading", body: tx("01 — Inside the weather", "01 · 站在天氣裡面", "01 · 날씨 안에 서서", "01 — Dentro del clima") },
    {
      type: "text",
      body: tx(
        "From the promenade, the falls are a picture. From this deck, they are a condition: wet air, loud water, a rail to hold, and nowhere dry to stand. It lasts a minute, maybe two. Nobody who has stood in it describes the view first — they describe the sound.",
        "從步道上看，瀑布是一幅畫。從這塊甲板上看，瀑布是一種狀態：濕的空氣、轟鳴的水、一條可以扶的欄杆，和一塊乾的地方都沒有。大概一分鐘，最多兩分鐘。站過的人，沒人先描述景色——他們都先描述聲音。",
        "산책로에서 폭포는 한 장의 그림이다. 이 갑판에서는 하나의 상태다: 젖은 공기, 요란한 물, 붙잡을 난간, 마른 곳 없음. 1분, 길어야 2분. 그 안에 서 본 사람은 아무도 풍경부터 말하지 않는다 — 소리부터 말한다.",
        "Desde el paseo, las cataratas son un cuadro. Desde esta cubierta son una condición: aire mojado, agua ruidosa, una barandilla de la que agarrarse y ningún sitio seco. Dura un minuto, quizá dos. Nadie que haya estado dentro describe primero la vista — describe el sonido.",
      ),
    },
    {
      type: "youtube",
      youtubeId: "c-S1kFGD0c0",
      title: tx(
        "Thank You, God — Standing At The Foot Of Niagara Falls — the original short",
        "《Thank You, God — Standing At The Foot Of Niagara Falls》——原片",
        "《Thank You, God — Standing At The Foot Of Niagara Falls》 — 원본 짧은 영상",
        "«Thank You, God — Standing At The Foot Of Niagara Falls» — el corto original",
      ),
    },
    { type: "heading", body: tx("02 — The same shore, another record", "02 · 同一片岸，另一份記錄", "02 · 같은 해안, 또 하나의 기록", "02 — La misma orilla, otro registro") },
    {
      type: "text",
      body: tx(
        "This site keeps a second record of this same shore. In My Lord, Holy — our season of places that made us pray — the Niagara episode stands in this same mist and says out loud the words this season leaves to the water. Start there if this deck felt like more than weather.",
        "這個網站還留著同一片岸的另一份記錄。在《My Lord, Holy》——我們「讓我們禱告的地方」故事集裡——尼亞加拉那一集站在同一片水霧裡，把這一集留給水聲的話說出了口。如果這塊甲板讓你覺得不只是天氣，從那裡開始看。",
        "이 사이트는 같은 해안의 두 번째 기록도 갖고 있다. 《My Lord, Holy》 — 우리를 기도하게 만든 장소들의 시즌 — 에서 나이아가라 편은 같은 물안개 안에 서서, 이 시즌이 물소리에 맡긴 말을 소리 내어 말한다. 이 갑판이 날씨 이상으로 느껴졌다면 거기서 시작해라.",
        "Este sitio guarda un segundo registro de esta misma orilla. En My Lord, Holy — nuestra temporada de lugares que nos hicieron orar — el episodio del Niágara se para en esta misma niebla y dice en voz alta las palabras que esta temporada deja al agua. Empieza ahí si esta cubierta se sintió como algo más que clima.",
      ),
    },
    {
      type: "verdict",
      intro: tx(
        "After standing at the foot — notes for the wettest minute of the trip.",
        "站在瀑布腳下之後，給這趟旅行最濕的那一分鐘。",
        "폭포 아래 서 본 뒤 — 여행에서 가장 젖는 1분을 위해.",
        "Después de estar al pie — notas para el minuto más mojado del viaje.",
      ),
      rows: [
        {
          label: tx("Worth it", "值不值得", "갈 만한가", "¿Merece la pena?"),
          body: tx(
            "Worth it. This is the frame people describe years later, and they describe it with their whole body, not just their eyes.",
            "值得。這是人們多年後還會描述的畫面，而且是用整個身體描述，不只是眼睛。",
            "갈 만하다. 몇 년 뒤에도 사람들이 묘사하는 프레임이고, 눈만이 아니라 온몸으로 묘사한다.",
            "Merece la pena. Este es el encuadre que la gente describe años después, y lo describe con todo el cuerpo, no solo con los ojos.",
          ),
        },
        {
          label: tx("Who it's for", "适合谁", "누구에게", "Para quién"),
          body: tx(
            "Anyone who wants the story, not just the photo — and does not mind earning it damp.",
            "想要故事而不只是照片的人——而且不介意濕著把它掙回來。",
            "사진이 아니라 이야기를 원하는 사람 — 그리고 젖어가며 얻는 걸 마다하지 않는 사람.",
            "Quien quiera la historia, no solo la foto — y no le importe ganársela mojado.",
          ),
        },
        {
          label: tx("Budget", "预算", "예산", "Presupuesto"),
          body: tx(
            "No extra cost beyond the same boat ride (Oct 2026). The soaking, as established, is complimentary.",
            "同一趟船之外沒有額外花費（2026-10）。濕透的部分，如前所述，免費附送。",
            "같은 배 탑승 외 추가 비용은 없다(2026-10). 흠뻑 젖기는 이미 말했듯 무료 서비스다.",
            "Sin costo extra más allá del mismo paseo en barco (oct 2026). La empapada, como quedó establecido, es cortesía de la casa.",
          ),
        },
        {
          label: tx("Time", "时间", "시간", "Tiempo"),
          body: tx(
            "The boat holds in the spray only briefly. Look first, film second — the reverse order is how people miss it.",
            "船在水霧裡只停留很短。先看，再拍——順序反了，就是人們錯過它的原因。",
            "배는 물보라 속에 잠깐만 머문다. 먼저 보고, 그다음 찍어라 — 순서를 바꾸면 놓치는 법이다.",
            "El barco se sostiene en el rocío solo un momento. Mira primero, filma después — el orden inverso es como la gente se lo pierde.",
          ),
        },
        {
          label: tx("The catch", "有没有坑", "주의할 점", "El truco"),
          body: tx(
            "Everything you carry gets damp. A waterproof pouch for the phone, or a pocket you truly trust.",
            "你帶的每樣東西都會潮。手機裝防水袋，或者找一個你真信得過的口袋。",
            "들고 있는 모든 게 축축해진다. 폰은 방수 파우치에, 아니면 정말 믿는 주머니에.",
            "Todo lo que llevas se humedece. Una funda impermeable para el teléfono, o un bolsillo en el que de verdad confíes.",
          ),
        },
      ],
    },
  ],
}

export const niagaraFalls: StorySeason = {
  slug: "niagara-falls",
  destination: "Niagara Falls",
  place: tx("Niagara Falls", "尼亞加拉瀑布", "나이아가라 폭포", "Cataratas del Niágara"),
  region: "north_america",
  title: tx("My Niagara Falls", "我的尼亞加拉", "나의 나이아가라 폭포", "Mis cataratas del Niágara"),
  subtitle: tx(
    "Into the mist, from above, up close, at the foot — one trip, four ways of seeing the same water",
    "走進水霧、從高處看、近距離、站在腳下——同一次旅行，同一片水的四種看法",
    "물안개 속으로, 위에서, 가까이, 발밑에서 — 한 번의 여행, 같은 물을 보는 네 가지 방법",
    "Hacia la niebla, desde arriba, de cerca, al pie — un viaje, cuatro formas de ver la misma agua",
  ),
  intro: tx(
    "Four short films from one trip to Niagara Falls, Ontario — every one already published on our channel, gathered here in the order the trip taught them to us. First the boat sails into the mist, then the whole gorge opens up from above, then the Horseshoe fills the frame from the bow, and finally the deck at the foot of the falls, where the camera gets as wet as we did.",
    "四支短片，來自同一次安大略省尼亞加拉瀑布之行——每一支都已經在我們的頻道發布，這裡按這趟旅行教會我們的順序排好：先是船駛進水霧，然後整個峽谷從高處打開，接著馬蹄瀑布從船頭佔滿畫面，最後是瀑布腳下的甲板，鏡頭和我們一樣濕透。",
    "온타리오 나이아가라 폭포 한 번의 여행에서 나온 짧은 영상 네 편 — 모두 우리 채널에 이미 공개됐고, 여행이 가르쳐 준 순서로 모았다. 먼저 배가 물안개 속으로 들어가고, 협곡 전체가 위에서 열리고, 말굽폭포가 뱃머리에서 화면을 채우고, 마지막은 폭포 아래 갑판, 카메라가 우리만큼 젖는 곳.",
    "Cuatro cortos de un solo viaje a las cataratas del Niágara, Ontario — todos ya publicados en nuestro canal, reunidos en el orden en que el viaje nos los enseñó. Primero el barco entra en la niebla, luego todo el desfiladero se abre desde arriba, después la Herradura llena el encuadre desde la proa, y al final la cubierta al pie de las cataratas, donde la cámara se moja tanto como nosotros.",
  ),
  cover: ep01Cover,
  episodes: [ep01, ep02, ep03, ep04],
}
