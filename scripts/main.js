/****************************************************************************************/
/* Drive & Bye - A prototype for a blockchain-based car sharing system                  */
/* Copyright 2019 Dardan Rrafshi                                                        */
/* Licensed under (https://github.com/DonColon/Project-CarSharing/blob/master/LICENSE)  */
/****************************************************************************************/

// Cache references to DOM elements.
const elements = ['accept', 'decline', 'acceptance', 'paymentInfo'];
elements.forEach(function(element) {
    window[element] = document.getElementById(element);
});

if (typeof web3 === 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
else
    web3 = new Web3(web3.currentProvider);

web3.eth.defaultAccount = web3.eth.accounts[0];

const abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "payRentalCharge",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "renter",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_renter",
				"type": "address"
			},
			{
				"name": "_price",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_charge",
				"type": "uint256"
			}
		],
		"name": "PayedRentalCharge",
		"type": "event"
	}
];

const CarSharingContract = web3.eth.contract(abi);
const CarSharing = CarSharingContract.at("0x9555accd8c6f5057595b25b2cd2e07c11383a6d7");

const event = CarSharing.PayedRentalCharge();
event.watch(function(error, result) {
    if (error)
        console.log(error);

    console.log(result.args);

    paymentInfo.appendChild("<p>" + result.args._from + ": " + result.args._from_balance + "</p>");
    paymentInfo.appendChild("<p>" + result.args._to + ": " + result.args._to_balance + "</p>");
});

accept.addEventListener('click', function() {
    acceptance.classList.remove("fa-question");
    acceptance.classList.add("fa-check");

    CarSharing.payRentalCharge({
        from: web3.eth.accounts[1],
        value: new BigNumber(web3.toWei('5', 'ether'))
    });
});
