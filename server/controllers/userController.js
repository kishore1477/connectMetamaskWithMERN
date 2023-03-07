import User from '../models/User.js';


class UserController {
 static find = async (req,res,next) => {

	try {
		
	
console.log("req params", req.query)
		const publicAddress = req.query  
	console.log("publicAddress is ",publicAddress )
		 const users =  await User.findOne(publicAddress)
		 console.log("Users is", users)
if(users){
	// return  res.status(200).json({"msg":"Some user fetched.", "users":users}) 
	return   res.status(200).send("Kuchh to ahoo" ) 


}else{
	//  return res.status(400).send({"msg":"user does not exists", "users":users}) 
	return   res.status(400).send("Kuchh to ahoo" ) 
} 
		} catch (error) {
			console.log("Internal error", error)
			return res.status(500).json({"msg":"Internal server error occured."}) 
		
		}
			 
	};
static get = (req,res,next) => {
console.log("request params", req.params.userId)
		if ((req ).user.payload.id !== +req.params.userId) {
			return res
				.status(401)
				.send({ error: 'You can can only access yourself' });
		}
		return User.findByPk(req.params.userId)
			.then((user) => res.json(user))
			.catch(next);
	};
 static create = async(req,res,next) => {
	 try {
			 console.log("Body signup data is ", req.body)
			 const {publicAddress} = req.body
			 console.log("Public address is", publicAddress)
			 console.log("1:",typeof(publicAddress))
			 const publicAddressINDB = await User.findOne({publicAddress})
			 
			 if(publicAddressINDB){
				return res.status(400).json({"msg":"User Already exists"})

			 } else{
				const data =  new User({
					publicAddress
				})
				const saveData = await data.save()
						// const data = await 	User.create(publicAddress)
						if(saveData){
							res.status(200).json({"msg":"Data Stored successfully","data": saveData})
						}
			 }

		 } catch (error) {
			console.log("Internal error", error)
			res.status(500).json({'msg':"internal server occured"})
		 }
	}
	
static	patch = (req,res,next) => {

		if ((req  ).user.payload.id !== +req.params.userId) {
			return res
				.status(401)
				.send({ error: 'You can can only access yourself' });
		}
		return User.findByPk(req.params.userId)
			.then((user ) => {
				if (!user) {
					return user;
				}
	
				Object.assign(user, req.body);
				return user.save();
			})
			.then((user ) => {
				return user
					? res.json(user)
					: res.status(401).send({
						error: `User with publicAddress ${req.params.userId} is not found`,
					});
			})
			.catch(next);
	};

}

export default  UserController







