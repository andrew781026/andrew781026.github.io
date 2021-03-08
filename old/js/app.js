var productApp = angular.module('productApp', []);

productApp.controller('singleProduct', ['httpService',function (httpService) {
    var self = this;
    self.DB = 'LJ';
    
    self.href = function(productID) {
    	
		var link = 'http://emarket.riko.com.tw:8444/StorageAutocompletePrint/http-get-example.html#?productID='+productID+'&DB='+self.DB;
		location.href=link;
		
	}
    	
	
    
    // 查詢庫存列印用
    // http://emarket.riko.com.tw:8444/StorageAutocompletePrint/LJAutoComplete.html
    
    // 修改儲位用
    // http://emarket.riko.com.tw:8444/StorageAutocompletePrint/http-get-example.html#?productID=A0010020003%20&DB=LJ
    

    // TODO 需要將 $http service 完成
    self.products = [
        {
            'productID': 'A0010020003',
            'productName': 'PR-610-I',
            'storagePlace': 'K1-2-3',
            'unit': 'PSC',
            'amountList':[
                {"warehouse":{"id":"S001","name":"成品倉","note":"放成品的地方"},'amountInWarehouse':55,'borrowAmount':2,'lendAmount':6},
                {"warehouse":{"id":"S002","name":"材料倉","note":"專門放材料的地方"},'amountInWarehouse':1000,'borrowAmount':5,'lendAmount':7},
                {"warehouse":{"id":"S003","name":"走道倉","note":"走道"},'amountInWarehouse':22,'borrowAmount':1,'lendAmount':0},
                {"warehouse":{"id":"S075","name":"永鉅倉","note":"給永鉅專用"},'amountInWarehouse':33,'borrowAmount':7,'lendAmount':13},
                {"warehouse":{"id":"S054","name":"國貿倉","note":"國貿專用"},'amountInWarehouse':77,'borrowAmount':6,'lendAmount':44},
                {"warehouse":{"id":"S076","name":"威力科倉","note":"放威力科物品"},'amountInWarehouse':861,'borrowAmount':0,'lendAmount':0}
            ]
        }
    ];


    self.warehouses = [
        {"id":"S001","name":"成品倉","note":"放成品的地方"},
        {"id":"S002","name":"A倉","note":"專門放材料的地方"},
        {"id":"S003","name":"走道倉","note":"走道"},
        {"id":"S007","name":"報廢倉","note":"專門放報廢物的地方"},
        {"id":"S075","name":"永鉅倉","note":"給永鉅專用"},
        {"id":"S058","name":"機構倉","note":"機構用"},
        {"id":"S054","name":"國貿倉","note":"國貿專用"},
        {"id":"S076","name":"威力科倉","note":"放威力科物品"}
    ];
    
    self.addProductInfo = function(productID) {
    	console.log('add productID='+productID);
		httpService.getHttpGetProductInfo(productID,self.DB)
					.success(function(data) { self.products.push(data); });
					
	}
    
    self.removeProductInfo = function(productID) {
    	console.log('remove productID='+productID);
    	removeItem(self.products, productID);
	}
    
    self.test = function () {
        console.log("test");
    }
    
	
	// self.dataReGet();

    self.amountInWarehouse = function (product,warehouse) {
        var amountList =  product.amountList ;

        for(var i = 0 ; i <amountList.length;i++){
            if ( amountList[i].warehouse.id === warehouse.id ){
                return amountList[i].amountInWarehouse ;
            }
        }
        return 0 ;
    }

}]);

productApp.factory('httpService', ['$http',function($http) {
	
	// $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	
	var factory = {} ;
	
	factory.getHttpGetProductInfo = function(productID,DB){
		// return $http.post('rest/PurchOrders/'+orderID,{'serialNO':serialNO,'date':date});
		return $http.get('rest/productService/product/'+productID+'?DB=' + DB);	
	}
	
	return factory ;
	
	
}]);


function removeItem(array, item){
    for(var i in array){
        if( array[i].productID == item){
            array.splice(i,1);
            break;
        }
    }
}




