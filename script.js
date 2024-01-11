$(document).ready(function(){
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // Set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }

    async function printPostsToConsole() {

        //取得帳號
        coinbase = await web3.eth.getCoinbase();

        //取得帳號餘額
        var balance = await web3.eth.getBalance(coinbase);
        console.log(`coinbase: ${coinbase}`);
        console.log(`balance: ${web3.utils.fromWei(balance)}`);
        $(".user-info").eq(0).text(coinbase)
        $(".user-info").eq(1).text(`${web3.utils.fromWei(balance)} ETH`)

        var contract_address = "0xB8942aba02d94ED7c0eA05F5ac305FEbb1965791";
        var contract_abi = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "policyId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "carOwner",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "claimAmount",
                        "type": "uint256"
                    }
                ],
                "name": "ClaimFiled",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_policyId",
                        "type": "uint256"
                    }
                ],
                "name": "expirePolicy",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_policyId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_claimAmount",
                        "type": "uint256"
                    }
                ],
                "name": "fileClaim",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "policyId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "carOwner",
                        "type": "address"
                    }
                ],
                "name": "PolicyExpired",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "policyId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "carOwner",
                        "type": "address"
                    }
                ],
                "name": "PolicyPurchased",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "policyId",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "carOwner",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "PremiumPaid",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_policyId",
                        "type": "uint256"
                    }
                ],
                "name": "processPremiumPayment",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_premiumAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_coverageAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_durationInMonths",
                        "type": "uint256"
                    }
                ],
                "name": "purchaseInsurance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "policies",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "policyId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "carOwner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "premiumAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "coverageAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "purchaseTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "expirationTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isClaimed",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPremiumPaid",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "policyCounter",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        myContract = new web3.eth.Contract(contract_abi, contract_address);

        //取得合約餘額
        balance_contract = await web3.eth.getBalance(contract_address);
        balance_contract = web3.utils.fromWei(balance_contract)
        //$("#total_balance").text(web3.utils.fromWei(balance_contract));
        console.log(`contract balance: ${balance_contract}`);
        $(".user-info").eq(2).text(contract_address)
        $(".user-info").eq(3).text(`${balance_contract} ETH`)
        // 先給定有幾張現成的保單ID (下拉選單用)
        num_insurances = await myContract.methods.policyCounter().call();
        for(let i=0; i<num_insurances; i++){
            $("#floatingSelect").append(`<option value="${i}">${i}</option>`);
            $("#processSelect").append(`<option value="${i}">${i}</option>`);
            $("#fileClaimSelect").append(`<option value="${i}">${i}</option>`)
        }
    };
    printPostsToConsole();

    $("#purchaseInsurance").click(function(){
        console.log($("#premiumAmount").val(), $("#coverageAmount").val(),  $("#durationInMonths").val());
        premiumAmount = $("#premiumAmount").val()
        coverageAmount = $("#coverageAmount").val()
        durationInMonths = $("#durationInMonths").val()
        myContract.methods.purchaseInsurance(premiumAmount, coverageAmount, durationInMonths).send({from: coinbase,}).then(function(receipt){
            location.reload();
        });
    })

    $("#processPremiumPayment").click(function(){
        policyid = $("#processSelect :selected").text();
        insurancePay = $("#insurancePay").val();
        myContract.methods.processPremiumPayment(policyid).send({from: coinbase, value: insurancePay}).then(function(receipt){
            location.reload();
        });
    })

    $("#fileClaim").click(function(){
        policyid = $("#fileClaimSelect :selected").text();
        claimAmount = $("#claimAmount").val();
        myContract.methods.fileClaim(policyid, claimAmount).send({from: coinbase,}).then(function(receipt){
            location.reload();
        });
    })

    $("#floatingSelect").change(async function(){
        if(this.selectedIndex == 0) return
        insurance_id = $("#floatingSelect").val()
        console.log(`有人點選保單ID: ${$("#floatingSelect").val()}`);
        
        policy = await myContract.methods.policies(insurance_id).call();
        console.log(policy);
        policy[4] = timestamp_to_string(policy[4]);
        policy[5] = timestamp_to_string(policy[5]);
        $(".table > tbody > tr > td").each(function(index, element){
            $(element).text(policy[index+1])
        })
    })

    function timestamp_to_string(timestamp){
        // Assuming you have a Unix timestamp in seconds
        var unixTimestamp = timestamp; // Replace with your actual timestamp
        // Convert the Unix timestamp to milliseconds (required by JavaScript Date)
        var timestampInMilliseconds = unixTimestamp * 1000;
        // Create a new Date object with the timestamp in milliseconds
        var date = new Date(timestampInMilliseconds);
        // Format the date to a human-readable string (you can adjust the format as needed)
        var humanReadableString = date.toLocaleString(); 
        console.log(humanReadableString);
        return humanReadableString
    }
});

