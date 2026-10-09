import re,sys,urllib.request,json
def get(u,ua="Mozilla/5.0"):
    r=urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":ua}),timeout=20)
    return r.status,r.headers,r.read().decode("utf-8","replace")
urls=sys.argv[1:]
for u in urls:
    try: s,h,b=get(u)
    except Exception as e: print(u,"ERR",e);continue
    t=re.search(r"<title>(.*?)</title>",b,re.S); d=re.search(r'<meta name="description" content="([^"]*)"',b)
    c=re.search(r'<link rel="canonical" href="([^"]*)"',b); rb=re.search(r'<meta name="robots" content="([^"]*)"',b)
    h1=re.findall(r"<h1[^>]*>(.*?)</h1>",b,re.S); hl=re.findall(r'hreflang="([^"]*)"',b)
    lang=re.search(r'<html[^>]*lang="([^"]*)"',b)
    ld=re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>',b,re.S)
    types=[]
    for x in ld:
        try:
            j=json.loads(x); js=j if isinstance(j,list) else j.get("@graph",[j])
            types+= [k.get("@type") for k in js if isinstance(k,dict)]
        except Exception: types.append("BADJSON")
    og=bool(re.search(r'property="og:image"',b))
    strip=lambda x:re.sub("<[^>]+>","",x).strip()[:50]
    print(f"{u}\n  {s} lang={lang and lang.group(1)} title={t and t.group(1)[:70]!r}\n  desc={(d.group(1)[:60]+'…') if d else None} canon={c and c.group(1)} robots={rb and rb.group(1)}\n  h1x{len(h1)}={[strip(x) for x in h1]} ld={types} hreflang={hl} og:image={og}")
