const handleCategory = async () => {
   const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
   const data = await response.json();
   console.log(data.data);
   const buttonContainer = document.getElementById('button-container');
   data.data?.forEach((category) =>{
      const div = document.createElement('div');
      div.innerHTML = `
      <button onclick = "handleLoadVideos('${category?.category_id}')" class="font-medium text-lg text-gray-600 bg-gray-200 py-3 px-5 rounded-md">${category.category}</button>
      `;
      buttonContainer.appendChild(div);
   });
};

const handleLoadVideos = async (category_id) =>{
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    console.log(data.data);
    data.data?.forEach(video => {
        //console.log(video);
     const div = document.createElement('div');
     div.innerHTML = `
       <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img src="${video.thumbnail}" alt="" /></figure>
        <div class="card-body">
         <div class = "flex gap-4 items-center"> 
          <img class = "w-20 h-20 rounded-full" src="${video.authors[0]?.profile_picture}" alt="" />
           <div>
              <h2 class="font-bold text-base text-gray-900">${video?.title}</h2>
               <div class = "my-3">
                   <h2 class="font-normal text-sm">${video.authors[0]?.profile_name}</h2>
                </div>
                <p class = "font-normal text-sm "> ${video?.others?.views} views </P>
             </div>
          </div>           
        </div>
     </div>
        `;
    cardContainer.appendChild(div)   
        
    });
};
handleCategory();
