import React,{useState} from 'react'
import Web3 from 'web3';
import axios from 'axios'
const Login = ({ onLoggedIn }) => {

    
 
    let web3 = undefined;

 
	const [loading, setLoading] = useState(false);
const  handleAuthenticate =async(publicAddress, signature)=>{
   const loginRes = await  fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
        body: JSON.stringify(publicAddress, signature ),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
    const loginResJson = loginRes.json()
    return loginResJson
}
 

const handleSignMessage =async(publicAddress, id)=>{
    try {
        const signature =  (web3 === null || web3 === void 0) ? void 0 :( await web3.eth.personal.sign(
            id,
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
        console.log("Public adress in signup", publicAddress)
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
        
		setLoading(true);
console.log("BGURL", process.env.REACT_APP_BACKEND_URL)
		// Check  user publicAddress is already present on backend
const url = `${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
console.log("url is ", url)
	// const users=  await axios({method:"GET",
   
    //       headers: { 'Content-Type': 'application/json'},
    //         url:url})
    // console.log("Users is", users)
     
	const users=  await fetch(url,{headers:{"content-type": "application/json","accept": "application/json",},mode: 'no-cors'})
	// const users=  await fetch('​https://5000-kishore1477-connectmeta-zgn8wqpsj76.ws-us89b.gitpod.io/users?publicAddress=0x527337b0b68d927eaf920f5b4589f93ae2626343',)
    console.log("users", users)
 
    const userJson = await users.json()
    console.log("UserJson",userJson )
    
    if(users){
        const user = userJson[0]
         if(user){
        alert(`${user} already exist` )
         }
        }else{
            alert("User not already exist")
            const signRes = await handleSignup(publicAddress)
            console.log("signRes is ", signRes)
            
        
            const id = signRes.data._id
        
            const SignMsgRes = await handleSignMessage(publicAddress,id)
            console.log("SignMsgRes",SignMsgRes )
        
            const publicAddress = SignMsgRes.publicAddress
            const signature = SignMsgRes.signature
            const  autheticateRes = await  handleAuthenticate(publicAddress,signature)
        
            const token  =   autheticateRes.accessToken
            const loggedIn = onLoggedIn(token)    
        
        
           
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