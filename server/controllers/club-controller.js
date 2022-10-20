const Clubs = require('../models/club-model')

createClub = async (req, res) => {
    const {name, email, description, admins, links, times, location} = req.body;
    const dupes = await Clubs.findOne({name: name}); 
    const dupes2 = await Clubs.findOne({email: email});
    // console.log(dupes.name);
    // console.log(dupes2.email);
    if(dupes || dupes2){
        return res.status(404).json({
            status: "ERROR",
            errormsg: "There is already a club with the given name/email"
        });
    }
    let members = [];
    let subscribers = [];

    //verify club function goes here
    const newClub = new Clubs({name, email, description, members, subscribers, 
        admins, links, times, location});


    newClub.save().then(() => {
        return res.status(200).json({
            status: "SUCCESS",
            data: { name: newClub.name,
                    email: newClub.email,
                    description: newClub.description,
                    admins: newClub.admins,
                    times: newClub.times,
                    location: newClub.location
                }
        });
    }).catch((err) => {
        console.error(err);
        return res.status(501).json({
            status: "ERROR",
            errormg: "Something went wrong in the server."
        });
    });
}

module.exports = {
    createClub
}