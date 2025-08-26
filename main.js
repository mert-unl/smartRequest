((self) => {
  "use strict";

  const config = {
    mainModal: {
      title: "Compare Products",
      sizeDown: "-",
      closeButton: "x",
      itemUrl: [],
      itemImg: [],
      itemName: ["asda", "asda", "sadasda", "sadasd", "asdasd"],
      itemPrice: [3242, 3423, 5436, 5234, 2344],
      itemOldPrice: [3421],
      buttonText: "Add To Cart",
    },
    storage: {
      myStorageKey: "mertItemStorage",
      sourceKey: "insiderVersusData",
    },
    slider: {
      currentIndex: 0,
      itemsPerView: 3,
    },
  };

  const classes = {
    style: "mrt-custom-style",
    versusOverlay: "mrt-ins-overlay",
    versusPreview: "mrt-ins-versusPreview",
    versusContainer: "mrt-ins-container",
    headDiv: "mrt-ins-headContainer",
    headTitle: "mrt-ins-head-title",
    contentDiv: "mrt-ins-contentContainer",
    productMainDiv: "mrt-ins-productMain",
    productItemCard: "mrt-ins-productItem",
    productImg: "mrt-ins-productImg",
    productTitle: "mrt-ins-productTitle",
    productPrice: "mrt-ins-productPrice",
    productOldPrice: "mrt-ins-productOldPrice",
    addToCartButton: "mrt-ins-addToCartButton",
    nextButton: "mrt-ins-nextButton",
    prevButton: "mrt-ins-prevButton",
    sliderContainer: "mrt-ins-sliderContainer",
    sliderButton: "mrt-ins-sliderBtn",
  };

  const selectors = Object.keys(classes).reduce((createdSelector, key) => {
    createdSelector[key] = `.${classes[key]}`;
    return createdSelector;
  }, {});

  /*
  self.reset = () => {
    const { style } = selectors;
    $(style).remove();
    config.offEvents.forEach((event) => $(document).off(event));
  }; */

  self.init = () => (
    !window.jQuery ? self.loadJquery() : self.copyStorage(),
    self.buildHtml(),
    self.buildCss()
  );

  self.loadJquery = () => {
    const script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    script.onload = () => {
      self.init();
    };
    document.head.appendChild(script);
  };

  self.buildCss = () => {
    const { style } = classes;
    const {
      versusOverlay,
      versusPreview,
      versusContainer,
      headDiv,
      headTitle,
      contentDiv,
      productMainDiv,
      productItemCard,
      productItem,
      productTitle,
      productPrice,
      productOldPrice,
      addToCartButton,
      productImg,
      sliderButton,
      sliderContainer,
    } = selectors;

    const customStyle = `
        <style class=${style}>
         
         ${versusOverlay}{
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background: rgba(0, 0, 0, 0.70);
            z-index:9999;
         }

          ${versusPreview}{
           z-index:9000000;
          position:fixed;
          top:50%;
          left:50%;
          height:400px;
          width: 500px;
          color:black;
          transform: translate(-50%,-50%);
         }

          ${versusContainer}{
          display:flex;
          align-items: stretch;
          flex-direction:column;
          height:100%;
          background-color:white;
         }

          ${headDiv}{
            display:flex;
            flex-direction:row;
            background-color:#8f0a00;
            color:white;
            justify-content:space-between;
            align-items:center;
            padding:10px 20px;
         }


          ${headTitle}{
           font-family:Arial;
         }

          ${contentDiv}{
           display:flex;
           flex-direction:row;
        
         }

          ${productMainDiv}{
          display:flex;
          flex-direction:row;
          gap:1.2rem;      
                    width: calc(100% * ${Math.ceil(
                      config.mainModal.itemName.length /
                        config.slider.itemsPerView
                    )});
   
          }
              ${sliderContainer}{
           flex: 1;
           overflow: hidden;
           position: relative;
         }
         ${productItemCard}{
          min-width: calc((100% / ${config.slider.itemsPerView}) - 14px);
           max-width: calc((100% / ${config.slider.itemsPerView}) - 14px);
         max-width:150px;
         }


         ${productImg}{
         height:150px;
         width:150px;
         max-width:100px;
         }

          ${productTitle}{
         font-weight:bold;
         font-size:14px;

         }

           ${productItem}{
         
         }

           ${productPrice}{
         
         }

           ${productOldPrice}{
         
         }

           ${addToCartButton}{
            background-color:white;
            color:black;
            font-weight:bold;
            border:2px solid #c92c21ff;
            padding:4px 10px;
         }

    
           ${addToCartButton}:hover{
            background-color: #e43529ff;
            color:white;
             cursor:pointer;
         }





        
        </style>
        `;
    $("head").append(customStyle);
  };

  self.buildHtml = () => {
    const {
      versusOverlay,
      versusPreview,
      versusContainer,
      headDiv,
      headTitle,
      contentDiv,
      productMainDiv,
      productItemCard,

      productImg,
      productTitle,
      productPrice,
      productOldPrice,
      addToCartButton,
      prevButton,
      nextButton,
      sliderContainer,
    } = classes;

    const {
      title,
      sizeDown,
      closeButton,
      itemImg,
      itemName,
      itemPrice,
      itemOldPrice,
      buttonText,
      sliderButton,
    } = config.mainModal;

    const productCards = itemName
      .map((name, i) => {
        return `
   
       <div class="${productItemCard}">
                       <img  class="${productImg}" src="${itemImg[i]}" />
                       <h3 class="${productTitle}" >${name}</h3>
                       <p class="${productPrice}" >${itemPrice[i]}</p>
                       <p class="${productOldPrice}" >${itemOldPrice[i]}</p>
                       <button class="${addToCartButton}" >${buttonText}</button>
                    </div>
   
   `;
      })
      .join("");

    const html = `
     
         <div class="${versusOverlay}">
           <div class="${versusPreview}">
              <div class="${versusContainer}">
                <div class="${headDiv}">
                    <h2 class="${headTitle}">${title}</h2>
                    <div>
                        <button>${sizeDown}</button> 
                        <button>${closeButton}</button> 
                    </div>
                </div>
                <div class="${contentDiv}">
                  <button class="${sliderButton} ${prevButton}" ><</button>
                 <div class="${sliderContainer}">
                  <div class=${productMainDiv}>
                     
                  ${productCards}
                  
                    </div>  
                  </div>
                  <button class="${sliderButton} ${nextButton}">></button>
                </div>

              </div>
           </div>
         </div>

     
     
     `;

    $("body").append(html);
  };

  //Fonksiyon

  self.copyStorage = () => {
    const { myStorageKey, sourceKey } = config.storage;
    const { productImg } = selectors;
    // Veriyi oku
    if (localStorage.getItem(sourceKey) === undefined || null) {
      console.error("data yok");
    }
    const raw = localStorage.getItem(sourceKey);

    if (!raw) {
      console.warn(`veri yok.`);
      return;
    }
    try {
      // JSON olarak parse et
      let parsed = JSON.parse(raw);

      // Yeni key'e tekrar yaz
      localStorage.setItem(myStorageKey, JSON.stringify(parsed));

      console.log("veri kopyalandı");
      console.log(JSON.parse(localStorage.getItem(myStorageKey)));

      const products = parsed?.data?.tr_TR;

      config.mainModal.itemName = products.map((item) =>
        decodeURIComponent(item.name)
      );

      config.mainModal.itemUrl = products.map((item) => item.url);
      config.mainModal.itemImg = products.map((item) => item.img);
      config.mainModal.itemPrice = products.map((item) => item.price);
      config.mainModal.itemOldPrice = products.map(
        (item) => item.originalPrice
      );

      $(productImg).attr("src", config.mainModal.itemImg[0]);
    } catch (e) {
      console.error("JSON parse hatası:", e);
    }
  };

  //fonksiyonlar

  let currentIndex = 0;

  self.initSlider = () => {
    const { productMainDivi } = selectors;
    const $slider = $(productMainDiv);

    const slide = (direction) => {
      const total = $slider.children().length;
      const cardWidth = $slider.children().outerWidth(true);

      if (direction === "next") {
        if (currentIndex < total - 1) {
          currentIndex++;
        }
      } else {
        if (currentIndex > 0) {
          currentIndex--;
        }
      }

      $slider.css({
        transform: `translateX(-${currentIndex * cardWidth}px)`,
        transition: "transform 0.5s ease",
      });
    };

    $(".mrt-ins-prevBtn").on("click", () => slide("prev"));
    $(".mrt-ins-nextBtn").on("click", () => slide("next"));
  };
  self.initSlider = () => {
    const { productMainDiv, prevBtn, nextBtn } = selectors;
    const { itemsPerView } = config.slider;
    const totalItems = config.mainModal.itemName.length;
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    self.updateSlider = () => {
      const $slider = $(productMainDiv);
      const slideWidth = 100 / itemsPerView;
      const translateX = -(config.slider.currentIndex * slideWidth);

      $slider.css({
        transform: `translateX(${translateX}%)`,
      });

      // Button durumlarını güncelle
      $(prevBtn).prop("disabled", config.slider.currentIndex === 0);
      $(nextBtn).prop("disabled", config.slider.currentIndex >= maxIndex);
    };

    self.slideNext = () => {
      if (config.slider.currentIndex < maxIndex) {
        config.slider.currentIndex++;
        self.updateSlider();
      }
    };

    self.slidePrev = () => {
      if (config.slider.currentIndex > 0) {
        config.slider.currentIndex--;
        self.updateSlider();
      }
    };

    // İlk durumu ayarla
    self.updateSlider();
  };

  self.bindEvents = () => {
    const { prevBtn, nextBtn, closeBtn, versusOverlay } = selectors;

    // Slider butonları
    $(document).on("click", prevBtn, self.slidePrev);
    $(document).on("click", nextBtn, self.slideNext);

    // Kapatma butonları
    $(document).on("click", closeBtn, self.closeModal);
    $(document).on("click", versusOverlay, (e) => {
      if (e.target === e.currentTarget) {
        self.closeModal();
      }
    });

    // Klavye desteği
    $(document).on("keydown", (e) => {
      if (e.key === "Escape") {
        self.closeModal();
      } else if (e.key === "ArrowLeft") {
        self.slidePrev();
      } else if (e.key === "ArrowRight") {
        self.slideNext();
      }
    });
  };

  self.closeModal = () => {
    const { versusOverlay, style } = selectors;
    $(versusOverlay).remove();
    $(style).remove();
  };

  self.init();
})({});
