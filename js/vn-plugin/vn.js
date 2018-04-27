/*

Plugin: Virtual Phone Number Selling Form
Version: 1.0
Author: themelooks
Author Profile: https://themeforest.net/user/themelooks

NOTE:
------
PLEASE DO NOT EDIT THIS JS FILE.
WE MAY RELEASE FUTURE UPDATES, SO IT WILL OVERWRITE THIS FILE.

*/

;(function ($) {
    'use strict';
    
    $(function () {
        /* -------------------------------------------------------------------------*
         * SELECTMENU
         * -------------------------------------------------------------------------*/
        var $selectMenu = $('.SelectMenu');
            
        if ( $selectMenu.length ) {
            $selectMenu.selectmenu();
        }

        /* -------------------------------------------------------------------------*
         * PHONE NUMBER PRICES AREA
         * -------------------------------------------------------------------------*/
        // Caching phone number prices area object
        var pNumPricesObj = {};
        
        // Caching phone number price elements
        pNumPricesObj.$el = $('#phoneNumPrices');
        
        pNumPricesObj.$pNumStockCountry = pNumPricesObj.$el.find('.PNumStockCountry');
        pNumPricesObj.$pNumStockCategory = pNumPricesObj.$el.find('.PNumStockCategory');
        pNumPricesObj.$pNumStockNumbers = pNumPricesObj.$el.find('.PNumStockNumbers');
        
        pNumPricesObj.$pricePlans = pNumPricesObj.$el.find('.PNumPricePlans');
        
        pNumPricesObj.$callFPrices = pNumPricesObj.$el.find('.PNumCallFPrices');
        pNumPricesObj.$callFSlider = pNumPricesObj.$el.find('.PNumCallFSlider');
        pNumPricesObj.$callFMinutes = pNumPricesObj.$el.find('.PNumCallFMinutes');
        pNumPricesObj.$callFSliderStatus = [0, 0, 0];
        
        pNumPricesObj.$panelTable = pNumPricesObj.$el.find('.PNumPricesPanelTable');
        
        pNumPricesObj.$pNumSetupFee = pNumPricesObj.$el.find('.PNumSetupFee');
        pNumPricesObj.$pNumPlanPrice = pNumPricesObj.$el.find('.PNumPlanPrice');
        pNumPricesObj.$pNumMonthlyFee = pNumPricesObj.$el.find('.PNumMonthlyFee');
        pNumPricesObj.$pNumInCallsPrice = pNumPricesObj.$el.find('.PNumInCallsPrice');
        pNumPricesObj.$callFPrice = pNumPricesObj.$el.find('.PNumCallFPrice');
        
        pNumPricesObj.$pNumPricesSum = pNumPricesObj.$el.find('.PNumPricesSum');
        
        // Update Phone Number Stock Prices
        pNumPricesObj.updatePNumSPrices = function (e) {
            var value = pNumPricesObj.$pNumStockCountry.val().split(';'),
                setupFee = value[4] === 'N/A' ? false : parseFloat( value[4] ),
                monthlyFee = value[2] === 'N/A' ? false : parseFloat( value[2] ),
                inCallsPrice = value[3] === 'N/A' ? false : parseFloat( value[3] );
                
            if ( setupFee ) {
                pNumPricesObj.$pNumSetupFee.html('<td>One Time Setup Fee</td><td data-price="' + setupFee + '">$' + setupFee.toFixed(2) + '</td>');
            } else {
                pNumPricesObj.$pNumSetupFee.empty();
            }
            
            if ( monthlyFee ) {
                pNumPricesObj.$pNumMonthlyFee.html('<td>Monthly Fee</td><td data-price="' + monthlyFee + '">$' + monthlyFee.toFixed(2) + '</td>');
            } else {
                pNumPricesObj.$pNumMonthlyFee.empty();
            }
            
            if ( inCallsPrice ) {
                var inCallsMinutes = '';
                pNumPricesObj.$callFSliderStatus[1] = 1;
                
                if ( pNumPricesObj.$callFSliderStatus[0] === 1 ) {
                    inCallsMinutes = pNumPricesObj.$callFSlider.slider('value');
                    inCallsPrice = inCallsMinutes * inCallsPrice;
                }
                
                pNumPricesObj.$pNumInCallsPrice.html('<td>Incoming calls (<span class="PNumCallFMinutes">' + inCallsMinutes + '</span> minutes)</td><td data-price="' + inCallsPrice + '">$' + inCallsPrice.toFixed(2) + '</td>');
                
                // Re-cache Call Forwording Minutes Element
                pNumPricesObj.$callFMinutes = pNumPricesObj.$el.find('.PNumCallFMinutes');
            } else {
                pNumPricesObj.$callFSliderStatus[1] = 0;
                
                pNumPricesObj.$pNumInCallsPrice.empty();
            }
            
            if ( pNumPricesObj.$callFSliderStatus[0] === 1 ) {
                // Enable/Disable call forwarding slider
                pNumPricesObj.$disableCallFSlider();
                    
                // Update sum of total price
                pNumPricesObj.updatePricesSum();
            }
        };

        // Populate Phone Number Stocks Countries
        pNumPricesObj.populateStockCountries = function () {
            var i = 0, isSelected, priceList = pNumPricesObj.inCallPriceList;
            
            for ( i; i < priceList.length; i++ ) {
                isSelected = priceList[i].selected === true ? 'selected' : '';
                
                pNumPricesObj.$pNumStockCountry.append('<option value="' + i + ';' + priceList[i].country_code + ';' + priceList[i].monthly_fee + ';' + priceList[i].incoming_calls_fee + ';' + priceList[i].setup_fee + '" ' + isSelected + '>' + priceList[i].country + '</option>');
            }
        };
        
        // Populate Phone Number Stocks
        pNumPricesObj.populateStockNumbers = function (numbers) {
            var trimedValue = numbers[0].replace(/-|\s+/g, ''),
                i = 1;
            
            pNumPricesObj.$pNumStockNumbers.empty().append('<option value="' + trimedValue + '" selected>' + numbers[0] + '</option>');
            
            for ( i; i < numbers.length; i++ ) {
                trimedValue = numbers[i].replace(/-|\s+/g, '');

                pNumPricesObj.$pNumStockNumbers.append('<option value="' + trimedValue + '">' + numbers[i] + '</option>');
            }
        };
        
        // Change Phone Number Stocks
        pNumPricesObj.chnageStockNumbers = function () {
            var countryIndx = pNumPricesObj.$pNumStockCountry.val().split(';')[0],
                categoryIndx = pNumPricesObj.$pNumStockCategory.val(),
                numbers = pNumPricesObj.inCallPriceList[ countryIndx ].categories[ categoryIndx ].stock_numbers,
                trimedValue = numbers[0].replace(/-|\s+/g, ''),
                i = 1;
                
            pNumPricesObj.$pNumStockNumbers.empty().append('<option value="' + trimedValue + '" selected>' + numbers[0] + '</option>');

            for ( i; i < numbers.length; i++ ) {
                trimedValue = numbers[i].replace(/-|\s+/g, '');

                pNumPricesObj.$pNumStockNumbers.append('<option value="' + trimedValue + '">' + numbers[i] + '</option>');
            }
            
            pNumPricesObj.$pNumStockNumbers.selectmenu('refresh');
        };
        
        // Populate Phone Number Stocks Categories
        pNumPricesObj.populateStockCategories = function () {
            var countryIndx = pNumPricesObj.$pNumStockCountry.val().split(';')[0],
                categories = pNumPricesObj.inCallPriceList[ countryIndx ].categories,
                i = 1;
            
            if ( typeof categories === 'undefined' ) {
                pNumPricesObj.$pNumStockCategory.empty();
                pNumPricesObj.$pNumStockCategory.selectmenu('refresh').selectmenu('disable');
                
                pNumPricesObj.$pNumStockNumbers.empty();
                pNumPricesObj.$pNumStockNumbers.selectmenu('refresh').selectmenu('disable');
            } else {
                pNumPricesObj.$pNumStockCategory.empty().append('<option value="' + 0 + '" selected>' + categories[0].category_title + '</option>');
                pNumPricesObj.populateStockNumbers( categories[0].stock_numbers );
                
                for ( i; i < categories.length; i++ ) {
                    pNumPricesObj.$pNumStockCategory.append('<option value="' + i + '">' + categories[i].category_title + '</option>');
                }
                
                pNumPricesObj.$pNumStockCategory.selectmenu('refresh').selectmenu('enable');
                pNumPricesObj.$pNumStockNumbers.selectmenu('refresh').selectmenu('enable');
            }
        };
        
        if ( pNumPricesObj.$pNumStockCountry.length ) {
            $.getJSON('js/vn-plugin/json/numbers-stock.json', function (res) {
                pNumPricesObj.inCallPriceList = res;
            }).done(function () {
                pNumPricesObj.populateStockCountries();
                
                pNumPricesObj.$pNumStockCountry.selectmenu('refresh');
                pNumPricesObj.updatePNumSPrices();
                
                pNumPricesObj.populateStockCategories();
            });
        }
        
        pNumPricesObj.$el
            .on('selectmenuchange', '.PNumStockCountry', pNumPricesObj.updatePNumSPrices)
            .on('selectmenuchange', '.PNumStockCountry', pNumPricesObj.populateStockCategories)
            .on('selectmenuchange', '.PNumStockCategory', pNumPricesObj.chnageStockNumbers);
        
        // Update sum of total price
        pNumPricesObj.updatePricesSum = function () {
            var pricesSum = 0;
            
            pNumPricesObj.$panelTable.find('td[data-price]').each(function () {
                var $t = $(this), price;
                
                price = $t.attr('data-price');
                pricesSum = pricesSum + parseFloat( price );
            });
            
            pNumPricesObj.$pNumPricesSum.text( '$' + pricesSum.toFixed(2) );
        };
        
        if ( pNumPricesObj.$pNumPricesSum.length ) {
            // Update sum of total price
            pNumPricesObj.updatePricesSum();
        }
        
        // Update Call Forwarding Prices
        pNumPricesObj.updateCallFPrices = function (e) {
            var value = $(e.target).val();
            
            if ( parseFloat( value ) === 0 ) {
                pNumPricesObj.$callFSliderStatus[2] = 0;
                
                // Update Panel Call Forwarding Price
                pNumPricesObj.$callFPrice.empty();
            } else {
                pNumPricesObj.$callFSliderStatus[2] = 1;
                
                // Update Panel Call Forwarding Price
                var cFMinutes = pNumPricesObj.$callFSlider.slider('value'),
                    cFValue = cFMinutes * value;
                
                pNumPricesObj.$callFPrice.html('<td>Call Forwarding (<span class="PNumCallFMinutes">' + cFMinutes + '</span> minutes)</td><td data-price="' + cFValue + '">$' + cFValue.toFixed(2) + '</td>');
                
                // Re-cache Call Forwording Minutes Element
                pNumPricesObj.$callFMinutes = pNumPricesObj.$el.find('.PNumCallFMinutes');
            }
                    
            // Enable/Disable call forwarding slider
            pNumPricesObj.$disableCallFSlider();
        };
        
        // Populate Call Forwarding Prices
        pNumPricesObj.populateCallFPrices = function (res) {
            for ( var i = 0; i < res.length; i++ ) {
                pNumPricesObj.$callFPrices.append('<option value="' + res[i].price + '">' + res[i].country + '</option>');
            }
        };
        
        // Call Forwarding Prices
        if ( pNumPricesObj.$callFPrices.length ) {
            $.getJSON('js/vn-plugin/json/call-forwarding-prices.json', pNumPricesObj.populateCallFPrices).done(function () {
                pNumPricesObj.$callFPrices.selectmenu('refresh');
            });
        }

        pNumPricesObj.$el
            .on('selectmenuchange', '.PNumCallFPrices', pNumPricesObj.updateCallFPrices)
            .on('selectmenuchange', '.PNumCallFPrices', pNumPricesObj.updatePricesSum);
        
        // Enable/Disable call forwarding slider
        pNumPricesObj.$disableCallFSlider = function () {
            if ( pNumPricesObj.$callFSliderStatus[1] === 0 && pNumPricesObj.$callFSliderStatus[2] === 0 ) {
                pNumPricesObj.$callFSlider.slider('disable');
            } else {
                pNumPricesObj.$callFSlider.slider('enable');
            }
        };
        
        // Call Forwarding Prices Slider
        if ( pNumPricesObj.$callFSlider.length ) {
            pNumPricesObj.$callFSlider.slider({
                value: 1,
                max: 1000,
                create: function () {
                    // Update call forwarding minutes
                    pNumPricesObj.$callFMinutes.text('1');
                    
                    // Set value one after slider has finished init
                    pNumPricesObj.$callFSliderStatus[0] = 1;
                    
                    // Disable call forwarding slider
                    pNumPricesObj.$disableCallFSlider();
                },
                slide: function ( e, ui ) {
                    // Update call forwarding minutes
                    pNumPricesObj.$callFMinutes.text(ui.value);
                    
                    // Update panel call forwarding price
                    ui.cFEl = pNumPricesObj.$callFPrice.find('td[data-price]');
                    ui.cFValue = ui.cFEl.data('price') * ui.value;
                    
                    ui.cFEl.text( '$' + ui.cFValue.toFixed(2) ).attr( 'data-price', ui.cFValue.toFixed(2) );
                    
                    if ( pNumPricesObj.$callFSliderStatus[1] === 1 ) {
                        var $inCPrice = pNumPricesObj.$pNumInCallsPrice.children('td[data-price]'),
                            inCPriceValue = $inCPrice.data('price') * ui.value;

                        $inCPrice.text( '$' + inCPriceValue.toFixed(2) ).attr( 'data-price', inCPriceValue );
                    }
                    
                    // Update sum of total price
                    pNumPricesObj.updatePricesSum();
                }
            });
        }
        
        // Show phone number plans price
        pNumPricesObj.showPNumPlansPrice = function (e) {
            // Price value
            var price = $(e.target).val().split(';');
            
            // Console price
            if ( parseFloat( price[1] ) === 0 ) {
                pNumPricesObj.$pNumPlanPrice.empty();
            } else {
                pNumPricesObj.$pNumPlanPrice.html('<td>' + price[0] + '</td><td data-price="' + price[1] + '">$' + price[1] + '</td>');
            }
        };
        
        // Show phone number plans price
        pNumPricesObj.$el
            .on('selectmenuchange', '.PNumPricePlans', pNumPricesObj.showPNumPlansPrice)
            .on('selectmenuchange', '.PNumPricePlans', pNumPricesObj.updatePricesSum);
    });
})(jQuery);
