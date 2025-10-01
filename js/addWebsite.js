const addWebBtn = document.getElementById('addWeb');
const closeBtn = document.getElementById('closeBtn');
const addWebsiteMunu = document.getElementById('addWebsiteMunu');

addWebBtn.onclick = () => {
    addWebsiteMunu.style.display = 'flex';
};

closeBtn.onclick = () =>{
    addWebsiteMunu.style.display = 'none';
};
