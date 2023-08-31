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
    const cardContainer = document.getElementById('card -container');
    console.log(data.data);
    data.data?.forEach(video => {
        console.log(video);
        
        
    });
};
handleCategory();
