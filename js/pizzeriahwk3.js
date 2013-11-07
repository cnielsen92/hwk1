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

    });