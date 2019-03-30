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

  resolveHave: function (itemId) {
    console.log(itemId);
    web3.eth.getCoinbase((err, account) => {
      // console.log(account)
      if (err === null) {
        // console.log("account");
        App.contracts.Items.deployed().then(function (instance) {
          return instance.resolveHaveRequest(itemId, account);
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
        }).catch(function (err) {
          console.error(err);
        });
      }
    });
  },

  resolveNeed: function (itemId) {
    console.log(itemId);
    web3.eth.getCoinbase((err, account) => {
      console.log(account)
      if (err === null) {
        console.log("account");
        App.contracts.Items.deployed().then(function (instance) {
          return instance.resolveNeedRequest(itemId, account);
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
        }).catch(function (err) {
          console.error(err);
        });
      }
    });
  },

  createHave: function () {
    let name_of_item = "";
    let quantity = 0;
    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        App.contracts.Items.deployed().then(function (instance) {
          return instance.createHaveRequest(account, name_of_item, quantity);
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
        }).catch(function (err) {
          console.error(err);
        });
      }
    });
  },

  createNeed: function () {
    let name_of_item = "";
    let quantity = "";
    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        App.contracts.Items.deployed().then(function (instance) {
          return instance.resolveNeedRequest(account, _name_of_item, quantity);
        }).then(function (result) {
          $("#content").hide();
          $("#loader").show();
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
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Items.deployed().then(function (instance) {
      itemsInstance = instance;
      return itemsInstance.raisedItemsCount();
    }).then(async function (itemsCount) {
      var haveItems = $("#haveItems");
      var needItems = $("#needItems");
      haveItems.empty();
      needItems.empty();
      let openTrans = 0;
      let closedTrans = 0;
      for (var i = 1; i <= itemsCount; i++) {
        await itemsInstance.raisedItems(i).then(function (item) {
          var complete = item[1];
          var seller = item[2];
          var buyer = item[3];
          var item_name = item[4];
          var quantity = item[5];
          const x = i;
          if(complete){
            closedTrans ++;
          }else{
            openTrans ++;
          }

          // Render items Result
          var candidateTemplate = "<tr><td><span class='product'>" + item_name + "</span></td><td><span class='count'>" + quantity + "</span></td><td>" + complete + "</span></td>"
          if (seller == null || seller == "") {
            candidateTemplate = candidateTemplate + `<td><form onSubmit="App.resolveHave(${x});return false">
                                                        <button type="submit" class="btn btn-primary">Sell</button>
                                                      </form>
                                                      </td>
                                                      </tr>`
            haveItems.append(candidateTemplate);
          } else {
            // console.log("yess");
            candidateTemplate = candidateTemplate + `<td><form onSubmit="App.resolveHave(${x});return false">
                                                        <button type="submit" class="btn btn-primary">Buy</button>
                                                      </form>
                                                      </td>
                                                      </tr>`
            needItems.append(candidateTemplate);
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