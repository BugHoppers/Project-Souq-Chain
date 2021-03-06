App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Items.json", function (items) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Items = TruffleContract(items);
      // Connect provider to interact with contract
      App.contracts.Items.setProvider(App.web3Provider);

      return App.render();
    });
  },

  buyerFound: function (itemId) {
    console.log(itemId);
    web3.eth.getCoinbase((err, account) => {
      // console.log(account)
      if (err === null) {
        // console.log("account");
        App.contracts.Items.deployed().then(function (instance) {
          return instance.foundBuyer(itemId, account);
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
          window.location.reload();
        }).catch(function (err) {
          console.error(err);
        });
      }
    });
  },

  sellerFound: function (itemId) {
    console.log(itemId);
    web3.eth.getCoinbase((err, account) => {
      console.log(account)
      if (err === null) {
        console.log("account");
        App.contracts.Items.deployed().then(function (instance) {
          return instance.foundSeller(itemId, account);
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
          window.location.reload();
        }).catch(function (err) {
          console.error(err);
        });
      }
    });
  },

  resolveTrans: function (itemId) {
    console.log(itemId);
    web3.eth.getCoinbase((err, account) => {
      console.log(account)
      if (err === null) {
        console.log("account");
        App.contracts.Items.deployed().then(function (instance) {
          return instance.resolveTransaction(itemId);
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
          window.location.reload();
        }).catch(function (err) {
          console.error(err);
        });
        
      }
    });
  },

  createReq: function () {
    let prod_name = $("#product").val();
    let quantity = $("#quantity").val();
    let type = $("#state").val();
    let price = $("#price").val();
    console.log(prod_name, quantity, type, price);
    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        console.log(account);
        App.contracts.Items.deployed().then(function (instance) {
          if (type == "supply") {
            return instance.createHaveRequest(account, prod_name, price, quantity);
          } else {
            return instance.createNeedRequest(account, prod_name, price, quantity);
          }
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
          window.location.reload();
        }).catch(function (err) {
          console.error(err);
        });
      }
    });
  },

  createHave: function () {
    let name_of_item = "";
    let quantity = 0;
    let price = 0;
    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        console.log(account);
        App.contracts.Items.deployed().then(function (instance) {
          return instance.createHaveRequest(account, name_of_item, price, quantity);
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
          window.location.reload();
        }).catch(function (err) {
          console.error(err);
        });
        
      }
    });
  },

  createNeed: function () {
    let name_of_item = "";
    let quantity = "";
    let price = 0;
    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        App.contracts.Items.deployed().then(function (instance) {
          return instance.resolveNeedRequest(account, _name_of_item, price, quantity);
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
          window.location.reload();
        }).catch(function (err) {
          console.error(err);
        });
        
      }
    });
  },

  render: function () {
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase((err, account) => {
      // console.log(account)
      if (err === null) {
        App.account = account;
        // $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Items.deployed().then(function (instance) {
      itemsInstance = instance;
      return itemsInstance.raisedItemsCount();
    }).then(async function (itemsCount) {
      var haveItems = $("#haveItems");
      var needItems = $("#needItems");
      var myCompleteTrans = $("#myCompTrans");
      haveItems.empty();
      needItems.empty();
      myCompleteTrans.empty();
      let openTrans = 0;
      let closedTrans = 0;
      for (var i = 1; i <= itemsCount; i++) {
        await itemsInstance.raisedItems(i).then(function (item) {
          var complete = item[1];
          var seller = item[2];
          var buyer = item[3];
          var item_name = item[4];
          var price = item[5];
          var quantity = item[6];
          var demand = item[7];
          var inbetween = item[8];
          // console.log(price)
          const x = i;
          if (complete) {
            closedTrans++;
          } else {
            openTrans++;
          }

          // Render items Result
          if (inbetween == false) {
            var candidateTemplate = "<tr><td><span class='product'>" + item_name + "</span></td><td><span class='count'>" + quantity + "</span></td>"

            // seller found
            if (demand) {

              candidateTemplate = candidateTemplate + `<td><form onSubmit="App.sellerFound(${x});return false">
                                                          <button type="submit" class="btn btn-info">Sell</button>
                                                        </form>
                                                        </td>
                                                        </tr>`
              haveItems.append(candidateTemplate);
            } else {
              // console.log("yess");
              candidateTemplate = candidateTemplate + "<td><span class='count'>" + price + "</span></td>"
              candidateTemplate = candidateTemplate + `<td><form onSubmit="App.buyerFound(${x});return false">
                                                          <button type="submit" class="btn btn-info">Buy</button>
                                                        </form>
                                                        </td>
                                                        </tr>`
              needItems.append(candidateTemplate);
            }
          }
          // console.log(seller);
          if (complete || inbetween == true) {
            let statString = "";
            let action = "";
            if (!complete) {
              statString = "<div class='badge badge-pending'> pending </div>";
              if ((demand && buyer == App.account) || (!demand && seller == App.account)) {
                action = `
                          <form onSubmit="App.resolveTrans(${x});return false">
                          <button type="submit" class="btn btn-info">Accept Transaction</button>
                          </form>
                          `;
              } else {
                action = "None";
              }
            } else if (complete) {
              statString = "<div class='badge badge-complete'> complete </div>";
              action = "None";
            }
            if (seller === App.account) {
              let template = `<tr>
                                <td> Selling </td>
                                <td> ${item_name} </td>
                                <td><span class="count">${quantity}</span></td>
                                <td> ${statString} </td>
                                <td> ${action} </td>
                              </tr>
                              `
              myCompleteTrans.append(template);
            } else if (buyer === App.account) {
              let template = `<tr>
                                <td > Buying </td>
                                <td> ${item_name} </td>
                                <td><span class="count">${quantity}</span></td>
                                <td> ${statString} </td>
                                <td> ${action} </td>
                              </tr>
                              `
              myCompleteTrans.append(template);
            }
          }
        });
      }

      $("#openTrans").html(openTrans);
      $("#closedTrans").html(closedTrans);

      loader.hide();
      content.show();
    }).catch(function (error) {
      console.warn(error);
    });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});