/* Chromaraga guide pages: shop links for the visitor's region */
(function(){
var RETAILERS={"blick":{"n":"Blick","search":"https://www.dickblick.com/search/?q={q}","awin":"88183"},"jacksonsUK":{"n":"Jackson's Art","search":"https://www.jacksonsart.com/search?q={q}","awin":"79140"},"jacksonsUS":{"n":"Jackson's Art","search":"https://www.jacksonsart.com/en-us/search?q={q}","awin":"79310"},"jacksonsCA":{"n":"Jackson's Art","search":"https://www.jacksonsart.com/en-ca/search?q={q}","awin":""},"jacksonsDE":{"n":"Jackson's Art","search":"https://www.jacksonsart.com/de-de/search?q={q}","awin":""},"jacksonsFR":{"n":"Jackson's Art","search":"https://www.jacksonsart.com/fr-fr/search?q={q}","awin":""},"jacksonsIE":{"n":"Jackson's Art","search":"https://www.jacksonsart.com/en-ie/search?q={q}","awin":""},"jacksonsAU":{"n":"Jackson's Art","search":"https://www.jacksonsart.com/en-au/search?q={q}","awin":"83745"},"cass":{"n":"Cass Art","search":"https://www.cassart.co.uk/search.php?search_query={q}","awin":""},"amazon":{"n":"Amazon","search":"https://www.amazon.{tld}/s?k={q}","amazon":true}},REGIONS={"us":{"n":"United States","list":["blick","jacksonsUS","amazon"],"tld":"com","amz":"us"},"ca":{"n":"Canada","list":["jacksonsCA","amazon"],"tld":"ca","amz":"ca"},"uk":{"n":"United Kingdom","list":["jacksonsUK","cass","amazon"],"tld":"co.uk","amz":"uk"},"ie":{"n":"Ireland","list":["jacksonsIE","amazon"],"tld":"co.uk","amz":"uk"},"eu":{"n":"Europe","list":["jacksonsDE","amazon"],"tld":"de","amz":"de"},"fr":{"n":"France","list":["jacksonsFR","amazon"],"tld":"fr","amz":"fr"},"au":{"n":"Australia / NZ","list":["jacksonsAU","amazon"],"tld":"com.au","amz":"au"},"in":{"n":"India / South Asia","list":["amazon","jacksonsUK"],"tld":"in","amz":"in"},"jp":{"n":"Japan","list":["amazon","jacksonsUK"],"tld":"co.jp","amz":"jp"},"world":{"n":"Rest of world","list":["jacksonsUK","amazon"],"tld":"com","amz":"us"}},AFFILIATE={"awinPublisherId":"3161583","awinJoined":["88183","79310","79140","83745"],"amazon":{"us":"","uk":"","de":"","fr":"","it":"","es":"","ca":"","au":"","in":"","jp":""},"cjPid":""},KEY='chromaraga-region';
function detectRegion() {
  let tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { }
  const lang = (navigator.language || '').toLowerCase();
  if (/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns|Montreal)/.test(tz) || lang.endsWith('-ca')) return 'ca';
  if (tz.startsWith('America/')) return 'us';
  if (tz === 'Europe/Dublin' || lang === 'en-ie') return 'ie';
  if (tz === 'Europe/London' || lang === 'en-gb') return 'uk';
  if (tz === 'Europe/Paris' || lang.startsWith('fr')) return 'fr';
  if (tz.startsWith('Europe/')) return 'eu';
  if (tz.startsWith('Australia/') || tz === 'Pacific/Auckland') return 'au';
  if (/Asia\/(Kolkata|Calcutta|Dhaka|Karachi|Colombo|Kathmandu|Thimphu)/.test(tz)) return 'in';
  if (tz === 'Asia/Tokyo') return 'jp';
  return 'world';
}
function buyUrl(rk,q,reg){var r=RETAILERS[rk],e=encodeURIComponent;if(r.amazon){var u=r.search.replace('{tld}',REGIONS[reg].tld).replace('{q}',e(q)),tag=AFFILIATE.amazon[REGIONS[reg].amz];return tag?u+'&tag='+e(tag):u}var u2=r.search.replace('{q}',e(q));return AFFILIATE.awinPublisherId&&r.awin&&AFFILIATE.awinJoined.indexOf(r.awin)>-1?'https://www.awin1.com/cread.php?awinmid='+r.awin+'&awinaffid='+AFFILIATE.awinPublisherId+'&ued='+e(u2):u2}
var reg;try{reg=localStorage.getItem(KEY)}catch(e){}if(!REGIONS[reg])reg=detectRegion();
function paint(){document.querySelectorAll('.buyset').forEach(function(s){var q=s.getAttribute('data-q');s.innerHTML=REGIONS[reg].list.map(function(rk){return '<a class="shop" rel="sponsored noopener" target="_blank" data-rk="'+rk+'" href="'+buyUrl(rk,q,reg).replace(/"/g,'&quot;')+'">'+RETAILERS[rk].n+'</a>'}).join('')});document.querySelectorAll('.regionPick').forEach(function(x){x.value=reg})}
paint();
document.addEventListener('change',function(e){if(e.target.classList.contains('regionPick')&&REGIONS[e.target.value]){reg=e.target.value;try{localStorage.setItem(KEY,reg)}catch(er){}paint();if(window.umami)umami.track('Region changed',{region:reg,from:'guide'})}});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a.shop');if(!a)return;var s=a.closest('.buyset'),m=a.closest('.med');try{umami.track('Buy click',{shop:a.getAttribute('data-rk'),from:s.getAttribute('data-src'),item:s.getAttribute('data-q'),region:reg,medium:m?m.getAttribute('data-m'):'',page:location.pathname})}catch(er){}});
/* medium tabs */
var tabs=document.querySelectorAll('.tabs a');if(tabs.length){var pick=function(m,push){document.querySelectorAll('.med').forEach(function(s){s.hidden=s.getAttribute('data-m')!==m});tabs.forEach(function(t){var on=t.getAttribute('data-m')===m;t.classList.toggle('on',on);if(on)t.setAttribute('aria-current','true');else t.removeAttribute('aria-current')});if(push)history.replaceState(null,'','#'+m)};
var h=(location.hash||'').slice(1);pick(document.getElementById(h)&&document.getElementById(h).classList.contains('med')?h:tabs[0].getAttribute('data-m'));
tabs.forEach(function(t){t.addEventListener('click',function(e){e.preventDefault();pick(t.getAttribute('data-m'),true);try{umami.track('Guide medium',{medium:t.getAttribute('data-m'),page:location.pathname})}catch(er){}})})}
})();