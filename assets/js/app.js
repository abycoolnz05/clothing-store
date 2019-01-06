  (function(){ 
  var cart = {items:[],total:''};  
  //Add to cart
  var addToCart = function(product,qty){
    qty = qty || 1;
    var cart = getCart();
    var indexOfId = cart.items.findIndex(x => x.id == product.id);

    if(indexOfId === -1){
      cart.items.push(
        {
          id: product.id,
          name:product.name,
          price:product.price,
          qty: qty
        });      
    }else{
      cart.items[indexOfId].qty++;
    }
    
    //Update popup cart
    updateCart(cart);
  }
  
  var getProductValues = function(element){
    var productId = $(element).parent().find('.my-cart-id').attr('id');
    var productName = $(element).parent().find('.my-cart-name').html();
    var productPrice = $(element).parent().find('.my-cart-price').html();
    return {id:productId,name:productName,price:productPrice};
  }
  
  $('.my-cart-add').on('click',function(){
    var product = getProductValues(this);
    addToCart({id:product.id,name:product.name,price:product.price});
  });
  
  //Update cart function
  var updateCart = function(cart){
     var totalCount = 0;
    
     //Add to shopping cart dropdown
     $('.shopping-cart-items').html('');
     for(var i =0; i < cart.items.length; i++){ 
       totalCount += cart.items[i].qty;

       $('.shopping-cart-items').append(
         '<li class="clearfix">'+
         '<div class="my-cart-item">'+
         '<div>'+cart.items[i].name+'</div>'+
         '<div>'+cart.items[i].qty+ ' x '+cart.items[i].price+'</div>'+
         '<div class="my-cart-remove-container">'+
         '<i id="my-cart-remove'+ i +'"class="fa fa-times my-cart-remove" aria-hidden="true">'+
         '</div>'+
         '</i>'
       );
       
    	(function(){
         var currentIndex = i;
         $('#my-cart-remove'+currentIndex).on('click',function(){
           removeFromCart(cart.items[currentIndex].id);
         });
       })();
      }    
      //Update Counter
      updateCounter(totalCount);
    }
  
  //Update cart quantity by id
  var updateQuantity = function(id,qty){
    var cart = getCart();
    var cartIndex = cart.items.findIndex(x => x.id == id);
    cart.items[cartIndex].qty = qty;
    //Update popup cart
    updateCart(cart);
  };
  
  //Remove from cart on id
  var removeFromCart = function(id){
    var cart = getCart();
    var cartIndex = cart.items.findIndex(x => x.id == id);
    
    cart.items.splice(cartIndex,1);
    //Update popup cart
    updateCart(cart);
  };
  
  //Get Cart
  var getCart = function(){
    var myCart = cart;
      return myCart;
  } 
  //Update counter 
  var updateCounter = function(val){
    $('.my-cart-counter').html(val);
  }
  
  //Event Listeners

  //Toggle cart on icon click
  $("#cart").on("click", function(e) {
    e.stopPropagation();
    $(".shopping-cart").fadeToggle( "fast"); 
  });

  //Toggle cart on Mouseover
  $("#cart").on("mouseover", function(e) {
    e.stopPropagation();
    $(".shopping-cart").fadeToggle( "fast"); 
  });
  //Close popup on body click
  $('body').click(function(e){
     e.preventDefault();
     $(".shopping-cart").fadeOut( "fast");  
  });
   
  //Prevent close on popup click
  $('.my-cart-popup').on('click', function(e){
     e.stopPropagation();
  });  
})();