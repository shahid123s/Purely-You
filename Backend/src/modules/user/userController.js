
export const getPatientProfile = async (req, res, next) => {
    let {userId} = req.query;
    if(!userId) userId = req.user;
    console.log(req.user, 'In req.user in patient controller ')
    console.log(userId, 'In Getpatiendt controller ');
}