var data = [
      {
            "name": "a", 
            "age": 21
      },
      {
            "name": "ba", 
            "age": 21
      },
      {
            "name": "c", 
            "age": 25
      }
]

var cardTemplate = function(data){

      return `<div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
      <a
        href=""
        class="c-card block bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div class="relative pb-48 overflow-hidden">
          <img
            class="absolute inset-0 h-full w-full object-cover"
            src="./assets/images/placeholder.png"
            alt=""
          />
        </div>
        <div class="p-4">
          <span
            class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
            >${data.name}</span
          >
          <h2 class="mt-2 mb-2 font-bold">${data.age}</h2>
          <p class="text-sm">Movie Summary</p>
        </div>
      </a>
      </div>`
} 

var cards = ''
for(var i = 0; i < data.length; i++){
      cards += cardTemplate(data[i]);
}

document.getElementById('test').innerHTML = cards