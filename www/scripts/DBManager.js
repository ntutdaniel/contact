//indexedDB DBManager

app.factory('ContactManager', function ($indexedDB) {
    var contacts = {};
    $indexedDB.openStore('Contact', function (store) {
        store.each().then(function (result) {
            for (var i = 0; i < result.length; i++) {
                var contact = result[i];
                contacts[contact.id] = contact;
            }
        });
    });

    return {
        add: function (people, onSuccess) {
            if (!contacts[people.id]) {
                contacts[people.id] = people;
                $indexedDB.openStore('Contact', function (cont) {
                    cont.upsert(people).then(function (result) {
                        (onSuccess || angular.noop)(people);
                    });
                });
            }
        },
        get: function (id) {
            if (!contacts[id])
                contacts[id] = {};
            return contacts[id];
        },
        list: function () {
            return contacts;
        },
        remove: function (people) {
            $indexedDB.openStore('Contact', function (cont) {
                cont.delete(people.id);
            });
            delete contacts[people.id];
        },
        count: function () {
            return Object.keys(contacts).length;
        },
        clear: function () {
            $indexedDB.openStore('Contact', function (store) {
                store.clear();
            });
            contacts = {};
        }
    };
});
app.factory('DepartManager',function($indexedDB){
    var depList={};
    $indexedDB.openStore('Department', function (deps){
        deps.each().then(function (result) {
            console.log("DepC:"+result.length);
            for (var i = 0; i < result.length; i++) {
                var dep = result[i];
                depList[dep.id] = dep;
            }
        });
    });
    return{
        listByOrgName: function(name){
            var list={};
            for(var key in depList){
                if(depList[key].org==name){
                    list[key]=depList[key];
                }
            }
            return list;
        },
        changeDep: function(depData,onSuccess){
            $indexedDB.openStore('Department',function(dep){
                dep.upsert(depData).then(function (result) {
                    (onSuccess || angular.noop)(depData);
                });
            });
        },
        list: function(){
            return depList;
        }
    }
});
app.factory('PeopleManager',function($indexedDB){
    var peoList={};
    $indexedDB.openStore('People', function (peos){
        peos.each().then(function (result) {
            console.log("PeoC:"+result.length);
            for (var i = 0; i < result.length; i++) {
                var peo = result[i];
                peoList[peo.id] = peo;
            }
        });
    });
    return{
        listByDepName: function(name){
            var list={};
            for(var key in peoList){
                if(peoList[key].dep==name){
                    list[key]=peoList[key];
                }
            }
            return list;
        },
        changePeo: function(peoData,onSuccess){
            $indexedDB.openStore('People',function(peo){
                peo.upsert(peoData).then(function (result) {
                    (onSuccess || angular.noop)(peoData);
                });
            });
        },
        list: function(){
            return peoList;
        }
    }
});
app.factory('DBInitManager',function($indexedDB){
    var labcontact = {
    "ilab": {
        "專案": {
            "Martian": {
                "name": "郭博士",
                "phone": "09*******",
                "email": "kuo@webcomm.com.tw",
                "tel": "811",
                "depart": "ILab",
                "marked":false
            },
            "Eric": {
                "name": "陳英一",
                "phone": "09*******",
                "email": "ichen@ntut.edu.tw",
                "tel": "811",
                "depart": "ILab",
                "marked":false

            }, "Carter": {
                "name": "許智涵",
                "phone": "09*******",
                "email": "kgame@kgame.tw",
                "tel": "811",
                "depart": "專案生",
                "marked":false
            }
        },
        "研一": {
            "Derek": {
                "name": "張正儀",
                "phone": "",
                "email": "derek82511@gmail.com",
                "tel": "",
                "depart": "研究所一年級",
                "marked":false
            }, "Willy": {
                "name": "黃立維",
                "phone": "",
                "email": "yellow456434@hotmail.com",
                "tel": "",
                "depart": "研究所一年級",
                "marked":false
            }, "Tom": {
                "name": "呂信緯",
                "phone": "",
                "email": "st9450602@gmail.com",
                "tel": "",
                "depart": "研究所一年級",
                "marked":false
            }, "Tony": {
                "name": "徐熒宏",
                "phone": "",
                "email": "t0930198@gmail.com",
                "tel": "",
                "depart": "研究所一年級",
                "marked":false
            }, "Morris": {
                "name": "林昱辰",
                "phone": "",
                "email": "qazasdfg15@gmail.com",
                "tel": "",
                "depart": "研究所一年級",
                "marked":false
            }
        },
        "研二": {
            "Jason": {
                "name": "鄭逸民",
                "phone": "",
                "email": "future801113@gmail.com",
                "tel": "",
                "depart": "研究所二年級",
                "marked":false
            }, "Joyce": {
                "name": "郭芳瑜",
                "phone": "",
                "email": "wendy814111@gmail.co",
                "tel": "",
                "depart": "研究所二年級",
                "marked":false
            }, "Henry": {
                "name": "蔡皓羽",
                "phone": "",
                "email": "feather801201@gmail.com",
                "tel": "",
                "depart": "研究所二年級",
                "marked":false
            }, "Andrew": {
                "name": "吳哲安",
                "phone": "",
                "email": "9927ice@gmail.com",
                "tel": "",
                "depart": "研究所二年級",
                "marked":false
            }
        },
        "專題生": {
            "Daniel": {
                "name": "唐寧",
                "phone": "+886938590041",
                "email": "s102590041@gmail.com",
                "tel": "",
                "depart": "",
                "marked":false
            }, "Neo": {
                "name": "鍾泳鋐",
                "phone": "+886935133943",
                "email": "h6g2682@gmail.com",
                "tel": "",
                "depart": "",
                "marked":false
            }, "Rach": {
                "name": "陳約銘",
                "phone": "+886986752232",
                "email": "aa1235561@gmail.com",
                "tel": "",
                "depart": "",
                "marked":false
                }
            }
        }
    };
    var orgList={};
    var depList={};
    var peoList={};
    $indexedDB.openStore('Organization', function (orgs){
        orgs.each().then(function (result) {
            console.log("1orgC:"+result.length);
            for (var i = 0; i < result.length; i++) {
                var org = result[i];
                orgList[org.id] = org;
            }
        });
    });
    $indexedDB.openStore('Department', function (deps){
        deps.each().then(function (result) {
            console.log("1DepC:"+result.length);
            for (var i = 0; i < result.length; i++) {
                var dep = result[i];
                depList[dep.id] = dep;
            }
        });
    });
    $indexedDB.openStore('People', function (peos){
        peos.each().then(function (result) {
            console.log("1PeoC:"+result.length);
            for (var i = 0; i < result.length; i++) {
                var peo = result[i];
                peoList[peo.id] = peo;
            }
        });
    });
    return{
        insertOrg: function(orgData,onSuccess){
            for(var key in orgList){
                if(orgList[key].name==orgData.name)     return;
            }
            $indexedDB.openStore('Organization',function(org){
                org.upsert(orgData).then(function (result) {
                        (onSuccess || angular.noop)(orgData);
                });
            });
        },
        insertDep: function(depData,onSuccess){
            for(var key in depList){
                if(depList[key].name==depData.name)    return;
            }
            $indexedDB.openStore('Department',function(dep){
                dep.upsert(depData).then(function (result) {
                        (onSuccess || angular.noop)(depData);
                });
            });
        },
        insertPeo: function(peoData,onSuccess){
            for(var key in peoList){
                if(peoList[key].name==peoData.name)   return;
            }
            $indexedDB.openStore('People',function(peo){
                peo.upsert(peoData).then(function (result) {
                        (onSuccess || angular.noop)(peoData);
                });
            });
        },
        changeOrg: function(orgData,onSuccess){
            $indexedDB.openStore('Organization',function(org){
                org.upsert(orgData).then(function (result) {
                        (onSuccess || angular.noop)(orgData);
                });
            });
        },
        list: function(){
            return orgList;
        },
        getOrg: function(){
            return labcontact;
        },
        getDep: function(org){
            return labcontact[org];
        },
        getPeople: function(org,dep){
            for(var key in labcontact[org]){
                if(key==dep){
                    return labcontact[org][dep];
                }
            }
        },
        getPerson: function(org,dep,name){
            var peoples=labcontact[org][dep];
            for(var key in peoples){
                if(peoples[key].name === name) return peoples[key];
            }
        },
        count: function(obj){
            return Object.keys(obj).length;
        }
    }
    
});
app.factory('BookletManager', function ($indexedDB) {

    var booklets = {};

    $indexedDB.openStore('Booklet', function (store) {
        store.each().then(function (result) {
            for (var i = 0; i < result.length; i++) {
                var booklet = result[i];
                booklets[booklet.id] = booklet;
            }
        });
    });

    return {
        add: function (booklet, onSuccess) {
            if (!booklets[booklet.id]) {
                booklets[booklet.id] = booklet;
                $indexedDB.openStore('Booklet', function (store) {
                    store.upsert(booklet).then(function (result) {
                        (onSuccess || angular.noop)(booklet);
                    });
                });
            }
        },
        get: function (id) {
            if (!booklets[id])
                booklets[id] = {};
            return booklets[id];
        },
        listByMerchantId: function (merchantId) {
            var list = {};
            for (var key in booklets) {
                if (booklets[key].merchantId == merchantId)
                    list[key] = booklets[key];
            }
            return list;
        },
        list: function () {
            return booklets;
        },
        remove: function (booklet) {
            $indexedDB.openStore('Booklet', function (store) {
                store.delete(booklet.id);
            });
            delete booklets[booklet.id];
        },
        count: function () {
            return Object.keys(booklets).length;
        }
    };
});

