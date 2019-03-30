pragma solidity ^0.5.0;

contract Items {
    // Model of a raiseGood
    struct RaiseItem {
        uint id;
        bool resolved;
        string seller;
        string customer;
        string name_of_item;
        int price;
        int quantity;
    }

    // Store RaiseItems
    // Fetch RaiseItems
    mapping(uint => RaiseItem) public raisedItems;

    //Store raisedItems Count
    uint public raisedItemsCount;

    //Constructor
    constructor() public {
        createHaveRequest("0x5a9a0Af40806C0922f80309485665dd73532cCEb", "potatoes", 2000, 100);
        createHaveRequest("0x5a9a0Af40806C0922f80309485665dd73532cCEb", "cabbage", 30000, 1000);
        createNeedRequest("0x5a9a0Af40806C0922f80309485665dd73532cCEb", "onion", 2500,50);
        createNeedRequest("0x5a9a0Af40806C0922f80309485665dd73532cCEb", "banana", 10000,30);
    }

    // This will create a request where the seller can say that he has
    // x amount of good with him
    function createHaveRequest(string memory _seller, string memory _name_of_item, int _price, int  _quantity) public {
        raisedItemsCount ++;
        raisedItems[raisedItemsCount] = RaiseItem(raisedItemsCount, false, _seller, "", _name_of_item, _price, _quantity);
    }

    // To confirm the deal will the seller
    function resolveHaveRequest(uint _raisedItemId, string memory customer) public {
        // The transaction is not complete
        require(raisedItems[_raisedItemId].resolved == false);

        // The raisedItemId is valid
        require(_raisedItemId > 0 && _raisedItemId <= raisedItemsCount);
        
        raisedItems[_raisedItemId].resolved = true;
        raisedItems[_raisedItemId].customer = customer;
    }

    // A customer will raise a request if he need some good
    function createNeedRequest(string memory _buyer, string memory _name_of_item, int _price, int _quantity) public {
        raisedItemsCount ++;
        raisedItems[raisedItemsCount] = RaiseItem(raisedItemsCount, false,"", _buyer, _name_of_item, _price, _quantity);
    }

    // A seller confirms the deal with a customer
    function resolveNeedRequest(uint _raisedItemId, string memory seller) public {
        // The transaction is not complete
        require(raisedItems[_raisedItemId].resolved == false);

        // The raisedItemId is valid
        require(_raisedItemId > 0 && _raisedItemId <= raisedItemsCount);

        raisedItems[_raisedItemId].resolved = true;
        raisedItems[_raisedItemId].seller = seller;        
    }
}