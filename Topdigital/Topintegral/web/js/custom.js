define([
    'jquery',
    'Magento_Customer/js/customer-data'
], function ($, getTotalsAction, customerData) {
    $(document).ready(function(){
        $('.thelegendbutton').on('click', function(){
        	$('.opcionesDefault').slideDown('slow', function(){
        		$('.defaultcomposiciones').fadeOut('slow');
        		$('.defaultcomposicionesopciones').fadeOut('slow');
        		$('.mascomposicioneslegend').fadeOut('slow');
        		$('.thelegendbutton').fadeOut('slow');
        	});
        });
        $('#password, #repassword').on('keyup', function () {
          if ($('#password').val() == $('#repassword').val()) {
            $('#repassword').css("background-color", "yellow");
          } else {
            $('#repassword').css("background-color", "yellow");
          }
        });
        //funcionalidad para el bundle product de los productos por defecto con los checkbox
        $('.checkboxpreselected').change(function() {
          if ($('.checkbox.product.bundle.option.change-container-classname').length) {
                if ($(this).prop('checked')) {
                    var idproducto = $(this).attr('id');
                    $('.optiontocheked'+idproducto).prop("checked", false);
                    console.log('1');
                }
                else{
                    var idproducto = $(this).attr('id');
                    $('.optiontochekedins'+idproducto).prop("checked", true);
                    console.log('2');
                }
                $('.optiontochekedins'+idproducto).trigger('click');
                console.log($('.optiontochekedins'+idproducto).attr('name'));
                console.log(idproducto);
            }
            if($('.radio.product.bundle.option.change-container-classname').length){
                if ($(this).prop('checked')) {
                    var idproducto = $(this).attr('id');
                    $('.optiontoselect'+idproducto).trigger('click');
                }
                else{
                    var idproducto = $(this).attr('data-dontlike');
                    var producto = $('.optiontoselect'+idproducto);
                    $('.ningunoption'+idproducto).trigger('click');
                }
            }
            //miramos cual queremos para poner el precio
            var precios=0;
            if ($('.radio.product.bundle.option.change-container-classname').length) {
                $('.radio.product.bundle.option.change-container-classname').each(function () {
                    if ($(this).prop('checked')) {
                        var texto = $.trim($(this).parent('.bundle__option--price').text()),
                        textofinal=parseFloat(texto.substr(0,texto.length-2).replace('.',''));
                        precios = precios + textofinal;
                    }
                });
            }
            if ($('.checkbox.product.bundle.option.change-container-classname').length) {
                $('.checkbox.product.bundle.option.change-container-classname').each(function () {
                    if ($(this).prop('checked')) {
                        var texto = $.trim($(this).parent('.bundle__option--price').text()),
                        textofinal=parseFloat(texto.substr(0,texto.length-2).replace('.',''));
                        precios = precios + textofinal;
                    }
                });
            }
            
            $('.price-container.price-configured_price.tax.weee .price').html(precios+",00 €");
    	});

        $('.closeinfo').on('click', function(){
            $(this).parent('.bundle--moreinfo--description').fadeOut('slow');
        });
        $('.bundle--moreinfo').on('click', function(){
            $(this).parent('.bundle--moreinfo--parent').find('.bundle--moreinfo--description').fadeIn('slow');
        })
        //funcionalidad de los bundle products para las diferentes opciones a elegir con los radios
        $('.radio.product.bundle.option.change-container-classname').on('click', function(){
            var idproducto = $(this).attr('data-selecteoption');
            var familia = $(this).attr('data-familia');
            //añadimos a todos los productos como que no los queremos
            $('.likedir.familia'+familia).addClass('dontlikedit');
            //los ocultamos
            $('.familia'+familia).hide();
            $('.familia'+familia).css("display", "none");
            //quitamos la clase como que lo queremos
            $('.likedir.familia'+familia).removeClass('likedir');
            //los quitamos de seleccionados
            $('.likedir.familia'+familia+' .checkboxpreselected').prop("checked", false);
            //mostramos el que queremos
            $('#selectedoption'+idproducto).show();
            //y lo seleccionamos
            $('#selectedoption'+idproducto+' .checkboxpreselected').prop("checked", true);
            //miramos cual queremos para poner el precio
            var precios=0;
            $('.radio.product.bundle.option.change-container-classname').each(function () {
                if ($(this).prop('checked')) {
                    var texto = $.trim($(this).parent('.bundle__option--price').text()),
                    textofinal=parseFloat(texto.substr(0,texto.length-2).replace('.',''));
                    precios = precios + textofinal;
                }
            });
            $('.price-container.price-configured_price.tax.weee .price').html(precios+",00 €");
        });
        //funcionalidad de los bundle products para las diferentes opciones a elegir con los radios
        $('.checkbox.product.bundle.option.change-container-classname').on('click', function(){
            var idproducto = $(this).attr('data-selecteoption');
            var familia = $(this).attr('data-selecteoption');
            if ($(this).prop('checked')) {
                $('#selectedoption'+familia).addClass('likedir');
                $('#selectedoption'+familia).removeClass('dontlikedit');
                $('#selectedoption'+familia).show();
                $('.precheck-'+familia).prop("checked", true);
            }
            else{
                $('#selectedoption'+familia).addClass('dontlikedit');
                $('#selectedoption'+familia).removeClass('likedir');
                $('#selectedoption'+familia).hide();
                $('#selectedoption'+familia).css("display", "none");
                $('.precheck-'+familia).prop("checked", false);
            }
            //miramos cual queremos para poner el precio
            var precios=0;
            $('.checkbox.product.bundle.option.change-container-classname').each(function () {
                if ($(this).prop('checked')) {
                    var texto = $.trim($(this).parent('.bundle__option--price').text()),
                    textofinal=parseFloat(texto.substr(0,texto.length-2).replace('.',''));
                    precios = precios + textofinal;
                }
            });
            $('.price-container.price-configured_price.tax.weee .price').html(precios+",00 €");
        });
        //add el bundle product al carrito automaticamente
        $('.addbundletosimple').on('click', function(){
            var idsimple = $(this).attr('data-product'),
            baseUrl = $("#baseUrl").val(),
            htmldelacarrito = $('.counter-number').html();
            htmldelacarrito = htmldelacarrito.toString();
            htmldelacarrito = htmldelacarrito.replace(/<[^>]*>/g, '');

            if(htmldelacarrito=="0"){
                $.ajax({
                    showLoader: true,
                    url: baseUrl+'helloworld/index/index',
                    data: { producto: idsimple },
                    type: "POST",
                    dataType: 'json'
                }).done(function (data) {
                    window.location.replace(baseUrl+'checkout/cart/');
                }).fail(function() {
                    window.location.replace(baseUrl+'checkout/cart/');
                })
                .always(function() {
                    window.location.replace(baseUrl+'checkout/cart/');
                });
            }
            else{
                $('.popup-nocar').fadeIn('slow');
                //alert('Para poder visualizar el resto de ambientes de muebles debe vaciar el presupuesto actualmente precargado');
            }
        });
        //borrar cesta de la compra
        $('.deletecartorder').on('click', function(){
            var idsimple = $(this).attr('data-product'),
            baseUrl = $("#baseUrl").val(),
            htmldelacarrito = $('.counter-number').html();
            htmldelacarrito = htmldelacarrito.toString();
            htmldelacarrito = htmldelacarrito.replace(/<[^>]*>/g, '');

            $.ajax({
                showLoader: true,
                url: BASE_URL+'deletecart/index/index',
                data: { producto: idsimple },
                type: "POST",
                dataType: 'json'
            }).done(function (data) {
                //window.location.replace(BASE_URL);
                console.log(data);
            }).fail(function() {
                //window.location.replace(BASE_URL);
                console.log('fallo');
            })
            .always(function() {
                //window.location.replace(BASE_URL);
                console.log('de vez en cuando');
            });
            window.location.replace(BASE_URL);
            console.log('sale de madre');
        });
        //miramos todos los productos que tenga seleccionados y lanzamos el trigger
        if($('.mascomposiciones').length){
            $('.likedir').each(function(){
                if ($(this).find('.checkboxpreselected').prop('checked')) {
                    var idproducto = $(this).find('.checkboxpreselected').attr('data-selecteoption');
                    $(this).find('.checkboxpreselected').trigger('change');
                }
            });
        }
    });
});