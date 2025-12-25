let currentSection = 0;
const totalSections = 3;
let isScrolling = false;
const container = document.getElementById('mainContainer');
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('monsterModal');

// ฟังก์ชันเลื่อนหน้า
function scrollToSection(index) {
    if (index < 0 || index >= totalSections) return;
    currentSection = index;
    container.style.transform = `translateY(-${currentSection * 100}vh)`;
    sections.forEach(sec => sec.classList.remove('active'));
    sections[currentSection].classList.add('active');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSection].classList.add('active');
    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 1000);
}

// ตรวจจับการเลื่อนเมาส์
window.addEventListener('wheel', (e) => {
    if (modal.classList.contains('show')) return;
    if (isScrolling) return;
    if (e.deltaY > 0) scrollToSection(currentSection + 1);
    else scrollToSection(currentSection - 1);
});

// ตรวจจับปุ่มคีย์บอร์ด
window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show')) return;
    if (isScrolling) return;
    if (e.key === 'ArrowDown') scrollToSection(currentSection + 1);
    if (e.key === 'ArrowUp') scrollToSection(currentSection - 1);
});

// เปิด Modal
function openModal(monsterId) {
    modal.classList.add('show');
    const allContents = document.querySelectorAll('.monster-detail-layout');
    allContents.forEach(content => { content.style.display = 'none'; });
    const targetContent = document.getElementById('content-' + monsterId);
    if (targetContent) targetContent.style.display = 'flex';
}

// ปิด Modal
function closeModal() {
    modal.classList.remove('show');
}
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});


// ==========================================================
// 🟢 [ส่วนระบบเสียง YouTube API]
// ==========================================================

// 1. โหลด YouTube IFrame Player API แบบอัตโนมัติ
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. ตั้งค่าตัวเล่น YouTube
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'po_t8I9FC2Y', // ID เพลง
        playerVars: {
            'autoplay': 1,      
            'loop': 1,          
            'playlist': 'po_t8I9FC2Y', 
            'controls': 0,      
            'showinfo': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

// 3. เริ่มเล่นเมื่อพร้อม
function onPlayerReady(event) {
    event.target.playVideo(); 
    event.target.setVolume(50); 
}

// 4. ฟังก์ชันปุ่ม Mute / Unmute
var isMuted = false;
function toggleMute() {
    var btn = document.getElementById("muteBtn");

    if (player && typeof player.isMuted === 'function') {
        if (isMuted) {
            player.unMute();
            btn.innerHTML = "🔊 Mute Music";
            isMuted = false;
        } else {
            player.mute();
            btn.innerHTML = "🔇 Unmute Music";
            isMuted = true;
        }
    }
}

// ==========================================================
// 🟢 [แก้ไขล่าสุด] ดักจับการคลิก (แบบฉลาดขึ้น)
// ==========================================================
var hasInteracted = false; // ตัวแปรเช็คว่าเคยคลิกหรือยัง

document.addEventListener('click', function(e) {
    
    // 🛑 1. ถ้าคลิกที่ปุ่ม Mute ให้จบฟังก์ชันเลย (ไม่ต้องไปบังคับเปิดเสียง)
    if (e.target.id === 'muteBtn' || e.target.closest('#muteBtn')) return;

    // 🛑 2. ถ้าเคยคลิกเปิดเพลงไปแล้ว ก็ไม่ต้องทำงานซ้ำ
    if (hasInteracted) return;

    // สั่งเล่นเพลงและเปิดเสียง (เฉพาะคลิกแรกที่ไม่ใช่ปุ่ม Mute)
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
        
        if (player.isMuted()) {
            player.unMute();
            player.setVolume(50);
            
            // อัปเดตปุ่มให้ตรงกัน
            isMuted = false;
            var btn = document.getElementById("muteBtn");
            if(btn) btn.innerHTML = "🔊 Mute Music";
        }
        
        hasInteracted = true; // จำไว้ว่าคลิกแล้วนะ
    }
});