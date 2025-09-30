const plusBtn = document.getElementById('plusBtn');
const popup = document.getElementById('popup');
const addWeb = document.getElementById('addWeb');
const changeBg = document.getElementById('changeBg');
const uploadBg = document.getElementById('uploadBg');
const uploadBgText = document.getElementById('uploadBgText');

plusBtn.addEventListener('click',()=>{
    const rect = plusBtn.getBoundingClientRect();
    popup.style.left = rect.left + "px";
    
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



// 處理用戶上傳的background檔案

let db;

//                          資料庫名稱,資料庫版本號
const request = indexedDB.open('MyDB',1);

request.onupgradeneeded = (e) => {
    db = e.target.result;
    db.createObjectStore('backgroundDB',1);
    console.log('a');
};

request.onsuccess = (e) =>{
    db = e.target.result;
    loadImage();
    console.log('b');
};

uploadBg.addEventListener('change',()=>{
    const file = uploadBg.files[0];
    console.log('c');
    if(!file) return;


    if (file.type.startsWith('image/')){
        const reader = new FileReader();
        console.log('breudfn')
        // onload VS onsuccess
        // onload => 載入一般資源 如 img script等很難失敗的東西
        // onsuccess => 載入非凡資源 如 request 成功就觸發
        reader.onload = (e) =>{
            saveImage(file);
            changeBackground(file);
            console.log('dfaidjfdsnfoj')
        };
        reader.readAsDataURL(file);
    }
    else{
        console.log("Upload Failed! bruh"); 
    }
});

function saveImage(file){
    // 向db拿可以讀寫"images"的交易門票
    console.log('d');
    const tx = db.transaction("images","readwrite");

    // 到images存放區把file放進去
    // 存放格式 bgImage : file
    //           key   : value
    tx.objectStore("images").put(file,"bgImage");
};

//載入之前存進indexedDB的圖片

function loadImage(){
    console.log('e');
    const tx= db.transaction("images","readonly");
    const req = tx.objectStore("images").get("bgImage");
    req.onsuccess = (e) =>{
        const file = e.target.result;
        if (file){
            changeBackground(file);
        }
    };
};

function changeBackground(file){
    console.log('f');
    const url = URL.createObjectURL(file);
    document.body.style.backgroundImage = `url(${url})`; // 反引號才能 {變數}
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover'; //讓背景布滿整個 viewport
};

console.log('yooo');


