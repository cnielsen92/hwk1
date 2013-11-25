var container = $('.1');
var cart;

$(function() {
    
        var idx;
        var pizza;
        var instance;
        var vegContainer = $('.2');
        var template = $('.template');

        for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
            pizza = com.dawgpizza.menu.pizzas[idx];
            
            instance = template.clone();
            instance.find('.name').html(pizza.name);
            instance.find('.description').html(pizza.description);
            instance.find('.price').html('<button type="button" class="btn btn-warning btn-xs" data-type="pizza" data-name="' + pizza.name + '" data-size="small" data-price="' + pizza.prices[0] + '">' + "Small $" +pizza.prices[0] + '</button>' +"   " + '<button type="button" class="btn btn-warning btn-xs"data-type="pizza" data-name="' + pizza.name + '" data-size="medium" data-price="' + pizza.prices[1] + '">' + "Medium $" + pizza.prices[1] +'</button>' +"   " + '<button type="button" class="btn btn-warning btn-xs"data-type="pizza" data-name="' + pizza.name + '" data-size="large" data-price="' + pizza.prices[2] + '">' + "Large $" + pizza.prices[2] +'</button>');
            
            instance.removeClass('template');
            if (pizza.vegetarian) {
                vegContainer.append(instance);
            }
            else {
                container.append(instance);
            }

        }
        var drink;
        var dTemplate = $('.dTemplate');
        var containerDrink = $('.drinks');

        for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
            drink = com.dawgpizza.menu.drinks[idx];

            instance = dTemplate.clone();
            instance.find('.name').html(drink.name);
            instance.find('.price').html('<button type="button" class="btn btn-warning btn-xs" data-type="drink" data-name="' + drink.name + '" data-price="' + drink.price + '">' + "$" +drink.price + '</button>');

            instance.removeClass('dTemplate');
            containerDrink.append(instance);
        }

        var dessert;
        var containerDessert = $('.desserts');
        for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
            dessert = com.dawgpizza.menu.desserts[idx];

            instance = dTemplate.clone();
            instance.find('.name').html(dessert.name);
            instance.find('.price').html('<button type="button" class="btn btn-warning btn-xs" data-type="dessert" data-name="' + dessert.name + '" data-price="' + dessert.price + '">' + "$" +dessert.price + '</button>');


            instance.removeClass('dTemplate');
            containerDessert.append(instance);
        }

        cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.btn-warning').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };

        //push the new item on to the items array
        cart.items.push(newCartItem);

        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
       
        renderCart(cart, $('.cart-items-container'));

    });

    $('.place-order').click(function(){
        if (subTotal >= 20) {
            postCart(cart, $('.cartForm'));
        }
        else {
            alert("Please select an item to order!");
        }
        
    });

    $('.customer-details').submit(function(){
        var nameInput = $('.signup-form input[name="name"]');
        var value = nameInput.val();
        if (value && value.trim().length > 0)
            return true;
        else {
            alert("Only spaces is not allowed!");
            return false;           
        }
    });

    }); //doc ready

    function renderCart(cart, container) {
        var idx;
        
        //empty the container of whatever is there currently
        container.empty();
        var clonedTemplate = $('.cartTemplate');
        var subTotal = 0;
        //for each item in the cart...
        for (idx = 0; idx < cart.items.length; ++idx) {
            var item = cart.items[idx];

            var cartItem = clonedTemplate.clone().removeClass("cartTemplate");
            cartItem.html('<button type="button" class=" btn btn-warning btn-xs removeItem">x</button>' + item.name +"  $" + item.price);
            //
            cartItem.attr("data-idx", idx);

            subTotal += parseInt(cart.items[idx].price);
            container.append(cartItem);
        } //for each cart item

        $(".removeItem").click(removeItem);

        $('.subTotal').html(subTotal);
        
        var tax = subTotal*0.095

        $('.tax').html(tax.toFixed(2));
        var total = 0
        total = subTotal + tax

        $('.total').html(total.toFixed(2));

        //TODO: code to render sub-total price of the cart
        //the tax amount (see instructions), 
        //and the grand total
        // return view;

    } //renderCart()

    function removeItem() {
        var parent = $(this).parent();
        var toRemove = -1;

        for (var idx = 0; idx < cart.items.length; ++idx) {
            item = cart.items[idx];
            if (idx == parent.data("idx")) {
                toRemove = idx;
            }
        }

        cart.items.splice(toRemove, 1);

        renderCart(cart, $('.cart-items-container'));



    }

    // postCart()
    // posts the cart model to the server using
    // the supplied HTML form
    // parameters are:
    //  - cart (object) reference to the cart model
    //  - cartForm (jQuery object) reference to the HTML form
    //
    function postCart(cart, cartForm) {
        //find the input in the form that has the name of 'cart'    
        //and set it's value to a JSON representation of the cart model
        $('#jsonForm').val(JSON.stringify(cart));
        $('.customer-details').find('input[name="submit"]').trigger("click");

        //submit the form--this will navigate to an order confirmation page
        cartForm.submit();

    } //postCart()