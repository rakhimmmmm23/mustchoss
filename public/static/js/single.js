if (typeof observer === 'undefined') {
   const observer = new MutationObserver(() => {
      const flagEl = document.querySelector('.thumbs');
      if (flagEl !== null) {
         let hitOrders = $('.thumbs');
         hitOrders.owlCarousel({
            center: true,
            dots: true,
            nav: true,
            autoWidth: true,
            navText: [
               '<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.8305 23.4883L15.3422 17L21.8305 10.4975L19.833 8.5L11.333 17L19.833 25.5L21.8305 23.4883Z" fill="white"/></svg>',
               '<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1695 10.5117L18.6578 17L12.1695 23.5025L14.167 25.5L22.667 17L14.167 8.5L12.1695 10.5117Z" fill="white"/></svg>',
            ],
            items: 3,
            loop: true,

            onInitialized: function () {},
         });
      }
   });

   observer.observe(document.body, { childList: true, subtree: true });
}
