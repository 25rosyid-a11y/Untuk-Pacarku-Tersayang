const panel=document.getElementById('musicPanel');
const audio=document.getElementById('audio');
const input=document.getElementById('musicFiles');
const list=document.getElementById('playlistList');
const title=document.getElementById('musicTitle');
const count=document.getElementById('musicCount');
const status=document.getElementById('status');
let songs=[],index=0;
function openPanel(){panel.classList.add('open')}
function closePanel(){panel.classList.remove('open')}
document.getElementById('openPlaylist').onclick=openPanel;
document.getElementById('topMusic').onclick=openPanel;
document.getElementById('closePlaylist').onclick=closePanel;
document.getElementById('chooseMusic').onclick=()=>input.click();
input.addEventListener('change',e=>{songs=[...e.target.files].filter(f=>f.type.startsWith('audio/')); count.textContent=songs.length+' lagu'; render(); if(songs.length) load(0); status.textContent=songs.length?'Playlist siap diputar':'Tidak ada file audio';});
function render(){list.innerHTML='';songs.forEach((s,i)=>{const d=document.createElement('div');d.className='track';d.textContent=(i+1)+'. '+s.name;d.onclick=()=>{load(i);audio.play()};list.appendChild(d)})}
function load(i){if(!songs.length)return;index=(i+songs.length)%songs.length;audio.src=URL.createObjectURL(songs[index]);title.textContent=songs[index].name;[...list.children].forEach((x,n)=>x.classList.toggle('playing',n===index))}
document.getElementById('play').onclick=()=>{if(!songs.length)return openPanel();audio.paused?audio.play():audio.pause()};
document.getElementById('prev').onclick=()=>{load(index-1);audio.play()};
document.getElementById('next').onclick=()=>{load(index+1);audio.play()};
audio.addEventListener('ended',()=>{load(index+1);audio.play()});


// Penghitung waktu bersama: sejak 27 Agustus 2026
const togetherStart = new Date(2026, 7, 27, 0, 0, 0);
const daysTogether = document.getElementById('daysTogether');
const hoursTogether = document.getElementById('hoursTogether');
const minutesTogether = document.getElementById('minutesTogether');
const secondsTogether = document.getElementById('secondsTogether');
function updateTogetherTime(){
  const now = new Date();
  let diff = Math.max(0, now.getTime() - togetherStart.getTime());
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(diff / day) + 1; diff %= day;
  const hours = Math.floor(diff / hour); diff %= hour;
  const minutes = Math.floor(diff / minute); diff %= minute;
  const seconds = Math.floor(diff / second);
  if(daysTogether) daysTogether.textContent = days;
  if(hoursTogether) hoursTogether.textContent = String(hours).padStart(2,'0');
  if(minutesTogether) minutesTogether.textContent = String(minutes).padStart(2,'0');
  if(secondsTogether) secondsTogether.textContent = String(seconds).padStart(2,'0');
}
updateTogetherTime();
setInterval(updateTogetherTime,1000);
