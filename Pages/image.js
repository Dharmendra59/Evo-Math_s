let Input = document.getElementById("file");
let image = document.querySelector(".image img");
let selectImage = document.querySelector(".image");
let button = document.querySelector("button");

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD4xMUpMRhUg2YLYj-glPY9lOveYAzS5gA";

let fileDetails = {
      mime_type: null,
      data: null
};

async function generateResponse() {

      const RequestOption = {
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({
                  "contents": [{
                  "parts": [
                        { "text": "solve the mathematical problem with proper steps of solution"},
                        {
                              "inline_data": {
                                    "mime_type": fileDetails.mime_type,
                                    "data": fileDetails.data
                              }
                        }
                  ]
                  }]

            })
      }
      let response = await fetch(API_URL, RequestOption);
      let data = await response.json();
      console.log(data);
}


selectImage.addEventListener("click", () => {
      Input.click();
});

Input.addEventListener("change", () => {
      let file = Input.files[0];
      let url = URL.createObjectURL(file);
      image.src = url;
      // selectImage.querySelector("p").style.display = "none";
      if (!file) return
      let reader = new FileReader();
      reader.onload = (e) => {
            let base64data = e.target.result.split(",")[1];
            fileDetails.mime_type = file.type;
            fileDetails.data = base64data;

      };
      reader.readAsDataURL(file);
});

button.addEventListener("click", () => {
      generateResponse();
});