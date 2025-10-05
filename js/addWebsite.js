const add_website = document.getElementById('addWeb');
const closeBtn = document.getElementById('closeBtn');
const addWebsiteMunu = document.getElementById('addWebsiteMunu');
const addWebBtn = document.getElementById('addWebBtn');
const webLink = document.getElementById('webLink');
const webName = document.getElementById('webName');
const webIcon = document.getElementById('webIcon');

add_website.onclick = () => {
    addWebsiteMunu.style.display = 'flex';
};

closeBtn.onclick = () =>{
    addWebsiteMunu.style.display = 'none';
    document.getElementById('addWebForm').reset();
};




//處理icon圖檔

let addWebDB;

const webDBreq = indexedDB.open('websites',1);

webDBreq.onupgradeneeded = (e) =>{
    addWebDB = e.target.result;
    if(!data.objectStoreNames.contains("records")){
        data.createObjectStore("records",{keypath: 'id',autoIncrement: true}); //建立key叫"id"的資料庫 id在放東西進去後自動更新 ex:1,2,3...
    }
};

webDBreq.onsuccess = (e)=>{
    addWebDB = e.target.result;
    loadWebsites();
};

addWebBtn.onclick = () =>{
    const website_link = webLink.value;
    const website_name = webName.value;
     

    addWebsiteMunu.style.display = 'none';
    // addWebsite();
};


webIcon.addEventListener("change",()=>{
    
});


//用戶嘗試新增一個網站
document.getElementById('addWebForm').addEventListener('submit',(e)=>{
    
    e.preventDefault(); //防止submit後網頁重新整理

    const form = e.target;
    const webFormData = new FormData(form); //取得form裡面的所有東西
    handleData(webFormData);

});


//確認資料validation&把資料存進DB

function handleData(webFormData){
    const link = webFormData.get("siteLink"); // 根據input裡面的name屬性拿到用戶輸入的字
    // console.log(link);
    const name = webFormData.get("siteName");
    // console.log(name);

    const imageFile = webFormData.get("siteIcon");
    
    //開啟DB
    const tran = addWebDB.transaction('records',"readwrite");
    const store = tran.objectStore("records"); 

    
    // 確認用戶輸入的資料沒問題後加到records資料庫
    if (tran.oncomplete){
        console.log('adfuadfnisadufnidsnfisadn');
    }
    if (link && name && imageFile.type.startsWith("image/")){
        store.add({lk: link,nm: name,img:imageFile});
        console.log('form data fetched');
        document.getElementById('addWebForm').reset();
        loadWebsites();
    }
    document.getElementById('addWebForm').reset();
    
};

function loadWebsites(){
    const tran = addWebDB.transaction('records','readonly');
    const store = tran.objectStore("records");
    const openStoreReq = store.getAll();

    openStoreReq.onsuccess = () =>{
        
    };
};


