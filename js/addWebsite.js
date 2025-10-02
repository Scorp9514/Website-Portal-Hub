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


addWebBtn.onclick = () =>{
    const website_link = webLink.value;
    const website_name = webName.value;

    addWebsiteMunu.style.display = 'none';
};

//處理icon圖檔

