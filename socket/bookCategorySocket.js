const { mainUrl } = require('../config/dbConfig');
const Book = require('../models/bookModel');
const AcceptBook = require('../models/acceptBookModel');
const SubCategory = require('../models/subCategoryModel');







 
function bookCategory(io) {
    // console.log(io);
    const ticketNsp = io.of("/almumtaz")
    ticketNsp.on("connection", (socket) => {
        console.log("socket connected");

        socket.on("newBookCategory", async (data) => {
            try {

                
                let info = {
                    categoryId: data.categoryId,
                }

                console.log(info.categoryId);


                const books = await Book.findById(info.categoryId).populate(['subCategoryId', 'categoryId', 'userId', 'assignTo']);

                console.log(books);


                // await message.save()
                ticketNsp.emit("getBookCategory",books )



            } catch (err) {
                console.log(err)
            }
        })
    })
}

module.exports = bookCategory