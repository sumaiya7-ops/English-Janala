const createElement = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};
//loading
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};




const lesson = () => {
    fetch ("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons= document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));

}


const loadLevelWord = (id) => {  
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
  .then((res) => res.json())
  .then((data) => {
    removeActive();
    const clickBtn = document.getElementById(`lesson-btn-${id}`);
    
    clickBtn.classList.add("active");
    displayLevelWord(data.data);
});

};

const loadWordDetail = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {

  const detailsBox = document.getElementById("details-container");
   detailsBox.innerHTML = `
   <div class="">
        <h2 class="text-2xl font-bold"> ${word.word} (<i class="fa-solid fa-microphone"></i> : ${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="font-bold"> ${word.meaning}</h2>
        <p>agrohi b</p>
      </div>
      <div class="">
        <h2 class="font-bold">Example</h2>
        <p> ${word.sentence}</p>
      </div>
    
      <div class="">
        <h2 class="font-bold">synonym</h2>
      <div class="">${createElement(word.synonyms)}</div>
      
    </div>
   
   
   `;
  document.getElementById("word_modal").showModal();


};

const displayLevelWord = (words) => {
   

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
      wordContainer.innerHTML = `
      <div class="text-center col-span-full py-10 rounded-xl space-y-6">
     <img class="mx-auto" src="english-janala-resources/assets/alert-error.png">
      <p class=" text-sm font-normal text-gray-500">
     এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
     </p>
     <h2 class="text-4xl font-medium "> নেক্সট Lesson এ যান</h2>
    </div>
      `;
     return
    }



  words.forEach(word => {
  const card = document.createElement("div");
  card.innerHTML = `
     <div class="bg-white rounded-xl shadow-sm text-center space-y-4 py-10 px-5">
    <h2 class="text-3xl font-bold ">${word.word ? word.word : "শব্দ পাওয়া যায়নি" }</h2>
    <p class="text-xl font-medium ">"meaning / pronunciation</p>
    <div class="text-3xl font-semibold bangla"> "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
    <div class="flex justify-between items-center">
      <button onclick="loadWordDetail('${word.id}')" class="btn bg-indigo-50 hover:bg-blue-500"> <i class="fa-solid fa-circle-info" ></i></button>
      <button class="btn bg-indigo-50 hover:bg-blue-500"><i class="fa-solid fa-volume-high" ></i> </button>
    </div>
  </div>
  `;
  wordContainer.append(card);
  });
  manageSpinner(false);



};
const displayLesson = (lessons) => {
    //1
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  //2
  for (let lesson of lessons) {
      //3
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
   <button  id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord( ${lesson.level_no})" class="btn  btn-outline btn-primary lesson-btn">
   <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
   </button>
    `;
    //4
    levelContainer.append(btnDiv);
  }

}
lesson();
