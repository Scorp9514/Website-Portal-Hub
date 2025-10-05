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


    //測試
    const del = indexedDB.deleteDatabase('websites');
    del.onsuccess = () => console.log('websites DB deleted');
};




//處理icon圖檔

let addWebDB;

const webDBreq = indexedDB.open('websites',1);

webDBreq.onupgradeneeded = (e) =>{
    //確保DB打開了
    addWebDB = e.target.result;
    if(!addWebDB.objectStoreNames.contains("records")){
        addWebDB.createObjectStore("records",{keyPath: "id",autoIncrement: true}); //建立key叫"id"的資料庫 id在放東西進去後自動更新 ex:1,2,3...
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

    openStoreReq.onsuccess = (e) =>{
        const recs = e.target.result;
        console.log(recs)
        const addingDiv = document.getElementById('addedWebs');
        
        // 重置後再加存進去的網站
        addingDiv.innerHTML = "";

        // for record in recs:
        recs.forEach(record => {
            //每個網站一個wrapper
            const wrapper = document.createElement('div');
            wrapper.style.display = 'inline-block';
            wrapper.style.margin = '2rem 2rem';

            //固定網站大小
            wrapper.style.width = '5vw';
            wrapper.style.height = 'auto';


            // 創造一個新的img元素 再創造一個url放到src裡面 把img丟進wrapper
            const a = document.createElement('a');
            a.href = record.lk;
            a.target = "_blank";
            const icon = document.createElement('img');
            icon.src = URL.createObjectURL(record.img);
            a.appendChild(icon)
            wrapper.appendChild(a);
            console.log(record.nm);
            const nme = document.createElement('span');
            nme.textContent = record.nm;
            nme.style.fontSize = "2rem";
            wrapper.appendChild(a);
            

            //新增刪除按鈕並綁定刪除事件
            const delWeb = document.createElement('button');
            delWeb.textContent = "Delete";
            delWeb.onclick = () => deleteRecord(record.id);
            wrapper.appendChild(delWeb)


            addingDiv.appendChild(wrapper);

        });
    };
};


function deleteRecord(id) {
    const trans = addWebDB.transaction('records','readwrite');
    const recor = trans.objectStore('records');
    console.log(id);
    recor.delete(id);

    trans.oncomplete = () => loadWebsites();
};

