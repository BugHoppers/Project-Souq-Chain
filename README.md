# hint4

**PROJECT SouqChain**

**PROBLEM:**

In a country like India, where a huge majority of the people are engaged in agriculture as their primary income, the people doing the hard work, the farmers, are being cunningly exploited by a multilayered system of intermediaries and cartels.

The middlemen exploits the loopholes in the system to make a fortune at the cost of sweat and blood of a simple farmer. They buy the produce at a cheap rate and sell the goods at a considerably higher price. The farmers never get a fair share. Even worse, many a times they are denied the prices agreed upon in the original deal and are forced to sell their produce at a far cheaper rate than promised.

Many a times, the farmers even throw away their produce due to illusion of "no-demand" created by this opaque intermediate layers. Consumers buy items at insane high rates and farmers sell off their good at ridiculously low prices. The whole game of illusion of over-availability or non-availability is centralized in the hands of middlemen, they direct it as they want.

**OUR SOLUTION:**

Our idea is to design a crackdown on this corrupted system with a robust decentralized application. Ensure farmer awareness and exposure, and, guarantee returns for their crops.

We are making a unified block-chain based platform for the farmers and the buyers to eliminate the intermediaries. This will benefit the small scale rural farmers and the end buyers. Everyone connected to the blockchain will have the data. The application will have a simple UI to enable uses with minimal training.

One can either create a supply of goods or demand of goods, reflecting the name and quantity of the item. A user can accept a demand based on his available stock.

Once a deal is made between a supplier(farmer) and a consumer, it cannot be altered or tempered without mutual consent.

A supplier can monitor the market price as he has access to the transactions happening around.


In case a deal has to be cancelled after processing it, the farmer can claim some amount of compensation. The buyer cannot deny placing an order or he cannot tamper the agreed price as the system is decentralized and a transaction in one block is reflected throughout the subsequent blocks. To retroactively alter a transaction/deal data, once must have majority consent(51% at least), which requires so huge a computing resource that it is practically impossible. Thus the system will be effectively unhackable and reliably uphold the interest of both farmers and buyers.


### Commands:

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
