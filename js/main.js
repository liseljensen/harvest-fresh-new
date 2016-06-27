'use strict';
var app = angular.module('app', [
  'ngRoute', 'ngAnimate'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {
        templateUrl: "partials/home.html"
        , controller: "PageCtrl"
    })

    // Pages
    .when("/guacamole", {
        templateUrl: "/partials/products.html"
        , controller: "PageCtrl"
    })
	
	.when("/pulp", {
        templateUrl: "/partials/products.html"
        , controller: "PageCtrl"
    })
	
	.when("/cut-fruit", {
        templateUrl: "/partials/products.html"
        , controller: "PageCtrl"
    })
	
//	.when("/recipes", {
//        templateUrl: "/partials/recipes.html"
//        , controller: "PageCtrl"
//    })
	
	.when("/get-started", {
        templateUrl: "/partials/get-started.html"
        , controller: "PageCtrl"
    })
	
    // else 404
    .otherwise("/404", {
        templateUrl: "partials/404.html"
        , controller: "PageCtrl"
    });
}]);

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function () {
        var path = $location.path();
		$rootScope.currentPage = path;
		
		$rootScope.isActive = function (viewLocation) {
			 var active = (viewLocation === $rootScope.currentPage);
			 return active;
		};
		
		if($rootScope.currentPage === '/') {
			$rootScope.isHome = true;
		}
		else if($rootScope.currentPage === '/guacamole') {
			$rootScope.isHome = false;
			$rootScope.bgImage = "guac-header.jpg";
			$rootScope.pageTitle = "Guacamole";
		}
		else if($rootScope.currentPage === '/pulp') {
			$rootScope.isHome = false;
			$rootScope.bgImage = "guac-header.jpg";
			$rootScope.pageTitle = "Pulp";
		}
		else if($rootScope.currentPage === '/cut-fruit') {
			$rootScope.isHome = false;
			$rootScope.bgImage = "guac-header.jpg";
			$rootScope.pageTitle = "Cut Fruit";
		}
//		else if($rootScope.currentPage === '/recipes') {
//			$rootScope.isHome = false;
//			$rootScope.bgImage = "guac-header.jpg";
//			$rootScope.pageTitle = "Recipes";
//		}
		else if($rootScope.currentPage === '/get-started') {
			$rootScope.isHome = false;
			$rootScope.bgImage = "guac-header.jpg";
			$rootScope.pageTitle = "Get Started";
		}
		else {
			$rootScope.isHome = false;
		}
    })
});

app.controller('PageCtrl', function ($scope) {
    console.log('Page Controller Called');
    // Add class page-effect
    //$scope.pageClass = 'page-effect';
});

app.controller("featuredRecipes", function ($scope, $window) {
    // Create array of project objects
    $scope.recipes = [
        {
            num: 1,
            src: "/images/recipes/featured/AvoCoconutSmothie.jpg",
            description: 'Avocado Coconut Smoothie',
            url_details: "good-choices"
        }
        , {
            num: 2,
            src: "/images/recipes/featured/CouscousAvoSalad.jpg",
            description: 'Couscous and Avocado Salad',
            url_details: "careers"
        }
        , {
            num: 3,
            src: "/images/recipes/featured/CouscousAvoSalad.jpg",
            description: 'Chimichurri Avocado Dressing',
            url_details: "fert-app"
        }
        , {
            num: 4,
            src: "/images/recipes/featured/SpcyFarmFieldBrk.jpg",
            description: 'Spicy Farm & Field Breakfast',
            url_details: "fall-harvest"
        }
        , {
            num: 5,
            src: "/images/recipes/featured/ZestyBrkSand.jpg",
            description: 'Zesty Breakfast Sandwich',
            url_details: "wwl"
        }
        , {
            num: 6,
            src: "/images/recipes/featured/AvocadoCrostini.jpg",
            description: 'Avocado Crostini',
            url_details: "brand"
        }
    ];
	
	$scope.onEnd = function(){
		$window.jQuery('.owl-carousel').owlCarousel({
			loop:false,
			margin:30,
			nav:true,
			navText:['<span class="glyphicon glyphicon-chevron-left"></span>','<span class="glyphicon glyphicon-chevron-right"></span>'],
			responsive:{
				0:{
					items:1
				},
			   992:{
					items:3
				}
			}
		});
	};
});

app.directive("repeatEnd", function(){
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			console.log(scope.$last)
			if (scope.$last) {
				console.log('last');
				scope.$eval(attrs.repeatEnd);
			}
		}
	};
});

function ProductDetailController($scope, $http, $location) {
	$scope.activeProductPage = $location.path().substring(1);
	$http.get('/data/products.json').then(
		function(response){
			return $scope.products = response.data.data;
		},
		function(data) {
			console.log(data);
		});
}

