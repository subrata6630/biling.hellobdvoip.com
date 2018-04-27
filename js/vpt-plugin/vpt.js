/*

Plugin: VOIP Pricing Table - VOIP Calling Rates, SMS Rates, Mobile Top Up Rates Calculator
Version: 1.3
Author: themelooks
Author Profile: https://themeforest.net/user/themelooks

NOTE:
------
PLEASE DO NOT EDIT THIS JS FILE.
WE MAY RELEASE FUTURE UPDATES, SO IT WILL OVERWRITE THIS FILE.

*/

;(function ($) {
    'use strict';

    /* -------------------------------------------------------------------------*
     * CURRENCY LIST
     * -------------------------------------------------------------------------*/
    var currencyList = {"AED": "United Arab Emirates Dirham", "AFN": "Afghan Afghani", "ALL": "Albanian Lek", "AMD": "Armenian Dram", "ANG": "Netherlands Antillean Guilder", "AOA": "Angolan Kwanza", "ARS": "Argentine Peso", "AUD": "Australian Dollar", "AWG": "Aruban Florin", "AZN": "Azerbaijani Manat", "BAM": "Bosnia-Herzegovina Convertible Mark", "BBD": "Barbadian Dollar", "BDT": "Bangladeshi Taka", "BGN": "Bulgarian Lev", "BHD": "Bahraini Dinar", "BIF": "Burundian Franc", "BMD": "Bermudan Dollar", "BND": "Brunei Dollar", "BOB": "Bolivian Boliviano", "BRL": "Brazilian Real", "BSD": "Bahamian Dollar", "BTC": "Bitcoin", "BTN": "Bhutanese Ngultrum", "BWP": "Botswanan Pula", "BYN": "New Belarusian Ruble", "BYR": "Belarusian Ruble", "BZD": "Belize Dollar", "CAD": "Canadian Dollar", "CDF": "Congolese Franc", "CHF": "Swiss Franc", "CLF": "Chilean Unit of Account (UF)", "CLP": "Chilean Peso", "CNY": "Chinese Yuan", "COP": "Colombian Peso", "CRC": "Costa Rican Colón", "CUC": "Cuban Convertible Peso", "CUP": "Cuban Peso", "CVE": "Cape Verdean Escudo", "CZK": "Czech Republic Koruna", "DJF": "Djiboutian Franc", "DKK": "Danish Krone", "DOP": "Dominican Peso", "DZD": "Algerian Dinar", "EGP": "Egyptian Pound", "ERN": "Eritrean Nakfa", "ETB": "Ethiopian Birr", "EUR": "Euro", "FJD": "Fijian Dollar", "FKP": "Falkland Islands Pound", "GBP": "British Pound Sterling", "GEL": "Georgian Lari", "GGP": "Guernsey Pound", "GHS": "Ghanaian Cedi", "GIP": "Gibraltar Pound", "GMD": "Gambian Dalasi", "GNF": "Guinean Franc", "GTQ": "Guatemalan Quetzal", "GYD": "Guyanaese Dollar", "HKD": "Hong Kong Dollar", "HNL": "Honduran Lempira", "HRK": "Croatian Kuna", "HTG": "Haitian Gourde", "HUF": "Hungarian Forint", "IDR": "Indonesian Rupiah", "ILS": "Israeli New Sheqel", "IMP": "Manx pound", "INR": "Indian Rupee", "IQD": "Iraqi Dinar", "IRR": "Iranian Rial", "ISK": "Icelandic Króna", "JEP": "Jersey Pound", "JMD": "Jamaican Dollar", "JOD": "Jordanian Dinar", "JPY": "Japanese Yen", "KES": "Kenyan Shilling", "KGS": "Kyrgystani Som", "KHR": "Cambodian Riel", "KMF": "Comorian Franc", "KPW": "North Korean Won", "KRW": "South Korean Won", "KWD": "Kuwaiti Dinar", "KYD": "Cayman Islands Dollar", "KZT": "Kazakhstani Tenge", "LAK": "Laotian Kip", "LBP": "Lebanese Pound", "LKR": "Sri Lankan Rupee", "LRD": "Liberian Dollar", "LSL": "Lesotho Loti", "LTL": "Lithuanian Litas", "LVL": "Latvian Lats", "LYD": "Libyan Dinar", "MAD": "Moroccan Dirham", "MDL": "Moldovan Leu", "MGA": "Malagasy Ariary", "MKD": "Macedonian Denar", "MMK": "Myanma Kyat", "MNT": "Mongolian Tugrik", "MOP": "Macanese Pataca", "MRO": "Mauritanian Ouguiya", "MUR": "Mauritian Rupee", "MVR": "Maldivian Rufiyaa", "MWK": "Malawian Kwacha", "MXN": "Mexican Peso", "MYR": "Malaysian Ringgit", "MZN": "Mozambican Metical", "NAD": "Namibian Dollar", "NGN": "Nigerian Naira", "NIO": "Nicaraguan Córdoba", "NOK": "Norwegian Krone", "NPR": "Nepalese Rupee", "NZD": "New Zealand Dollar", "OMR": "Omani Rial", "PAB": "Panamanian Balboa", "PEN": "Peruvian Nuevo Sol", "PGK": "Papua New Guinean Kina", "PHP": "Philippine Peso", "PKR": "Pakistani Rupee", "PLN": "Polish Zloty", "PYG": "Paraguayan Guarani", "QAR": "Qatari Rial", "RON": "Romanian Leu", "RSD": "Serbian Dinar", "RUB": "Russian Ruble", "RWF": "Rwandan Franc", "SAR": "Saudi Riyal", "SBD": "Solomon Islands Dollar", "SCR": "Seychellois Rupee", "SDG": "Sudanese Pound", "SEK": "Swedish Krona", "SGD": "Singapore Dollar", "SHP": "Saint Helena Pound", "SLL": "Sierra Leonean Leone", "SOS": "Somali Shilling", "SRD": "Surinamese Dollar", "STD": "São Tomé and Príncipe Dobra", "SVC": "Salvadoran Colón", "SYP": "Syrian Pound", "SZL": "Swazi Lilangeni", "THB": "Thai Baht", "TJS": "Tajikistani Somoni", "TMT": "Turkmenistani Manat", "TND": "Tunisian Dinar", "TOP": "Tongan Paʻanga", "TRY": "Turkish Lira", "TTD": "Trinidad and Tobago Dollar", "TWD": "New Taiwan Dollar", "TZS": "Tanzanian Shilling", "UAH": "Ukrainian Hryvnia", "UGX": "Ugandan Shilling", "USD": "United States Dollar", "UYU": "Uruguayan Peso", "UZS": "Uzbekistan Som", "VEF": "Venezuelan Bolívar Fuerte", "VND": "Vietnamese Dong", "VUV": "Vanuatu Vatu", "WST": "Samoan Tala", "XAF": "CFA Franc BEAC", "XAG": "Silver (troy ounce)", "XAU": "Gold (troy ounce)", "XCD": "East Caribbean Dollar", "XDR": "Special Drawing Rights", "XOF": "CFA Franc BCEAO", "XPF": "CFP Franc", "YER": "Yemeni Rial", "ZAR": "South African Rand", "ZMK": "Zambian Kwacha (pre-2013)", "ZMW": "Zambian Kwacha", "ZWL": "Zimbabwean Dollar"};
    
    /* -------------------------------------------------------------------------*
     * COUNTRY DIAL CODES
     * -------------------------------------------------------------------------*/
    var countryDialCodes = {"Afghanistan":["+93","AFN",null],"Albania":["+355","ALL"],"Algeria":["+213","DZD"],"American Samoa":["+1-684","USD"],"Andorra":["+376","EUR"],"Angola":["+244","AOA"],"Anguilla":["+1-264","XCD"],"Antigua and Barbuda":["+1-268","XCD"],"Argentina":["+54","ARS"],"Armenia":["+374","AMD"],"Aruba":["+297","AWG"],"Australia":["+61","AUD"],"Austria":["+43","EUR"],"Azerbaijan":["+994","AZN"],"Bahamas":["+1-242","BSD"],"Bahrain":["+973","BHD"],"Bangladesh":["+880","BDT"],"Barbados":["+1-246","BBD"],"Belarus":["+375","BYN"],"Belgium":["+32","EUR"],"Belize":["+501","BZD"],"Benin":["+229","XOF"],"Bermuda":["+1-441","BMD"],"Bhutan":["+975","BTN"],"Bolivia":["+591","BOB"],"Bosnia and Herzegovina":["+387","BAM"],"Botswana":["+267","BWP"],"Brazil":["+55","BRL"],"British Indian Ocean Territory":["+246","USD"],"British Virgin Islands":["+1-284","USD"],"Brunei":["+673","BND"],"Bulgaria":["+359","BGN"],"Burkina Faso":["+226","XOF"],"Burundi":["+257","BIF"],"Cambodia":["+855","KHR"],"Cameroon":["+237","XAF"],"Canada":["+1","CAD"],"Cayman Islands":["+1-345","KYD"],"Central African Republic":["+236","XAF"],"Chad":["+235","XAF"],"Chile":["+56","CLP"],"China":["+86","CNY"],"Christmas Island":["+61","AUD"],"Colombia":["+57","COP"],"Comoros":["+269","KMF"],"Cook Islands":["+682","none"],"Costa Rica":["+506","CRC"],"Croatia":["+385","HRK"],"Cuba":["+53","CUP"],"Curacao":["+599","ANG"],"Cyprus":["+357","EUR"],"Czech Republic":["+420","CZK"],"Denmark":["+45","DKK"],"Djibouti":["+253","DJF"],"Dominica":["+1-767","XCD"],"Dominican Republic":["+1-809, 1-829, 1-849","DOP"],"Ecuador":["+593","USD"],"Egypt":["+20","EGP"],"El Salvador":["+503","USD"],"Equatorial Guinea":["+240","XAF"],"Eritrea":["+291","ERN"],"Estonia":["+372","EUR"],"Ethiopia":["+251","ETB"],"Falkland Islands":["+500","FKP"],"Fiji":["+679","FJD"],"Finland":["+358","EUR"],"France":["+33","EUR"],"French Polynesia":["+689","XPF"],"Gabon":["+241","XAF"],"Gambia":["+220","GMD"],"Georgia":["+995","GEL"],"Germany":["+49","EUR"],"Ghana":["+233","GHS"],"Gibraltar":["+350","GIP"],"Greece":["+30","EUR"],"Greenland":["+299","DKK"],"Grenada":["+1-473","XCD"],"Guam":["+1-671","USD"],"Guatemala":["+502","GTQ"],"Guernsey":["+44-1481","GGP"],"Guinea":["+224","GNF"],"Guinea-Bissau":["+245","XOF"],"Guyana":["+592","GYD"],"Haiti":["+509","HTG"],"Honduras":["+504","HNL"],"Hong Kong":["+852","HKD"],"Hungary":["+36","HUF"],"Iceland":["+354","ISK"],"India":["+91","INR"],"Indonesia":["+62","IDR"],"Iran":["+98","IRR"],"Iraq":["+964","IQD"],"Ireland":["+353","EUR"],"Isle of Man":["+44-1624","IMP"],"Israel":["+972","ILS"],"Italy":["+39","EUR"],"Jamaica":["+1-876","JMD"],"Japan":["+81","JPY"],"Jersey":["+44-1534","JEP"],"Jordan":["+962","JOD"],"Kazakhstan":["+7","KZT"],"Kenya":["+254","KES"],"Kiribati":["+686","AUD"],"Kosovo":["+383","EUR"],"Kuwait":["+965","KWD"],"Kyrgyzstan":["+996","KGS"],"Laos":["+856","LAK"],"Latvia":["+371","EUR"],"Lebanon":["+961","LBP"],"Lesotho":["+266","LSL"],"Liberia":["+231","LRD"],"Libya":["+218","LYD"],"Liechtenstein":["+423","CHF"],"Lithuania":["+370","EUR"],"Luxembourg":["+352","EUR"],"Macau":["+853","MOP"],"Madagascar":["+261","MGA"],"Malawi":["+265","MWK"],"Malaysia":["+60","MYR"],"Maldives":["+960","MVR"],"Mali":["+223","XOF"],"Malta":["+356","EUR"],"Marshall Islands":["+692","USD"],"Mauritania":["+222","MRO"],"Mauritius":["+230","MUR"],"Mayotte":["+262","EUR"],"Mexico":["+52","MXN"],"Micronesia":["+691","USD"],"Moldova":["+373","MDL"],"Monaco":["+377","EUR"],"Mongolia":["+976","MNT"],"Montenegro":["+382","EUR"],"Montserrat":["+1-664","XCD"],"Morocco":["+212","MAD"],"Mozambique":["+258","MZN"],"Namibia":["+264","NAD"],"Nauru":["+674","AUD"],"Nepal":["+977","NPR"],"Netherlands":["+31","EUR"],"New Caledonia":["+687","XPF"],"New Zealand":["+64","NZD"],"Nicaragua":["+505","NIO"],"Niger":["+227","XOF"],"Nigeria":["+234","NGN"],"Niue":["+683","NZD"],"North Korea":["+850","KPW"],"Northern Mariana Islands":["+1-670","USD"],"Norway":["+47","NOK"],"Oman":["+968","OMR"],"Pakistan":["+92","PKR"],"Palau":["+680","USD"],"Palestine":["+970","ILS"],"Panama":["+507","USD"],"Papua New Guinea":["+675","PGK"],"Paraguay":["+595","PYG"],"Peru":["+51","PEN"],"Philippines":["+63","PHP"],"Poland":["+48","PLN"],"Portugal":["+351","EUR"],"Puerto Rico":["+1-787, 1-939","USD"],"Qatar":["+974","QAR"],"Reunion":["+262","EUR"],"Romania":["+40","RON"],"Russia":["+7","RUB"],"Rwanda":["+250","RWF"],"Saint Barthelemy":["+590","EUR"],"Saint Helena":["+290","SHP"],"Saint Kitts and Nevis":["+1-869","XCD"],"Saint Lucia":["+1-758","XCD"],"Saint Martin":["+590","EUR"],"Saint Pierre and Miquelon":["+508","EUR"],"Saint Vincent and the Grenadines":["+1-784","XCD"],"Samoa":["+685","WST"],"San Marino":["+378","EUR"],"Sao Tome and Principe":["+239","STD"],"Saudi Arabia":["+966","SAR"],"Senegal":["+221","XOF"],"Serbia":["+381","RSD"],"Seychelles":["+248","SCR"],"Sierra Leone":["+232","SLL"],"Singapore":["+65","SGD"],"Sint Maarten":["+1-721","ANG"],"Slovakia":["+421","EUR"],"Slovenia":["+386","EUR"],"Solomon Islands":["+677","SBD"],"Somalia":["+252","SOS"],"South Africa":["+27","ZAR"],"South Korea":["+82","KRW"],"South Sudan":["+211","SSP"],"Spain":["+34","EUR"],"Sri Lanka":["+94","LKR"],"Sudan":["+249","SDG"],"Suriname":["+597","SRD"],"Svalbard and Jan Mayen":["+47","NOK"],"Swaziland":["+268","SZL"],"Sweden":["+46","SEK"],"Switzerland":["+41","CHF"],"Syria":["+963","SYP"],"Taiwan":["+886","TWD"],"Tajikistan":["+992","TJS"],"Tanzania":["+255","TZS"],"Thailand":["+66","THB"],"Togo":["+228","XOF"],"Tokelau":["+690","NZD"],"Tonga":["+676","TOP"],"Trinidad and Tobago":["+1-868","TTD"],"Tunisia":["+216","TND"],"Turkey":["+90","TRY"],"Turkmenistan":["+993","TMT"],"Turks and Caicos Islands":["+1-649","USD"],"Tuvalu":["+688","AUD"],"U.S. Virgin Islands":["+1-340"],"Uganda":["+256","UGX"],"Ukraine":["+380","UAH"],"United Arab Emirates":["+971","AED"],"United Kingdom":["+44","GBP"],"Uruguay":["+598","UYU"],"Uzbekistan":["+998","UZS"],"Vanuatu":["+678","VUV"],"Venezuela":["+58","VEF"],"Vietnam":["+84","VND"],"Wallis and Futuna":["+681","XPF"],"Yemen":["+967","YER"],"Zambia":["+260","ZMW"],"Zimbabwe":["+263","USD"]};

    $(function () {
        /* -------------------------------------------------------------------------*
         * RATES AREA
         * -------------------------------------------------------------------------*/
        var $rates = $('#rates'),
            $selectMenu = $rates.find('.SelectMenu');
            
        if ( $selectMenu.length ) {
            $selectMenu.selectmenu();
        }

        /* -------------------------------------------------------------------------*
         * RATES TAB
         * -------------------------------------------------------------------------*/
        var ratesObj = {},
            $ratesTabNav = $('.RatesTabNav'),
            $ratesSelectMenu = $('.RatesSelectMenu'),
            $callingRatesTab = $('#callingRatesTab'),
            $smsRatesTab = $('#smsRatesTab'),
            $freeDaysRatesTab = $('#freeDaysRatesTab');
        
        ratesObj.hideRatesSelectMenu = function (e) {
            var curValue = $(e.target).attr('href'),
                prevValue = $(e.relatedTarget).attr('href');
            
            if ( curValue === '#mobileTopUpRatesTab' ) {
                $ratesSelectMenu.hide();
            } else if ( prevValue === '#mobileTopUpRatesTab' ) {
                $ratesSelectMenu.fadeIn();
            }
        };
        
        ratesObj.saveRatesTabState = function (value) {
            if( history.pushState ) {
                value = '#' + $(value.target).attr("href").substr(1);
                
                history.pushState('', '', value);
            }
        };
        
        $ratesTabNav
            .on('shown.bs.tab', 'a', ratesObj.hideRatesSelectMenu)
            .on('shown.bs.tab', 'a', ratesObj.saveRatesTabState);
            
        // Show tab state after page refresh
        if ( $ratesTabNav.length ) {
            ratesObj.currentPageHash = window.location.hash;
            
            $ratesTabNav.find('a[href="' + ratesObj.currentPageHash + '"]').tab('show');
        }
        
        /* -------------------------------------------------------------------------*
         * RATES TABLE
         * -------------------------------------------------------------------------*/
        // Datatable
        var $ratesDatatable = $('.RatesDatatable');
        
        if ( $ratesDatatable.length ) {
            $ratesDatatable.DataTable({
                ordering: false,
                stateSave: true,
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]]
            });
        }
        
        // Rates Table Selectmenu
        var $ratesSelectCurrency = $('.RatesSelectCurrency'),
            $ratesSelectCountry = $('.RatesSelectCountry');
        
        ratesObj.ratesCurrencyList = function (res) {
            if ( $ratesSelectCurrency.length ) {
                var i = 0, data, value;
            
                for ( i; i < res.length; i++ ) {
                    data = '"USD' + res[i].currency_code + '"';
                    value = typeof value === 'undefined' ? data : value +', '+ data;
                }
                
                return value;
            }
        };

        ratesObj.populatesCurrencyList = function (rates) {
            var op1 = '', isUSD,
                iso, isoCode;

            for ( iso in rates ) {
                isoCode = iso.substring(3, 6);

                if ( $ratesSelectCurrency.length ) {
                    isUSD = isoCode === 'USD' ? ' selected' : '';

                    op1 += '<option value="'+ isoCode +';'+ rates[iso] +'"'+ isUSD +'>'+ currencyList[ isoCode ] +'</option>';
                }
            }

            $ratesSelectCurrency.append( op1 ).selectmenu('refresh');
        };

        ratesObj.populatesCountryList = function (rates) {
            if ( $ratesSelectCountry.length ) {
                var op2 = '', country_name, dial_rate;

                for ( country_name in countryDialCodes ) {
                    dial_rate = rates[ 'USD' + countryDialCodes[country_name][1] ];

                    if ( typeof dial_rate !== 'undefined' ) {
                        op2 += '<option value="'+ countryDialCodes[country_name][1] +';'+ dial_rate +';'+ countryDialCodes[country_name][0] +'">'+ country_name +'</option>';
                    }
                }

                $ratesSelectCountry.append( op2 ).selectmenu('refresh');
            }
        };
        
        if ( $ratesSelectCurrency.length ) {
            $.getJSON('js/vpt-plugin/api-key.json', function (apiKey) {
				if ( typeof apiKey.openexchangerates !== 'undefined' ) {
					
					if ( apiKey.openexchangerates.api_key !== 'YOUR_API_KEY' ) {
						var url = encodeURI('https://openexchangerates.org/api/latest.json?app_id='+ apiKey.openexchangerates.api_key +'&amp;base=USD');
						
						$.getJSON(url, function (res) {
							res.result = {};
							
							for ( var resKey in res.rates ) {
								res.result[ 'USD' + resKey ] = res.rates[ resKey ];
							}
							
							ratesObj.populatesCurrencyList( res.result );
							ratesObj.populatesCountryList( res.result );
						});
					} else if ( apiKey.currencylayer.api_key !== 'YOUR_API_KEY' ) {
						var url = encodeURI('http://apilayer.net/api/live?access_key=' + apiKey.currencylayer.api_key);
						
						$.getJSON(url, function (res) {
							ratesObj.populatesCurrencyList( res.quotes );
							ratesObj.populatesCountryList( res.quotes );
						});
					}
					
				}
            });
        }

        // Rates Table Currency Changing
        var changeRatesCur = function () {
            var value = $ratesSelectCurrency.val().split(';');
            
            // Change Currency Shorthand
            $ratesDatatable.find('thead th.th-currency').text( value[0] + '/min' );
            
            // Change Currency Rates
            $ratesDatatable.find('td[data-rate]').each(function () {
                var $t = $(this),
                    getCur = $t.data('rate'),
                    curValue = getCur * value[1];
                    
                if ( getCur !== 'FREE' ) {
                    $t.text( curValue.toFixed(3) );
                }
            });
        };
        
        $ratesSelectCurrency.on('selectmenuchange', changeRatesCur);
        $ratesDatatable.on('draw.dt', changeRatesCur);

        $ratesSelectCountry.on('selectmenuchange', function (e) {
            e.isActive = $callingRatesTab.add( $smsRatesTab ).add( $freeDaysRatesTab ).hasClass('active');

            if ( e.isActive && e.currentTarget.selectedIndex ) {
                $ratesDatatable.DataTable().search( e.currentTarget.options[ e.currentTarget.selectedIndex ].text ).draw();
            } else if ( e.isActive && !e.currentTarget.selectedIndex ) {
                $ratesDatatable.DataTable().search( '' ).draw();
            }
        });
        
        /* Mobile Topup Rates Tab */
        var $mobileTopUpRatesTab = $('#mobileTopUpRatesTab'),
            $ratesMobileTopUpPrefix = $mobileTopUpRatesTab.find('.RetesMTopUpPrefix'),
            $ratesMobileTopUpNum = $mobileTopUpRatesTab.find('.RetesMTopUpNum'),
            $ratesMobileTopUpTable = $mobileTopUpRatesTab.find('.RatesMobileTopUpTable');
        
        $mobileTopUpRatesTab.on('selectmenuchange', '.RatesSelectCountry', function (value) {
            value = $(value.target).val().split(';');
            
            $ratesMobileTopUpPrefix.val( value[2] );
            
            $mobileTopUpRatesTab.on('click', '.RetesMTopUpSubmit', function () {
                var $t = $(this);
                
                if ( $ratesMobileTopUpNum.val().length ) {
                    // Show mobile top up rates table
                    $ratesMobileTopUpTable.fadeIn();
                    
                    // Covert currencies
                    $ratesMobileTopUpTable.find('tbody tr').each(function () {
                        var $t = $(this),
                            rechargeAmount = $t.data('recharge-amount'),
                            curValue = rechargeAmount * (1 / value[1]);
                        
                        $t.html( '<td>' + rechargeAmount + ' ' + value[0] + '</td><td class="bold">' + curValue.toFixed(3) + ' USD</td>' );
                    });
                    
                    // Change button text
                    $t.text('Update Rates');
                } else {
                    $ratesMobileTopUpNum.trigger('focus');
                }
            });
        });
        
        if ( $ratesMobileTopUpTable.length ) {
            $ratesMobileTopUpTable.hide();
        }
    });
})(jQuery);
