var mongoose = require("mongoose");
var User = mongoose.model("User");
var List = mongoose.model("List");

module.exports = {

	create: function(req, res){
		User.findOne({_id: req.body.user}, function(err, user){
			if(err){return res.json(err)};

			List.create({user: req.body.user, title: req.body.title, description: req.body.description, tageduser: req.body.tageduser}, function(err, list){
				if(err){return res.json(err)};

				User.findOne({_id: req.body.tageduser}, function(err, tageduser){
					console.log(tageduser);
					if(err){return res.json(err)};

					user.lists.push(list);
					user.save(function(err){
						if(err){return res.json(err)};
					});

					tageduser.lists.push(list);
					tageduser.save(function(err){
						if(err){return res.json(err)};
					});

					list.tagname = tageduser.name
					list.save(function(err){
						if(err){return res.json(err)};
					});
					
					return res.json(list);
				});			
			});
		});
	},

	update: function(req, res){
		List.findOne({_id: req.params.id}, function(err, list){
			if(err){
				return res.json(err);
			}
			if (list.checked == false){
				list.checked = true;
			}
			else if (list.checked == true){
				list.checked = false;
			}
			list.save(function(err){
				if(err){
					return res.json(err);
				}				
			});
			return res.json(list);			
		});
	}
}