app.factory('TicketManager', function ($indexedDB) {

    var tickets = {};

    $indexedDB.openStore('Ticket', function (store) {
        store.each().then(function (result) {
            for (var i = 0; i < result.length; i++) {
                var ticket = result[i];
                tickets[ticket.id] = ticket;
            }
        });
    });

    return {
        add: function (ticket, onSuccess) {
            if (!tickets[ticket.id]) {
                tickets[ticket.id] = ticket;
                $indexedDB.openStore('Ticket', function (store) {
                    store.upsert(ticket).then(function (result) {
                        (onSuccess || angular.noop)(ticket);
                    });
                });
            }
        },
        get: function (id) {
            if (!tickets[id])
                tickets[id] = {};
            return tickets[id];
        },
        listByUserId: function (userId) {
            var list = {};
            for (var key in tickets) {
                if (tickets[key].userId === userId)
                    list[key] = tickets[key];
            }
            return list;
        },
        update: function (ticket) {
            $indexedDB.openStore('Ticket', function (store) {
                store.upsert(ticket);
            });
            tickets[ticket.id] = ticket;
        },
        list: function () {
            return tickets;
        },
        remove: function (ticket) {
            $indexedDB.openStore('Ticket', function (store) {
                store.delete(ticket.id);
            });
            delete tickets[ticket.id];
        },
        count: function () {
            return Object.keys(tickets).length;
        }
    };
});

