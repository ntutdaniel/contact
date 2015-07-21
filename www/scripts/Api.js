app.factory('Api', function ($http) {
    return {
        getIndustryList: function (onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Industry').
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        getMerchantList: function (industryId, onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Merchant?industryId=' + industryId).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        getBookletList: function (merchantId, onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Booklet?merchantId=' + merchantId).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        getTickets: function (bookletId, onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Ticket?bookletId=' + bookletId + '&userId=' + localStorage.userId).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        buyTicket: function (buyArray, onSuccess) {
            $http.post('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Ticket/Buy?userId=' + localStorage.userId, buyArray).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
            });
        },
        getLogs: function (onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Log' + '?userId=' + localStorage.userId).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        getPhone: function (token, onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Token/' + token).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        getMembers: function (onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Members/').
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        getMember: function (phone, onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Member/' + phone).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        getUserBalance: function (userId, onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/UserBalance?userId=' + userId).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        getShareTicket: function (userId, phone, onSuccess) {
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Ticket/Share?userId=' + userId + '&phone=' + phone).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        },
        shareTicketNew: function (share, onSuccess) {
            console.log(share.userId);
            console.log(share.me);
            console.log(share.ticketId);
            console.log(share.phone);
            console.log(share.name);
            $http.get('http://apps.csie.ntut.edu.tw/coupon/api/eTicket/Ticket/ShareNew?userId=' + share.userId + '&me=' + share.me + '&ticketId=' + share.ticketId + '&phone=' + share.phone + '&name=' + share.name).
            //$http.post('http://localhost:60186/api/eTicket/Ticket/ShareNew', share).
            success(function (data, status, headers, config) {
                (onSuccess || angular.noop)(data);
            }).
            error(function (data, status, headers, config) {
                alert("Error - Data:" + data + " status:" + status);
            });
        }
        //login: function (model, onSuccess) {
        //    var queryString;
        //    if (model.userId) {
        //        queryString = '?userId=' + model.userId;
        //    } else {
        //        queryString = '?phone=' + model.phone + '&token=' + model.token;
        //    }
        //    $http.get('http://apps.csie.ntut.edu.tw/coupon/Account/AppLogin' + queryString).
        //    success(function (data, status, headers, config) {
        //        (onSuccess || angular.noop)(data);
        //    }).
        //    error(function (data, status, headers, config) {
        //        alert("Error - Data:" + data + " status:" + status);
        //    });
        //}
    };
});