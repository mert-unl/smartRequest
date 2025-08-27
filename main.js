((self) => {
  "use strict";

  const config = {
    mainModal: {
      title: "Compare Products",
      sizeDown: "-",
      closeButton: "x",
      itemUrl: [],
      itemImg: [],
      itemName: [
        "asda",
        "asda",
        "sadasda",
        "sadasd",
        "asdasd",
        "product6",
        "product7",
        "product8",
      ],
      itemPrice: [3242, 3423, 5436, 5234, 2344, 1234, 5678, 9999],
      itemOldPrice: [3421, 4000, 6000, 6000, 3000, 1500, 6000, 12000],
      buttonText: "Add To Cart",
    },
    smallModal: {
      title: "Recently Viewed",
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
    sliderButton: "mrt-ins-sliderButton",
    headButtons: "mrt-ins-headButtons",
    headClose: "mrt-ins-head-close",
    headDown: "mrt-ins-head-down",

    smModal: "mrt-asdasda",
    smContent: "mrtgasdasa",
    smTitle: "merasdasda",
    smSlider: "asdasad",
    smPrevButton: "asdf",
    smNextButton: "sadfgg",
    smImg: "asdfgghdghd",
    smImgCard: "sisada",
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
    self.buildCss(),
    self.updateSlider(),
    self.setEvents()
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
      prevButton,
      nextButton,
      headButtons,
      headClose,
      headDown,
      smModal,
      smTitle,
      smSlider,
      smPrevButton,
      smNextButton,
      smImg,
      smImgCard,
      smContent,
    } = selectors;

    const customStyle = `
        <style class=${style}>
         
         ${versusOverlay}{
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background: rgba(0, 0, 0, 0.7);
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
            background-color: #aa1a10ff;
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
           flex:1;
           margin:0px;
           padding:0px;
           align-items:center;
           }


          ${productMainDiv}{
          display:flex;
          flex-direction:row;
          transition: transform 0.6s ease;
          }


          ${sliderContainer}{
           flex: 1;
           overflow: hidden;
           position: relative;
         }

   
    
           ${productItemCard}{
           display:flex;
           flex-direction:column;     
          max-width:160px;
          padding:6px;
         }


         ${productImg}{
         height:160px;    
           }

          ${productTitle}{
         font-weight:bold;
         font-size:12px;
         max-width:130px;
        height:60px;
        margin-top:4px;
        line-height:1.1;
         }


           ${productPrice}{
         color:red;
         font-weight:bold;
         font-size16px;
         }

           ${productOldPrice}{
            color: gray;           
            text-decoration: line-through; 
            font-size:13px;
            margin-bottom:5px;
            }

           ${addToCartButton}{
            background-color:white;
            color:black;
            font-weight:bold;
            width:100%;
            font-size:12px;
            border:1.5px solid #c92c21ff;
            padding:2px 10px;
            margin-top:10px;

            }


          ${addToCartButton}:hover{
            background-color: #e43529ff;
            color:white;
             cursor:pointer;
            font-size:13px;
            transition: all 0.2s ease-in;
         }

        ${sliderButton}{
          color:white;
        }

        ${nextButton}{
           color: #c92c21ff;
          font-weight:bold;
          font-size:42px;
          background-color:white;
          border:none;
          padding:10px;
          cursor:pointer;
        }

        ${prevButton}{
           color: #c92c21ff;
          font-weight:bold;
          font-size:42px;
          background-color:white;
          border:none;
          padding:10px;
          cursor:pointer;
        }

        ${prevButton}:disabled{
        cursor:default;
        color:gray;
        }

        ${nextButton}:disabled{
          cursor:default;
          color:gray;
        }
        

        ${headButtons}{
        background-color: #861d02ff;
        border:none;
        text-align:center;
        font-size:16px;
         font-family:Arial;
        padding:0px 8px;
        color:white;
        margin-left:4px;
        cursor:pointer;
        }

        ${headButtons}:hover{
          background-color: #6b1904ff;
        }


        ${smModal}{
        position:fixed;
        top:50%;
        right:0;
        z-index:309453403;
        height:400px;
        width:80px;
        overflow:hidden;
        display:flex;
        flex-direction:column;
        border:2px solid  #cc0707ff;
        transform: translate(0%,-50%);
        border-top-left-radius:12px;
        border-top-right-radius:12px;
                background-color:black;
                
        }

        ${smContent}{
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
        }

         ${smTitle}{
          color:white;
          background-color: #cc0707ff;
          text-align:center;
          padding:5px;
          font-family:Arial;
          font-size:12px;
          margin:0px;
        }

         ${smSlider}{
           overflor:hidden;
           z-index:-10;
         }

       
          
         ${smPrevButton}{
           background-color:white;
           border:none;
           color:red;
           font-weight:bold;
           font-size:32px;
           height:30px;
           margin-top:0;
           padding-top:0;
           text-align:center;
           width:30px;
          cursor:pointer;
        }

         ${smNextButton}{
           background-color:white;
           border:none;
           color:red;
           font-weight:bold;
           font-size:26px;
           height:30px;
           width:30px;
            cursor:pointer;
           }

         ${smImg}{
             height:85px;
             background-color:red;
             margin-top:7px;
         
             }
         
         ${smImgCard}{

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
      headButtons,
      headDown,
      headClose,
      smModal,
      smTitle,
      smSlider,
      smPrevButton,
      smNextButton,
      smImg,
      smImgCard,
      smContent,
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
            <img class="${productImg}" src="${itemImg[i]}" />
            <h3 class="${productTitle}" >${name}</h3>
            <p class="${productPrice}" >${itemPrice[i]} TL</p>
            <p class="${productOldPrice}" >${itemOldPrice[i]} TL</p>
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
                        <button class="${headDown} ${headButtons}">${sizeDown}</button> 
                        <button class="${headClose} ${headButtons}">${closeButton}</button> 
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
    const productImages = itemName
      .map((name, i) => {
        return `
        <div class="asdaasda">
            <img class="${smImg}" src="${itemImg[i]}" />
        </div>
   `;
      })
      .join("");
    const downSizeHtml = `
          <div class="${smModal}">
              <div ckass=${smContent}">
                <h3  class="${smTitle}">${config.smallModal.title}</h3>
                <button class="${smPrevButton}">^</button>
                <div class="${smSlider}">
                   ${productImages}
                </div>
                <button class="${smNextButton}">v</button>
          </div>
        </div>
    `;

    $("body").append(downSizeHtml);
  };

  //Fonksiyon

  self.copyStorage = () => {
    const { myStorageKey, sourceKey } = config.storage;
    const { itemName, itemUrl, itemImg, itemOldPrice, itemPrice } =
      config.mainModal;
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
      let parsed = JSON.parse(raw);

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

      $(productImg).attr("src", itemImg[0]);
    } catch (e) {
      console.error("JSON parse hatası:", e);
    }
  };

  //fonksiyonlar

  self.updateSlider = () => {
    const {
      productMainDiv,
      prevButton,
      nextButton,
      smSlider,
      smPrevButton,
      smNextButton,
    } = selectors;

    const totalItems = config.mainModal.itemName.length;

    const $slider = $(productMainDiv);
    const $smSlider = $(smSlider);

    const itemsPerView = config.slider.itemsPerView;
    const shift = 100 / itemsPerView;

    $slider.children().css("flex", `0 0 ${shift}%`);
    $smSlider.children().css("flex", `0 0 ${shift}%`);

    const translateX = -(config.slider.currentIndex * shift);
    $slider.css({
      transform: `translateX(${translateX}%)`,
    });

    const translateY = -(config.slider.currentIndex * shift);
    $smSlider.css({
      transform: `translateY(${translateY}%)`,
    });

    $(prevButton).prop("disabled", config.slider.currentIndex === 0);
    $(nextButton).prop(
      "disabled",
      config.slider.currentIndex >= totalItems - itemsPerView
    );

    $(smPrevButton).prop("disabled", config.slider.currentIndex === 0);
    $(smNextButton).prop(
      "disabled",
      config.slider.currentIndex >= totalItems - itemsPerView
    );
  };

  self.slideNext = () => {
    const totalItems = config.mainModal.itemName.length;
    const maxIndex = totalItems - config.slider.itemsPerView;
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

  self.setEvents = () => {
    const {
      prevButton,
      nextButton,
      versusOverlay,
      headClose,
      smPrevButton,
      smNextButton,
    } = selectors;

    $(document).on("click", headClose, () => {
      $(versusOverlay).remove();
    });

    $(document).on("click", prevButton, self.slidePrev);
    $(document).on("click", nextButton, self.slideNext);

    $(document).on("click", smPrevButton, self.slidePrev);
    $(document).on("click", smNextButton, self.slideNext);
  };

  self.init();
})({});