app.factory('CartManager', function ($indexedDB) {

    var carts = {};

    $indexedDB.openStore('Cart', function (store) {
        store.each().then(function (result) {
            for (var i = 0; i < result.length; i++) {
                var cart = result[i];
                carts[cart.id] = cart;
            }
        });
    });

    return {
        add: function (cart, onSuccess) {
            if (!carts[cart.id]) {
                carts[cart.id] = cart;
                $indexedDB.openStore('Cart', function (store) {
                    store.upsert(cart).then(function (result) {
                        (onSuccess || angular.noop)(cart);
                    });
                });
            }
        },
        get: function (id) {
            if (!carts[id])
                carts[id] = {};
            return carts[id];
        },
        list: function () {
            return carts;
        },
        remove: function (cart) {
            $indexedDB.openStore('Cart', function (store) {
                store.delete(cart.id);
            });
            delete carts[cart.id];
        },
        count: function () {
            return Object.keys(carts).length;
        },
        clear: function () {
            $indexedDB.openStore('Cart', function (store) {
                store.clear();
            });
            carts = {};
        }
    };
});

app.factory('ImportManager', function () {
    var tempContacts = {};

    return {
        add: function (member) {
            tempContacts[member.phone] = member;
        },
        list: function () {
            return tempContacts;
        },
        remove: function (member) {
            console.log(member.phone +
                        member.name +
                        member.email);
            delete tempContacts[member.phone];
        },
        count: function () {
            return Object.keys(tempContacts).length;
        },
        clearTempContacts: function () {
            for (var key in tempContacts) {
                delete tempContacts[key];
            }
        }
    };
});

app.factory('MembersManager', function () {
    var tempContacts = {};

    return {
        add: function (member) {
            tempContacts[member.phone] = member;
        },
        list: function () {
            return tempContacts;
        },
        remove: function (member) {
            console.log(member.phone +
                        member.name +
                        member.email);
            delete tempContacts[member.phone];
        },
        count: function () {
            return Object.keys(tempContacts).length;
        },
        clearTempContacts: function () {
            for (var key in tempContacts) {
                delete tempContacts[key];
            }
        }
    };
});

app.factory('TransactionLogManager', function ($indexedDB) {

    var transactionLogs = {};

    $indexedDB.openStore('TransactionLog', function (store) {
        store.each().then(function (result) {
            for (var i = 0; i < result.length; i++) {
                var transactionLog = result[i];
                transactionLogs[transactionLog.id] = transactionLog;
            }

        });
    });

    return {
        add: function (transactionLog, onSuccess) {
            if (!transactionLogs[transactionLog.id]) {
                transactionLogs[transactionLog.id] = transactionLog;
                $indexedDB.openStore('TransactionLog', function (store) {
                    store.upsert(transactionLog).then(function (result) {
                        (onSuccess || angular.noop)(transactionLog);
                    });
                });
            }
        },
        get: function (id) {
            if (!transactionLogs[id])
                transactionLogs[id] = {};
            return transactionLogs[id];
        },
        getUserBalance: function (userId) {
            var i;
            var list = {};
            for (var key in transactionLogs) {
                if (transactionLogs[key].userId == userId) {
                    list[key] = transactionLogs[key];
                    i = key;
                }
            }
            return list[i].balance;
        },
        listByUserId: function (userId) {
            var list = {};
            for (var key in transactionLogs) {
                if (transactionLogs[key].userId == userId)
                    list[key] = transactionLogs[key];
            }
            return list;
        },
        list: function () {
            return transactionLogs;
        },
        remove: function (transactionLog) {
            $indexedDB.openStore('TransactionLog', function (store) {
                store.delete(transactionLog.id);
            });
            delete transactionLogs[transactionLog.id];
        },
        count: function () {
            return Object.keys(transactionLogs).length;
        }
    };
});