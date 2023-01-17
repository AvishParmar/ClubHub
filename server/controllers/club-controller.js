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
            data: { 
                    _id: newClub._id,
                    name: newClub.name,
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

getAllClubs = async (req, res) => {
    await Clubs.find( {}, (err, clubs) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        if(!clubs){
            console.log("no clubs found");
                return res
                    .status(404)
                    .json({ success: false, error: 'Clubs not found' })
        }
        else{
            let clubData = [];
            for (let i in clubs){
                let club = clubs[i];
                let data = {
                    _id: club._id,
                    name: club.name,
                }
                clubData.push(data);
            }

            return res.status(200).json({ success: true, data: clubData })
        }
    })
}

getClub = async (req, res) => {
    await Clubs.findById(req.params.id, (err, club) => {
        if(err){
            return res.status(404).json({
                err,
                message: 'Club not found!'
            })
        }
        return res.status(200).json({ success: true, data: club})
    }) 
}

updateClub = async (req, res) => {
    await Clubs.findByIdAndUpdate(req.params.id, req.body, (err, club) => {
        if(err){
            return res.status(404).json({
                err,
                message: 'Club not found!'
            })
        }

        console.log("club updated");
        return res.status(200).json({
            success: true,
            id: club._id,
            message: 'Club updated!',
        })
        
    })
}

deleteClub = async (req, res) => {
    await Clubs.findById(req.params.id, (err) => {
        if(err){
            return res.status(404).json({
                err,
                message: 'Club not found!'
            })
        }
        Clubs.findByIdAndDelete(req.params.id, (err, club) => {
            return res.status(200).json({ success: true, data: club });
        })
    }).catch(err => console.log(err));
    
}
module.exports = {
    createClub,
    getAllClubs,
    getClub,
    updateClub, 
    deleteClub
}