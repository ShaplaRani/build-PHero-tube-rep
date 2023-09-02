let value;
const handleCategory = async () => {
   const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
   const data = await response.json();
 
   const buttonContainer = document.getElementById('button-container');
   data.data?.forEach((category) =>{
      const div = document.createElement('div');
      div.innerHTML = `
      <button onclick = "handleLoadVideos('${category?.category_id}')" class="button-colors font-medium text-lg
       text-gray-600 bg-gray-200 py-2 md:py-3 px-4 md:px-5 rounded-md">${category.category}</button>
      `;
      buttonContainer.appendChild(div);
   });
};

const handleLoadVideos = async (category_id) =>{
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    value = category_id;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    const emptyContainer = document.getElementById('empty-card');
    emptyContainer.innerHTML = "";
  
    data.data.length !== 0?data.data.forEach(video => {
     const div = document.createElement('div');
     div.innerHTML = `
       <div class="card bg-white ">
        <h2 class = "hidden"> ${category_id} </h2>
        <figure><img class ="h-56 w-full" src="${video.thumbnail}" alt="" /></figure>
        <div class = "absolute top-48 left-60 font-normal bg-black text-xs w-36 text-white text-center">
         <p>${video.others?.posted_date?timeConvert(video.others?.posted_date):''}</p>
        </div>
        
        <div class="card-body">
         <div class = "flex gap-4 "> 
          <img class = "w-16 h-16 rounded-full" src="${video.authors[0]?.profile_picture}" alt="" />
           <div>
              <h2 class="font-bold text-base text-gray-900">${video?.title}</h2>
               <div class = "my-3 flex gap-4">
                   <h2 class="font-normal text-sm">${video.authors[0]?.profile_name}</h2>
                    <p> ${video.authors[0]?.verified?'<i class="fa-solid fa-circle-check text-blue-600"></i>':''} </P>
                </div>
                <p class = "font-normal text-sm "> ${video?.others?.views} views </P>
             </div>
          </div>           
        </div>
     </div>
        `;
    cardContainer.appendChild(div);   
        
    }):emptyArray();
  
   
    
};
//time convert
 const timeConvert = (num) =>{
   const hours = (num / 60);
   const hour = Math.floor(hours);
   const minutes = (hours - hour) * 60;
   const minute = Math.round(minutes);
   return `${hour}hrs ${minute}min ago`;
};
//empty array
const emptyArray =() =>{
   const emptyContainer = document.getElementById('empty-card');
   emptyContainer.innerHTML = "";
   const div = document.createElement('div');
   div.innerHTML = `
    <div class = "flex justify-center mb-5">  <img class = "text-center" src="Icon.png" alt=""> </div>
   Oops!! Sorry, There is <br>
   no content here
   `;
   emptyContainer.appendChild(div);

};

//blog button 
document.getElementById('btn-blog').addEventListener('click',function(){
   window.location.href = 'blog.html';
})

//function call
handleLoadVideos('1000');
handleCategory();

//sorting
 const sortView =  ()=>{
   sorting(value);
 };
   
  const sorting =async(id) =>{
   const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
   const data = await res.json();
   const view = data.data.sort((s1,s2) => (parseFloat(s2.others?.views.split('K')[0])*1000) - 
   (parseFloat(s1.others?.views.split('K')[0])*1000));

   handleLoadVideosSort(view);
}
  const handleLoadVideosSort =(view) =>{
   const cardContainer = document.getElementById('card-container');
   cardContainer.innerHTML = "";
    const emptyContainer = document.getElementById('empty-card');
    emptyContainer.innerHTML = "";
    view.length !== 0?view.forEach(video => {
   const div = document.createElement('div');
    div.innerHTML = `
      <div class="card bg-white ">
       <figure><img class ="h-56 w-full" src="${video.thumbnail}" alt="" /></figure>
       <div class = "absolute top-48 left-60 font-normal bg-black text-xs w-36 text-white text-center">
        <p>${video.others?.posted_date?timeConvert(video.others?.posted_date):''}</p>
       </div>
       
       <div class="card-body">
        <div class = "flex gap-4"> 
         <img class = "w-16 h-16 rounded-full" src="${video.authors[0]?.profile_picture}" alt="" />
          <div>
             <h2 class="font-bold text-base text-gray-900">${video?.title}</h2>
              <div class = "my-3 flex gap-4">
                  <h2 class="font-normal text-sm">${video.authors[0]?.profile_name}</h2>
                   <p> ${video.authors[0]?.verified?'<i class="fa-solid fa-circle-check text-blue-600"></i>':''} </P>
               </div>
               <p class = "font-normal text-sm "> ${video?.others?.views} views </P>
            </div>
         </div>           
       </div>
    </div>
       `;
   cardContainer.appendChild(div);   
       
   }):emptyArray();
};

