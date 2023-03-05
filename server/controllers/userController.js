import User from '../models/User.js';


class UserController {
 static find = async (req,res,next) => {

		const whereClause = req.query && req.query.publicAddress ? { where: { publicAddress: req.query.publicAddress }, } : undefined;
	
		return await User.findAll(whereClause)
			.then((users) => res.json(users))
			.catch(next);
	};
static get = (req,res,next) => {

		if ((req ).user.payload.id !== +req.params.userId) {
			return res
				.status(401)
				.send({ error: 'You can can only access yourself' });
		}
		return User.findByPk(req.params.userId)
			.then((user) => res.json(user))
			.catch(next);
	};
 static create = (req,res,next) => {
	 try {
			 console.log("Body signup data is ", req.body)
			 const {publicAddress} = req.body
			 console.log("Public address is", publicAddress)
			
		 } catch (error) {
			
		 }
	}

}

export default  UserController








export const patch = (req,res,next) => {

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