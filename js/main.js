const plusBtn = document.getElementById('plusBtn');
const popup = document.getElementById('popup');
const addWeb = document.getElementById('addWeb');
const changeBg = document.getElementById('changeBg');
const uploadBg = document.getElementById('uploadBg');
const uploadBgText = document.getElementById('uploadBgText');

plusBtn.addEventListener('click',()=>{
    const rect = plusBtn.getBoundingClientRect();
    popup.style.left = rect.left + "px";
    // popup.style.top = rect.top + "px";
    // if (popup.style.display === 'inline-block'){
    //     const uploadBg = document.getElementById('uploadBg');
    //     uploadBg.style.display = 'none';
    //     console.log('a');
    //     uploadBgText.display = 'none';
    // }
    
    popup.style.display = popup.style.display === "inline-block" ? "none" : "inline-block";
    const popupDisplay = window.getComputedStyle(popup).display;
    // uploadBgText.display = popupDisplay;
    uploadBgText.style.display = popup.style.display === 'none'?'none' : 'none';
});

changeBg.addEventListener('click',()=>{
    const uploadBg = document.getElementById('uploadBg');
    uploadBg.left = changeBg.left + "px";
    uploadBg.top = changeBg.top + 'px';
    // uploadBg.style.display = uploadBg.style.display === "inline-block" ? "none" : "inline-block";
    uploadBgText.style.display = uploadBgText.style.display === 'inline-block' ? 'none' : 'inline-block';
});

