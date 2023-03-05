import { NextFunction, Request, Response } from 'express';

import { User } from '../../models/user.model';

class UserController {
	
}

export const find = async (req,res,next) => {

	const whereClause = req.query && req.query.publicAddress ? { where: { publicAddress: req.query.publicAddress }, } : undefined;

	return await User.findAll(whereClause)
		.then((users) => res.json(users))
		.catch(next);
};

export const get = (req,res,next) => {

	if ((req ).user.payload.id !== +req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
	return User.findByPk(req.params.userId)
		.then((user) => res.json(user))
		.catch(next);
};

export const create = (req,res,next) => {
	console.log("Body signup data is ", req.body)
	User.create(req.body)
		.then((user) => res.json(user))
		.catch(next);
}


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