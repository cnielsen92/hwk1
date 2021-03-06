$(function() {
    
        var idx;
        var pizza;
        var instance;
        var container = $('.1');
        var vegContainer = $('.2');
        var template = $('.template');

        for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
            pizza = com.dawgpizza.menu.pizzas[idx];
            
            instance = template.clone();
            instance.find('.name').html(pizza.name);
            instance.find('.description').html(pizza.description);
            instance.find('.price').html("$" + pizza.prices[0] + "  $" + pizza.prices[1] + "  $" + pizza.prices[2]);
            instance.find('.priceOrder').html("$" + pizza.prices[0]);
            instance.find('.priceOrder1').html("$" + pizza.prices[1]);
            instance.find('.priceOrder2').html("$" + pizza.prices[2]);
    
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
            instance.find('.price').html("$" + drink.price);

            instance.removeClass('dTemplate');
            containerDrink.append(instance);
        }

        var dessert;
        var containerDessert = $('.desserts');
        for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
            dessert = com.dawgpizza.menu.desserts[idx];

            instance = dTemplate.clone();
            instance.find('.name').html(dessert.name);
            instance.find('.price').html("$" + dessert.price);

            instance.removeClass('dTemplate');
            containerDessert.append(instance);
        }

        $('.add-to-cart').click(function(){
            var newCartItem = {
                type: this.getAttribute('data-type'),
                name: this.getAttribute('data-name'),
                size: this.getAttribute('data-size'),
                price: this.getAttribute('data-price')
            };
        });

        var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
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
        
        //TODO: validate the cart to make sure all the required
        //properties have been filled out, and that the 
        //total order is greater than $20 (see homework 
        //instructions) 

        postCart(cart, $('.cart-form'));
    });

    }); //doc ready

    function renderCart(cart, container) {
        var idx, item;
        
        //empty the container of whatever is there currently
        container.empty();

        //for each item in the cart...
        for (idx = 0; idx < cart.items.length; ++idx) {
            item = cart.items[idx];
            return totalPrice.toFixed(2);

            //TODO: code to render the cart item

        } //for each cart item

        //TODO: code to render sub-total price of the cart
        //the tax amount (see instructions), 
        //and the grand total
        return view;

    } //renderCart()

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
        cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

        //submit the form--this will navigate to an order confirmation page
        cartForm.submit();

    } //postCart()