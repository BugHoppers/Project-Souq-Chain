truffle migrate --reset

Items.deployed().then(function(i){app=i})

app.raisedItems(1)

app.raisedItemsCount()

app.raisedItems(1).then(function(c){itemc = c})
itemc[5].toNumber()


web3.eth.getAccounts().then(function(acc){acct = acc})

[ '0x5a9a0Af40806C0922f80309485665dd73532cCEb',
  '0x9e317d8CCA471Ef6359FE94625644A8f9403e77e',
  '0x8Ea0d39818f5953f11996bD2Ed1EFa7B38025518',
  '0xbDB1903A429A970E176D083E9825b7Bf3bC1bEac',
  '0xC36c6867A75f0098F66686b0a0D11eb90eE89809',
  '0x170b9ee6546e82cd6fa2E9bC3Ce4Fd7C4b0E4C27',
  '0xa5579C019221156Ad40D47C3b12c67F42FB69DBE',
  '0xf490bB570354090126dF47c589d097BA96df5A4B',
  '0x9FAcD42E44B52Eeab89F708E54212d1158Eaa4D5',
  '0xb67a30a92DD166a9D90734247a5DCE73F10cE83E' ]
truffle(development)> acct[0]
'0x5a9a0Af40806C0922f80309485665dd73532cCEb'

// Make a deal
app.resolveHaveRequest(1,"0x9e317d8CCA471Ef6359FE94625644A8f9403e77e")

app.resolveNeedRequest(2,"0x9e317d8CCA471Ef6359FE94625644A8f9403e77e", {"from":"0x9e317d8CCA471Ef6359FE94625644A8f9403e77e"});
