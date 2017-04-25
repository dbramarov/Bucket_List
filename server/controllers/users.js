var mongoose = require('mongoose');
var User = mongoose.model('User');
var List = mongoose.model("List");

module.exports = {

	index: function(req, res){
		User.find({}).where("_id").ne(req.params.id).exec(function(err, users){
			if(err){
				return res.json(err)
			}
			User.findOne({_id: req.params.id}).populate('lists').exec(function(err, user){
				if(err){
					return res.json(err)
				}
				return res.json({users: users, current_user: user})
			});
		});
	},

	show: function(req, res){
		User.findOne({_id: req.params.id}).populate('lists').exec(function(err, user){
			if(err){return res.json(err)};
			List.find({checked: true, user: req.params.id}, function(err, user_done){
				if(err){return res.json(err)};
				List.find({checked: false, user: req.params.id}, function(err, user_pend){
                    if(err){return res.json({errors: err.errors})};
                    List.find({checked: true, tageduser: req.params.id}, function(err, taged_done){
                        if(err){return res.json({errors: err.errors})};
                        List.find({checked: false, tageduser: req.params.id}, function(err, taged_pend){
                            if(err){return res.json({errors: err.errors})};
                            return res.json({user:user, user_done:user_done, user_pend:user_pend, taged_done:taged_done, taged_pend:taged_pend});
                    	});
                    });
                });           
			});
		});
	},

	login: function(req, res){
		User.findOne({name: req.body.name}, function(err, user){
			if(err){res.json(err)}
			else if (!user){
				User.create({name: req.body.name}, function(err, user){
					if(err){res.json(err)}
					else{
						res.json(user);
					}
				})
			}
			else{
				res.json(user);
			}
		})
	}
}