app.component('productDetail', {
  templateUrl: 'templates/productDetails.html',
  controller: ProductDetailController,
  bindings: {
    hero: '='
  }
});

/* --------------- WAYPOINT ------------------ */
	function wayPoint() {
		jQuery('.main-header-v1').waypoint(function() {
			setTimeout(function() {
				jQuery('.text-1').addClass('animated fadeInUp');
			}, 100);
			setTimeout(function() {
				jQuery('.main-header-v1 .banner-caption-text h2').addClass('animated fadeInDown');
			}, 100);
		}, { offset: '50%' });
		
		jQuery('.content-1').waypoint(function() {
			setTimeout(function() {
				jQuery('.image-banner-2').addClass('animated fadeInUp');
			}, 100);
		}, { offset: '70%' });
		jQuery('.content-2 , .content-8').waypoint(function() {
			setTimeout(function() {
				jQuery('.image-banner-1:nth-of-type(1)').addClass('animated fadeInUp');
			}, 100);
			setTimeout(function() {
				jQuery('.image-banner-1:nth-of-type(2)').addClass('animated fadeInUp');
			}, 200);
			setTimeout(function() {
				jQuery('.image-banner-1:nth-of-type(3)').addClass('animated fadeInUp');
			}, 300);
			setTimeout(function() {
				jQuery('.image-banner-1:nth-of-type(4)').addClass('animated fadeInUp');
			}, 400);
		}, { offset: '50%' });
	}


jQuery(document).ready(function(){
	//sticky menu
	if (jQuery(window).width() >= 992) {
		jQuery(window).on('scroll', function() {
			var menuHeight =($('.header-top-v-1').height());
			if ($(window).scrollTop() > menuHeight) {
				jQuery('.header-top-v-1').addClass('sticky-menu');
				jQuery('.logo').addClass('logosticky');
			}else{
				jQuery('.header-top-v-1').removeClass('sticky-menu');
				jQuery('.logo').removeClass('logosticky');
			}	
		});
	}	
	// parallax 
	var contentNewsletter = jQuery('.content-newsletter');
	 if (contentNewsletter.length) {
		contentNewsletter.parallax({
		speed : 0.5
		});
	 }
	// mobile social links
	jQuery('.toggle-share-alt').on('click',function(event){
		event.preventDefault();
		jQuery(this).next().slideToggle();
		jQuery('.header-search').removeClass('state-show');
	});
	// Mobile Menu
	jQuery('.menu-toogle,  #mobileNav2').on('click',function(event){
		event.preventDefault();
		jQuery('.navigation-mobile').toggleClass('active');
		jQuery('.navigation-mobile').slideToggle(150).stopPropagation();		
	});
	// Navigation Submenu
	jQuery('.navigation-mobile .menu-item-has-children >a').on('click',function(event){
		event.preventDefault();
		jQuery(this).toggleClass('active');
		jQuery(this).next().slideToggle();
	});
	// Toggle Search
	jQuery('.toggle-search-form').on('click',function  (event) {
		event.preventDefault();
		jQuery('.header-search').toggleClass('state-show');
	});
	
	
	// Ajax Contact form Submit
	jQuery('.contact-form form').on('submit', function(event){
    event.preventDefault();
    var formdata = jQuery('.contact-form form').serializeArray();
    jQuery.ajax({
      url: 'php/contact.php',
      type: 'POST',
      async: true,
      data: formdata,     
    }).done(function() {
          jQuery('.contact-form .form-messges').removeClass('hidden');
          jQuery('.contact-form .btn').attr('disabled', 'disabled');
      });
  });
  // waypoint
	if (jQuery(window).width() >= 992) { wayPoint(); }
	// Twitter Widget
	jQuery('.twitter-posts').twittie({
		'username':'ThemeForest',
		'count': 3,
		'template': '{{tweet}}',
		'apiPath':'php/api/tweet.php'
	});

});
jQuery(window).on('resize', function() {
		if ($(window).width() >= 992) { wayPoint(); }
})
.on('load',function(){
	// Isotope
	// Product Filter
	var $container = jQuery('.product-list');
	// initialize isotope
	$container.isotope({
	  itemSelector: '.product-grid'
	});
	// filter items when filter link is clicked
	jQuery('.product-list-filter a').on('click', function(){
		jQuery('.product-list-filter a').removeClass('active');
		jQuery(this).addClass('active');
	  var selector = jQuery(this).attr('data-filter');
	  $container.isotope({ filter: selector });
	  return false;
	});
	// product image lightbox
	$('.mfp-image').magnificPopup({
		type:"image",
		removalDelay: 500,
		callbacks: {
		   beforeOpen: function() {
		     // just a hack that adds mfp-anim class to markup 
		      this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
		      this.st.mainClass = this.st.el.attr('data-effect');
		   }
		 },
		 closeOnContentClick: true,
		 midClick: true
	});
});