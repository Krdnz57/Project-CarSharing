pragma solidity >=0.4.22 <0.6.0;


contract CarSharing
{

    enum State {Created, Locked, Inactive}

    address payable public owner;
    address payable public renter;
    uint public price;
    State state;


    constructor(address payable _renter, uint _price) public
    {
        owner = msg.sender;
        renter = _renter;
        price = _price;
        state = State.Created;
    }


    modifier onlyOwner()
    {
        require(
            msg.sender == owner,
            "Only owner can call this method."
        );
        _;
    }

    modifier onlyRenter()
    {
        require(
            msg.sender == renter,
            "Only renter can call this method."
        );
        _;
    }

    modifier costs(uint _price)
    {
        require(
            msg.value >= _price,
            "Not enough ether send!"
        );
        _;
    }

    modifier inState(State _state)
    {
        require(
            state == _state,
            "Invalid state."
        );
        _;
    }


    event PayedRentalCharge(
        address _from,
        address _to,
        uint _charge
    );


    function payRentalCharge() public payable
        onlyRenter
        costs(price)
        inState(State.Created)
    {
        emit PayedRentalCharge(renter, owner, msg.value);
        state = State.Locked;

        owner.transfer(msg.value);
    }

}
