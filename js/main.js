(() => {
    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
    const loader = document.querySelector("#loader");
    const loader1 = document.querySelector("#loader-1");
    const loader2 = document.querySelector("#loader-2");
    const loader3 = document.querySelector("#loader-3");
    const loader4 = document.querySelector("#loader-4");
  

    // 1_loading indicator
    function loadInfoBoxes() {
   
     loader1.classList.toggle("hidden");
     loader2.classList.toggle("hidden");
     loader3.classList.toggle("hidden");
     loader4.classList.toggle("hidden");
  
    // 2_fetch API_hotspots
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        loader1.classList.toggle("hidden");
        loader2.classList.toggle("hidden");
        loader3.classList.toggle("hidden");
        loader4.classList.toggle("hidden");
  
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
  
          const imageElement = document.createElement('img');
          imageElement.src = `../images/earbud${index +1}.jpg`;
          imageElement.alt = infoBox.heading;
    
          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;
    
          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;
  
          
          selected.appendChild(imageElement);
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
  
      })
      .catch((error) => {
        console.log(error);
        // In case of an error, append the message inside each HotspotAnnotation
        hotspots.forEach(hotspot => {
          const hotspotAnnotation = hotspot.querySelector(".HotspotAnnotation");
          const errorMessage = document.createElement("p");
          errorMessage.textContent =
            "Oops, something went wrong. Please check your internet connection or try again later.";
          hotspotAnnotation.appendChild(errorMessage);
        });
      });
    }
  
    loadInfoBoxes();
  
    // 3_fetch API_material Information
    function loadMaterialInfo() {
  
      loader.classList.toggle("hidden");
  
      fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materialListData => {
  
      loader.classList.toggle("hidden");
  
        materialListData.forEach(material => {
          // clone the template
          const clone = materialTemplate.content.cloneNode(true);
          
          // populate template
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;
  
          const paragraphDescription = clone.querySelector(".material-description");
          paragraphDescription.textContent = material.description;
  
          materialList.appendChild(clone);
        })
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Oops, something went wrong while loading the materials. Please try again later.";
        materialList.appendChild(errorMessage);
      });
      // proper error handling
    }
  
      loadMaterialInfo();
  
    // function for hotspot
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  
  })();
  
  