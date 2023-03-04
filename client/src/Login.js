import React,{useState} from 'react'
import Web3 from 'web3';
const Login = ({ onLoggedIn }) => {

    
 
    let web3 = undefined;

 
	const [loading, setLoading] = useState(false);
// const  handleAuthenticate ()=>{
//     fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
//         body: JSON.stringify({ publicAddress, signature }),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         method: 'POST',
//     }).then((response) => response.json());
// }
 

const handleSignMessage =async(publicAddress)=>{
    try {
        const signature =  (web3 === null || web3 === void 0) ? void 0 :( await web3.eth.personal.sign(
            
            publicAddress,
            '' // MetaMask will ignore the password argument here
        ));

        return { publicAddress, signature };
    } catch (err) {
        throw new Error(
            'You need to sign the message to be able to log in.'
        );
    }
}

 

	const handleSignup = async (publicAddress) =>{
	const signRes =  await 	fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
			body: JSON.stringify({ publicAddress }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}) 
        const res = signRes.json()
        return res
    }
    const handleClick = async () => {

		if (!web3) {
			try {
                alert("something happen in web3")
				// Request account access if needed
				await window.ethereum.enable();
				web3 = new Web3(window.ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
			window.alert('Please activate MetaMask first.');
			return;
		}

		const publicAddress = coinbase.toLowerCase();
        console.log("This is public adress",publicAddress )
        const signature =  (web3 === null || web3 === void 0) ? void 0 :( await web3.eth.personal.sign(
           
            publicAddress,
            '' // MetaMask will ignore the password argument here
        ));
		setLoading(true);

		// Check  user publicAddress is already present on backend

	const users=  await 	fetch(`${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`)
    const userJson = await users.json()
    if(userJson.length> 0){
const user = userJson[0]
 if(user){
alert(`${user} already exist` )
 }
}else{
    alert("User not already exist")
    const signRes = await handleSignup(publicAddress)
    console.log("signRes is ", signRes)
     }
     
			 
	};
  return (
    <div>
			
    <button className="Login-button Login-mm" onClick={handleClick}>
        {loading ? 'Loading...' : 'Login with MetaMask'}
    </button>
</div>
  )
}

export default Login