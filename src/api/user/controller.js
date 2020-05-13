import request from 'request'
import User from './model'

export const create = (req, res, next) => {
    request("https://randomuser.me/api", async (error, response, body) => {
        const incomingData = await JSON.parse(body)
        let dataToSave = {};
        incomingData.results.forEach(el => {
            dataToSave = {
                gender: el.gender,
                name: {
                    title: el.name.title,
                    first: el.name.first,
                    last: el.name.last,
                },
                location: {
                    street: el.location.street.name,
                    city: el.location.city,
                    state: el.location.state,
                    postcode: el.location.postcode
                },
                email: el.email,
                dob: el.dob.date,
                registered: el.registered.date,
                phone: el.phone,
                cell: el.cell,
                nat: el.nat
            }
        })
        const user = new User(dataToSave)
        user.save()
        res.status(200).json(user)
    })
}

export const getReport = async (req, res, next) => {

    const query = [
        { $match: { gender: req.query.gender } },
        {
            $addFields: {
                yearValue: {
                    $trunc: {
                        $divide: [{ $subtract: [new Date(), "$dob"] }, 1000 * 60 * 60 * 24 * 365]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                gender: 1,
                Nationality: "$nat",
                "0-30": {
                    $cond:
                    {
                        if:
                            { $and: [{ $gt: ["$yearValue", 0] }, { $lte: ["$yearValue", 30] }] }, then: 1, else: 0
                    }
                },
                "30-50": {
                    $cond:
                    {
                        if:
                            { $and: [{ $gt: ["$yearValue", 30] }, { $lte: ["$yearValue", 50] }] }, then: 1, else: 0
                    }
                },
                "50 and above": {
                    $cond:
                    {
                        if:
                            { $gt: ["$yearValue", 50] }, then: 1, else: 0
                    }
                }
            }
        }
    ]


    const finalData = await User.aggregate(query)

    res.status(200).json({ data: finalData })
}