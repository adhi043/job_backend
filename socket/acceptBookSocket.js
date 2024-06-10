const { mainUrl } = require('../config/dbConfig');
const Book = require('../models/bookModel');
const AcceptBook = require('../models/acceptBookModel');
const SubCategory = require('../models/subCategoryModel');








function acceptBookCategory(io) {
    // console.log(io);
    const ticketNsp = io.of("/almumtaz")
    ticketNsp.on("connection", (socket) => {
        console.log("socket connected");

        socket.on("newacceptBookCategory", async (data) => {
            try {


                let info = {
                    userId: data.userId,
                }


                const acceptBooks = await AcceptBook.findOne({ bookId: info.userId })
                    .populate({
                        path: 'bookId',
                        populate: { path: 'assignTo' },
                        populate: { path: 'categoryId' },
                        populate: { path: 'subCategoryId' },
                    })
                    .populate('sellerId');


                // await message.save()
                ticketNsp.emit("getacceptBookCategory", acceptBooks)



            } catch (err) {
                console.log(err)
            }
        })
    })
}

module.exports = acceptBookCategory