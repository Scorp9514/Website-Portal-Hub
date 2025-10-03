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
};




//處理icon圖檔

let addWebDB;

const webDBreq1 = indexedDB.open("links",1);
const webDBreq2 = indexedDB.open("names",1);
const webDBreq3 = indexedDB.open("icons",1);


addWebBtn.onclick = () =>{
    const website_link = webLink.value;
    const website_name = webName.value;
     

    addWebsiteMunu.style.display = 'none';
    // addWebsite();
};


webIcon.addEventListener("change",()=>{
    
});

document.getElementById('addWebForm').addEventListener('submit',(e)=>{
    
    e.preventDefault(); //防止submit後網頁重新整理

    const form = e.target;
    const webFormData = new FormData(form); //取得form裡面的所有東西
    handleData(webFormData);

});

function handleData(webFormData){
    const link = webFormData.get("siteLink"); // 根據input裡面的name屬性拿到用戶輸入的字
    console.log(link);
    const name = webFormData.get("siteName");
    console.log(name);

    const imageFile = webFormData.get("siteIcon");
    console.log(imageFile);

    if (imageFile){
        const imgReader = new FileReader();
        imgReader.onload=()=>{
            console.log("a",imgReader.result);
        };
        imgReader.readAsDataURL(imageFile);
    };

};



